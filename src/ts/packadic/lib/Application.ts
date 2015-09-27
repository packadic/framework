

/**
 * The application class
 */

module packadic {

    import DeferredInterface = packadic.util.promise.DeferredInterface;
    import PromiseInterface = packadic.util.promise.PromiseInterface;

    var $body:JQuery = $('body');

    export interface IApplication {

    }

    export function EventHook(hook:string) {
        return (cls:any, name:string, desc:PropertyDescriptor):PropertyDescriptor => {
            console.log('EventHook(' + hook + ')', cls, name, desc);
            desc.value = void 0;
            return desc;
        }
    }

    /**
     * The Application class is the main class initialising and booting all other components, plugins, etc
     *
     * ```typescript
     * var app:packadic.Application = packadic.Application.instance
     * app.DEBUG = true;
     * app.init({
     *      customConfigVariable: 'asdf'
     * });
     * app.boot().then(function(app:packadic.Application){
     *     // Application booted
     *     $('someElement').superDuperPlugin({
     *
     *     });
     * });
     * ```
     */
    export class Application extends Vue implements IApplication  {

        /****************************/
        // Vue data
        /****************************/

        public data:any = {};

        /**
         * Default configuration values, these will be set after initial construction using getConfigDefaults()
         */
        public static defaults:any;

        protected static _instance:Application;


        /**
         * If true, the debug log will be enabled, with some other additions as well
         */
        public DEBUG:boolean;

        /**
         * @private
         */
        protected _events:EventEmitter2;

        /**
         * The configuration repository
         */
        public config:IConfigProperty;

        /**
         * @private
         */
        protected _config:IConfig;

        public isInitialised:boolean;
        public isBooted:boolean;

        public timers:any = {construct: null, init: null, boot: null};

        public get components():components.Components {
            return packadic.components.Components.instance;
        }

        constructor(options?: {}) {
            super(options);
            this._events = new EventEmitter2({
                wildcard: true,
                delimiter: ':',
                maxListeners: 1000,
                newListener: true
            });
            $body.data('packadic', this);
            var self:Application = this;
            packadic.app = this;


            Application.defaults = getConfigDefaults();

            this.timers.construct = new Date;
            this.isInitialised = false;
            this.isBooted = false;

        }

        /**
         * @returns {Application}
         */
        public static get instance() {
            if (typeof Application._instance === "undefined") {
                Application._instance = new Application();
                app = Application._instance;
            }
            return Application._instance;
        }

        public init(opts:any = {}):Application {
            if (this.isInitialised) {
                return;
            } else {
                this.isInitialised = true;
            }
            this.emit('pre-init');
            this.timers.init = new Date;

            if (this.DEBUG) {
                this.debug.enable();
                this.debug.setStartDate(this.timers.construct);
                Vue.config.debug = this.debug.isEnabled()
            }

            this._config = new ConfigObject($.extend({}, Application.defaults, opts));
            this.config = ConfigObject.makeProperty(this._config);


            this.components.loadAll();

            this.components.each((comp:packadic.components.Component) => {
                this[comp.name] = comp;
            });

            addons.plugins.registerHelperPlugins();

            callReadyCallbacks();

            this.emit('init', this);
            return this;
        }

        public boot():PromiseInterface<Application> {
            var defer:DeferredInterface<Application> = util.promise.create();
            if (this.isBooted) {
                setTimeout(() => {
                    defer.resolve(this);
                }, 100);
                return defer.promise;
            }

            $(() => {
                this.emit('boot', this);

                this.$mount('html');

                this.timers.boot = new Date;
                if (!isTouchDevice()) {
                    $body.tooltip(this.config('vendor.bootstrap.tooltip'));
                }
                $body.popover(this.config('vendor.bootstrap.popover'));
                $.material.options = this.config('vendor.material');
                $.material.init();
                this.isBooted = true;
                this.emit('booted', this);
                defer.resolve(this);
            });
            return defer.promise;
        }

        public get debug():Debug {
            return debug;
        }

        public getAssetPath(path:string = '', prefixBaseUrl:boolean = true):string {
            path = util.str.startsWith(path, '/') ? path : '/' + path;
            return (prefixBaseUrl ? this.config('baseUrl') : '') + this.config('assetPath') + path;
        }



        /****************************/
        // Script/css module loader
        /****************************/
        protected _loaded:{[name:string]:boolean} = {};

        public load(type:string, path:string, bower:boolean = false, pathSuffix:string=''):PromiseInterface<any[]> {
            var defer:DeferredInterface<any> = util.promise.create();
            path = util.str.endsWith(path, '.' + type) ? path : path + '.' + type;
            var fullPath = this.getAssetPath((bower ? 'bower_components/' : 'scripts/') + path) + pathSuffix;
            this._loaded[fullPath] = true;
            //debug.log('loading', path);
            System.import(fullPath).then(function(...args:any[]) {
                //debug.log('loaded', path, args);
                defer.resolve(args)
            });
            return defer.promise;
        }

        public loadJS(path:string, bower:boolean = false):PromiseInterface<any[]> {
            return this.load('js', path, bower);
        }

        public loadCSS(path:string, bower:boolean = false):PromiseInterface<any[]> {
            return this.load('css', path, bower, '!css');
        }


        /****************************/
        // Events
        /****************************/

        public on(event:string, listener:Function):Application {
            if(event === 'init' && this.isInitialised && listener(this)){
                return;
            }

            this._events.on(event, listener);
            return this;
        }

        public once(event:string, listener:Function):Application {
            this._events.once(event, listener);
            return this;
        }

        public off(event:string, listener:Function):Application {
            this._events.off(event, listener);
            return this;
        }

        public emit(event:string, ...args:any[]):Application {
            if (this.DEBUG) {
                this.debug.logEvent(event, args);
            }
            this._events.emit(event, args);
            return this;
        }

        public booted(fn:Function) {
            if (this.isBooted) {
                fn([this]);
            } else {
                this.once('booted', fn);
            }
        }
    }


}
