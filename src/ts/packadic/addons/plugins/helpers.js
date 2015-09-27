/// <reference path="./../../types.d.ts" />
/// <reference path="./../../packadic.d.ts" />
var packadic;
(function (packadic) {
    var addons;
    (function (addons) {
        var plugins;
        (function (plugins) {
            function notify(opts) {
                if (opts === void 0) { opts = {}; }
                var defer = packadic.util.promise.create();
                packadic.app.booted(function () {
                    packadic.app.loadJS('pnotify/src/pnotify.core', true).then(function (pn) {
                        opts = $.extend({}, packadic.app.config('vendor.pnotify'), opts);
                        console.log('pnotify opts', opts, pn);
                        var notify = new pn(opts);
                        console.log('pnotify instance', notify);
                        defer.resolve(notify);
                    });
                });
                return defer.promise;
            }
            plugins.notify = notify;
            function highlight(code, lang, wrap, wrapPre) {
                if (wrap === void 0) { wrap = false; }
                if (wrapPre === void 0) { wrapPre = false; }
                if (!packadic.defined(hljs)) {
                    console.warn('Cannot call highlight function in packadic.plugins, hljs is not defined');
                    return;
                }
                var defer = packadic.util.promise.create();
                var highlighted;
                if (lang && hljs.getLanguage(lang)) {
                    highlighted = hljs.highlight(lang, code).value;
                }
                else {
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
            plugins.highlight = highlight;
            function makeSlimScroll(el, opts) {
                if (opts === void 0) { opts = {}; }
                var $el = typeof (el) === 'string' ? $(el) : el;
                $el.each(function () {
                    if ($(this).attr("data-initialized")) {
                        return;
                    }
                    var height;
                    if ($(this).attr("data-height")) {
                        height = $(this).attr("data-height");
                    }
                    else {
                        height = $(this).css('height');
                    }
                    var o = packadic.app.config('vendor.slimscroll');
                    $(this).slimScroll(_.merge(o, {
                        color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : o.color),
                        wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : o.wrapperClass),
                        railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : o.railColor),
                        height: height,
                        alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : o.alwaysVisible),
                        railVisible: ($(this).attr("data-rail-visible") == "1" ? true : o.railVisible)
                    }, opts));
                    $(this).attr("data-initialized", "1");
                });
            }
            plugins.makeSlimScroll = makeSlimScroll;
            function destroySlimScroll(el) {
                var $el = typeof (el) === 'string' ? $(el) : el;
                $el.each(function () {
                    if ($(this).attr("data-initialized") === "1") {
                        $(this).removeAttr("data-initialized");
                        $(this).removeAttr("style");
                        var attrList = {};
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
                        $(this).slimScroll({
                            wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                            destroy: true
                        });
                        var the = $(this);
                        $.each(attrList, function (key, value) {
                            the.attr(key, value);
                        });
                    }
                });
            }
            plugins.destroySlimScroll = destroySlimScroll;
            function registerHelperPlugins() {
                if (packadic.kindOf($.fn.prefixedData) === 'function') {
                    return;
                }
                $.fn.prefixedData = function (prefix) {
                    var origData = $(this).first().data();
                    var data = {};
                    for (var p in origData) {
                        var pattern = new RegExp("^" + prefix + "[A-Z]+");
                        if (origData.hasOwnProperty(p) && pattern.test(p)) {
                            var shortName = p[prefix.length].toLowerCase() + p.substr(prefix.length + 1);
                            data[shortName] = origData[p];
                        }
                    }
                    return data;
                };
                $.fn.removeAttributes = function () {
                    return this.each(function () {
                        var attributes = $.map(this.attributes, function (item) {
                            return item.name;
                        });
                        var img = $(this);
                        $.each(attributes, function (i, item) {
                            img.removeAttr(item);
                        });
                    });
                };
                $.fn.ensureClass = function (clas, has) {
                    if (has === void 0) { has = true; }
                    var $this = $(this);
                    if (has === true && $this.hasClass(clas) === false) {
                        $this.addClass(clas);
                    }
                    else if (has === false && $this.hasClass(clas) === true) {
                        $this.removeClass(clas);
                    }
                    return this;
                };
                $.fn.onClick = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var $this = $(this);
                    return $this.on.apply($this, [packadic.isTouchDevice() ? 'touchend' : 'click'].concat(args));
                };
            }
            plugins.registerHelperPlugins = registerHelperPlugins;
        })(plugins = addons.plugins || (addons.plugins = {}));
    })(addons = packadic.addons || (packadic.addons = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=helpers.js.map