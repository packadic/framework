module packadic {

    import DeferredInterface = packadic.util.promise.DeferredInterface;
    import PromiseInterface = packadic.util.promise.PromiseInterface;

    var $body:JQuery = $('body');

    export interface IApplication {

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
    export class Application implements IApplication {

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

        constructor() {
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

            this.emit('make');
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
            this.timers.init = new Date;

            if (this.DEBUG) {
                this.debug.enable();
                this.debug.setStartDate(this.timers.construct);
            }

            this._config = new ConfigObject($.extend({}, Application.defaults, opts));
            this.config = ConfigObject.makeProperty(this._config);

            this.components.loadAll();

            this.components.each((comp:packadic.components.Component) => {
                this[comp.name] = comp;
            });

            plugins.registerHelperPlugins();

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
                this.timers.boot = new Date;
                $('*[data-toggle="popover"]').popover();
                $('*[data-toggle="tooltip"]').tooltip();
                $.material.options = this.config.get('vendor.material');
                $.material.init();
                //this.initHighlight();
                this.isBooted = true;
                this.emit('booted', this);
                defer.resolve(this);
            });
            return defer.promise;
        }


        public get debug():Debug {
            return debug;
        }

        /****************************/
        // Events
        /****************************/

        public on(event:string, listener:Function):Application {
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

        public booted(fn:Function){
            if(this.isBooted){
                fn([this]);
            } else {
                this.once('booted', fn);
            }
        }
    }


}
