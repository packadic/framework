import Vue from 'vue';
import VueResource from 'vue-resource';
import 'vue-router';
declare var VueRouter:any;

import * as _ from 'lodash';
import $ from 'jquery';
import EventEmitter2 from 'eventemitter2';
import {
    applyMixins,defined,
    create as createPromise, PromiseInterface, DeferredInterface,
    ConfigObject,IConfigProperty, IConfigObserver,
    log, out, BrowserPrettyConsole,makeEventEmitter,registerJQueryHelpers
} from './../lib';
import {Layout} from './layout';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.async = true;
Vue.config.debug = true;
registerJQueryHelpers();

export {Vue, log, out}

export enum AppState {
    PRE_INIT, INITIALISING, INITIALISED, STARTING, STARTED
}


export class App {

    constructor() {
        throw new Error('App should not be instantiated');
    }

    static on(...args:any[]) {
    }

    static once(...args:any[]) {
    }

    static off(...args:any[]) {
    }

    static emit(...args:any[]) {
    }

    public static get log():typeof log {
        return log;
    }

    public static get out():BrowserPrettyConsole {
        return out;
    }

    protected static _layout:Layout = new Layout();
    public static get layout():Layout {
        return this._layout;
    }

    protected static _VM:any;

    protected static _vm:vuejs.Vue;
    static get vm():vuejs.Vue {
        return App._vm;
    }

    protected static _state:AppState = AppState.PRE_INIT;
    public static get state() {
        return this._state;
    }

    protected static _router:vuejs.VueRouter;
    public static get router():vuejs.VueRouter {
        return App._router;
    }

    public static $e(vel:string):JQuery {
        return $(App.vm.$els[vel]);
    }

    public static defaults:Object = {
        debug  : false,
        logging: {
            level: log.levels.DEBUG
        },
        router : {
            enabled: true,
            mount  : '<%= app.mount %>',
            options: {
                hashbang          : true,
                history           : false,
                abstract          : false,
                root              : null,
                linkActiveClass   : 'v-link-active',
                saveScrollPosition: false,
                transitionOnLoad  : true
            }
        },
        app    : {
            mount : 'html',
            loader: {
                enabled        : true,
                autoHideOnStart: true
            }
        }
    };

    public static config:IConfigProperty;

    public static init(opts:Object = {}) {
        App._state = AppState.INITIALISING;
        App.emit('INITIALISING');
        App.out.addDefaults();
        App.out.macro('title', 'Packadic');
        App.out.macro('alert', 'v1.0.0-alpha');

        if (App.config('router.enabled')) {
            App._router = new VueRouter(App.config('router.options'));
        }

        this._VM = Vue.extend(_.merge({
            data    : () => {
                return {
                    showPageLoader: true,
                    layout        : {
                        footer: {text: 'Copyright &copy; Codex ' + (new Date()).getFullYear()},
                        header: {title: 'Codex'}
                    },
                    sidebar       : {items: []}
                }
            },
            computed: {
                layoutStyle: {
                    get: () => App.layout.style
                }
            }
        }, opts));


        App._state = AppState.INITIALISED;
        App.emit('INITIALISED');
        return this;
    }

    public static start(opts:any = {}):PromiseInterface<any> {
        var defer:DeferredInterface<any> = createPromise();
        App._state                       = AppState.STARTING;
        App.emit('STARTING');
        if (defined(opts.data)) {
            var data:any = _.cloneDeep(opts.data);
            opts.data    = () => {
                return data
            };
        }

        console.warn('opts data', opts);
        $(() => {
            if (App.config('router.enabled')) {
                App.router.start(App._VM.extend(opts), App.config('router.mount'));
                App._vm = App.router.app;
            } else {
                App._vm = new App._VM(opts);
                App.vm.$mount(App.config('app.mount'));
            }
            //this.
            if (App.config('app.loader.enabled') && App.config('app.loader.autoHideOnStart')) {
                App.vm.$set('showPageLoader', false);
            }

            $('a.nogo').on('click', function (e:JQueryEventObject) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            App._state = AppState.STARTED;
            App.emit('STARTED');
            defer.resolve();
        });

        return defer.promise;
    }

    public static dataRequest(name:string, fn:Function):Promise {
        return App.vm.$http.get('/data/' + name + '.json', fn);
    }

    public static currentView:string;

    protected static _sharedConstructors:{[name:string]:any} = {};
    protected static _sharedInstances:{[shareId:string]:any} = {};

    public static share(name:string, creator:Function) {
        if (defined(App._sharedConstructors[name])) return;
        App._sharedConstructors[name] = creator;
    }

    public static shared(shareId:string, name:string, ...args:any[]) {
        if (!defined(App._sharedInstances[shareId])) {
            App._sharedInstances[shareId] = App._sharedConstructors[name].apply(App, args);
        }
        return App._sharedInstances[shareId];
    }
}

var config:ConfigObject = new ConfigObject(App.defaults);
App.config              = ConfigObject.makeProperty(config);
makeEventEmitter(App, {
    assignMethods       : ['on', 'once', 'off', 'emit'],
    assignPrivateMethods: []
});
App.on('**', function () {
    console.log('event', this.event, arguments);
})
