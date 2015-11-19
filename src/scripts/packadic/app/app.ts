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
//import vuestrap from 'vue-strap';
//var aside = vuestrap.aside;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.async = true;
Vue.config.debug = true;


console.log('VueRouter', VueRouter);

export {Vue, log, out}

export enum AppState {
    PRE_INIT, INITIALISING, INITIALISED, STARTING, STARTED
}

export class App extends Vue {

    public static get log() : typeof log {
        return log;
    }
    public static get out() : BrowserPrettyConsole {
        return out;
    }

    public static defaults:Object = {
        debug: false,
        logging: {
            level: log.levels.DEBUG
        },
        app  : {
            mount : 'html',
            loader: {
                enabled        : true,
                autoHideOnStart: true
            }
        }
    };

    public config:IConfigProperty;
    public router:vuejs.VueRouter;
    protected _Router:Vue;

    protected _state:AppState = AppState.PRE_INIT;
    public get state() {
        return this._state;
    }

    constructor(opts:any={}) {
        super(_.merge({
            data: {
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
        }, opts));

        App.out.addDefaults();
        App.out.macro('title', 'Packadic');
        App.out.macro('alert', 'v1.0.0-alpha');

        var config:ConfigObject = new ConfigObject(App.defaults);
        this.config  = ConfigObject.makeProperty(config);
        var obs:IConfigObserver = ConfigObject.makeObserver(config);


        this.router = new VueRouter();
        this._Router = App.extend({})
    }

    public init(config:Object = {}):App {
        this._state = AppState.INITIALISING;
        this.$emit('INITIALISING').$broadcast('INITIALISING');

        this.config.merge(config);

        this._state = AppState.INITIALISED;
        this.$emit('INITIALISED').$broadcast('INITIALISED');
        return this;
    }

    public start():PromiseInterface<any> {
        var defer:DeferredInterface<any> = createPromise();
        this._state = AppState.STARTING;
        this.$broadcast('STARTING');

        $(() => {
            this.$mount(this.config('app.mount'));
            //this.router.start(this._Router, 'body');
            if (this.config('app.loader.enabled') && this.config('app.loader.autoHideOnStart')) {
                this.$set('showPageLoader', false);
            }
            this._state = AppState.STARTED;
            this.$broadcast('STARTED');
            defer.resolve(this);
        });


        return defer.promise;
    }

}
