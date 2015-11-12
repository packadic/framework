import Vue from 'vue';
import * as _ from 'lodash';
import $ from 'jquery';
import EventEmitter2 from 'eventemitter2';

import {
    applyMixins,defined,
    create as createPromise, PromiseInterface, DeferredInterface,
    ConfigObject,IConfigProperty,
} from './../lib';

Vue.config.async = true;
Vue.config.debug = true;


export {Vue}

export enum AppState {
    PRE_INIT, INITIALISING, INITIALISED, STARTING, STARTED
}

export class App extends Vue {

    protected static _instance:App;
    public static get instance() {
        if (!defined(App._instance)) {
            App._instance = new App();
        }
        return App._instance;
    }

    protected _events:EventEmitter2;

    public static defaults:Object = {
        debug     : false,
        app       : {mount: 'html'},
        startScene: 'main'
    };
    protected _config:ConfigObject;
    public config:IConfigProperty;

    public get debugging() {
        return this.config('debug');
    }

    protected _state:AppState = AppState.PRE_INIT;
    public get state() {
        return this._state;
    }

    // Vue.js data
    public $data:any = {
        showPageLoader: true
    };


    constructor() {
        //call super with false to defer compilation in Vue (dev build)
        super();
        this._events = new EventEmitter2({
            wildcard    : true,
            delimiter   : ':',
            maxListeners: 1000,
            newListener : true
        });
        if (defined(App._instance)) {
            throw new Error('Trying to create a new instance on App while its a singleton')
        }

        this._config = new ConfigObject(_.merge(Vue.config, App.defaults));
        this.config  = ConfigObject.makeProperty(this._config);

    }

    public init(options:Object = {}):App {
        this.emit('init:before');
        this._state = AppState.INITIALISING;

        this.config.merge(options);

        this._state = AppState.INITIALISED;
        this.emit('init:after');
        return this;
    }

    public start():PromiseInterface<any> {
        var defer:DeferredInterface<any> = createPromise();
        this.emit('start:before');
        this._state = AppState.STARTING;

        $(() => {
            this.$mount(this.config('app.mount'));
            this._state = AppState.STARTED;
            this.emit('start:after');
            defer.resolve(this);
        });


        return defer.promise;
    }


    public mergeData(newData:Object={}){
        Object.keys(newData).forEach((key:string) => {
            if(typeof this.$get(key) !== 'undefined') {
                this.$set(key, newData[key]);
            } else {
                this.$set(key, newData[key]);
            }
        });
    }




    public on(event:string, listener:Function):App {
        this._events.on(event, listener);
        return this;
    }

    public once(event:string, listener:Function):App {
        this._events.once(event, listener);
        return this;
    }

    public off(event:string, listener:Function):App {
        this._events.off(event, listener);
        return this;
    }

    public emit(event:string, ...args:any[]):App {
        if (this.config('debug')) {
            //this.debug.logEvent(event, args);
        }
        this._events.emit(event, args);
        return this;
    }


}
