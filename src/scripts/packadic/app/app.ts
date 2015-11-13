import Vue from 'vue';
import * as _ from 'lodash';
import $ from 'jquery';
import EventEmitter2 from 'eventemitter2';
import {
    applyMixins,defined,
    create as createPromise, PromiseInterface, DeferredInterface,
    ConfigObject,IConfigProperty, IConfigObserver
} from './../lib';

import {log, out} from './../lib/logger';
out.addDefaults();
out.macro('title', 'Awesome!!');

out.macro('title', 'Awesome!!', 'With description');


export {Vue, log, out}

export enum AppState {
    PRE_INIT, INITIALISING, INITIALISED, STARTING, STARTED
}

//_.cloneDeep(Array.prototype
class BodyClass extends Array {
    constructor(){
        super();
        this.push('page-header-fixed', 'page-footer-fixed', 'page-edged')
    }
    has(name:string){
        return this.indexOf(name) !== -1;
    }
    remove(name:string):BodyClass{
        if(this.has(name)){
            this.splice(this.indexOf(name), 1);
        }
        return this;
    }
    ensure(name:string, shouldExist:boolean=true):BodyClass{
        if(shouldExist && !this.has(name)){
            this.push(name);
        } else if(!shouldExist && this.has(name)){
            this.remove(name);
        }
        return this;
    }
    toString(){
        return this.join(' ');
    }
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
        debug: false,
        app  : {
            mount : 'html',
            loader: {
                enabled        : true,
                autoHideOnStart: true
            }
        }
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

    public get out() {
        return out;
    }
    public get log() {
        return log;
    }

    // Vue.js data
    public $data:any = {
        showPageLoader: true,
        layout        : {
            body  : {classes: new BodyClass()},
            footer: {fixed: true, text: 'Copyright &copy; Codex ' + (new Date()).getFullYear()},
            header: {fixed: true, title: 'Codex'},
            page  : {edged: true, boxed: false}
        }
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

        Vue.config.async = true;
        Vue.config.debug = true;
        this._config = new ConfigObject(_.merge(Vue.config, App.defaults));
        this.config  = ConfigObject.makeProperty(this._config);
        var obs:IConfigObserver = ConfigObject.makeObserver(this._config);
    }

    public init(options:Object = {}):App {
        this.emit('init:before');
        this._state = AppState.INITIALISING;

        this.config.merge(options);
        if (this.config('app.loader.enabled')) {
            this.$set('showPageLoader', false);
        }

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
            if (this.config('app.loader.enabled') && this.config('app.loader.autoHideOnStart')) {
                this.$set('showPageLoader', false);
            }
            this.emit('start:after');
            defer.resolve(this);
        });


        return defer.promise;
    }

    public mergeData(newData:Object = {}) {
        var data:any = {};
        Object.keys(this.$data).forEach((key:string)=> {
            data[key] = this.$get(key);
        });

        data = _.merge(data, newData);

        _.each(data, (item:any, key:any) => {
            this.$set(key, item);
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
