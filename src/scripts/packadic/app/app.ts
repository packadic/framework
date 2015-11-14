import Vue from 'vue';
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


Vue.config.async = true;
Vue.config.debug = true;



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

    public get log() : typeof log {
        return log;
    }
    public get out() : BrowserPrettyConsole {
        return out;
    }
    protected _events:EventEmitter2;

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
    protected _config:ConfigObject;
    public config:IConfigProperty;

    protected _state:AppState = AppState.PRE_INIT;
    public get state() {
        return this._state;
    }

    public $data:any = {
        showPageLoader: true,
        layout        : {
            body  : {classes: new BodyClass()},
            footer: {fixed: true, text: 'Copyright &copy; Codex ' + (new Date()).getFullYear()},
            header: {fixed: true, title: 'Codex'},
            page  : {edged: true, boxed: false}
        },
        sidebar: {
            items: [],
        }
    };

    constructor() {
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

        this.out.addDefaults();
        this.out.macro('title', 'Packadic');
        this.out.macro('alert', 'v1.0.0-alpha');

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
