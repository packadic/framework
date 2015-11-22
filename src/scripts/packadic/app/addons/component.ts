namespace packadic {

    export class BaseComponent {
        public static COMPONENT:boolean = true;
        // public properties: http://vuejs.org/api/instance-properties.html
        $:any;
        $$:any;
        $data:any;
        $children:Array<vuejs.Vue>;
        $el:HTMLElement;
        $els:{[name:string]:HTMLElement};
        $options:any;
        $parent:vuejs.Vue|BaseComponent;
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

        _digest() {
        }

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

    export function componentOptions(cls:any) {


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
        if (cls.hasOwnProperty('components'))
            options.components = cls.components;
        if (cls.hasOwnProperty('mixins'))
            options.mixins = cls.mixins;

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

        return options;
    }

// register a class as component in vue
    export function Component(name:string, children?:any):(cls:any)=>void {
        return (cls:any):void => {
            var options:any = componentOptions(cls);
            console.groupCollapsed('Component: ' + name);
            console.log('cls', cls);

            if(!defined(options.template) && defined(templates[name])){
                options.template = templates[name];
            }
            if (defined(children)) {
                options.components = options.components || {};
                Object.keys(children).forEach((key:string) => {
                    options.components[key]      = componentOptions(children[key]);
                    options.components[key].name = key;
                })
            }
            console.log('options', options);
            console.log('children', children);
            console.groupEnd();

            Vue.component(name, options);
        };
    }


}
