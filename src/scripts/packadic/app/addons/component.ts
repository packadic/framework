import * as _ from 'lodash';
import Vue from 'vue';
import {App,AppState} from './../../index';
import {defined,kindOf,MetaStore} from './../../lib';


export class BaseComponent {

    // public properties: http://vuejs.org/api/instance-properties.html
    $:any;
    $$:any;
    $data:any;
    $children:Array<vuejs.Vue>;
    $el:HTMLElement;
    $options:any;
    $parent:vuejs.Vue;
    $root:vuejs.Vue;
    //$http:vuejs.VueResourceHttp;

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

    $get(exp:string):void {
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

    $watch(exp:string|(()=>string),
           cb:(val:any, old?:any)=>any,
           options?:{ deep?: boolean; immediate?: boolean }):void {
    }

    _digest(){}

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
        desc.value          = void 0;
        return desc;
    }
}

// register an event, http://vuejs.org/api/options.html#events
export function EventHook(hook:string) {
    return (cls:any, name:string, desc:PropertyDescriptor):PropertyDescriptor => {
        if (!cls.hasOwnProperty('__events__'))
            cls.__events__ = {};
        cls.__events__[name] = cls[name];
        desc.value           = void 0;
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

// register a class as component in vue
export function Component(name:string):(cls:any)=>void {
    return (cls:any):void => {

        let options:any = {
            data    : (():any => {
                return new cls();
            }),
            methods : {},
            computed: {}
        };

        // check for replace and template
        if (cls.hasOwnProperty('replace'))
            options.replace = cls.replace;

        if (cls.hasOwnProperty('template'))
            options.template = cls.template;

        // create object and get prototype
        let obj:any   = new cls();
        let proto:any = Object.getPrototypeOf(obj);

        if (proto.hasOwnProperty('__props__'))
            options.props = proto.__props__;

        if (proto.hasOwnProperty('__events__'))
            options.events = proto.__events__;

        if (proto.hasOwnProperty('__hooks__'))
            Vue['util'].extend(options, proto.__hooks__);

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

        // create a Vue component
        Vue.component(name, options);
    };
}


//export class Components {
//    protected static _components:{[key:string]:typeof Vue} = {};
//
//    static add(id:string, component:typeof Vue){
//        Components._components[id] = component;
//    }
//    static get(id:string): typeof Vue {
//        return Components._components[id];
//    }
//    static has(id:string): boolean {
//        return typeof Components._components[id] !== 'undefined';
//    }
//    static forget(id:string){
//        if(!Components.has(id)) return;
//        delete Components._components[id];
//    }
//}
//
//
//MetaStore.template('component', {
//
//    props : {},
//    events: {},
//
//    eventMethodKeys: [],
//    propKeys       : []
//});
//
//export function Component(id:string, parent?:any):ClassDecorator {
//    return (target:any) => {
//        var meta:any    = MetaStore.for(target.prototype, 'component');
//        var options:any = {
//            template: '',
//            computed: {},
//            props   : meta.store('props'),
//            data    : {},
//            methods : {},
//            events  : meta.store('events'),
//        };
//
//        console.groupCollapsed('Component: ' + id);
//
//        // PROPERTIES. go over the statics. properties like: el, template, data
//        Object.keys(target).forEach(function (key) {
//            options[key] = target[key];
//            console.log('Component key', key);
//        });
//
//        var ignoreMethods:string[] =
//                ['constructor', '_decoratorMetaStore', 'configurable', 'data']
//                    .concat(meta.store('eventMethodKeys'));
//
//        Object.getOwnPropertyNames(target.prototype).forEach((key:string) => {
//            if (ignoreMethods.indexOf(key) !== -1) return;
//            var desc = Object.getOwnPropertyDescriptor(target.prototype, key);
//            // METHODS
//            if (kindOf(desc.value) === 'function') {
//                options.methods[key] = desc.value;
//                console.log('added method', key);
//            }
//            // DATA
//            // if getter and setter are defied, pass the function as computed property
//            else if (typeof desc.set === 'function')
//                options.computed[key] = {
//                    get: desc.get,
//                    set: desc.set
//                };
//
//            // if the method only has a getter, just put the getter to the component
//            else if (typeof desc.get === 'function')
//                options.computed[key] = desc.get;
//        });
//
//        // DATA
//        var cls:any = new target();
//
//        Object.getOwnPropertyNames(cls).forEach((key:string) => {
//            var desc = Object.getOwnPropertyDescriptor(cls, key);
//            if (key !== 'data')                 options.data[key] = desc.value;
//            console.log('found data property, adding', key);
//        });
//
//        // MERGE DATA
//        if (cls.hasOwnProperty('data')) {
//            var desc:any = Object.getOwnPropertyDescriptor(cls, 'data');
//            var data:any = desc.value;
//            if (kindOf(desc.value) === 'function') {
//                data = desc.value.call(cls)
//            }
//            options.data = _.merge(options.data, data);
//            console.log('foudn "data" and added it', data);
//        }
//
//        var data     = _.cloneDeep(options.data);
//        options.data = () => {
//            return data;
//        };
//
//
//        var hasParent:boolean = defined(parent) && parent !== false;
//        if (hasParent) {
//            options.parent = parent;
//        }
//
//        var CustomComponent = App.extend(options)
//
//        Components.add(id, CustomComponent);
//
//        if(!hasParent) {
//            App.component(id, CustomComponent);
//        }
//
//
//        console.log('Component', id, options, meta);
//        //MetaStore.for(target.prototype, 'component').cleanTarget();
//
//        console.groupEnd();
//        return target;
//    }
//}
//
//export function Handles(event?:string):MethodDecorator {
//    return (target:any, key:string , desc:TypedPropertyDescriptor<any>) => {
//        var meta:MetaStore = MetaStore.for(target, 'component');
//        event              = event || key;
//
//        if (kindOf(desc.value) === 'function') {
//            meta.store.set('events.' + event, desc.value);
//            meta.storePush('eventMethodKeys', key);
//        }
//        //console.log('Handles ', event, target);
//        return target;
//    }
//}
//
//export function Prop(typeOrObj?:any, required:boolean = false, def?:any):PropertyDecorator {
//
//    return (target:Object, key:string) => {
//        var prop:any = {
//            type     : String,
//            required : false,
//            'default': undefined,
//            twoWay   : false,
//            validator: undefined
//
//        };
//        if (kindOf(typeOrObj) === 'object') {
//            _.merge(prop, typeOrObj);
//        } else if (kindOf(typeOrObj) === 'function') {
//            if (defined(typeOrObj)) prop.type = typeOrObj;
//            if (defined(required)) prop.required = required;
//            if (defined(def)) prop.default = def;
//        }
//        var meta:MetaStore = MetaStore.for(target, 'component');
//        meta.store.set('props.' + key, prop);
//        meta.storePush('propKeys', key);
//        return target;
//    }
//}
//
//export class BaseComponent {
//
//    // public properties: http://vuejs.org/api/instance-properties.html
//    /** An object that holds child components that have v-ref registered. For more details see v-ref. */
//    $:any;
//
//    /** An object that holds DOM elements that have v-el registered. For more details see v-el. */
//    $$:any;
//
//    /** The data object that the Vue instance is observing. You can swap it with a new object. The Vue instance proxies access to the properties on its data object. */
//    $data:any;
//
//    /** The direct child components of the current instance. */
//    $children:Array<any>;
//
//    /** The DOM element that the Vue instance is managing. Note that for Fragment Instances, vm.$el will return an anchor node that indicates the starting position of the fragment. */
//    $el:HTMLElement;
//
//    /** The instantiation options used for the current Vue instance. This is useful when you want to include custom properties in the options */
//    $options:any;
//
//    /** The parent instance, if the current instance has one. */
//    $parent:BaseComponent;
//
//    /** The root Vue instance of the current component tree. If the current instance has no parents this value will be itself. */
//    $root:BaseComponent;
//
//    // methods: http://vuejs.org/api/instance-methods.html
//    $add(key:string, val:any):void {
//    }
//
//    $addChild(options?:any, constructor?:()=>void):void {
//    }
//
//    $after(target:HTMLElement|string, cb:()=>void):void {
//    }
//
//    $appendTo(target:HTMLElement|string, cb?:()=>void):void {
//    }
//
//    $before(target:HTMLElement|string, cb?:()=>void):void {
//    }
//
//    $broadcast(event:string, ...args:Array<any>):void {
//    }
//
//    $compile(el:HTMLElement):Function {
//        return ():void => {
//        }
//    }
//
//    $delete(key:string):void {
//    }
//
//    $destroy(remove:boolean):void {
//    }
//
//    $dispatch(event:string, ...args:Array<any>):void {
//    }
//
//    $emit(event:string, ...args:Array<any>):void {
//    }
//
//    $eval(text:string):void {
//    }
//
//    $get(exp:string):any {
//    }
//
//    $interpolate(text:string):void {
//    }
//
//    $log(path?:string):void {
//    }
//
//    $mount(el:HTMLElement|string):void {
//    }
//
//    $nextTick(fn:()=>void):void {
//    }
//
//    $off(event:string, fn:(...args:Array<any>)=>void|boolean):void {
//    }
//
//    $on(event:string, fn:(...args:Array<any>)=>void|boolean):void {
//    }
//
//    $once(event:string, fn:(...args:Array<any>)=>void|boolean):void {
//    }
//
//    $remove(cb?:()=>void):void {
//    }
//
//    $set(exp:string, val:any):void {
//    }
//
//    /**
//     * Watch an expression or a computed function on the Vue instance for changes. The expression can be a single keypath or actual expressions
//     * ```typescript
//     * vm.$watch('a + b', function (newVal, oldVal) {
//             * // do something
//             * })
//     * // or
//     * vm.$watch(
//     *  function () {
//             *      return this.a + this.b
//             *      },
//     *  function (newVal, oldVal) {
//             *      // do something
//             *  }
//     * )
//     * ```
//     * To also detect nested value changes inside Objects, you need to pass in deep: true in the options argument. Note that you don’t need to do so to listen for Array mutations.
//     * ```typescript
//     * vm.$watch('someObject', callback, { deep: true })
//     * vm.someObject.nestedValue = 123
//     * ```
//     * @param exp
//     * @param cb
//     * @param options
//     */
//    $watch(exp:string|(()=>string),
//           cb:(val:any, old?:any)=>any,
//           options?:{ deep?: boolean; immediate?: boolean }):void {
//    }
//}
