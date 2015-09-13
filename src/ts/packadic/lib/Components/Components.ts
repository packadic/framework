/**
 * ## The components module.
 * The components module provides a way to add logic to the application.
 * It consists out of the `Components` class acting as a repository containing all components
 * and the `Component` class providing a abstract base component which should be extended. A small example:
 *
 * ```typescript
 * export class MyComponent extends Component {
 *      public init(){}
 *      public boot(){}
 * }
 * Components.register('my', MyComponent);
 * ```
 */
module packadic.components {

    export interface IExtension {
        app:Application;
    }

    export interface IExtensionClass<T extends IExtension> {
        new(name:string, host:Components, app:Application):T;
    }

    /**
     * Components repository (singleton)
     */
    export class Components {
        protected app:Application;

        protected components:{[name:string]:Component};

        protected static COMPONENTS:{[name:string]:IExtensionClass<Component>};

        private static _instance:Components;

        /**
         * @private
         */
        constructor(app?:Application) {
            if (Components._instance) {
                throw new Error("Error - use Singleton.getInstance()");
            }
            this.app = app || packadic.app;
            if(!defined(this.app)){
                packadic.ready(() => {
                    this.app = packadic.Application.instance;
                })
            }
            this.components = {};
        }

        /**
         * Get the Components instance
         * @returns {Components}
         */
        public static get instance():Components {
            Components._instance = Components._instance || new Components();
            return Components._instance
        }

        /**
         * Returns true if the component is loaded
         * @param name
         * @returns {boolean}
         */
        public has(name:string):boolean {
            return kindOf(name) === 'string' && Object.keys(this.components).indexOf(name) !== -1;
        }

        /**
         * Returns a loaded component
         * @param name
         * @returns {Component}
         */
        public get(name?:string):Component {
            if (this.has(name)) {
                return this.components[name];
            }
            throw new Error('ExtensionHost: Could not find ' + name);
        }

        /**
         * Load a registered component
         * @param name
         * @param cb
         * @returns {Component}
         */
        public load(name:any, cb?:Function):Component {

            if (this.has(name)) {
                return this.get(name);
            }

            if (kindOf(cb) === 'function') {
                cb.apply(this, arguments)
            }

            this.components[name] = new Components.COMPONENTS[name](name, this, this.app);
            this.app.emit('component:loaded', name, this.components[name]);
            debug.log('Components', ' loaded: ', name, this.components[name]);
            return this.components[name];
        }

        /**
         * Returns all loaded components
         * @returns {{}}
         */
        public all():{[name:string]:Component} {
            return this.components;
        }

        public getRegisteredNames():string[] {
            return Object.keys(this.getRegistered());
        }

        public getRegistered():{[name:string]:IExtensionClass<Component>}{
            return Components.COMPONENTS;
        }

        /**
         * Load all registered components
         * @returns {packadic.components.Components}
         */
        public loadAll():Components {
            Object.keys(Components.COMPONENTS).forEach((name:string) => {
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
        public each(fn:_.ObjectIterator<Component, void>):Components {
            util.arr.each(this.all(), fn);
            return this;
        }

        /**
         * Register a Component with the Components class
         * @param name
         * @param componentClass
         * @param configToMergeIntoDefaults
         */
        public static register<T extends IExtension>(name:string, componentClass:IExtensionClass<Component>, configToMergeIntoDefaults?:any) {
            if(typeof Components.COMPONENTS === 'undefined'){
                Components.COMPONENTS = {};
            }
            if (typeof Components.COMPONENTS[name] !== 'undefined') {
                throw new Error('Cannot add ' + name + '. Already exists');
            }

            Components.COMPONENTS[name] = componentClass;

            // merge config if needed
            if(typeof configToMergeIntoDefaults !== "undefined") {
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
     * @class Component
     */
    export class Component implements IExtension {
        public app:Application;
        public components:Components;
        public name:string;

        constructor(name:string, components:Components, app:Application) {
            this.name = name;
            this.components = components;
            this.app = app;

            this._make.call(this);
            if (app.isInitialised) {
                this._init.call(this);
            } else {
                app.on('init', this._init.bind(this));
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

        private _init() {
            this.init();
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

/*
 export class ExtensionHost<T> {

 app:Application;

 extensions:{[name:string]:T};

 EXTENSIONS:{[name:string]:IExtensionClass<T>};

 private static _instance:ExtensionHost<any>;

 constructor(app?:Application) {
 if (ExtensionHost._instance) {
 throw new Error("Error - use Singleton.getInstance()");
 }
 this.app = app || packadic.app;
 }

 public static get instance():ExtensionHost<any> {
 ExtensionHost._instance = ExtensionHost._instance || new ExtensionHost();
 return ExtensionHost._instance
 }

 public load(name:any, cb?:Function) {
 var self:ExtensionHost<T> = this;
 if (util.kindOf(name) === 'array') {
 return name.forEach(function (n:string) {
 self.load(n, cb);
 });
 }

 if (util.kindOf(cb) === 'function') {
 cb.apply(this, arguments)
 }
 }

 public has(name:string):boolean {
 return util.kindOf(name) === 'string' && Object.keys(this.extensions).indexOf(name) !== -1;
 }

 public get(name?:string):T {
 if (this.has(name)) {
 return this.extensions[name];
 }
 throw new Error('ExtensionHost: Could not find ' + name);
 }

 public loadAll() {
 Object.keys(this.extensions).forEach((name:string) => {
 if (!this.has(name)) {
 var ex:any = new this.EXTENSIONS[name](this, this.app);
 }
 })
 }

 protected add(name:string, pluginClass:IExtensionClass<T>) {
 if (this.has(name)) {
 throw new Error('Cannot add ' + name + '. Already exists');
 }
 }

 public static register<T extends IExtension>(name:string, pluginClass:IExtensionClass<T>) {
 if (!ExtensionHost.instance.EXTENSIONS) ExtensionHost.instance.EXTENSIONS = {};
 ExtensionHost.instance.EXTENSIONS[name] = pluginClass;
 }

 }
 */

/*
 export class Plugins extends ExtensionHost<Plugin> {
 app:Application;

 constructor(app:Application) {
 super();
 this.app = app;
 }


 /*public static register<T extends IExtension>(name:string, pluginClass:IExtensionClass<T>) {
 Plugins.instance.add(name, pluginClass);
 var app:Application = this.app;

 function jQueryPlugin(options?:any, ...args:any[]) {
 var all:JQuery = this.each(function () {
 var $this:JQuery = $(this);
 var data:any = $this.data(regOpts.namespace);
 var opts:any = $.extend({}, PluginClass.defaults, $this.data(), typeof options == 'object' && options);

 if (!data) {
 $this.data(regOpts.namespace, (data = new PluginClass(app, this, opts, regOpts.namespace)));
 }

 if (util.kindOf(options) === 'string') {
 data[options].call(data, args);
 }

 if (util.kindOf(regOpts.callback) === 'function') {
 regOpts.callback.apply(this, [data, opts]);
 }
 });


 if (util.kindOf(options) === 'string' && options === 'instance' && all.length > 0) {
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
 $.fn[name].Constructor = PluginClass;
 }

 }



 /**
 * The Plugin class is a base class for jQuery plugins.
 *
 * @class Plugin
 *

 export class Plugin implements IExtension {
 public get options():any {
 return this._options;
 }

 public get app():Application {
 return this.app;
 }

 public static defaults:any = {};

 public VERSION:string = '0.0.0';
 public NAMESPACE:string = 'packadic.';

 public enabled:boolean = true;
 protected app:Application;
 protected _options:any;
 protected $window:JQuery;
 protected $document:JQuery;
 protected $body:JQuery;
 protected $element:JQuery;

 constructor(app:Application, element:any, options:any, ns:string) {
 this.app = app;
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
 }
 }
 /*
 export class Plugins extends Component {
 protected namespacePrefix:string = 'packadic.';
 protected _plugins:{[key: string]: IPluginRegisterOptions} = {};
 protected defaultRegOpts:IPluginRegisterOptions = {
 loadPath: 'app/plugins/',
 callback: $.noop()
 };

 protected boot() {
 var self:Plugins = this;
 var plugins:string[] = this.config('app.plugins');
 }

 protected _add(name:string, PluginClass:any, regOpts?:IPluginRegisterOptions):IPluginRegisterOptions {
 if (this.has(name)) {
 throw new Error('Plugin already registered');
 }

 regOpts = <IPluginRegisterOptions> $.extend(true, this.defaultRegOpts, {'class': PluginClass}, regOpts);
 if (util.kindOf(regOpts.namespace) !== 'string') {
 regOpts.namespace = name;
 }
 regOpts.namespace = this.namespacePrefix + regOpts.namespace;
 return this._plugins[name] = regOpts;
 }

 public register(name:string, PluginClass:any, regOpts?:IPluginRegisterOptions) {
 regOpts = this._add(name, PluginClass, regOpts);
 var app:Application = this.app;

 function jQueryPlugin(options?:any, ...args:any[]) {
 var all:JQuery = this.each(function () {
 var $this:JQuery = $(this);
 var data:any = $this.data(regOpts.namespace);
 var opts:any = $.extend({}, PluginClass.defaults, $this.data(), typeof options == 'object' && options);

 if (!data) {
 $this.data(regOpts.namespace, (data = new PluginClass(app, this, opts, regOpts.namespace)));
 }

 if (util.kindOf(options) === 'string') {
 data[options].call(data, args);
 }

 if (util.kindOf(regOpts.callback) === 'function') {
 regOpts.callback.apply(this, [data, opts]);
 }
 });


 if (util.kindOf(options) === 'string' && options === 'instance' && all.length > 0) {
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
 $.fn[name].Constructor = PluginClass;
 }

 public load(name:any, cb?:Function, loadPath:string = 'plugins/') {
 var self:Plugins = this;
 if (util.kindOf(name) === 'array') {
 return name.forEach(function (n:string) {
 self.load(n, cb, loadPath);
 });
 }

 if (this.has(name)) {
 loadPath = this.get(name).loadPath;
 }

 if (util.kindOf(cb) === 'function') {
 cb.apply(this, arguments)
 }

 }

 public has(name:string):boolean {
 return util.kindOf(name) === 'string' && Object.keys(this._plugins).indexOf(name) !== -1;
 }

 public get(name?:string):IPluginRegisterOptions {
 return util.defined(name) ? this._plugins[name] : this._plugins;
 }
 }

 export function register(name:string, PluginClass:any, ns?:string, callback?:Function) {
 var app:Application = $('body').data('packadic');
 //app.plugins.register.apply(app.plugins, arguments);
 }
 /*

 }
 */
