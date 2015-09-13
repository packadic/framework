/**
 * The plugins module provides abstraction / base classes for jQuery plugins and some constructor/destructor stuff.
 * jQuery plugins can either be created extending the `Plugin` class or if the jQuery UI Widget Factory is preferred, using the `Widget` class.
 * ```typescript
 * export class MySuperWidget extends Widget {
 *
 *
 * }
 * ```
 */
module packadic.plugins {


    declare var hljs:HighlightJS;

    export function highlight(code:string, lang?:string, wrap:boolean = false, wrapPre:boolean = false):util.promise.PromiseInterface<string> {
        if (!defined(hljs)) {
            console.warn('Cannot call highlight function in packadic.plugins, hljs is not defined');
            return;
        }

        var defer:util.promise.DeferredInterface<string> = util.promise.create();

        var highlighted;
        if (lang && hljs.getLanguage(lang)) {
            highlighted = hljs.highlight(lang, code).value;
        } else {
            highlighted = hljs.highlightAuto(code).value;
        }
        if (wrap) {
            highlighted = '<code class="hljs">' + highlighted + '</code>';
        }
        if (wrapPre) {
            highlighted = '<pre>' + highlighted + '</pre>';
        }
        defer.resolve(highlighted);

        return defer.promise;
    }

    export function initHighlight() {
        if (!defined(hljs)) {
            return console.warn('Cannot call highlight function in packadic.plugins, hljs is not defined');
        }
        //require(['highlightjs', 'css!highlightjs-css/' + this.config('vendor.highlightjs.theme')], function (hljs:HighlightJS) {
        hljs.initHighlighting();
        //});
    }


    export function makeSlimScroll(el:any, opts:any = {}) {
        var $el:JQuery = typeof(el) === 'string' ? $(el) : el;

        $el.each(function () {
            if ($(this).attr("data-initialized")) {
                return; // exit
            }
            var height = $(this).attr("data-height") ? $(this).attr("data-height") : $(this).css('height');
            var data = _.merge(app.config('vendor.slimscroll'), $(this).data(), {height: height});
            $(this).slimScroll($.extend(true, data, opts));
            $(this).attr("data-initialized", "1");
        });

    }

    export function destroySlimScroll(el:any) {
        var $el:JQuery = typeof(el) === 'string' ? $(el) : el;
        $el.each(function () {
            if ($(this).attr("data-initialized") === "1") { // destroy existing instance before updating the height
                $(this).removeAttr("data-initialized");
                $(this).removeAttr("style");

                var attrList = {};

                // store the custom attribures so later we will reassign.
                if ($(this).attr("data-handle-color")) {
                    attrList["data-handle-color"] = $(this).attr("data-handle-color");
                }
                if ($(this).attr("data-wrapper-class")) {
                    attrList["data-wrapper-class"] = $(this).attr("data-wrapper-class");
                }
                if ($(this).attr("data-rail-color")) {
                    attrList["data-rail-color"] = $(this).attr("data-rail-color");
                }
                if ($(this).attr("data-always-visible")) {
                    attrList["data-always-visible"] = $(this).attr("data-always-visible");
                }
                if ($(this).attr("data-rail-visible")) {
                    attrList["data-rail-visible"] = $(this).attr("data-rail-visible");
                }

                $(this).slimScroll(<any> {
                    wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    destroy: true
                });

                var the = $(this);

                // reassign custom attributes
                $.each(attrList, function (key, value) {
                    the.attr(key, value);
                });

                $(this).parent().find('> .slimScrollBar, > .slimScrollRail').remove();
            }
        });
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

        public static register(name:string, proto:Widget) {
            $.widget(name, proto);
            console.log('Widget', name, 'registered', Widget);
        }

        public static extend(name:string, parent:any, proto:Widget) {
            $.widget(name, parent, proto);
            console.log('Widget', name, 'extended', Widget);
        }
    }


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

    var namespacePrefix:string = 'packadic.';

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
