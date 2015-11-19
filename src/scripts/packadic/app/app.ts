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
    log, out, BrowserPrettyConsole
} from './../lib';


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.async = true;
Vue.config.debug = true;

var VueApp:typeof Vue = Vue.extend({});

export {Vue, log, out}

export enum AppState {
    PRE_INIT, INITIALISING, INITIALISED, STARTING, STARTED
}


export class App {

    constructor() {
        throw new Error('App should not be instantiated');
    }

    public static get log():typeof log {
        return log;
    }

    public static get out():BrowserPrettyConsole {
        return out;
    }

    protected static _VM:any = VueApp;

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

    public static defaults:Object = {
        debug  : false,
        logging: {
            level: log.levels.DEBUG
        },
        router: {
            enabled: true,
            mount: '<%= app.mount %>',
            options: {
                hashbang: true,
                history: false,
                abstract: false,
                root: null,
                linkActiveClass: 'v-link-active',
                saveScrollPosition: false,
                transitionOnLoad: false
            }
        },
        app    : {
            mount    : 'html',
            loader   : {
                enabled        : true,
                autoHideOnStart: true
            }
        }
    };

    public static config:IConfigProperty;

    public static init(opts:Object = {}) {
        App._state = AppState.INITIALISING;

        App.out.addDefaults();
        App.out.macro('title', 'Packadic');
        App.out.macro('alert', 'v1.0.0-alpha');

        if(App.config('router.enabled')) {
            App._router = new VueRouter(App.config('router.options'));
        }

        this._VM    = Vue.extend(_.merge({
            data: () => {
                return {
                    showPageLoader: true,
                    layout        : {
                        footer: {fixed: true, text: 'Copyright &copy; Codex ' + (new Date()).getFullYear()},
                        header: {fixed: true, title: 'Codex'},
                        page  : {edged: true, boxed: false}
                    },
                    sidebar       : {
                        items: [],
                    }
                }
            }
        }, opts));


        App._state = AppState.INITIALISED;
        return this;
    }

    public static start(opts:Object = {}):PromiseInterface<any> {
        var defer:DeferredInterface<any> = createPromise();
        App._state                       = AppState.STARTING;

        $(() => {
            if(App.config('router.enabled')){
                App.router.start(App._VM, App.config('router.mount'));
                App._vm = App.router.app;
            } else {
                App._vm = new App._VM(opts);
                App.vm.$mount(App.config('app.mount'));
            }
            //this.
            if (App.config('app.loader.enabled') && App.config('app.loader.autoHideOnStart')) {
                App.vm.$set('showPageLoader', false);
            }
            App._state = AppState.STARTED;
            defer.resolve();
        });

        return defer.promise;
    }


}

var config:ConfigObject = new ConfigObject(App.defaults);
App.config              = ConfigObject.makeProperty(config);
