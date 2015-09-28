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
module packadic {


    export function extension(name:string, configToMergeIntoDefaults:any = {}):(cls:typeof extensions.Extension)=>void {
        return (cls:typeof extensions.Extension):void => {
            extensions.Extensions.register(name, cls, configToMergeIntoDefaults);
        };
    }

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
}
