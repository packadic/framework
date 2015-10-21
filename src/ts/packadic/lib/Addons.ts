module packadic {

    export var namespacePrefix:string = 'packadic.';

    console.log('packadic namespace ' + namespacePrefix);

    /**
     * The @extension decorator registers a extension
     * ```typescript
     * module packadic.extensions {
     *      @extension('code-block', { })
     *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param {String} name - The name of the extension
     * @param {Object} configToMergeIntoDefaults - The config object to merge into the default config
     * @returns {function(packadic.extensions.Extension): void}
     */
    export function extension(name:string, configToMergeIntoDefaults:any = {}):(cls:typeof extensions.Extension)=>void {
        return (cls:typeof extensions.Extension):void => {
            extensions.Extensions.register(name, cls, configToMergeIntoDefaults);
        };
    }

    /**
     * The @directive decorator registers a Vue Directive
     * ```typescript
     * module packadic.extensions {
     *      @extension('code-block', { })
     *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param {String} name - The name of the directive
     * @param {Boolean} isElementDirective - Register as element directive
     * @returns {function(packadic.directives.Directive): void}
     */
    export function directive(name:string, isElementDirective:boolean=false):(cls:typeof directives.Directive)=>void {

        return (cls:typeof directives.Directive):void => {

            let definition:any = {
                isLiteral: false,
                twoWay: false,
                acceptStatement: false,
                deep: false
            };

            let obj:any = new cls();
            let proto:any = Object.getPrototypeOf(obj);

            Object.getOwnPropertyNames(obj).forEach((defName:string) => {
                definition[defName] = obj[defName];
            });

            Object.getOwnPropertyNames(proto).forEach((method:string):void => {
                if (['constructor'].indexOf(method) > -1)
                    return;

                let desc:PropertyDescriptor = Object.getOwnPropertyDescriptor(proto, method);
                if (typeof desc.value === 'function') {
                    definition[method] = proto[method];
                } else if (typeof desc.set === 'function') {
                    Object.defineProperty(definition, method, desc);
                } else if (typeof desc.get === 'function') {
                    Object.defineProperty(definition, method, desc);
                }

            });

            console.log('@directive ', name, definition, proto);

            if(isElementDirective){
                Vue.elementDirective(name, definition);
            } else {
                Vue.directive(name, definition);
            }
        }
    }

    /**
     * The @filter decorator registers a Vue filter
     * ```typescript
     * module packadic.filters {
     *      export class SomeFilters {
     *            @filter('code-block')
     *            codeBlockFilter(){
     *                console.log('init layout extension');
     *            }
     *            @filter
     *            code(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param {String} name - The name of the filter
     * @returns {function(filters.FilterCallback, string, TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>}
     */
    export function filter(name?:string):MethodDecorator {
        return (target:filters.FilterCallback, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) => {
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

    /**
     * The @component decorator registers a Vue component
     * @param {String} name - The name of the component
     * @returns {function(any): void}
     */
    export function component(name:string):(cls:typeof components.Component)=>void {
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

    /**
     * The @widget decorator registers a widget
     * ```typescript
     * module packadic.extensions {
     *      @extension('code-block', { })
     *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param name
     * @param parent
     * @returns {function(packadic.widgets.Widget): void}
     */
    export function widget(name:string, parent?:any):(cls:typeof widgets.Widget)=>void {
        return (cls:typeof widgets.Widget):void => {
            if(parent){
                $.widget(namespacePrefix + name, <any> new cls, parent);
            } else {
                $.widget(namespacePrefix + name, <any> new cls);
            }
            console.log('Widget', name, 'registered', cls);
        };

    }

    /**
     * The @plugin decorator registers a plugin
     * ```typescript
     * module packadic.extensions {
     *      @extension('code-block', { })
     *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param name
     * @param regOpts
     * @returns {function(packadic.plugins.Plugin): void}
     */
    export function plugin(name:string, regOpts:any = {}):(cls:typeof plugins.Plugin)=>void {
        return (cls:typeof plugins.Plugin):void => {
            plugins.registerPlugin(name, cls, regOpts);
        };
    }

    /**
     * ### Extensions
     * Extensions are awesome
     */
    export module extensions {

        export interface IExtension {

            app:Application;
        }


        export interface IExtensionClass<T extends IExtension> {
            dependencies:string[];
            new(name:string, host:Extensions, app:Application):T;
        }

        /**
         * Components repository (singleton)
         */
        export class Extensions {
            protected app:Application;

            protected extensions:{[name:string]:Extension};

            protected static EXTENSIONS:{[name:string]:IExtensionClass<Extension>} = {};
            protected static EXTENSIONSDEPS:util.obj.DependencySorter;

            private static _instance:Extensions;

            /**
             * @private
             */
            constructor(app?:Application) {
                if (Extensions._instance) {
                    throw new Error("Error - use Singleton.getInstance()");
                }
                this.app = app || packadic.app;
                if (!defined(this.app)) {
                    packadic.ready(() => {
                        this.app = packadic.Application.instance;
                    })
                }
                this.extensions = {};
            }

            /**
             * Get the Components instance
             * @returns {Extensions}
             */
            public static get instance():Extensions {
                Extensions._instance = Extensions._instance || new Extensions();
                return Extensions._instance
            }

            /**
             * Returns true if the component is loaded
             * @param name
             * @returns {boolean}
             */
            public has(name:string):boolean {
                return kindOf(name) === 'string' && Object.keys(this.extensions).indexOf(name) !== -1;
            }

            /**
             * Returns a loaded component
             * @param name
             * @returns {Extension}
             */
            public get(name?:string):Extension {
                if (this.has(name)) {
                    return this.extensions[name];
                }
                throw new Error('ExtensionHost: Could not find ' + name);
            }

            /**
             * Load a registered component
             * @param name
             * @param cb
             * @returns {Extension}
             */
            protected load(name:any, cb?:Function):Extension {

                if (this.has(name)) {
                    return this.get(name);
                }

                if (typeof Extensions.EXTENSIONSDEPS === 'undefined') {
                    Extensions.EXTENSIONSDEPS = new util.obj.DependencySorter();
                }
                this.extensions[name] = new Extensions.EXTENSIONS[name](name, this, this.app);
                this.app.emit('component:loaded', name, this.extensions[name]);
                debug.log('Components', ' loaded: ', name, this.extensions[name]);

                if (kindOf(cb) === 'function') {
                    cb.apply(this, arguments)
                }

                return this.extensions[name];
            }

            /**
             * Returns all loaded components
             * @returns {{}}
             */
            public all():{[name:string]:Extension} {
                return this.extensions;
            }


            public getRegisteredNames():string[] {
                return Object.keys(this.getRegistered());
            }

            public getRegistered():{[name:string]:IExtensionClass<Extension>} {
                return Extensions.EXTENSIONS;
            }

            /**
             * Load all registered components
             * @returns {packadic.components.Components}
             */
            public loadAll():Extensions {
                if (typeof Extensions.EXTENSIONSDEPS === 'undefined') {
                    Extensions.EXTENSIONSDEPS = new util.obj.DependencySorter();
                }

                var names:string[] = Extensions.EXTENSIONSDEPS.sort();
                console.log('loadAll deps:', names);
                var missing:number = Object.keys(Extensions.EXTENSIONSDEPS.getMissing()).length;
                if (missing > 0) {
                    console.warn('Missing dependencies: ' + missing.toString());
                }
                names.forEach((name:string) => {
                    if (!this.has(name)) {
                        this.load(name);
                    }
                });
                return this;
            }

            /**
             * Iterate over all loaded components, executing the callback function each time
             * @param fn
             * @returns {packadic.components.Components}
             */
            public each(fn:_.ObjectIterator<Extension, void>):Extensions {
                util.arr.each(this.all(), fn);
                return this;
            }

            /**
             * Register a Component with the Components class
             * @param name
             * @param componentClass
             * @param configToMergeIntoDefaults
             */
            public static register<T extends IExtension>(name:string, componentClass:IExtensionClass<Extension>, configToMergeIntoDefaults?:any) {
                if (typeof Extensions.EXTENSIONSDEPS === 'undefined') {
                    Extensions.EXTENSIONSDEPS = new util.obj.DependencySorter();
                }
                if (typeof Extensions.EXTENSIONS[name] !== 'undefined') {
                    throw new Error('Cannot add ' + name + '. Already exists');
                }

                Extensions.EXTENSIONS[name] = componentClass;
                Extensions.EXTENSIONSDEPS.addItem(name, componentClass.dependencies);

                console.log('register deps:', componentClass);

                // merge config if needed
                if (typeof configToMergeIntoDefaults !== "undefined") {
                    var configMerger:any = {};
                    configMerger[name] = configToMergeIntoDefaults;
                    mergeIntoDefaultConfig(configMerger);
                }
                console.log('Components', ' registered: ', name, componentClass);
            }
        }

        /**
         * Components are used to seperate application logic.
         *
         * @class Extension
         */
        export class Extension implements IExtension {
            public static dependencies:string[] = [];

            public app:Application;
            public extensions:Extensions;
            public name:string;

            constructor(name:string, extensions:Extensions, app:Application) {
                this.name = name;
                this.extensions = extensions;
                this.app = app;

                this._make.call(this);
                if (app.isInitialised) {
                    this.init.call(this);
                } else {
                    app.on('init', this.init.bind(this));
                }
                if (app.isBooted) {
                    this._boot.call(this);
                    this._booted.call(this);
                } else {
                    app.on('boot', this._boot.bind(this));
                    app.on('booted', this._booted.bind(this));
                }
            }

            public get config():IConfigProperty {
                return this.app.config;
            }

            private _make() {
                this.make();
            }

            private _boot() {
                this.boot();
            }

            private _booted() {
                this.booted();

            }

            protected make() {

            }

            protected init() {

            }

            protected boot() {

            }

            protected booted() {

            }
        }
    }

    export module directives {

        export class Directive {
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

        export class ElementDirective extends Directive {

        }


    }

    export module filters {

        export interface FilterCallback extends vuejs.FilterCallback {
            (value:any, begin?:any, end?:any): any;
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

    /**
     * ### Components
     * Components are
     * ```typescript
     * module packadic.components {
     *      @extension('code-block', { })
     *      export class CodeBlock extends Component {
     *          static template:string = getTemplate('code-block')({});
     *          static replace:boolean = true;
     *          @prop({type: String, required: false, 'default': '', twoWay: true})
     *          language:string;
     *
     *          @lifecycleHook('ready')
     *          ready():void {
     *                console.log('The component is ready');
     *          }
     *     }
     * }
     * ```
     */
    export module components {

        // register a class as component in vue

        export class Component {

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

        export function registerPlugin(name:string, pluginClass:typeof Plugin, opts:IPluginRegisterOptions={}) {
            var regOpts:IPluginRegisterOptions = <IPluginRegisterOptions> $.extend(true, {}, makeRegOptions(name, pluginClass), opts);

            function jQueryPlugin(options?:any, ...args:any[]) {
                var all:JQuery = this.each(function () {
                    var $this:JQuery = $(this);
                    var data:any = $this.data(regOpts.namespace);
                    var opts:any = $.extend({}, pluginClass.defaults, $this.data(), typeof options == 'object' && options);

                    if (!data) {
                        $this.data(regOpts.namespace, (data = new pluginClass(this, opts, regOpts.namespace)));
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
