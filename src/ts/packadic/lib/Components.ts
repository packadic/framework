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
        dependencies:string[];
        new(name:string, host:Components, app:Application):T;
    }

    /**
     * Components repository (singleton)
     */
    export class Components {
        protected app:Application;

        protected components:{[name:string]:Component};

        protected static COMPONENTS:{[name:string]:IExtensionClass<Component>} = {};
        protected static COMPONENTSDEPS:util.obj.DependencySorter;

        private static _instance:Components;

        /**
         * @private
         */
        constructor(app?:Application) {
            if (Components._instance) {
                throw new Error("Error - use Singleton.getInstance()");
            }
            this.app = app || packadic.app;
            if (!defined(this.app)) {
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
        protected load(name:any, cb?:Function):Component {

            if (this.has(name)) {
                return this.get(name);
            }

            if(typeof Components.COMPONENTSDEPS === 'undefined'){
                Components.COMPONENTSDEPS = new util.obj.DependencySorter();
            }
            this.components[name] = new Components.COMPONENTS[name](name, this, this.app);
            this.app.emit('component:loaded', name, this.components[name]);
            debug.log('Components', ' loaded: ', name, this.components[name]);

            if (kindOf(cb) === 'function') {
                cb.apply(this, arguments)
            }

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

        public getRegistered():{[name:string]:IExtensionClass<Component>} {
            return Components.COMPONENTS;
        }

        /**
         * Load all registered components
         * @returns {packadic.components.Components}
         */
        public loadAll():Components {
            if(typeof Components.COMPONENTSDEPS === 'undefined'){
                Components.COMPONENTSDEPS = new util.obj.DependencySorter();
            }

            var names:string[] = Components.COMPONENTSDEPS.sort();
            console.log('loadAll deps:', names);
            var missing:number = Object.keys(packadic.components.Components.COMPONENTSDEPS.getMissing()).length;
            if(missing > 0){
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
            if(typeof Components.COMPONENTSDEPS === 'undefined'){
                Components.COMPONENTSDEPS = new util.obj.DependencySorter();
            }
            if (typeof Components.COMPONENTS[name] !== 'undefined') {
                throw new Error('Cannot add ' + name + '. Already exists');
            }

            Components.COMPONENTS[name] = componentClass;
            Components.COMPONENTSDEPS.addItem(name, componentClass.dependencies);

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
     * @class Component
     */
    export class Component implements IExtension {
        public static dependencies:string[] = [];

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
