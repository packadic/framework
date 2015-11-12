import * as _ from 'lodash';
import {App,Vue,AppState} from './index';
import {app} from './../index';
import {defined,kindOf} from './../util/index';
import {ConfigObject,IConfigProperty} from './config';

export class Store {

    protected static templates:any = {};

    public static template(type:string, defaultStore:any) {
        if(!Store.hasTemplate(type)){
            Store.templates[type] = defaultStore;
        }
    }

    static hasTemplate(type:string) {
        return defined(Store.templates[type]);
    }


    public get store():IConfigProperty {
        return ConfigObject.makeProperty(this.target[this.options.key]);
    }

    protected target:any;
    protected type:any;

    protected options:any = {
        key: '_decoratorStore'
    };

    constructor(target:any, type:string) {
        this.target = target;
        this.type   = type;
        this.ensureHasStore();
    }

    public static for(target:any, type:string = 'default') {
        return new Store(target, type);
    }

    public storePush(key:string, val:any):Store {
        this.store.set(key, (this.store(key) || []).push(val));
        return this;
    }

    public cleanTarget():Store  {
        delete this.target[this.options.key];
        return this;
    }

    protected ensureHasStore() {
        if (!defined(this.target[this.options.key])) {
            this.target[this.options.key] = new ConfigObject();
            if(Store.hasTemplate(this.type)){
                this.store.merge(Store.templates[this.type]);
            }
        }
    }
}



Store.template('directive', {
    params: [],
    paramWatchers: {},
    deep: false,
    twoWay: false,
    acceptStatement: false,

    bind: () => {},
    update: () => {},
    unbind: () => {},
});

export function Directive(id:string, elementDirective:boolean=false):ClassDecorator {

    return (target:any) => {

        console.log('Directive', target.prototype);
        var options:any = Store.for(target.prototype, 'directive').store.get();
        // copy static options
        Object.keys(target).forEach(function (key) {
            options[key] = target[key]
        });


        if(elementDirective) {
            Vue.elementDirective(id, options);
        } else {
            Vue.directive(id, options);
        }
        console.log('Directive', options);
        return target;
    }
}

export function ParamWatcher(id?:string):MethodDecorator {
    console.log('ParamWatcher');
    return (target:any, key:any) => {
        id = id || key;

        Store.for(target, 'directive').store.set('paramWatchers.' + id,  target[key]);
        console.log('ParamWatcher', target);
        return target;
    }
}

export class BaseDirective {
    el:HTMLElement;
    vm:vuejs.Vue;
    expression:string;
    arg:any;
    raw:string;
    name:string;


    constructor() {
        // remove all members, they are only needed at compile time.
        var myPrototype = (<Function>Directive).prototype;
        $.each(myPrototype, (propertyName, value)=> {
            delete myPrototype[propertyName];
        });
    }

    get $el():JQuery {
        return $(this.el);
    }

    // methods: http://vuejs.org/api/instance-methods.html
    $set(exp:string, val:any):void {
    }
    $delete(key:string):void {}

    set(value:any):void {}
    on(event:string, handler:Function):void {}

    bind():void {
    }

    unbind():void {
    }

    update(newValue:any, oldValue:any):void {
    }
}


var internalHooks = [
    'data',
    'el',
    'init',
    'created',
    'ready',
    'beforeCompile',
    'compiled',
    'beforeDestroy',
    'destroyed',
    'attached',
    'detached',
    'activate'
];
export function Component():ClassDecorator {
    return (target:any) => {
        var options:any = {};
        // prototype props.
        var proto:any = target.prototype;

        console.log('Component', target);

        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (key === 'constructor') {
                return
            }
            // hooks
            if (internalHooks.indexOf(key) > -1) {
                options[key] = proto[key];
                return
            }
            var descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (typeof descriptor.value === 'function') {
                // methods
                (options.methods || (options.methods = {}))[key] = descriptor.value
            } else if (descriptor.get || descriptor.set) {
                // computed properties
                (options.computed || (options.computed = {}))[key] = {
                    get: descriptor.get,
                    set: descriptor.set
                }
            }
        });
        // copy static options
        Object.keys(target).forEach(function (key) {
            options[key] = target[key]
        });
        // find super
        var Super = proto.__proto__.constructor;
        if (!(Super instanceof Vue)) {
            Super = Vue
        }
        console.log(options, Super);
        return Super.template(options)
    }
}
