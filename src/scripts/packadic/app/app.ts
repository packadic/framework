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

    protected _state:AppState = AppState.PRE_INIT;
    public get state() {
        return this._state;
    }

    constructor(opts:any={}) {
        super(_.merge({
            data: {
                showPageLoader: true,
                layout        : {
                    bodyClass : new BodyClass(),
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


    }

    public init(config:Object = {}):App {
        this.$broadcast('init:before');
        this._state = AppState.INITIALISING;

        this.config.merge(config);

        this._state = AppState.INITIALISED;
        this.$broadcast('init:after');
        return this;
    }

    public start():PromiseInterface<any> {
        var defer:DeferredInterface<any> = createPromise();
        this.$broadcast('start:before');
        this._state = AppState.STARTING;

        $(() => {
            this.$mount(this.config('app.mount'));
            this._state = AppState.STARTED;
            if (this.config('app.loader.enabled') && this.config('app.loader.autoHideOnStart')) {
                this.$set('showPageLoader', false);
            }
            this.$broadcast('start:after');
            defer.resolve(this);
        });


        return defer.promise;
    }

    //public mergeData(newData:Object = {}) {
    //    var data:any = {};
    //    Object.keys(this.$data).forEach((key:string)=> {
    //        data[key] = this.$get(key);
    //    });
    //
    //    data = _.merge(data, newData);
    //
    //    _.each(data, (item:any, key:any) => {
    //        this.$set(key, item);
    //    });
    //}
    //
    //
    //public on(event:string, listener:Function):App {
    //    this._events.on(event, listener);
    //    return this;
    //}
    //
    //public once(event:string, listener:Function):App {
    //    this._events.once(event, listener);
    //    return this;
    //}
    //
    //public off(event:string, listener:Function):App {
    //    this._events.off(event, listener);
    //    return this;
    //}
    //
    //public emit(event:string, ...args:any[]):App {
    //    if (this.config('debug')) {
    //        //this.debug.logEvent(event, args);
    //    }
    //    this._events.emit(event, args);
    //    return this;
    //}


}
