module packadic.addons {

    export var namespacePrefix:string = 'packadic.';

    export module directives {

        export class Directive {
            el:HTMLElement;
            vm:vuejs.Vue;
            expression:string;
            arg:any;
            raw:string;
            name:string;

            bind():void {
            }

            unbind():void {
            }

            update(newValue:any, oldValue:any):void {
            }
        }

        export class ElementDirective extends Directive {

        }

        export function createDirective(name:string):(cls:any)=>void {
            return (cls:any):void => {

                let definition:any = {
                    isLiteral: false,
                    twoWay: false,
                    acceptStatement: false,
                    deep: false
                };

                Object.keys(definition).forEach((defName:string) => {
                    if (cls.hasOwnProperty(defName)) {
                        definition[defName] = cls[defName];
                    }
                });

                // create object and get prototype
                let obj:any = new cls();
                let proto:any = Object.getPrototypeOf(obj);

            }
        }

    }

    export module filters {

        export interface FilterCallback extends vuejs.FilterCallback {
            (value:any, begin?:any, end?:any): any;
        }

        export function Filter(name?:string):MethodDecorator {
            return (target:FilterCallback, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) => {
                name = name || propertyKey;
                var originalMethod = descriptor.value;
                descriptor.value = function (...args:any[]) {
                    console.log("The method args are: " + JSON.stringify(args)); // pre
                    var result = originalMethod.apply(this, args);               // run and store the result
                    console.log("The return value is: " + result);               // post
                    return result;                                               // return the result of the original method
                };
                Vue.filter(name, target);
                return descriptor;
            }
        }

        export function FilterCollection(excludedFunctions:string[] = []) {
            return function (target:any) {
                let proto = Object.getPrototypeOf(target);
                let filters:{[name:string]:Function} = {};
                Object.getOwnPropertyNames(proto).forEach((method:string):void => {

                    if (['constructor'].concat(excludedFunctions).indexOf(method) > -1) {
                        return;
                    }

                    let desc:PropertyDescriptor = Object.getOwnPropertyDescriptor(proto, method);

                    // normal methods
                    if (typeof desc.value === 'function') {
                        Vue.filter(method, proto[method]);
                    }
                });
            }
        }

    }

    export module components {


        // register a class as component in vue
        export function createComponent(name:string):(cls:any)=>void {
            return (cls:any):void => {

                let options:any = {
                    data: (():any => {
                        return new cls();
                    }),
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

                if (proto.hasOwnProperty('__props__'))
                    options.props = proto.__props__;

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

                // create a Vue component
                Vue.component(name, options);
            };
        }


        export class Component {

            // public properties: http://vuejs.org/api/instance-properties.html
            $:any;
            $$:any;
            $data:any;
            $children:Array<Vue>;
            $el:HTMLElement;
            $options:any;
            $parent:Vue;
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

            $watch(exp:string|(()=>string),
                   cb:(val:any, old?:any)=>any,
                   options?:{ deep?: boolean; immediate?: boolean }):void {
            }
        }

        // register a lifecycl hook, http://vuejs.org/api/options.html#Lifecycle
        export function lifecycleHook(hook:string) {
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
        export function eventHook(hook:string) {
            return (cls:any, name:string, desc:PropertyDescriptor):PropertyDescriptor => {
                if (!cls.hasOwnProperty('__events__'))
                    cls.__events__ = {};
                cls.__events__[name] = cls[name];
                desc.value = void 0;
                return desc;
            }
        }

        // expose the property as attribute
        export function prop(options) {
            return function (cls:any, name:string) {
                if (!cls.hasOwnProperty('__props__'))
                    cls.__props__ = {};
                cls.__props__[name] = options;
            }
        }

    }

    export module widgets {

        export function createWidget(name:string, proto:any) {
            proto = new proto();
            $.widget(namespacePrefix + name, proto);
            console.log('Widget', name, 'registered', proto);
        }

        export function extendWidget(name:string, parent:any, proto:Widget) {
            $.widget(namespacePrefix + name, parent, proto);
            console.log('Widget', name, 'extended', Widget);
        }

        export class Widget {
            _create():any {
                return undefined;
            }

            _destroy() {
            }

            _init():any {
                return undefined;
            }

            public _delay(fn:any, delay:number):number {
                return undefined;
            }


            public _focusable(element:JQuery):any {
                return undefined;
            }

            public _getCreateEventData():Object {
                return undefined;
            }

            public _getCreateOptions():Object {
                return undefined;
            }

            public _hide(element:JQuery, option:Object, callback:Function):any {
                return undefined;
            }

            public _hoverable(element:JQuery):any {
                return undefined;
            }


            public _off(element:JQuery, eventName:string):any {
                return undefined;
            }

            public _on(element:JQuery|string, handlers:Object):any {
                return undefined;
            }


            public _setOption(key:string, value:Object):any {
                return undefined;
            }

            public _setOptions(options:Object):any {
                return undefined;
            }

            public _show(element:JQuery, option:Object, callback:Function):any {
                return undefined;
            }

            public _super(...arg:any[]) {
            }

            public _superApply(args:any) {
            }

            public _trigger(type:String, args?:any[], data?:Object):any {
                return undefined;
            }

            public destroy() {
            }

            public disable() {
            }

            public enable() {
            }

            public instance():Object {
                return undefined;
            }

            public option(arg:any):any {
                return undefined;
            }


            public element:JQuery;
            public document:JQuery;
            public namespace:string;
            public options:any;
            public uuid:number;
            public version:string;
            public widgetEventPrefix:string;
            public widgetFullName:string;
            public widgetName:string;
            public window:JQuery;

            protected bindings:JQuery;
            protected eventNamespace:string;

            constructor() {
                // remove all members, they are only needed at compile time.
                var myPrototype = (<Function>Widget).prototype;
                $.each(myPrototype, (propertyName, value)=> {
                    delete myPrototype[propertyName];
                });
            }

            public get app():Application {
                return packadic.Application.instance;
            }
        }
    }

    export module plugins {

        export interface IPluginRegisterOptions {
            'namespace'?:string;
            'class'?:any;
            'name'?:string;
            'callback'?:Function,
            'loadPath'?:string;
        }

        /**
         * The Plugin class is a base class for jQuery plugins.
         *
         * @class Plugin
         */
        export class Plugin {
            public get options():any {
                return this._options;
            }

            public get app():Application {
                return packadic.Application.instance;
            }

            public static defaults:any = {};

            public VERSION:string = '0.0.0';
            public NAMESPACE:string = 'packadic.';

            public enabled:boolean = true;
            protected _options:any;
            protected $window:JQuery;
            protected $document:JQuery;
            protected $body:JQuery;
            protected $element:JQuery;

            constructor(element:any, options:any, ns:string) {

                this._options = options;
                this.$window = $(window);
                this.$document = $(document);
                this.$body = $(document.body);
                this.$element = $(element);
                this.NAMESPACE = ns;
                this._trigger('create');
                this._create();
                this._trigger('created');
            }

            public instance():Plugin {
                return this;
            }


            protected _create() {
            }

            protected _destroy() {
            }

            public destroy() {
                this._trigger('destroy');
                this._destroy();
                this._trigger('destroyed');
            }


            public _trigger(name:string, extraParameters?:any[]|Object):Plugin {
                var e:JQueryEventObject = $.Event(name + '.' + this.NAMESPACE);
                this.$element.trigger(e, extraParameters);
                return this;
            }


            public _on(name:string, cb:any):Plugin;
            public _on(name:string, sel?:string, cb?:any):Plugin;
            public _on(...args:any[]):any {
                args[0] = args[0] + '.' + this.NAMESPACE;
                debug.log('plugin _on ', this, args);
                this.$element.on.apply(this.$element, args);
                return this;
            }

            public static register(name:string, pluginClass:any) {
                registerPlugin(name, pluginClass);
                console.log('Plugin', name, 'registered', pluginClass);
            }
        }

        var defaultRegOpts:IPluginRegisterOptions = {
            loadPath: 'app/plugins/',
            callback: $.noop()
        };

        function makeRegOptions(name:string, pluginClass:any, regOpts?:IPluginRegisterOptions):IPluginRegisterOptions {
            regOpts = <IPluginRegisterOptions> $.extend(true, this.defaultRegOpts, {'class': pluginClass}, regOpts);
            if (typeof regOpts.namespace !== 'string') {
                regOpts.namespace = name;
            }
            regOpts.namespace = namespacePrefix + regOpts.namespace;
            return regOpts;
        }

        function registerPlugin(name:string, pluginClass:any) {
            var regOpts:IPluginRegisterOptions = makeRegOptions(name, pluginClass);

            function jQueryPlugin(options?:any, ...args:any[]) {
                var all:JQuery = this.each(function () {
                    var $this:JQuery = $(this);
                    var data:any = $this.data(regOpts.namespace);
                    var opts:any = $.extend({}, pluginClass.defaults, $this.data(), typeof options == 'object' && options);

                    if (!data) {
                        $this.data(regOpts.namespace, (data = new pluginClass(app, this, opts, regOpts.namespace)));
                    }

                    if (kindOf(options) === 'string') {
                        data[options].call(data, args);
                    }

                    if (kindOf(regOpts.callback) === 'function') {
                        regOpts.callback.apply(this, [data, opts]);
                    }
                });


                if (kindOf(options) === 'string' && options === 'instance' && all.length > 0) {
                    if (all.length === 1) {
                        return $(all[0]).data(regOpts.namespace);
                    } else {
                        var instances:Plugin[] = [];
                        all.each(function () {
                            instances.push($(this).data(regOpts.namespace));
                        });
                        return instances;
                    }
                }

                return all;
            }

            var old:any = $.fn[name];
            $.fn[name] = jQueryPlugin;
            $.fn[name].Constructor = pluginClass;
        }


    }
}
