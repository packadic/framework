import * as _ from 'lodash';
import {App as Vue} from './../index'; //import * as Vue from 'vue';


export class BaseComponent {

    // public properties: http://vuejs.org/api/instance-properties.html
    /** An object that holds child components that have v-ref registered. For more details see v-ref. */
    $:any;

    /** An object that holds DOM elements that have v-el registered. For more details see v-el. */
    $$:any;

    /** The data object that the Vue instance is observing. You can swap it with a new object. The Vue instance proxies access to the properties on its data object. */
    $data:any;

    /** The direct child components of the current instance. */
    $children:Array<Vue>;

    /** The DOM element that the Vue instance is managing. Note that for Fragment Instances, vm.$el will return an anchor node that indicates the starting position of the fragment. */
    $el:HTMLElement;

    /** The instantiation options used for the current Vue instance. This is useful when you want to include custom properties in the options */
    $options:any;

    /** The parent instance, if the current instance has one. */
    $parent:Vue;

    /** The root Vue instance of the current component tree. If the current instance has no parents this value will be itself. */
    $root:Vue;

    // methods: http://vuejs.org/api/instance-methods.html
    $add(key:string, val:any):void {
    }

    $addChild(options?:any, constructor?:()=>void):void {
    }

    $after(target:HTMLElement|string, cb:()=>void):void {
    }

    $appendTo(target:HTMLElement|string, cb?:()=>void):void {
    }

    $before(target:HTMLElement|string, cb?:()=>void):void {
    }

    $broadcast(event:string, ...args:Array<any>):void {
    }

    $compile(el:HTMLElement):Function {
        return ():void => {
        }
    }

    $delete(key:string):void {
    }

    $destroy(remove:boolean):void {
    }

    $dispatch(event:string, ...args:Array<any>):void {
    }

    $emit(event:string, ...args:Array<any>):void {
    }

    $eval(text:string):void {
    }

    $get(exp:string):any {
    }

    $interpolate(text:string):void {
    }

    $log(path?:string):void {
    }

    $mount(el:HTMLElement|string):void {
    }

    $nextTick(fn:()=>void):void {
    }

    $off(event:string, fn:(...args:Array<any>)=>void|boolean):void {
    }

    $on(event:string, fn:(...args:Array<any>)=>void|boolean):void {
    }

    $once(event:string, fn:(...args:Array<any>)=>void|boolean):void {
    }

    $remove(cb?:()=>void):void {
    }

    $set(exp:string, val:any):void {
    }

    /**
     * Watch an expression or a computed function on the Vue instance for changes. The expression can be a single keypath or actual expressions
     * ```typescript
     * vm.$watch('a + b', function (newVal, oldVal) {
             * // do something
             * })
     * // or
     * vm.$watch(
     *  function () {
             *      return this.a + this.b
             *      },
     *  function (newVal, oldVal) {
             *      // do something
             *  }
     * )
     * ```
     * To also detect nested value changes inside Objects, you need to pass in deep: true in the options argument. Note that you don’t need to do so to listen for Array mutations.
     * ```typescript
     * vm.$watch('someObject', callback, { deep: true })
     * vm.someObject.nestedValue = 123
     * ```
     * @param exp
     * @param cb
     * @param options
     */
    $watch(exp:string|(()=>string),
           cb:(val:any, old?:any)=>any,
           options?:{ deep?: boolean; immediate?: boolean }):void {
    }
}

/**
 * The @component decorator registers a Vue component
 * @param {String} name - The name of the component
 * @returns {function(any): void}
 */
export function Component(name:string):(cls:typeof BaseComponent)=>void {
    return (cls:any):void => {

        let options:any = {
            props: {},
            methods: {},
            computed: {}
        };

        // check for replace and template
        if (cls.hasOwnProperty('replace'))
            options.replace = cls.replace;

        if (cls.hasOwnProperty('template'))
            options.template = cls.template;

        // create object and get prototype
        let obj:any = new cls();
        let proto:any = Object.getPrototypeOf(obj);

        if (proto.hasOwnProperty('__props__')) {
            options.props = proto.__props__;
        }

        Object.getOwnPropertyNames(obj).forEach((name:string) => {
            var type:any = null;
            var t:string = typeof obj[name];
            if(t === 'string'){
                type = String;
            } else if(t === 'number') {
                type = Number;
            } else if(t === 'boolean') {
                type = Boolean;
            }
            options.props[name] = { type: type, 'default': obj[name] }
        });

        if (proto.hasOwnProperty('__events__'))
            options.events = proto.__events__;

        if (proto.hasOwnProperty('__hooks__'))
            Object.keys(proto.__hooks__).forEach((name:string):void => {
                options[name] = proto.__hooks__[name];
            });

        // get methods
        Object.getOwnPropertyNames(proto).forEach((method:string):void => {

            // skip the constructor and the internal option keeper
            if (['constructor'].indexOf(method) > -1)
                return;

            let desc:PropertyDescriptor = Object.getOwnPropertyDescriptor(proto, method);

            // normal methods
            if (typeof desc.value === 'function')
                options.methods[method] = proto[method];

            // if getter and setter are defied, pass the function as computed property
            else if (typeof desc.set === 'function')
                options.computed[method] = {
                    get: desc.get,
                    set: desc.set
                };

            // if the method only has a getter, just put the getter to the component
            else if (typeof desc.get === 'function')
                options.computed[method] = desc.get;
        });
        if(name==='modal') {
            console.log('!component cls', cls);
            console.log('!component obj', obj);
            console.log('!component proto', proto);
            console.log('!component options', options);
        }

        // create a Vue component
        Vue.component(name, options);
    };
}

// register a lifecycl hook, http://vuejs.org/api/options.html#Lifecycle
export function LifecycleHook(hook:string) {
    return (cls:any, name:string, desc:PropertyDescriptor):PropertyDescriptor => {
        if ([
                'created', 'beforeCompile', 'compiled', 'ready', 'attached', 'detached', 'beforeDestroy', 'destroyed'
            ].indexOf(hook) == -1)
            throw new Error('Unknown Lifecyle Hook: ' + hook);
        if (!cls.hasOwnProperty('__hooks__'))
            cls.__hooks__ = {};
        cls.__hooks__[name] = cls[name];
        desc.value = void 0;
        return desc;
    }
}

// register an event, http://vuejs.org/api/options.html#events
export function EventHook(hook:string) {
    return (cls:any, name:string, desc:PropertyDescriptor):PropertyDescriptor => {
        if (!cls.hasOwnProperty('__events__'))
            cls.__events__ = {};
        cls.__events__[name] = cls[name];
        desc.value = void 0;
        return desc;
    }
}

// expose the property as attribute
export function Prop(options) {
    return function (cls:any, name:string) {
        if (!cls.hasOwnProperty('__props__'))
            cls.__props__ = {};
        cls.__props__[name] = options;
    }
}
