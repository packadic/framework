var packadic;
(function (packadic) {
    var _this = this;
    ['Vue', 'VueRouter', 'VueResource', '_', '_s'].forEach(function (name) {
        packadic[name] = function () { return window[name]; }.call(_this);
    });
    packadic.Vue.use(packadic.VueRouter);
    packadic.Vue.use(packadic.VueResource);
    packadic.Vue.config.async = true;
    packadic.Vue.config.debug = true;
    packadic.templates = {};
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['alink'] = '<a v-bind="attrs" v-link="vlink"><slot></slot></a>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['grid'] = '<table class="table">    <thead>    <tr>        <th v-for="column in columns" v-on:click="sortBy(column)" v-bind:class="{ \'dropup\': reversed[column] }">            {{column | capitalize}}            <span v-bind:class="{ \'caret\': sortColumn == column }"></span>        </th>    </tr>    </thead>    <tbody>    <tr v-for="row in currentPage | orderBy sortColumn reversed[sortColumn]" transition="fadein">        <td v-for="column in columns">            {{row[column]}}        </td>    </tr>    </tbody></table>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['page-breadcrumb'] = '<li>    <alink v-bind:link="link"><slot>{{title}}</slot></alink>    <i class="fa fa-arrow-right" v-if="arrow"></i></li>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['page-breadcrumbs'] = '<ul class="page-breadcrumb breadcrumb" v-el:page-breadcrumbs>    <slot>        <page-breadcrumb v-for="item in items"                         :item="item"                         :index="$index"        ></page-breadcrumb>    </slot></ul>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['page'] = '<div class="page-head" v-if="title">    <div class="page-title">        <h1>{{title}} <small v-if="subtitle">{{subtitle}}</small></h1>    </div></div><slot name="breadcrumb"></slot><div v-if="seperator" class="page-content-seperator"></div><div class="page-content-inner">    <slot></slot></div>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['pagination'] = '<ul class="pagination">    <li>        <a href="#" aria-label="Previous" v-on:click="prev($event)">            <slot name="previous"><span aria-hidden="true">&laquo;</span></slot>        </a>    </li>    <li v-for="c in pager.range" v-bind:class="{ \'active\': isCurrent(c) }">        <a href="#" v-on:click="goto(c,$event)">{{c}}</a>    </li>    <li>        <a href="#" aria-label="Next" v-on:click="next($event)">            <slot name="next"><span aria-hidden="true">&raquo;</span></slot>        </a>    </li></ul>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['sidebar-item'] = '<li v-bind:class="{ \'open\': isOpen && hasSubmenu, \'active\': isActive, \'heading\': isType(\'heading\') }">    <h3 v-if="isType(\'heading\')">{{title}}</h3>    <a v-if="isType(\'folder\')" href="javascript:;" v-on:click="toggle()">        <i v-if="icon" class="{{icon}}"></i>        <span class="title">{{title}}</span>        <span v-if="hasSubmenu" class="arrow" v-bind:class="{ \'open\': isOpen && hasSubmenu }"></span>    </a>    <alink v-if="isType(\'href\', \'route\', \'path\')" v-bind:link="link"><i v-if="icon" class="{{icon}}"></i><span class="title">{{title}}</span></alink>    <ul v-if="hasSubmenu && isType(\'folder\', \'href\')" v-show="isOpen" class="sub-menu" transition="sidebar-submenu">        <slot> <item v-for="subitem in children" :item="subitem" :index="$index"></item> </slot>    </ul></li>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.templates['sidebar'] = '<div class="page-sidebar navbar-collapse collapse" v-el="sidebar">    <ul class="page-sidebar-menu" v-bind:class="{ \'page-sidebar-menu-closed\': closed }" v-el="menu">        <slot>            <item v-for="item in items"                  :item="item"                  :index="$index"            ></item>        </slot>    </ul></div>';
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var JSON;
    (function (JSON) {
        var old_json = JSON;
        function stringify(obj) {
            return old_json.stringify(obj, function (key, value) {
                if (value instanceof Function || typeof value == 'function') {
                    return value.toString();
                }
                if (value instanceof RegExp) {
                    return '_PxEgEr_' + value;
                }
                return value;
            });
        }
        JSON.stringify = stringify;
        function parse(str, date2obj) {
            var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
            return old_json.parse(str, function (key, value) {
                var prefix;
                if (typeof value != 'string') {
                    return value;
                }
                if (value.length < 8) {
                    return value;
                }
                prefix = value.substring(0, 8);
                if (iso8061 && value.match(iso8061)) {
                    return new Date(value);
                }
                if (prefix === 'function') {
                    return eval('(' + value + ')');
                }
                if (prefix === '_PxEgEr_') {
                    return eval(value.slice(8));
                }
                return value;
            });
        }
        JSON.parse = parse;
        function clone(obj, date2obj) {
            return parse(stringify(obj), date2obj);
        }
        JSON.clone = clone;
    })(JSON = packadic.JSON || (packadic.JSON = {}));
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.openWindowDefaults = {
        width: 600,
        height: 600
    };
    function openWindow(opts) {
        if (opts === void 0) { opts = {}; }
        opts = packadic._.merge(packadic.openWindowDefaults, opts);
        var win = window.open('', '', 'width=' + opts.width + ', height=' + opts.height);
        if (packadic.defined(opts.content)) {
            win.document.body.innerHTML = opts.content;
        }
        return win;
    }
    packadic.openWindow = openWindow;
    function cre(name) {
        if (!packadic.defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }
    packadic.cre = cre;
    function getViewPort() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };
    }
    packadic.getViewPort = getViewPort;
    function isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }
    packadic.isTouchDevice = isTouchDevice;
    function codeIndentFix(str) {
        var fix = function (code, leading) {
            if (leading === void 0) { leading = true; }
            var txt = code;
            if (leading) {
                txt = txt.replace(/^[\r\n]+/, "").replace(/\s+$/g, "");
            }
            if (/^\S/gm.test(txt)) {
                return code;
            }
            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;
            while (mat = re.exec(txt)) {
                len = mat[0].length;
                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }
            if (min == 1e3)
                return code;
            return txt.replace(new RegExp("^" + str, 'gm'), "");
        };
        return fix(str);
    }
    packadic.codeIndentFix = codeIndentFix;
    function preCodeIndentFix(el) {
        return codeIndentFix(el.textContent);
    }
    packadic.preCodeIndentFix = preCodeIndentFix;
    function registerJQueryHelpers() {
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
            return $this.on.apply($this, [isTouchDevice() ? 'touchend' : 'click'].concat(args));
        };
    }
    packadic.registerJQueryHelpers = registerJQueryHelpers;
    var BrowserPrettyConsole = (function () {
        function BrowserPrettyConsole(printFn) {
            this.matcher = /\[style\=([\w\d\_\-\,]*?)\](.*?)\[style\]/g;
            this.macros = {};
            this.styles = {};
            this.printFn = printFn || console.log;
        }
        BrowserPrettyConsole.prototype.addMaterialStyle = function (name, variant) {
            if (variant === void 0) { variant = '500'; }
            if (typeof name === 'string') {
                if (variant !== '500') {
                    name += variant.toString();
                }
                this.styles[name.toString()] = 'color: ' + packadic.color(name.toString(), variant);
            }
            else {
                name.forEach(function (n) {
                    this.addMaterialStyle(n, variant);
                }.bind(this));
            }
            return this;
        };
        BrowserPrettyConsole.prototype.addFontStyle = function (name, ff) {
            this.styles[name] = 'font-family: ' + ff;
            return this;
        };
        BrowserPrettyConsole.prototype.addStyle = function (name, val) {
            if (typeof val === 'string') {
                this.styles[name] = val;
            }
            else {
                var css = '';
                val.forEach(function (v) {
                    if (typeof this.styles[v] === 'string') {
                        css += this.styles[v] + ';';
                    }
                    else {
                        css += v + ';';
                    }
                }.bind(this));
                this.styles[name] = css;
            }
            return this;
        };
        BrowserPrettyConsole.prototype.allStyles = function () {
            return this.styles;
        };
        BrowserPrettyConsole.prototype.getStyle = function (name) {
            return this.styles[name];
        };
        BrowserPrettyConsole.prototype.hasStyle = function (name) {
            return packadic.defined(this.styles[name]);
        };
        BrowserPrettyConsole.prototype.addDefaults = function () {
            for (var i = 8; i < 30; i++) {
                this.addStyle('fs' + i.toString(), 'font-size: ' + i.toString() + 'px');
            }
            this.addStyle('bold', 'font-weight:bold')
                .addStyle('code-box', 'background: #37474F; padding: 1px 5px; border: 1px solid rgba(#373a3c, 0.1); line-height: 18px')
                .addMaterialStyle(Object.keys(packadic.colors))
                .addFontStyle('code', '"Source Code Pro", "Courier New", Courier, monospace')
                .addFontStyle('arial', 'Arial, Helvetica, sans-serif')
                .addFontStyle('verdana', 'Verdana, Geneva, sans-serif')
                .addStyle('codex-orange', 'color:#ed6626;');
            this.createMacro('title', function (title) {
                this.write('[style=block,bold,fs20,code,codex-orange]' + title + '[style]');
            });
            this.createMacro('alert', function (text) {
                this.write('[style=code-box,code,red]' + text + '[style]');
            });
        };
        BrowserPrettyConsole.prototype.createMacro = function (name, fn) {
            this.macros[name] = fn;
        };
        BrowserPrettyConsole.prototype.macro = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var name = args.shift();
            if (!packadic.defined(this.macros[name])) {
                console.warn('cannot do macro', name);
                return;
            }
            this.macros[name].apply(this, args);
        };
        BrowserPrettyConsole.prototype.write = function (message) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var applyArgs = [];
            applyArgs.push(message.replace(this.matcher, '%c$2%c'));
            var matched;
            while ((matched = this.matcher.exec(message)) !== null) {
                var css = '';
                matched[1].split(',').forEach(function (style) {
                    css += _this.getStyle(style) + ';';
                });
                applyArgs.push(css);
                applyArgs.push('');
            }
            this.printFn.apply(console, applyArgs.concat(args));
        };
        return BrowserPrettyConsole;
    })();
    packadic.BrowserPrettyConsole = BrowserPrettyConsole;
})(packadic || (packadic = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var packadic;
(function (packadic) {
    function getPrefferdBag(bagName) {
        if (packadic.hasBag(bagName)) {
            return packadic.getBag(bagName);
        }
        else {
            var names = Object.keys(packadic.bags);
            if (names.length > 0) {
                return packadic.getBag(names[0]);
            }
        }
    }
    var ConfigObserver = (function () {
        function ConfigObserver(obj) {
            this.pos = [];
            this.ooCallbacks = [];
            this.debugOutput = true;
            this.setInspectableObject(obj);
        }
        ConfigObserver.prototype.setInspectableObject = function (obj) {
            var _this = this;
            if (!packadic.defined(obj))
                return;
            this.obj = obj;
            this.oo = new observejs.ObjectObserver(this.obj);
            this.oo.open(function (added, removed, changed, getOldValueFn) {
                // respond to changes to the obj.
                _this.ooCallbacks.forEach(function (cb) {
                    cb.apply(_this, [{ added: added, removed: removed, changed: changed }, _this.oo, getOldValueFn]);
                });
                if (_this.debugOutput !== true)
                    return;
                console.log('open', 'added', added, 'removed', removed, 'changed', changed);
                Object.keys(added).forEach(function (property) {
                    console.log('added', property, added[property]);
                });
                Object.keys(removed).forEach(function (property) {
                    console.log('removed', property, getOldValueFn(property));
                });
                Object.keys(changed).forEach(function (property) {
                    console.log('changed', property, changed[property], getOldValueFn(property));
                });
            });
        };
        ConfigObserver.prototype.inspect = function (cb) {
            this.ooCallbacks.push(cb);
        };
        ConfigObserver.prototype.path = function (expression, defaultValue, changeFn, optReceiver) {
            var po = new observejs.PathObserver(this.obj, expression, defaultValue);
            po.open(changeFn, optReceiver);
            this.pos.push(po);
            return po;
        };
        return ConfigObserver;
    })();
    packadic.ConfigObserver = ConfigObserver;
    var Config = (function () {
        function Config(obj, storageBag) {
            this.allDelimiters = {};
            this.addDelimiters('config', '<%', '%>');
            this.data = obj || {};
            if (storageBag) {
                this.storageBag = getPrefferdBag(storageBag);
            }
        }
        Config.prototype.unset = function (prop) {
            prop = prop.split('.');
            var key = prop.pop();
            var obj = packadic.objectGet(this.data, ConfigObject.getPropString(prop.join('.')));
            delete obj[key];
        };
        Config.prototype.has = function (prop) {
            return packadic.objectExists(this.data, ConfigObject.getPropString(prop));
        };
        Config.prototype.raw = function (prop) {
            if (prop) {
                return packadic.objectGet(this.data, ConfigObject.getPropString(prop));
            }
            else {
                return this.data;
            }
        };
        Config.prototype.get = function (prop) {
            return this.process(this.raw(prop));
        };
        Config.prototype.set = function (prop, value) {
            packadic.objectSet(this.data, ConfigObject.getPropString(prop), value);
            return this;
        };
        Config.prototype.merge = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1) {
                this.data = packadic._.merge(this.data, args[0]);
            }
            else {
                var prop = args[0];
                this.set(prop, packadic._.merge(this.raw(prop), args[1]));
            }
            return this;
        };
        Config.prototype.process = function (raw) {
            var self = this;
            return packadic.recurse(raw, function (value) {
                if (typeof value !== 'string') {
                    return value;
                }
                var matches = value.match(ConfigObject.propStringTmplRe);
                var result;
                if (matches) {
                    result = self.get(matches[1]);
                    if (result != null) {
                        return result;
                    }
                }
                return self.processTemplate(value, { data: self.data });
            });
        };
        Config.prototype.addDelimiters = function (name, opener, closer) {
            var delimiters = this.allDelimiters[name] = {};
            delimiters.opener = opener;
            delimiters.closer = closer;
            var a = delimiters.opener.replace(/(.)/g, '\\$1');
            var b = '([\\s\\S]+?)' + delimiters.closer.replace(/(.)/g, '\\$1');
            delimiters.lodash = {
                evaluate: new RegExp(a + b, 'g'),
                interpolate: new RegExp(a + '=' + b, 'g'),
                escape: new RegExp(a + '-' + b, 'g')
            };
        };
        Config.prototype.setDelimiters = function (name) {
            var delimiters = this.allDelimiters[name in this.allDelimiters ? name : 'config'];
            packadic._.templateSettings = delimiters.lodash;
            return delimiters;
        };
        Config.prototype.processTemplate = function (tmpl, options) {
            if (!options) {
                options = {};
            }
            var delimiters = this.setDelimiters(options.delimiters);
            var data = Object.create(options.data || this.data || {});
            var last = tmpl;
            try {
                while (tmpl.indexOf(delimiters.opener) >= 0) {
                    tmpl = packadic._.template(tmpl)(data);
                    if (tmpl === last) {
                        break;
                    }
                    last = tmpl;
                }
            }
            catch (e) {
            }
            return tmpl.toString().replace(/\r\n|\n/g, '\n');
        };
        Object.defineProperty(Config.prototype, "observer", {
            get: function () {
                return this._observer;
            },
            enumerable: true,
            configurable: true
        });
        Config.prototype.attachObserver = function (observer) {
            observer.setInspectableObject(this.data);
            this._observer = observer;
            return this;
        };
        Config.prototype.store = function (key) {
            if (!this.hasStorage())
                return;
            this.storageBag.set(key, this.raw(), { json: true });
            return this;
        };
        Config.prototype.load = function (key) {
            if (!this.hasStorage())
                return;
            this.data = this.storageBag.get(key, { def: this.raw(), json: true });
            return this;
        };
        Config.prototype.hasStorage = function () {
            return packadic.defined(this.storageBag);
        };
        Config.prototype.setStorage = function (bag) {
            this.storageBag = bag;
        };
        Config.makeProperty = function (config) {
            var cf = function (prop) {
                return config.get(prop);
            };
            cf.get = config.get.bind(config);
            cf.set = config.set.bind(config);
            cf.unset = config.unset.bind(config);
            cf.merge = config.merge.bind(config);
            cf.raw = config.raw.bind(config);
            cf.process = config.process.bind(config);
            cf.has = config.has.bind(config);
            return cf;
        };
        Config.makeObserver = function (config) {
            return config.attachObserver(new ConfigObserver()).observer;
        };
        Config.getPropString = function (prop) {
            return Array.isArray(prop) ? prop.map(this.escape).join('.') : prop;
        };
        Config.escape = function (str) {
            return str.replace(/\./g, '\\.');
        };
        Config.prototype.toString = function () {
            return this.raw();
        };
        Config.propStringTmplRe = /^<%=\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*%>$/i;
        return Config;
    })();
    packadic.Config = Config;
    var ConfigObject = (function (_super) {
        __extends(ConfigObject, _super);
        function ConfigObject() {
            _super.apply(this, arguments);
        }
        return ConfigObject;
    })(Config);
    packadic.ConfigObject = ConfigObject;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.defaultEE2Options = {
        wildcard: true,
        delimiter: ':',
        newListener: true,
        maxListeners: 50
    };
    var EventEmitter = (function (_super) {
        __extends(EventEmitter, _super);
        function EventEmitter(eventOptions) {
            if (eventOptions === void 0) { eventOptions = {}; }
            _super.call(this, packadic._.merge(packadic.defaultEE2Options, eventOptions));
        }
        return EventEmitter;
    })(EventEmitter2);
    packadic.EventEmitter = EventEmitter;
    packadic.EventListener = {
        listen: function (target, eventType, callback) {
            if (target.addEventListener) {
                target.addEventListener(eventType, callback, false);
                return {
                    remove: function () {
                        target.removeEventListener(eventType, callback, false);
                    }
                };
            }
            else if (target.attachEvent) {
                target.attachEvent('on' + eventType, callback);
                return {
                    remove: function () {
                        target.detachEvent('on' + eventType, callback);
                    }
                };
            }
        }
    };
    function assign(obj, methodName, c) {
        var assignToProperty = c.assignToProperty, fnCustomReturn = c.fnCustomReturn;
        return function () {
            obj[assignToProperty][methodName].apply(obj[assignToProperty], packadic._.toArray(arguments));
            if (!packadic._.isNull(fnCustomReturn)) {
                return fnCustomReturn;
            }
        };
    }
    function makeEventEmitter(obj, options) {
        var c = packadic._.merge({
            assignMethods: ['on', 'once', 'off'],
            assignPrivateMethods: ['emit'],
            assignToProperty: '_events',
            privateMethodPrefix: '_',
            assignByAliases: false,
            aliases: {
                on: ['onEvent', 'addListener']
            },
            eventClass: EventEmitter2,
            eventClassOptions: packadic.defaultEE2Options,
            assignToPrototype: false,
            fnCustomReturn: null,
            debug: false
        }, options);
        if (c.assignToPrototype === false) {
            if (packadic._.isNull(c.eventClassOptions)) {
                obj[c.assignToProperty] = new c['eventClass']();
            }
            else {
                obj[c.assignToProperty] = new c['eventClass'](c.eventClassOptions);
            }
        }
        else {
            throw new Error('assignToPrototype not implemented yet');
        }
        if (c.assignByAliases) {
            packadic._.each(c.aliases, function (aliases, methodName) {
                if (packadic._.isString(aliases)) {
                    aliases = [aliases];
                }
                aliases.forEach(function (methodAssignmentName) {
                    obj[methodAssignmentName] = assign(obj, methodName, c);
                });
            });
        }
        else {
            ['assignMethods', 'assignPrivateMethods'].forEach(function (methodType) {
                c[methodType].forEach(function (methodName) {
                    if (methodType === 'assignPrivateMethods' && c.assignToPrototype === true) {
                        return;
                    }
                    if (packadic._.isString(c.aliases[methodName])) {
                        c.aliases[methodName] = [c.aliases[methodName]];
                    }
                    if (!packadic._.isArray(c.aliases[methodName])) {
                        c.aliases[methodName] = [methodName];
                    }
                    else {
                        c.aliases[methodName].push(methodName);
                    }
                    c.aliases[methodName].forEach(function (methodAssignmentName) {
                        if (methodType === 'assignPrivateMethods') {
                            methodAssignmentName = c.privateMethodPrefix + methodAssignmentName;
                        }
                        obj[methodAssignmentName] = assign(obj, methodName, c);
                    });
                });
            });
        }
        return obj;
    }
    packadic.makeEventEmitter = makeEventEmitter;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.str = packadic._s;
    function round(value, places) {
        var multiplier = Math.pow(10, places);
        return (Math.round(value * multiplier) / multiplier);
    }
    packadic.round = round;
    function makeString(object) {
        if (object == null)
            return '';
        return '' + object;
    }
    packadic.makeString = makeString;
    function defaultToWhiteSpace(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + packadic.str.escapeRegExp(characters) + ']';
    }
    packadic.defaultToWhiteSpace = defaultToWhiteSpace;
    var kindsOf = {};
    'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
        kindsOf['[object ' + k + ']'] = k.toLowerCase();
    });
    var nativeTrim = String.prototype.trim;
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    function kindOf(value) {
        if (value == null) {
            return String(value);
        }
        return kindsOf[kindsOf.toString.call(value)] || 'object';
    }
    packadic.kindOf = kindOf;
    function def(val, def) {
        return defined(val) ? val : def;
    }
    packadic.def = def;
    function defined(obj) {
        return !packadic._.isUndefined(obj);
    }
    packadic.defined = defined;
    function getRandomId(length) {
        if (!packadic._.isNumber(length)) {
            length = 15;
        }
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    packadic.getRandomId = getRandomId;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.log = loglevel;
    packadic.out = new packadic.BrowserPrettyConsole();
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var materialColors = {
        'red': {
            '50': '#ffebee',
            '100': '#ffcdd2',
            '200': '#ef9a9a',
            '300': '#e57373',
            '400': '#ef5350',
            '500': '#f44336',
            '600': '#e53935',
            '700': '#d32f2f',
            '800': '#c62828',
            '900': '#b71c1c',
            'a100': '#ff8a80',
            'a200': '#ff5252',
            'a400': '#ff1744',
            'a700': '#d50000',
        },
        'pink': {
            '50': '#fce4ec',
            '100': '#f8bbd0',
            '200': '#f48fb1',
            '300': '#f06292',
            '400': '#ec407a',
            '500': '#e91e63',
            '600': '#d81b60',
            '700': '#c2185b',
            '800': '#ad1457',
            '900': '#880e4f',
            'a100': '#ff80ab',
            'a200': '#ff4081',
            'a400': '#f50057',
            'a700': '#c51162',
        },
        'purple': {
            '50': '#f3e5f5',
            '100': '#e1bee7',
            '200': '#ce93d8',
            '300': '#ba68c8',
            '400': '#ab47bc',
            '500': '#9c27b0',
            '600': '#8e24aa',
            '700': '#7b1fa2',
            '800': '#6a1b9a',
            '900': '#4a148c',
            'a100': '#ea80fc',
            'a200': '#e040fb',
            'a400': '#d500f9',
            'a700': '#aa00ff',
        },
        'deep-purple': {
            '50': '#ede7f6',
            '100': '#d1c4e9',
            '200': '#b39ddb',
            '300': '#9575cd',
            '400': '#7e57c2',
            '500': '#673ab7',
            '600': '#5e35b1',
            '700': '#512da8',
            '800': '#4527a0',
            '900': '#311b92',
            'a100': '#b388ff',
            'a200': '#7c4dff',
            'a400': '#651fff',
            'a700': '#6200ea',
        },
        'indigo': {
            '50': '#e8eaf6',
            '100': '#c5cae9',
            '200': '#9fa8da',
            '300': '#7986cb',
            '400': '#5c6bc0',
            '500': '#3f51b5',
            '600': '#3949ab',
            '700': '#303f9f',
            '800': '#283593',
            '900': '#1a237e',
            'a100': '#8c9eff',
            'a200': '#536dfe',
            'a400': '#3d5afe',
            'a700': '#304ffe',
        },
        'blue': {
            '50': '#e3f2fd',
            '100': '#bbdefb',
            '200': '#90caf9',
            '300': '#64b5f6',
            '400': '#42a5f5',
            '500': '#2196f3',
            '600': '#1e88e5',
            '700': '#1976d2',
            '800': '#1565c0',
            '900': '#0d47a1',
            'a100': '#82b1ff',
            'a200': '#448aff',
            'a400': '#2979ff',
            'a700': '#2962ff',
        },
        'light-blue': {
            '50': '#e1f5fe',
            '100': '#b3e5fc',
            '200': '#81d4fa',
            '300': '#4fc3f7',
            '400': '#29b6f6',
            '500': '#03a9f4',
            '600': '#039be5',
            '700': '#0288d1',
            '800': '#0277bd',
            '900': '#01579b',
            'a100': '#80d8ff',
            'a200': '#40c4ff',
            'a400': '#00b0ff',
            'a700': '#0091ea',
        },
        'cyan': {
            '50': '#e0f7fa',
            '100': '#b2ebf2',
            '200': '#80deea',
            '300': '#4dd0e1',
            '400': '#26c6da',
            '500': '#00bcd4',
            '600': '#00acc1',
            '700': '#0097a7',
            '800': '#00838f',
            '900': '#006064',
            'a100': '#84ffff',
            'a200': '#18ffff',
            'a400': '#00e5ff',
            'a700': '#00b8d4',
        },
        'teal': {
            '50': '#e0f2f1',
            '100': '#b2dfdb',
            '200': '#80cbc4',
            '300': '#4db6ac',
            '400': '#26a69a',
            '500': '#009688',
            '600': '#00897b',
            '700': '#00796b',
            '800': '#00695c',
            '900': '#004d40',
            'a100': '#a7ffeb',
            'a200': '#64ffda',
            'a400': '#1de9b6',
            'a700': '#00bfa5',
        },
        'green': {
            '50': '#e8f5e9',
            '100': '#c8e6c9',
            '200': '#a5d6a7',
            '300': '#81c784',
            '400': '#66bb6a',
            '500': '#4caf50',
            '600': '#43a047',
            '700': '#388e3c',
            '800': '#2e7d32',
            '900': '#1b5e20',
            'a100': '#b9f6ca',
            'a200': '#69f0ae',
            'a400': '#00e676',
            'a700': '#00c853',
        },
        'light-green': {
            '50': '#f1f8e9',
            '100': '#dcedc8',
            '200': '#c5e1a5',
            '300': '#aed581',
            '400': '#9ccc65',
            '500': '#8bc34a',
            '600': '#7cb342',
            '700': '#689f38',
            '800': '#558b2f',
            '900': '#33691e',
            'a100': '#ccff90',
            'a200': '#b2ff59',
            'a400': '#76ff03',
            'a700': '#64dd17',
        },
        'lime': {
            '50': '#f9fbe7',
            '100': '#f0f4c3',
            '200': '#e6ee9c',
            '300': '#dce775',
            '400': '#d4e157',
            '500': '#cddc39',
            '600': '#c0ca33',
            '700': '#afb42b',
            '800': '#9e9d24',
            '900': '#827717',
            'a100': '#f4ff81',
            'a200': '#eeff41',
            'a400': '#c6ff00',
            'a700': '#aeea00',
        },
        'yellow': {
            '50': '#fffde7',
            '100': '#fff9c4',
            '200': '#fff59d',
            '300': '#fff176',
            '400': '#ffee58',
            '500': '#ffeb3b',
            '600': '#fdd835',
            '700': '#fbc02d',
            '800': '#f9a825',
            '900': '#f57f17',
            'a100': '#ffff8d',
            'a200': '#ffff00',
            'a400': '#ffea00',
            'a700': '#ffd600',
        },
        'amber': {
            '50': '#fff8e1',
            '100': '#ffecb3',
            '200': '#ffe082',
            '300': '#ffd54f',
            '400': '#ffca28',
            '500': '#ffc107',
            '600': '#ffb300',
            '700': '#ffa000',
            '800': '#ff8f00',
            '900': '#ff6f00',
            'a100': '#ffe57f',
            'a200': '#ffd740',
            'a400': '#ffc400',
            'a700': '#ffab00',
        },
        'orange': {
            '50': '#fff3e0',
            '100': '#ffe0b2',
            '200': '#ffcc80',
            '300': '#ffb74d',
            '400': '#ffa726',
            '500': '#ff9800',
            '600': '#fb8c00',
            '700': '#f57c00',
            '800': '#ef6c00',
            '900': '#e65100',
            'a100': '#ffd180',
            'a200': '#ffab40',
            'a400': '#ff9100',
            'a700': '#ff6d00',
        },
        'deep-orange': {
            '50': '#fbe9e7',
            '100': '#ffccbc',
            '200': '#ffab91',
            '300': '#ff8a65',
            '400': '#ff7043',
            '500': '#ff5722',
            '600': '#f4511e',
            '700': '#e64a19',
            '800': '#d84315',
            '900': '#bf360c',
            'a100': '#ff9e80',
            'a200': '#ff6e40',
            'a400': '#ff3d00',
            'a700': '#dd2c00',
        },
        'brown': {
            '50': '#efebe9',
            '100': '#d7ccc8',
            '200': '#bcaaa4',
            '300': '#a1887f',
            '400': '#8d6e63',
            '500': '#795548',
            '600': '#6d4c41',
            '700': '#5d4037',
            '800': '#4e342e',
            '900': '#3e2723',
        },
        'grey': {
            '50': '#fafafa',
            '100': '#f5f5f5',
            '200': '#eeeeee',
            '300': '#e0e0e0',
            '400': '#bdbdbd',
            '500': '#9e9e9e',
            '600': '#757575',
            '700': '#616161',
            '800': '#424242',
            '900': '#212121',
        },
        'blue-grey': {
            '50': '#eceff1',
            '100': '#cfd8dc',
            '200': '#b0bec5',
            '300': '#90a4ae',
            '400': '#78909c',
            '500': '#607d8b',
            '600': '#546e7a',
            '700': '#455a64',
            '800': '#37474f',
            '900': '#263238',
            '1000': '#11171a',
        }
    };
    packadic.colors = materialColors;
    function color(name, variant, prefixHexSymbol) {
        if (variant === void 0) { variant = '500'; }
        if (prefixHexSymbol === void 0) { prefixHexSymbol = true; }
        if (typeof packadic.colors[name] === 'object' && typeof packadic.colors[name][variant] === 'string') {
            return prefixHexSymbol ? packadic.colors[name][variant] : packadic.colors[name][variant].replace('#', '');
        }
        throw new Error('Could not find color [' + name + '] variant [' + variant + '] in materials.color()');
    }
    packadic.color = color;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var MetaStore = (function () {
        function MetaStore(target, type) {
            this.options = {
                key: '_decoratorMetaStore'
            };
            this.target = target;
            this.type = type;
            this.ensureHasMetaStore();
        }
        MetaStore.template = function (type, defaultMetaStore) {
            if (!MetaStore.hasTemplate(type)) {
                MetaStore.templates[type] = defaultMetaStore;
            }
        };
        MetaStore.hasTemplate = function (type) {
            return packadic.defined(MetaStore.templates[type]);
        };
        Object.defineProperty(MetaStore.prototype, "store", {
            get: function () {
                return packadic.ConfigObject.makeProperty(this.target[this.options.key]);
            },
            enumerable: true,
            configurable: true
        });
        MetaStore.for = function (target, type) {
            if (type === void 0) { type = 'default'; }
            return new MetaStore(target, type);
        };
        MetaStore.prototype.storePush = function (key, val) {
            var items = this.store.has(key) ? this.store.get(key) : [];
            items.push(val);
            this.store.set(key, items);
            return this;
        };
        MetaStore.prototype.cleanTarget = function () {
            delete this.target[this.options.key];
            return this;
        };
        MetaStore.prototype.ensureHasMetaStore = function () {
            if (!packadic.defined(this.target[this.options.key])) {
                this.target[this.options.key] = new packadic.ConfigObject();
                if (MetaStore.hasTemplate(this.type)) {
                    this.store.merge(MetaStore.templates[this.type]);
                }
            }
        };
        MetaStore.templates = {};
        return MetaStore;
    })();
    packadic.MetaStore = MetaStore;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    function getParts(str) {
        return str.replace(/\\\./g, '\uffff').split('.').map(function (s) {
            return s.replace(/\uffff/g, '.');
        });
    }
    packadic.getParts = getParts;
    function objectGet(obj, parts, create) {
        if (typeof parts === 'string') {
            parts = getParts(parts);
        }
        var part;
        while (typeof obj === 'object' && obj && parts.length) {
            part = parts.shift();
            if (!(part in obj) && create) {
                obj[part] = {};
            }
            obj = obj[part];
        }
        return obj;
    }
    packadic.objectGet = objectGet;
    function objectSet(obj, parts, value) {
        parts = getParts(parts);
        var prop = parts.pop();
        obj = objectGet(obj, parts, true);
        if (obj && typeof obj === 'object') {
            return (obj[prop] = value);
        }
    }
    packadic.objectSet = objectSet;
    function objectExists(obj, parts) {
        parts = getParts(parts);
        var prop = parts.pop();
        obj = objectGet(obj, parts);
        return typeof obj === 'object' && obj && prop in obj;
    }
    packadic.objectExists = objectExists;
    function recurse(value, fn, fnContinue) {
        function recurse(value, fn, fnContinue, state) {
            var error;
            if (state.objs.indexOf(value) !== -1) {
                error = new Error('Circular reference detected (' + state.path + ')');
                error.path = state.path;
                throw error;
            }
            var obj, key;
            if (fnContinue && fnContinue(value) === false) {
                return value;
            }
            else if (packadic.kindOf(value) === 'array') {
                return value.map(function (item, index) {
                    return recurse(item, fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + '[' + index + ']',
                    });
                });
            }
            else if (packadic.kindOf(value) === 'object') {
                obj = {};
                for (key in value) {
                    obj[key] = recurse(value[key], fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + (/\W/.test(key) ? '["' + key + '"]' : '.' + key),
                    });
                }
                return obj;
            }
            else {
                return fn(value);
            }
        }
        return recurse(value, fn, fnContinue, { objs: [], path: '' });
    }
    packadic.recurse = recurse;
    function copyObject(object) {
        var objectCopy = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }
        return objectCopy;
    }
    packadic.copyObject = copyObject;
    function dotize(obj, prefix) {
        if (!obj || typeof obj != "object") {
            if (prefix) {
                var newObj = {};
                newObj[prefix] = obj;
                return newObj;
            }
            else
                return obj;
        }
        var newObj = {};
        function recurse(o, p, isArrayItem) {
            for (var f in o) {
                if (o[f] && typeof o[f] === "object") {
                    if (Array.isArray(o[f]))
                        newObj = recurse(o[f], (p ? p : "") + (isNumber(f) ? "[" + f + "]" : "." + f), true);
                    else {
                        if (isArrayItem)
                            newObj = recurse(o[f], (p ? p : "") + "[" + f + "]");
                        else
                            newObj = recurse(o[f], (p ? p + "." : "") + f);
                    }
                }
                else {
                    if (isArrayItem || isNumber(f))
                        newObj[p + "[" + f + "]"] = o[f];
                    else
                        newObj[(p ? p + "." : "") + f] = o[f];
                }
            }
            if (isEmptyObj(newObj))
                return obj;
            return newObj;
        }
        function isNumber(f) {
            return !isNaN(parseInt(f));
        }
        function isEmptyObj(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        }
        return recurse(obj, prefix);
    }
    packadic.dotize = dotize;
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    packadic.applyMixins = applyMixins;
    var DependencySorter = (function () {
        function DependencySorter() {
            this.items = [];
            this.dependencies = {};
            this.dependsOn = {};
            this.missing = {};
            this.circular = {};
            this.hits = {};
            this.sorted = {};
        }
        DependencySorter.prototype.add = function (items) {
            var _this = this;
            Object.keys(items).forEach(function (name) {
                _this.addItem(name, items[name]);
            });
        };
        DependencySorter.prototype.addItem = function (name, deps) {
            if (typeof deps === 'undefined') {
                deps = deps || [];
            }
            else if (typeof deps === 'string') {
                deps = deps.toString().split(/,\s?/);
            }
            this.setItem(name, deps);
        };
        DependencySorter.prototype.setItem = function (name, deps) {
            var _this = this;
            this.items.push(name);
            deps.forEach(function (dep) {
                _this.items.push(dep);
                if (!_this.dependsOn[dep]) {
                    _this.dependsOn[dep] = {};
                }
                _this.dependsOn[dep][name] = name;
                _this.hits[dep] = 0;
            });
            this.items = packadic._.uniq(this.items);
            this.dependencies[name] = deps;
            this.hits[name] = 0;
        };
        DependencySorter.prototype.sort = function () {
            var _this = this;
            this.sorted = [];
            var hasChanged = true;
            while (this.sorted.length < this.items.length && hasChanged) {
                hasChanged = false;
                Object.keys(this.dependencies).forEach(function (item) {
                    if (_this.satisfied(item)) {
                        _this.setSorted(item);
                        _this.removeDependents(item);
                        hasChanged = true;
                    }
                    _this.hits[item]++;
                });
            }
            return this.sorted;
        };
        DependencySorter.prototype.satisfied = function (name) {
            var _this = this;
            var pass = true;
            this.getDependents(name).forEach(function (dep) {
                if (_this.isSorted(dep)) {
                    return;
                }
                if (!_this.exists(name)) {
                    _this.setMissing(name, dep);
                    if (pass) {
                        pass = false;
                    }
                }
                if (_this.hasDependents(dep)) {
                    if (pass) {
                        pass = false;
                    }
                }
                else {
                    _this.setFound(name, dep);
                }
                if (_this.isDependent(name, dep)) {
                    _this.setCircular(name, dep);
                    if (pass) {
                        pass = false;
                    }
                }
            });
            return pass;
        };
        DependencySorter.prototype.setSorted = function (item) {
            this.sorted.push(item);
        };
        DependencySorter.prototype.exists = function (item) {
            return this.items.indexOf(item) !== -1;
        };
        DependencySorter.prototype.removeDependents = function (item) {
            delete this.dependencies[item];
        };
        DependencySorter.prototype.setCircular = function (item, item2) {
            this.circular[item] = this.circular[item] || {};
            this.circular[item][item2] = item2;
        };
        DependencySorter.prototype.setMissing = function (item, item2) {
            this.missing[item] = this.missing[item] || {};
            this.missing[item][item2] = item2;
        };
        DependencySorter.prototype.setFound = function (item, item2) {
            if (typeof this.missing[item] !== 'undefined') {
                delete this.missing[item][item2];
                if (Object.keys(this.missing[item]).length > 0) {
                    delete this.missing[item];
                }
            }
        };
        DependencySorter.prototype.isSorted = function (item) {
            return typeof this.sorted[item] !== 'undefined';
        };
        DependencySorter.prototype.requiredBy = function (item) {
            return typeof this.dependsOn[item] !== 'undefined' ? this.dependsOn[item] : [];
        };
        DependencySorter.prototype.isDependent = function (item, item2) {
            return typeof this.dependsOn[item] !== 'undefined' && typeof this.dependsOn[item][item2] !== 'undefined';
        };
        DependencySorter.prototype.hasDependents = function (item) {
            return typeof this.dependencies[item] !== 'undefined';
        };
        DependencySorter.prototype.hasMissing = function (item) {
            return typeof this.missing[item] !== 'undefined';
        };
        DependencySorter.prototype.isMissing = function (dep) {
            var _this = this;
            var missing = false;
            Object.keys(this.missing).forEach(function (item) {
                var deps = _this.missing[item];
                if (deps.indexOf(dep) !== -1) {
                    missing = true;
                }
            });
            return missing;
        };
        DependencySorter.prototype.hasCircular = function (item) {
            return typeof this.circular[item] !== 'undefined';
        };
        DependencySorter.prototype.isCircular = function (dep) {
            var _this = this;
            var circular = false;
            Object.keys(this.circular).forEach(function (item) {
                var deps = _this.circular[item];
                if (deps.indexOf(dep) !== -1) {
                    circular = true;
                }
            });
            return circular;
        };
        DependencySorter.prototype.getDependents = function (item) {
            return this.dependencies[item];
        };
        DependencySorter.prototype.getMissing = function (str) {
            if (typeof str === 'string') {
                return this.missing[str];
            }
            return this.missing;
        };
        DependencySorter.prototype.getCircular = function (str) {
            if (typeof str === 'string') {
                return this.circular[str];
            }
            return this.circular;
        };
        DependencySorter.prototype.getHits = function (str) {
            if (typeof str === 'string') {
                return this.hits[str];
            }
            return this.hits;
        };
        return DependencySorter;
    })();
    packadic.DependencySorter = DependencySorter;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    function createPromise() {
        return new Deferred(DispatchDeferred);
    }
    packadic.createPromise = createPromise;
    function when(value) {
        if (value instanceof Promise) {
            return value;
        }
        return createPromise().resolve(value).promise;
    }
    packadic.when = when;
    function DispatchDeferred(closure) {
        setTimeout(closure, 0);
    }
    var PromiseState;
    (function (PromiseState) {
        PromiseState[PromiseState["Pending"] = 0] = "Pending";
        PromiseState[PromiseState["ResolutionInProgress"] = 1] = "ResolutionInProgress";
        PromiseState[PromiseState["Resolved"] = 2] = "Resolved";
        PromiseState[PromiseState["Rejected"] = 3] = "Rejected";
    })(PromiseState || (PromiseState = {}));
    var Client = (function () {
        function Client(_dispatcher, _successCB, _errorCB) {
            this._dispatcher = _dispatcher;
            this._successCB = _successCB;
            this._errorCB = _errorCB;
            this.result = new Deferred(_dispatcher);
        }
        Client.prototype.resolve = function (value, defer) {
            var _this = this;
            if (typeof (this._successCB) !== 'function') {
                this.result.resolve(value);
                return;
            }
            if (defer) {
                this._dispatcher(function () { return _this._dispatchCallback(_this._successCB, value); });
            }
            else {
                this._dispatchCallback(this._successCB, value);
            }
        };
        Client.prototype.reject = function (error, defer) {
            var _this = this;
            if (typeof (this._errorCB) !== 'function') {
                this.result.reject(error);
                return;
            }
            if (defer) {
                this._dispatcher(function () { return _this._dispatchCallback(_this._errorCB, error); });
            }
            else {
                this._dispatchCallback(this._errorCB, error);
            }
        };
        Client.prototype._dispatchCallback = function (callback, arg) {
            var result, then, type;
            try {
                result = callback(arg);
                this.result.resolve(result);
            }
            catch (err) {
                this.result.reject(err);
                return;
            }
        };
        return Client;
    })();
    var Deferred = (function () {
        function Deferred(_dispatcher) {
            this._dispatcher = _dispatcher;
            this._stack = [];
            this._state = PromiseState.Pending;
            this.promise = new Promise(this);
        }
        Deferred.prototype._then = function (successCB, errorCB) {
            if (typeof (successCB) !== 'function' && typeof (errorCB) !== 'function') {
                return this.promise;
            }
            var client = new Client(this._dispatcher, successCB, errorCB);
            switch (this._state) {
                case PromiseState.Pending:
                case PromiseState.ResolutionInProgress:
                    this._stack.push(client);
                    break;
                case PromiseState.Resolved:
                    client.resolve(this._value, true);
                    break;
                case PromiseState.Rejected:
                    client.reject(this._error, true);
                    break;
            }
            return client.result.promise;
        };
        Deferred.prototype.resolve = function (value) {
            if (this._state !== PromiseState.Pending) {
                return this;
            }
            return this._resolve(value);
        };
        Deferred.prototype._resolve = function (value) {
            var _this = this;
            var type = typeof (value), then, pending = true;
            try {
                if (value !== null &&
                    (type === 'object' || type === 'function') &&
                    typeof (then = value.then) === 'function') {
                    if (value === this.promise) {
                        throw new TypeError('recursive resolution');
                    }
                    this._state = PromiseState.ResolutionInProgress;
                    then.call(value, function (result) {
                        if (pending) {
                            pending = false;
                            _this._resolve(result);
                        }
                    }, function (error) {
                        if (pending) {
                            pending = false;
                            _this._reject(error);
                        }
                    });
                }
                else {
                    this._state = PromiseState.ResolutionInProgress;
                    this._dispatcher(function () {
                        _this._state = PromiseState.Resolved;
                        _this._value = value;
                        var i, stackSize = _this._stack.length;
                        for (i = 0; i < stackSize; i++) {
                            _this._stack[i].resolve(value, false);
                        }
                        _this._stack.splice(0, stackSize);
                    });
                }
            }
            catch (err) {
                if (pending) {
                    this._reject(err);
                }
            }
            return this;
        };
        Deferred.prototype.reject = function (error) {
            if (this._state !== PromiseState.Pending) {
                return this;
            }
            return this._reject(error);
        };
        Deferred.prototype._reject = function (error) {
            var _this = this;
            this._state = PromiseState.ResolutionInProgress;
            this._dispatcher(function () {
                _this._state = PromiseState.Rejected;
                _this._error = error;
                var stackSize = _this._stack.length, i = 0;
                for (i = 0; i < stackSize; i++) {
                    _this._stack[i].reject(error, false);
                }
                _this._stack.splice(0, stackSize);
            });
            return this;
        };
        return Deferred;
    })();
    var Promise = (function () {
        function Promise(_deferred) {
            this._deferred = _deferred;
        }
        Promise.prototype.then = function (successCB, errorCB) {
            return this._deferred._then(successCB, errorCB);
        };
        Promise.prototype.otherwise = function (errorCB) {
            return this._deferred._then(undefined, errorCB);
        };
        Promise.prototype.always = function (errorCB) {
            return this._deferred._then(errorCB, errorCB);
        };
        return Promise;
    })();
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.bags = {};
    function hasBag(name) {
        return typeof packadic.bags[name] !== 'undefined';
    }
    packadic.hasBag = hasBag;
    function createBag(name, provider) {
        if (hasBag(name)) {
            throw new Error('StorageBag ' + name + ' already exists');
        }
        return packadic.bags[name] = new StorageBag(provider);
    }
    packadic.createBag = createBag;
    function getBag(name) {
        if (!hasBag(name)) {
            throw new Error('StorageBag ' + name + ' does not exist');
        }
        return packadic.bags[name];
    }
    packadic.getBag = getBag;
    var StorageBag = (function () {
        function StorageBag(provider) {
            this.provider = provider;
        }
        StorageBag.prototype.on = function (callback) {
            this.provider.onStoreEvent(callback);
        };
        StorageBag.prototype.set = function (key, val, options) {
            var options = packadic._.merge({ json: false, expires: false }, options);
            if (options.json) {
                val = packadic.JSON.stringify(val);
            }
            if (options.expires) {
                var now = Math.floor((Date.now() / 1000) / 60);
                this.provider.setItem(key + ':expire', now + options.expires);
            }
            this.provider.setItem(key, val);
        };
        StorageBag.prototype.get = function (key, options) {
            var options = packadic._.merge({ json: false, def: null }, options);
            if (!packadic.defined(key)) {
                return options.def;
            }
            if (packadic._.isString(this.provider.getItem(key))) {
                if (packadic._.isString(this.provider.getItem(key + ':expire'))) {
                    var now = Math.floor((Date.now() / 1000) / 60);
                    var expires = parseInt(this.provider.getItem(key + ':expire'));
                    if (now > expires) {
                        this.del(key);
                        this.del(key + ':expire');
                    }
                }
            }
            var val = this.provider.getItem(key);
            if (!packadic.defined(val) || packadic.defined(val) && val == null) {
                return options.def;
            }
            if (options.json) {
                return packadic.JSON.parse(val);
            }
            return val;
        };
        StorageBag.prototype.del = function (key) {
            this.provider.removeItem(key);
        };
        StorageBag.prototype.clear = function () {
            this.provider.clear();
        };
        StorageBag.prototype.getSize = function (key) {
            return this.provider.getSize(key);
        };
        return StorageBag;
    })();
    packadic.StorageBag = StorageBag;
    var LocalStorage = (function () {
        function LocalStorage() {
        }
        Object.defineProperty(LocalStorage.prototype, "length", {
            get: function () {
                return window.localStorage.length;
            },
            enumerable: true,
            configurable: true
        });
        LocalStorage.prototype.getSize = function (key) {
            key = key || false;
            if (key) {
                return ((window.localStorage[x].length * 2) / 1024 / 1024).toFixed(2);
            }
            else {
                var total = 0;
                for (var x in window.localStorage) {
                    total += (window.localStorage[x].length * 2) / 1024 / 1024;
                }
                return total.toFixed(2);
            }
        };
        LocalStorage.prototype.onStoreEvent = function (callback) {
            if (window.addEventListener) {
                window.addEventListener("storage", callback, false);
            }
            else {
                window.attachEvent("onstorage", callback);
            }
        };
        LocalStorage.prototype.clear = function () {
            window.localStorage.clear();
        };
        LocalStorage.prototype.getItem = function (key) {
            return window.localStorage.getItem(key);
        };
        LocalStorage.prototype.key = function (index) {
            return window.localStorage.key(index);
        };
        LocalStorage.prototype.removeItem = function (key) {
            window.localStorage.removeItem(key);
        };
        LocalStorage.prototype.setItem = function (key, data) {
            window.localStorage.setItem(key, data);
        };
        return LocalStorage;
    })();
    packadic.LocalStorage = LocalStorage;
    var SessionStorage = (function () {
        function SessionStorage() {
        }
        Object.defineProperty(SessionStorage.prototype, "length", {
            get: function () {
                return window.sessionStorage.length;
            },
            enumerable: true,
            configurable: true
        });
        SessionStorage.prototype.getSize = function (key) {
            key = key || false;
            if (key) {
                return ((window.sessionStorage[x].length * 2) / 1024 / 1024).toFixed(2);
            }
            else {
                var total = 0;
                for (var x in window.sessionStorage) {
                    total += (window.sessionStorage[x].length * 2) / 1024 / 1024;
                }
                return total.toFixed(2);
            }
        };
        SessionStorage.prototype.onStoreEvent = function (callback) {
            if (window.addEventListener) {
                window.addEventListener("storage", callback, false);
            }
            else {
                window.attachEvent("onstorage", callback);
            }
        };
        SessionStorage.prototype.clear = function () {
            window.sessionStorage.clear();
        };
        SessionStorage.prototype.getItem = function (key) {
            return window.sessionStorage.getItem(key);
        };
        SessionStorage.prototype.key = function (index) {
            return window.sessionStorage.key(index);
        };
        SessionStorage.prototype.removeItem = function (key) {
            window.sessionStorage.removeItem(key);
        };
        SessionStorage.prototype.setItem = function (key, data) {
            window.sessionStorage.setItem(key, data);
        };
        return SessionStorage;
    })();
    packadic.SessionStorage = SessionStorage;
    var CookieStorage = (function () {
        function CookieStorage() {
            this.cookieRegistry = [];
        }
        Object.defineProperty(CookieStorage.prototype, "length", {
            get: function () {
                return this.keys().length;
            },
            enumerable: true,
            configurable: true
        });
        CookieStorage.prototype.getSize = function (key) {
            key = key || false;
            if (key) {
                return ((window.sessionStorage[x].length * 2) / 1024 / 1024).toFixed(2);
            }
            else {
                var total = 0;
                for (var x in window.sessionStorage) {
                    total += (window.sessionStorage[x].length * 2) / 1024 / 1024;
                }
                return total.toFixed(2);
            }
        };
        CookieStorage.prototype.listenCookieChange = function (cookieName, callback) {
            var _this = this;
            setInterval(function () {
                if (_this.hasItem(cookieName)) {
                    if (_this.getItem(cookieName) != _this.cookieRegistry[cookieName]) {
                        _this.cookieRegistry[cookieName] = _this.getItem(cookieName);
                        return callback();
                    }
                }
                else {
                    _this.cookieRegistry[cookieName] = _this.getItem(cookieName);
                }
            }, 100);
        };
        CookieStorage.prototype.onStoreEvent = function (callback) {
            var _this = this;
            this.keys().forEach(function (name) {
                _this.listenCookieChange(name, callback);
            });
        };
        CookieStorage.prototype.clear = function () {
            var _this = this;
            this.keys().forEach(function (name) {
                _this.removeItem(name);
            });
        };
        CookieStorage.prototype.key = function (index) {
            return this.keys()[index];
        };
        CookieStorage.prototype.getItem = function (sKey) {
            if (!sKey) {
                return null;
            }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        };
        CookieStorage.prototype.setItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return;
        };
        CookieStorage.prototype.removeItem = function (key, sPath, sDomain) {
            if (!this.hasItem(key)) {
                return false;
            }
            document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        };
        CookieStorage.prototype.hasItem = function (sKey) {
            if (!sKey) {
                return false;
            }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        };
        CookieStorage.prototype.keys = function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        };
        return CookieStorage;
    })();
    packadic.CookieStorage = CookieStorage;
    if (packadic.defined(window)) {
        if (!packadic.defined(window.localStorage)) {
            createBag('local', new LocalStorage());
        }
        if (!packadic.defined(window.sessionStorage)) {
            createBag('session', new SessionStorage());
        }
        if (!packadic.defined(window.document.cookie)) {
            createBag('cookie', new CookieStorage());
        }
    }
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var expr = {};
    expr.SEMVER_SPEC_VERSION = '2.0.0';
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_VALUE || 9007199254740991;
    var re = expr.re = [];
    var src = expr.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
    var MAINVERSION = R++;
    src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
        '(' + src[NUMERICIDENTIFIER] + ')\\.' +
        '(' + src[NUMERICIDENTIFIER] + ')';
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
        '|' + src[NONNUMERICIDENTIFIER] + ')';
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
        '|' + src[NONNUMERICIDENTIFIER] + ')';
    var PRERELEASE = R++;
    src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
        '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
        '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
    var BUILD = R++;
    src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
        '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
    var FULL = R++;
    var FULLPLAIN = 'v?' + src[MAINVERSION] +
        src[PRERELEASE] + '?' +
        src[BUILD] + '?';
    src[FULL] = '^' + FULLPLAIN + '$';
    var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
        src[PRERELEASELOOSE] + '?' +
        src[BUILD] + '?';
    var LOOSE = R++;
    src[LOOSE] = '^' + LOOSEPLAIN + '$';
    var GTLT = R++;
    src[GTLT] = '((?:<|>)?=?)';
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
        '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
        '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
        '(?:' + src[PRERELEASE] + ')?' +
        src[BUILD] + '?' +
        ')?)?';
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
        '(?:' + src[PRERELEASELOOSE] + ')?' +
        src[BUILD] + '?' +
        ')?)?';
    var XRANGE = R++;
    src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
    var LONETILDE = R++;
    src[LONETILDE] = '(?:~>?)';
    var TILDETRIM = R++;
    src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
    re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
    var tildeTrimReplace = '$1~';
    var TILDE = R++;
    src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
    var TILDELOOSE = R++;
    src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
    var LONECARET = R++;
    src[LONECARET] = '(?:\\^)';
    var CARETTRIM = R++;
    src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
    re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
    var caretTrimReplace = '$1^';
    var CARET = R++;
    src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
    var CARETLOOSE = R++;
    src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
    var COMPARATOR = R++;
    src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
        '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
    var comparatorTrimReplace = '$1$2$3';
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
        '\\s+-\\s+' +
        '(' + src[XRANGEPLAIN] + ')' +
        '\\s*$';
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
        '\\s+-\\s+' +
        '(' + src[XRANGEPLAINLOOSE] + ')' +
        '\\s*$';
    var STAR = R++;
    src[STAR] = '(<|>)?=?\\s*\\*';
    for (var i = 0; i < R; i++) {
        if (!re[i])
            re[i] = new RegExp(src[i]);
    }
    function parse(version, loose) {
        if (version instanceof SemVer)
            return version;
        if (typeof version !== 'string')
            return null;
        if (version.length > MAX_LENGTH)
            return null;
        var r = loose ? re[LOOSE] : re[FULL];
        if (!r.test(version))
            return null;
        try {
            return new SemVer(version, loose);
        }
        catch (er) {
            return null;
        }
    }
    function valid(version, loose) {
        var v = parse(version, loose);
        return v ? v.version : null;
    }
    function clean(version, loose) {
        var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
        return s ? s.version : null;
    }
    var SemVer = (function () {
        function SemVer(version, loose) {
            if (version instanceof SemVer) {
                if (version.loose === loose)
                    return version;
                else
                    version = version.version;
            }
            else if (typeof version !== 'string') {
                throw new TypeError('Invalid Version: ' + version);
            }
            if (version.length > MAX_LENGTH)
                throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
            if (!(this instanceof SemVer))
                return new SemVer(version, loose);
            this.loose = loose;
            var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
            if (!m)
                throw new TypeError('Invalid Version: ' + version);
            this.raw = version;
            this.major = +m[1];
            this.minor = +m[2];
            this.patch = +m[3];
            if (this.major > MAX_SAFE_INTEGER || this.major < 0)
                throw new TypeError('Invalid major version');
            if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
                throw new TypeError('Invalid minor version');
            if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
                throw new TypeError('Invalid patch version');
            if (!m[4])
                this.prerelease = [];
            else
                this.prerelease = m[4].split('.').map(function (id) {
                    if (/^[0-9]+$/.test(id)) {
                        var num = +id;
                        if (num >= 0 && num < MAX_SAFE_INTEGER)
                            return num;
                    }
                    return id;
                });
            this.build = m[5] ? m[5].split('.') : [];
            this.format();
        }
        SemVer.prototype.format = function () {
            this.version = this.major + '.' + this.minor + '.' + this.patch;
            if (this.prerelease.length)
                this.version += '-' + this.prerelease.join('.');
            return this.version;
        };
        SemVer.prototype.inspect = function () {
            return '<SemVer "' + this + '">';
        };
        SemVer.prototype.toString = function () {
            return this.version;
        };
        SemVer.prototype.compare = function (other) {
            if (!(other instanceof SemVer))
                other = new SemVer(other, this.loose);
            return this.compareMain(other) || this.comparePre(other);
        };
        SemVer.prototype.compareMain = function (other) {
            if (!(other instanceof SemVer))
                other = new SemVer(other, this.loose);
            return compareIdentifiers(this.major, other.major) ||
                compareIdentifiers(this.minor, other.minor) ||
                compareIdentifiers(this.patch, other.patch);
        };
        SemVer.prototype.comparePre = function (other) {
            if (!(other instanceof SemVer))
                other = new SemVer(other, this.loose);
            if (this.prerelease.length && !other.prerelease.length)
                return -1;
            else if (!this.prerelease.length && other.prerelease.length)
                return 1;
            else if (!this.prerelease.length && !other.prerelease.length)
                return 0;
            var i = 0;
            do {
                var a = this.prerelease[i];
                var b = other.prerelease[i];
                if (a === undefined && b === undefined)
                    return 0;
                else if (b === undefined)
                    return 1;
                else if (a === undefined)
                    return -1;
                else if (a === b)
                    continue;
                else
                    return compareIdentifiers(a, b);
            } while (++i);
        };
        SemVer.prototype.inc = function (release, identifier) {
            switch (release) {
                case 'premajor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor = 0;
                    this.major++;
                    this.inc('pre', identifier);
                    break;
                case 'preminor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor++;
                    this.inc('pre', identifier);
                    break;
                case 'prepatch':
                    this.prerelease.length = 0;
                    this.inc('patch', identifier);
                    this.inc('pre', identifier);
                    break;
                case 'prerelease':
                    if (this.prerelease.length === 0)
                        this.inc('patch', identifier);
                    this.inc('pre', identifier);
                    break;
                case 'major':
                    if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
                        this.major++;
                    this.minor = 0;
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'minor':
                    if (this.patch !== 0 || this.prerelease.length === 0)
                        this.minor++;
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'patch':
                    if (this.prerelease.length === 0)
                        this.patch++;
                    this.prerelease = [];
                    break;
                case 'pre':
                    if (this.prerelease.length === 0)
                        this.prerelease = [0];
                    else {
                        var i = this.prerelease.length;
                        while (--i >= 0) {
                            if (typeof this.prerelease[i] === 'number') {
                                this.prerelease[i]++;
                                i = -2;
                            }
                        }
                        if (i === -1)
                            this.prerelease.push(0);
                    }
                    if (identifier) {
                        if (this.prerelease[0] === identifier) {
                            if (isNaN(this.prerelease[1]))
                                this.prerelease = [identifier, 0];
                        }
                        else
                            this.prerelease = [identifier, 0];
                    }
                    break;
                default:
                    throw new Error('invalid increment argument: ' + release);
            }
            this.format();
            return this;
        };
        return SemVer;
    })();
    packadic.SemVer = SemVer;
    function inc(version, release, loose, identifier) {
        if (typeof (loose) === 'string') {
            identifier = loose;
            loose = undefined;
        }
        try {
            return new SemVer(version, loose).inc(release, identifier).version;
        }
        catch (er) {
            return null;
        }
    }
    function diff(version1, version2) {
        if (eq(version1, version2)) {
            return null;
        }
        else {
            var v1 = parse(version1);
            var v2 = parse(version2);
            if (v1.prerelease.length || v2.prerelease.length) {
                for (var key in v1) {
                    if (key === 'major' || key === 'minor' || key === 'patch') {
                        if (v1[key] !== v2[key]) {
                            return 'pre' + key;
                        }
                    }
                }
                return 'prerelease';
            }
            for (var key in v1) {
                if (key === 'major' || key === 'minor' || key === 'patch') {
                    if (v1[key] !== v2[key]) {
                        return key;
                    }
                }
            }
        }
    }
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
        var anum = numeric.test(a);
        var bnum = numeric.test(b);
        if (anum && bnum) {
            a = +a;
            b = +b;
        }
        return (anum && !bnum) ? -1 :
            (bnum && !anum) ? 1 :
                a < b ? -1 :
                    a > b ? 1 :
                        0;
    }
    function rcompareIdentifiers(a, b) {
        return compareIdentifiers(b, a);
    }
    function major(a, loose) {
        return new SemVer(a, loose).major;
    }
    function minor(a, loose) {
        return new SemVer(a, loose).minor;
    }
    function patch(a, loose) {
        return new SemVer(a, loose).patch;
    }
    function compare(a, b, loose) {
        return new SemVer(a, loose).compare(b);
    }
    function compareLoose(a, b) {
        return compare(a, b, true);
    }
    function rcompare(a, b, loose) {
        return compare(b, a, loose);
    }
    function sort(list, loose) {
        return list.sort(function (a, b) {
            return expr.compare(a, b, loose);
        });
    }
    function rsort(list, loose) {
        return list.sort(function (a, b) {
            return expr.rcompare(a, b, loose);
        });
    }
    function gt(a, b, loose) {
        return compare(a, b, loose) > 0;
    }
    function lt(a, b, loose) {
        return compare(a, b, loose) < 0;
    }
    function eq(a, b, loose) {
        return compare(a, b, loose) === 0;
    }
    function neq(a, b, loose) {
        return compare(a, b, loose) !== 0;
    }
    function gte(a, b, loose) {
        return compare(a, b, loose) >= 0;
    }
    function lte(a, b, loose) {
        return compare(a, b, loose) <= 0;
    }
    function cmp(a, op, b, loose) {
        var ret;
        switch (op) {
            case '===':
                if (typeof a === 'object')
                    a = a.version;
                if (typeof b === 'object')
                    b = b.version;
                ret = a === b;
                break;
            case '!==':
                if (typeof a === 'object')
                    a = a.version;
                if (typeof b === 'object')
                    b = b.version;
                ret = a !== b;
                break;
            case '':
            case '=':
            case '==':
                ret = eq(a, b, loose);
                break;
            case '!=':
                ret = neq(a, b, loose);
                break;
            case '>':
                ret = gt(a, b, loose);
                break;
            case '>=':
                ret = gte(a, b, loose);
                break;
            case '<':
                ret = lt(a, b, loose);
                break;
            case '<=':
                ret = lte(a, b, loose);
                break;
            default:
                throw new TypeError('Invalid operator: ' + op);
        }
        return ret;
    }
    var Comparator = (function () {
        function Comparator(comp, loose) {
            if (comp instanceof Comparator) {
                if (comp.loose === loose)
                    return comp;
                else
                    comp = comp.value;
            }
            if (!(this instanceof Comparator))
                return new Comparator(comp, loose);
            this.loose = loose;
            this.parse(comp);
            if (this.semver === ANY)
                this.value = '';
            else
                this.value = this.operator + this.semver.version;
        }
        Comparator.prototype.parse = function (comp) {
            var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
            var m = comp.match(r);
            if (!m)
                throw new TypeError('Invalid comparator: ' + comp);
            this.operator = m[1];
            if (this.operator === '=')
                this.operator = '';
            if (!m[2])
                this.semver = ANY;
            else
                this.semver = new SemVer(m[2], this.loose);
        };
        Comparator.prototype.inspect = function () {
            return '<SemVer Comparator "' + this + '">';
        };
        Comparator.prototype.toString = function () {
            return this.value;
        };
        Comparator.prototype.test = function (version) {
            if (this.semver === ANY)
                return true;
            if (typeof version === 'string')
                version = new SemVer(version, this.loose);
            return cmp(version, this.operator, this.semver, this.loose);
        };
        return Comparator;
    })();
    packadic.Comparator = Comparator;
    var ANY = {};
    var VersionRange = (function () {
        function VersionRange(range, loose) {
            if ((range instanceof VersionRange) && range.loose === loose)
                return range;
            if (!(this instanceof VersionRange))
                return new VersionRange(range, loose);
            this.loose = loose;
            this.raw = range;
            this.set = range.split(/\s*\|\|\s*/).map(function (range) {
                return this.parseRange(range.trim());
            }, this).filter(function (c) {
                return c.length;
            });
            if (!this.set.length) {
                throw new TypeError('Invalid SemVer Range: ' + range);
            }
            this.format();
        }
        VersionRange.prototype.inspect = function () {
            return '<SemVer Range "' + this.range + '">';
        };
        VersionRange.prototype.format = function () {
            this.range = this.set.map(function (comps) {
                return comps.join(' ').trim();
            }).join('||').trim();
            return this.range;
        };
        VersionRange.prototype.toString = function () {
            return this.range;
        };
        VersionRange.prototype.parseRange = function (range) {
            var loose = this.loose;
            range = range.trim();
            var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
            range = range.replace(hr, hyphenReplace);
            range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
            range = range.replace(re[TILDETRIM], tildeTrimReplace);
            range = range.replace(re[CARETTRIM], caretTrimReplace);
            range = range.split(/\s+/).join(' ');
            var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
            var set = range.split(' ').map(function (comp) {
                return parseComparator(comp, loose);
            }).join(' ').split(/\s+/);
            if (this.loose) {
                set = set.filter(function (comp) {
                    return !!comp.match(compRe);
                });
            }
            set = set.map(function (comp) {
                return new Comparator(comp, loose);
            });
            return set;
        };
        VersionRange.prototype.test = function (version) {
            if (!version)
                return false;
            if (typeof version === 'string')
                version = new SemVer(version, this.loose);
            for (var i = 0; i < this.set.length; i++) {
                if (testSet(this.set[i], version))
                    return true;
            }
            return false;
        };
        return VersionRange;
    })();
    packadic.VersionRange = VersionRange;
    function toComparators(range, loose) {
        return new VersionRange(range, loose).set.map(function (comp) {
            return comp.map(function (c) {
                return c.value;
            }).join(' ').trim().split(' ');
        });
    }
    function parseComparator(comp, loose) {
        comp = replaceCarets(comp, loose);
        comp = replaceTildes(comp, loose);
        comp = replaceXRanges(comp, loose);
        comp = replaceStars(comp, loose);
        return comp;
    }
    function isX(id) {
        return !id || id.toLowerCase() === 'x' || id === '*';
    }
    function replaceTildes(comp, loose) {
        return comp.trim().split(/\s+/).map(function (comp) {
            return replaceTilde(comp, loose);
        }).join(' ');
    }
    function replaceTilde(comp, loose) {
        var r = loose ? re[TILDELOOSE] : re[TILDE];
        return comp.replace(r, function (_, M, m, p, pr) {
            var ret;
            if (isX(M))
                ret = '';
            else if (isX(m))
                ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
            else if (isX(p))
                ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
            else if (pr) {
                if (pr.charAt(0) !== '-')
                    pr = '-' + pr;
                ret = '>=' + M + '.' + m + '.' + p + pr +
                    ' <' + M + '.' + (+m + 1) + '.0';
            }
            else
                ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + (+m + 1) + '.0';
            return ret;
        });
    }
    function replaceCarets(comp, loose) {
        return comp.trim().split(/\s+/).map(function (comp) {
            return replaceCaret(comp, loose);
        }).join(' ');
    }
    function replaceCaret(comp, loose) {
        var r = loose ? re[CARETLOOSE] : re[CARET];
        return comp.replace(r, function (_, M, m, p, pr) {
            var ret;
            if (isX(M))
                ret = '';
            else if (isX(m))
                ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
            else if (isX(p)) {
                if (M === '0')
                    ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                else
                    ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
            }
            else if (pr) {
                if (pr.charAt(0) !== '-')
                    pr = '-' + pr;
                if (M === '0') {
                    if (m === '0')
                        ret = '>=' + M + '.' + m + '.' + p + pr +
                            ' <' + M + '.' + m + '.' + (+p + 1);
                    else
                        ret = '>=' + M + '.' + m + '.' + p + pr +
                            ' <' + M + '.' + (+m + 1) + '.0';
                }
                else
                    ret = '>=' + M + '.' + m + '.' + p + pr +
                        ' <' + (+M + 1) + '.0.0';
            }
            else {
                if (M === '0') {
                    if (m === '0')
                        ret = '>=' + M + '.' + m + '.' + p +
                            ' <' + M + '.' + m + '.' + (+p + 1);
                    else
                        ret = '>=' + M + '.' + m + '.' + p +
                            ' <' + M + '.' + (+m + 1) + '.0';
                }
                else
                    ret = '>=' + M + '.' + m + '.' + p +
                        ' <' + (+M + 1) + '.0.0';
            }
            return ret;
        });
    }
    function replaceXRanges(comp, loose) {
        return comp.split(/\s+/).map(function (comp) {
            return replaceXRange(comp, loose);
        }).join(' ');
    }
    function replaceXRange(comp, loose) {
        comp = comp.trim();
        var r = loose ? re[XRANGELOOSE] : re[XRANGE];
        return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
            var xM = isX(M);
            var xm = xM || isX(m);
            var xp = xm || isX(p);
            var anyX = xp;
            if (gtlt === '=' && anyX)
                gtlt = '';
            if (xM) {
                if (gtlt === '>' || gtlt === '<') {
                    ret = '<0.0.0';
                }
                else {
                    ret = '*';
                }
            }
            else if (gtlt && anyX) {
                if (xm)
                    m = 0;
                if (xp)
                    p = 0;
                if (gtlt === '>') {
                    gtlt = '>=';
                    if (xm) {
                        M = +M + 1;
                        m = 0;
                        p = 0;
                    }
                    else if (xp) {
                        m = +m + 1;
                        p = 0;
                    }
                }
                else if (gtlt === '<=') {
                    gtlt = '<';
                    if (xm)
                        M = +M + 1;
                    else
                        m = +m + 1;
                }
                ret = gtlt + M + '.' + m + '.' + p;
            }
            else if (xm) {
                ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
            }
            else if (xp) {
                ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
            }
            return ret;
        });
    }
    function replaceStars(comp, loose) {
        return comp.trim().replace(re[STAR], '');
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
        if (isX(fM))
            from = '';
        else if (isX(fm))
            from = '>=' + fM + '.0.0';
        else if (isX(fp))
            from = '>=' + fM + '.' + fm + '.0';
        else
            from = '>=' + from;
        if (isX(tM))
            to = '';
        else if (isX(tm))
            to = '<' + (+tM + 1) + '.0.0';
        else if (isX(tp))
            to = '<' + tM + '.' + (+tm + 1) + '.0';
        else if (tpr)
            to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
        else
            to = '<=' + to;
        return (from + ' ' + to).trim();
    }
    function testSet(set, version) {
        for (var i = 0; i < set.length; i++) {
            if (!set[i].test(version))
                return false;
        }
        if (version.prerelease.length) {
            for (var i = 0; i < set.length; i++) {
                if (set[i].semver === ANY)
                    continue;
                if (set[i].semver.prerelease.length > 0) {
                    var allowed = set[i].semver;
                    if (allowed.major === version.major &&
                        allowed.minor === version.minor &&
                        allowed.patch === version.patch)
                        return true;
                }
            }
            return false;
        }
        return true;
    }
    function satisfies(version, range, loose) {
        try {
            range = new VersionRange(range, loose);
        }
        catch (er) {
            return false;
        }
        return range.test(version);
    }
    function maxSatisfying(versions, range, loose) {
        return versions.filter(function (version) {
            return satisfies(version, range, loose);
        }).sort(function (a, b) {
            return rcompare(a, b, loose);
        })[0] || null;
    }
    function validRange(range, loose) {
        try {
            return new VersionRange(range, loose).range || '*';
        }
        catch (er) {
            return null;
        }
    }
    function ltr(version, range, loose) {
        return outside(version, range, '<', loose);
    }
    function gtr(version, range, loose) {
        return outside(version, range, '>', loose);
    }
    function outside(version, range, hilo, loose) {
        version = new SemVer(version, loose);
        range = new VersionRange(range, loose);
        var gtfn, ltefn, ltfn, comp, ecomp;
        switch (hilo) {
            case '>':
                gtfn = gt;
                ltefn = lte;
                ltfn = lt;
                comp = '>';
                ecomp = '>=';
                break;
            case '<':
                gtfn = lt;
                ltefn = gte;
                ltfn = gt;
                comp = '<';
                ecomp = '<=';
                break;
            default:
                throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version, range, loose)) {
            return false;
        }
        for (var i = 0; i < range.set.length; ++i) {
            var comparators = range.set[i];
            var high = null;
            var low = null;
            comparators.forEach(function (comparator) {
                if (comparator.semver === ANY) {
                    comparator = new Comparator('>=0.0.0');
                }
                high = high || comparator;
                low = low || comparator;
                if (gtfn(comparator.semver, high.semver, loose)) {
                    high = comparator;
                }
                else if (ltfn(comparator.semver, low.semver, loose)) {
                    low = comparator;
                }
            });
            if (high.operator === comp || high.operator === ecomp) {
                return false;
            }
            if ((!low.operator || low.operator === comp) &&
                ltefn(version, low.semver)) {
                return false;
            }
            else if (low.operator === ecomp && ltfn(version, low.semver)) {
                return false;
            }
        }
        return true;
    }
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var layoutStyle = {};
    $(function () {
        var class2key = {};
        function getKey(className) {
            return class2key[className];
        }
        function getPropString(prop) {
            return Array.isArray(prop) ? prop.map(this.escape).join('.') : prop;
        }
        function add(key, className, def) {
            if (def === void 0) { def = true; }
            class2key[className] = key;
            packadic.objectSet(layoutStyle, getPropString(key), def);
            def === true && !document.body.classList.contains(className) && document.body.classList.add(className);
            var pathObserver = new observejs.PathObserver(layoutStyle, getPropString(key), def);
            pathObserver.open(function (newValue, oldValue) {
                var list = document.body.classList;
                if (newValue === true && !list.contains(className)) {
                    list.add(className);
                }
                else if (newValue === false && list.contains(className)) {
                    list.remove(className);
                }
            });
            return layoutStyle;
        }
        var bodyObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var list = document.body.classList;
                var current = document.body.className.split(' ');
                var old = mutation.oldValue.split(' ');
                var added = current.length > old.length;
                var classes = packadic._.difference(added ? current : old, added ? old : current);
                classes.forEach(function (className) {
                    if (!packadic.defined(getKey(className)))
                        return;
                    packadic.objectSet(layoutStyle, getPropString(getKey(className)), added);
                });
                if (packadic.defined(packadic.App.vm))
                    packadic.App.vm._digest();
            });
        });
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'], attributeOldValue: true });
        layoutStyle._add = add;
        layoutStyle._add('footer.fixed', 'page-footer-fixed')
            ._add('header.fixed', 'page-header-fixed')
            ._add('page.edged', 'page-edged')
            ._add('page.boxed', 'page-boxed');
    });
    var Layout = (function () {
        function Layout() {
            this.style = layoutStyle;
            var resize;
            $(window).resize(function () {
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    packadic.App.emit('layout:resize');
                }, 50);
            });
        }
        Object.defineProperty(Layout.prototype, "settings", {
            get: function () {
                return packadic.JSON.parse(packadic.JSON.parse(window.getComputedStyle(document.body, '::before').getPropertyValue('content'))).style;
            },
            enumerable: true,
            configurable: true
        });
        Layout.prototype.getBreakpoint = function (which) {
            return parseInt(this.settings.breakpoints[which]);
        };
        Layout.prototype.calculateViewportHeight = function () {
            var sidebarHeight = packadic.getViewPort().height - packadic.App.$e('header').outerHeight();
            if (this.style.footer.fixed) {
                sidebarHeight = sidebarHeight - packadic.App.$e('footer').outerHeight();
            }
            return sidebarHeight;
        };
        Layout.prototype.scrollTo = function (ele, offset) {
            var $el = typeof (ele) === 'string' ? $(ele) : ele;
            var pos = ($el && $el.size() > 0) ? $el.offset().top : 0;
            if ($el) {
                if (packadic.App.$e('body').hasClass('page-header-fixed')) {
                    pos = pos - packadic.App.$e('header').height();
                }
                pos = pos + (offset ? offset : -1 * $el.height());
            }
            $('html,body').animate({
                scrollTop: pos
            }, 'slow');
        };
        Layout.prototype.scrollTop = function () {
            this.scrollTo();
        };
        return Layout;
    })();
    packadic.Layout = Layout;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var BaseComponent = (function () {
        function BaseComponent() {
        }
        BaseComponent.prototype.$add = function (key, val) {
        };
        BaseComponent.prototype.$addChild = function (options, constructor) {
        };
        BaseComponent.prototype.$after = function (target, cb) {
        };
        BaseComponent.prototype.$appendTo = function (target, cb) {
        };
        BaseComponent.prototype.$before = function (target, cb) {
        };
        BaseComponent.prototype.$broadcast = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        BaseComponent.prototype.$compile = function (el) {
            return function () {
            };
        };
        BaseComponent.prototype.$delete = function (key) {
        };
        BaseComponent.prototype.$destroy = function (remove) {
        };
        BaseComponent.prototype.$dispatch = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        BaseComponent.prototype.$emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        BaseComponent.prototype.$eval = function (text) {
        };
        BaseComponent.prototype.$get = function (exp) {
        };
        BaseComponent.prototype.$interpolate = function (text) {
        };
        BaseComponent.prototype.$log = function (path) {
        };
        BaseComponent.prototype.$mount = function (el) {
        };
        BaseComponent.prototype.$nextTick = function (fn) {
        };
        BaseComponent.prototype.$off = function (event, fn) {
        };
        BaseComponent.prototype.$on = function (event, fn) {
        };
        BaseComponent.prototype.$once = function (event, fn) {
        };
        BaseComponent.prototype.$remove = function (cb) {
        };
        BaseComponent.prototype.$set = function (exp, val) {
        };
        BaseComponent.prototype.$watch = function (exp, cb, options) {
        };
        BaseComponent.prototype._digest = function () {
        };
        BaseComponent.COMPONENT = true;
        return BaseComponent;
    })();
    packadic.BaseComponent = BaseComponent;
    function LifecycleHook(hook) {
        return function (cls, name, desc) {
            if ([
                'created', 'beforeCompile', 'compiled', 'ready', 'attached', 'detached', 'beforeDestroy', 'destroyed'
            ].indexOf(hook) == -1)
                throw new Error('Unknown Lifecyle Hook: ' + hook);
            if (!cls.hasOwnProperty('__hooks__'))
                cls.__hooks__ = {};
            cls.__hooks__[name] = cls[name];
            desc.value = void 0;
            return desc;
        };
    }
    packadic.LifecycleHook = LifecycleHook;
    function EventHook(hook) {
        return function (cls, name, desc) {
            if (!cls.hasOwnProperty('__events__'))
                cls.__events__ = {};
            cls.__events__[name] = cls[name];
            desc.value = void 0;
            return desc;
        };
    }
    packadic.EventHook = EventHook;
    function Prop(options) {
        return function (cls, name) {
            if (!cls.hasOwnProperty('__props__'))
                cls.__props__ = {};
            cls.__props__[name] = options;
        };
    }
    packadic.Prop = Prop;
    function componentOptions(cls) {
        var options = {
            data: (function () {
                return new cls();
            }),
            methods: {},
            computed: {}
        };
        if (cls.hasOwnProperty('replace'))
            options.replace = cls.replace;
        if (cls.hasOwnProperty('template'))
            options.template = cls.template;
        if (cls.hasOwnProperty('components'))
            options.components = cls.components;
        if (cls.hasOwnProperty('mixins'))
            options.mixins = cls.mixins;
        var obj = new cls();
        var proto = Object.getPrototypeOf(obj);
        if (proto.hasOwnProperty('__props__'))
            options.props = proto.__props__;
        if (proto.hasOwnProperty('__events__'))
            options.events = proto.__events__;
        if (proto.hasOwnProperty('__hooks__'))
            packadic.Vue['util'].extend(options, proto.__hooks__);
        Object.getOwnPropertyNames(proto).forEach(function (method) {
            if (['constructor'].indexOf(method) > -1)
                return;
            var desc = Object.getOwnPropertyDescriptor(proto, method);
            if (typeof desc.value === 'function')
                options.methods[method] = proto[method];
            else if (typeof desc.set === 'function')
                options.computed[method] = {
                    get: desc.get,
                    set: desc.set
                };
            else if (typeof desc.get === 'function')
                options.computed[method] = desc.get;
        });
        return options;
    }
    packadic.componentOptions = componentOptions;
    function Component(name, children) {
        return function (cls) {
            var options = componentOptions(cls);
            console.groupCollapsed('Component: ' + name);
            console.log('cls', cls);
            if (!packadic.defined(options.template) && packadic.defined(packadic.templates[name])) {
                options.template = packadic.templates[name];
            }
            if (packadic.defined(children)) {
                options.components = options.components || {};
                Object.keys(children).forEach(function (key) {
                    options.components[key] = componentOptions(children[key]);
                    options.components[key].name = key;
                });
            }
            console.log('options', options);
            console.log('children', children);
            console.groupEnd();
            packadic.Vue.component(name, options);
        };
    }
    packadic.Component = Component;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.MetaStore.template('directive', {
        params: [],
        paramWatchers: {},
        deep: false,
        twoWay: false,
        acceptStatement: false,
        bind: function () {
        },
        update: function () {
        },
        unbind: function () {
        },
    });
    function Directive(id, elementDirective) {
        if (elementDirective === void 0) { elementDirective = false; }
        return function (target) {
            console.groupCollapsed('Directive: ' + id);
            console.log('prototype', target.prototype);
            var options = packadic.MetaStore.for(target.prototype, 'directive').store.get();
            Object.getOwnPropertyNames(target.prototype).forEach(function (key) {
                if (key === 'constructor')
                    return;
                var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
                if (typeof descriptor.value === 'function') {
                    options[key] = descriptor.value;
                }
            });
            Object.keys(target).forEach(function (key) {
                options[key] = target[key];
            });
            if (elementDirective) {
                packadic.Vue.elementDirective(id, options);
            }
            else {
                packadic.Vue.directive(id, options);
            }
            console.log('Directive', id, options);
            packadic.MetaStore.for(target.prototype).cleanTarget();
            console.groupEnd();
            return target;
        };
    }
    packadic.Directive = Directive;
    function ParamWatcher(id) {
        return function (target, key) {
            id = id || key;
            console.log('ParamWatcher', id);
            packadic.MetaStore.for(target, 'directive').store.set('paramWatchers.' + id, target[key]);
            return target;
        };
    }
    packadic.ParamWatcher = ParamWatcher;
    var BaseDirective = (function () {
        function BaseDirective() {
            var myPrototype = BaseDirective.prototype;
            packadic._.each(myPrototype, function (propertyName, value) {
                delete myPrototype[propertyName];
            });
        }
        Object.defineProperty(BaseDirective.prototype, "$el", {
            get: function () {
                return $(this.el);
            },
            enumerable: true,
            configurable: true
        });
        BaseDirective.prototype.$set = function (exp, val) {
        };
        BaseDirective.prototype.$delete = function (key) {
        };
        BaseDirective.prototype.set = function (value) {
        };
        BaseDirective.prototype.on = function (event, handler) {
        };
        BaseDirective.prototype.bind = function () {
        };
        BaseDirective.prototype.unbind = function () {
        };
        BaseDirective.prototype.update = function (newValue, oldValue) {
        };
        return BaseDirective;
    })();
    packadic.BaseDirective = BaseDirective;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    function Transition(id, css) {
        if (css === void 0) { css = true; }
        return function (target) {
            console.groupCollapsed('Transition: ' + id);
            console.log(id, target.prototype);
            var options = { css: css };
            Object.keys(target).forEach(function (key) {
                options[key] = target[key];
            });
            Object.getOwnPropertyNames(target.prototype).forEach(function (key) {
                if (key === 'constructor')
                    return;
                var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
                if (typeof descriptor.value === 'function') {
                    options[key] = descriptor.value;
                }
            });
            packadic.Vue.transition(id, options);
            console.log('options', options);
            console.groupEnd();
            return target;
        };
    }
    packadic.Transition = Transition;
    var BaseTransition = (function () {
        function BaseTransition() {
        }
        BaseTransition.prototype.enter = function (el, done) { };
        ;
        return BaseTransition;
    })();
    packadic.BaseTransition = BaseTransition;
    var BaseJqueryTransition = (function (_super) {
        __extends(BaseJqueryTransition, _super);
        function BaseJqueryTransition() {
            _super.apply(this, arguments);
        }
        BaseJqueryTransition.prototype.enterCancelled = function (el) {
            $(el).stop();
        };
        BaseJqueryTransition.prototype.leaveCancelled = function (el) {
            $(el).stop();
        };
        return BaseJqueryTransition;
    })(BaseTransition);
    packadic.BaseJqueryTransition = BaseJqueryTransition;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.registerJQueryHelpers();
    (function (AppState) {
        AppState[AppState["PRE_INIT"] = 0] = "PRE_INIT";
        AppState[AppState["INITIALISING"] = 1] = "INITIALISING";
        AppState[AppState["INITIALISED"] = 2] = "INITIALISED";
        AppState[AppState["STARTING"] = 3] = "STARTING";
        AppState[AppState["STARTED"] = 4] = "STARTED";
    })(packadic.AppState || (packadic.AppState = {}));
    var AppState = packadic.AppState;
    var App = (function () {
        function App() {
            throw new Error('App should not be instantiated');
        }
        App.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        App.once = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        App.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        App.emit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        Object.defineProperty(App, "log", {
            get: function () {
                return packadic.log;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App, "out", {
            get: function () {
                return packadic.out;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App, "layout", {
            get: function () {
                return this._layout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App, "vm", {
            get: function () {
                return App._vm;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App, "router", {
            get: function () {
                return App._router;
            },
            enumerable: true,
            configurable: true
        });
        App.$e = function (vel) {
            return $(App.vm.$els[vel]);
        };
        App.init = function (opts) {
            if (opts === void 0) { opts = {}; }
            App._state = AppState.INITIALISING;
            App.emit('INITIALISING');
            App.out.addDefaults();
            App.out.macro('title', 'Packadic');
            App.out.macro('alert', 'v1.0.0-alpha');
            if (App.config('router.enabled')) {
                App._router = new packadic.VueRouter(App.config('router.options'));
            }
            this._VM = packadic.Vue.extend(packadic._.merge({
                data: function () {
                    return {
                        showPageLoader: true,
                        layout: {
                            footer: { text: 'Copyright &copy; Codex ' + (new Date()).getFullYear() },
                            header: { title: 'Codex' }
                        },
                        sidebar: { items: [] }
                    };
                },
                computed: {
                    layoutStyle: {
                        get: function () { return App.layout.style; }
                    }
                }
            }, opts));
            App._state = AppState.INITIALISED;
            App.emit('INITIALISED');
            return this;
        };
        App.start = function (opts) {
            if (opts === void 0) { opts = {}; }
            var defer = packadic.createPromise();
            App._state = AppState.STARTING;
            App.emit('STARTING');
            if (packadic.defined(opts.data)) {
                var data = packadic._.cloneDeep(opts.data);
                opts.data = function () {
                    return data;
                };
            }
            console.warn('opts data', opts);
            $(function () {
                if (App.config('router.enabled')) {
                    App.router.start(App._VM.extend(opts), App.config('router.mount'));
                    App._vm = App.router.app;
                }
                else {
                    App._vm = new App._VM(opts);
                    App.vm.$mount(App.config('app.mount'));
                }
                if (App.config('app.loader.enabled') && App.config('app.loader.autoHideOnStart')) {
                    App.vm.$set('showPageLoader', false);
                }
                $('a.nogo').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
                App._state = AppState.STARTED;
                App.emit('STARTED');
                defer.resolve();
            });
            return defer.promise;
        };
        App.dataRequest = function (name, fn) {
            return App.vm.$http.get('/data/' + name + '.json', fn);
        };
        App.share = function (name, creator) {
            if (packadic.defined(App._sharedConstructors[name]))
                return;
            App._sharedConstructors[name] = creator;
        };
        App.shared = function (shareId, name) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!packadic.defined(App._sharedInstances[shareId])) {
                App._sharedInstances[shareId] = App._sharedConstructors[name].apply(App, args);
            }
            return App._sharedInstances[shareId];
        };
        App._layout = new packadic.Layout();
        App._state = AppState.PRE_INIT;
        App.defaults = {
            debug: false,
            logging: {
                level: packadic.log.levels.DEBUG
            },
            router: {
                enabled: true,
                mount: '<%= app.mount %>',
                options: {
                    hashbang: true,
                    history: false,
                    abstract: false,
                    root: null,
                    linkActiveClass: 'v-link-active',
                    saveScrollPosition: false,
                    transitionOnLoad: true
                }
            },
            app: {
                mount: 'html',
                loader: {
                    enabled: true,
                    autoHideOnStart: true
                }
            }
        };
        App._sharedConstructors = {};
        App._sharedInstances = {};
        return App;
    })();
    packadic.App = App;
    var config = new packadic.ConfigObject(App.defaults);
    App.config = packadic.ConfigObject.makeProperty(config);
    packadic.makeEventEmitter(App, {
        assignMethods: ['on', 'once', 'off', 'emit'],
        assignPrivateMethods: []
    });
    App.on('**', function () {
        console.log('event', this.event, arguments);
    });
})(packadic || (packadic = {}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var packadic;
(function (packadic) {
    var SharedGridData = (function () {
        function SharedGridData(grid) {
            this._grid = grid;
            this._paginator = pagination.create('search', { prelink: '/', current: 1, rowsPerPage: 10, totalResult: 0 });
        }
        Object.defineProperty(SharedGridData.prototype, "paginator", {
            get: function () {
                return this._paginator;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(SharedGridData.prototype, "grid", {
            get: function () {
                return this._grid;
            },
            enumerable: true,
            configurable: true
        });
        ;
        return SharedGridData;
    })();
    packadic.App.share('paginator', function () { return pagination.create('search', { prelink: '/', current: 1, rowsPerPage: 10, totalResult: 0 }); });
    var GridComponent = (function (_super) {
        __extends(GridComponent, _super);
        function GridComponent() {
            _super.apply(this, arguments);
            this.sortColumn = '';
            this.reversed = {};
            this.paginator = Object.create({});
        }
        Object.defineProperty(GridComponent.prototype, "pager", {
            get: function () {
                return this.$data.paginator.getPaginationData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridComponent.prototype, "filteredRows", {
            get: function () {
                return this.$options.filters.filterBy(this.rows, this.filterKey);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridComponent.prototype, "currentPage", {
            get: function () {
                if (this.paginator) {
                    return this.filteredRows.slice(this.pager.fromResult, this.pager.toResult);
                }
                return [];
            },
            enumerable: true,
            configurable: true
        });
        GridComponent.prototype.sortBy = function (column) {
            this.$set('sortColumn', column);
            this.$data.reversed[column] = !this.$data.reversed[column];
        };
        GridComponent.prototype.beforeCompile = function () {
            this.$data.paginator = packadic.App.shared(this.shareId, 'paginator');
        };
        GridComponent.prototype.compiled = function () {
            var _this = this;
            this.$watch('rows + perPage', function () {
                _this.paginator.set('rowsPerPage', _this.perPage);
                _this.paginator.set('totalResult', _this.filteredRows.length);
            });
            this.$watch('sortColumn + reversed', function () { return _this.columns.forEach(function (column) { return _this.$set('reversed.' + column, false); }); });
        };
        GridComponent.template = packadic.templates['grid'];
        __decorate([
            packadic.Prop({ type: Array }), 
            __metadata('design:type', Array)
        ], GridComponent.prototype, "rows");
        __decorate([
            packadic.Prop({ type: Array }), 
            __metadata('design:type', Array)
        ], GridComponent.prototype, "columns");
        __decorate([
            packadic.Prop({ type: String }), 
            __metadata('design:type', String)
        ], GridComponent.prototype, "filterKey");
        __decorate([
            packadic.Prop({ type: Number, 'default': 10 }), 
            __metadata('design:type', Number)
        ], GridComponent.prototype, "perPage");
        __decorate([
            packadic.Prop({ type: String }), 
            __metadata('design:type', String)
        ], GridComponent.prototype, "shareId");
        Object.defineProperty(GridComponent.prototype, "beforeCompile",
            __decorate([
                packadic.LifecycleHook('created'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], GridComponent.prototype, "beforeCompile", Object.getOwnPropertyDescriptor(GridComponent.prototype, "beforeCompile")));
        Object.defineProperty(GridComponent.prototype, "compiled",
            __decorate([
                packadic.LifecycleHook('compiled'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], GridComponent.prototype, "compiled", Object.getOwnPropertyDescriptor(GridComponent.prototype, "compiled")));
        GridComponent = __decorate([
            packadic.Component('grid'), 
            __metadata('design:paramtypes', [])
        ], GridComponent);
        return GridComponent;
    })(packadic.BaseComponent);
    packadic.GridComponent = GridComponent;
    var PaginationComponent = (function (_super) {
        __extends(PaginationComponent, _super);
        function PaginationComponent() {
            _super.apply(this, arguments);
            this.paginator = Object.create({});
        }
        PaginationComponent.prototype.beforeCompile = function () {
            this.$data.paginator = packadic.App.shared(this.shareId, 'paginator');
            this.$data.paginator.set('pageLinks', this.maxLinks);
        };
        Object.defineProperty(PaginationComponent.prototype, "pager", {
            get: function () {
                return this.paginator.getPaginationData();
            },
            enumerable: true,
            configurable: true
        });
        PaginationComponent.prototype.isCurrent = function (index) {
            return this.paginator.getPaginationData().current === index;
        };
        PaginationComponent.prototype.goto = function (index, event) {
            event.preventDefault();
            this.paginator.set('current', index);
        };
        PaginationComponent.prototype.next = function (event) {
            event.preventDefault();
            if (!this.pager.next)
                return;
            this.paginator.set('current', this.pager.next);
        };
        PaginationComponent.prototype.prev = function (event) {
            event.preventDefault();
            if (!this.pager.previous)
                return;
            this.paginator.set('current', this.pager.previous);
        };
        PaginationComponent.template = packadic.templates['pagination'];
        __decorate([
            packadic.Prop({ type: String }), 
            __metadata('design:type', String)
        ], PaginationComponent.prototype, "shareId");
        __decorate([
            packadic.Prop({ type: Number, default: 5 }), 
            __metadata('design:type', Number)
        ], PaginationComponent.prototype, "maxLinks");
        Object.defineProperty(PaginationComponent.prototype, "beforeCompile",
            __decorate([
                packadic.LifecycleHook('beforeCompile'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], PaginationComponent.prototype, "beforeCompile", Object.getOwnPropertyDescriptor(PaginationComponent.prototype, "beforeCompile")));
        PaginationComponent = __decorate([
            packadic.Component('pagination'), 
            __metadata('design:paramtypes', [])
        ], PaginationComponent);
        return PaginationComponent;
    })(packadic.BaseComponent);
    packadic.PaginationComponent = PaginationComponent;
    var GridDirective = (function (_super) {
        __extends(GridDirective, _super);
        function GridDirective() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(GridDirective.prototype, "paginator", {
            get: function () {
                return packadic.App.shared(this.params.shareId, 'paginator');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridDirective.prototype, "pager", {
            get: function () {
                return this.paginator.getPaginationData();
            },
            enumerable: true,
            configurable: true
        });
        GridDirective.prototype.bind = function () {
        };
        GridDirective.prototype.update = function (value) {
        };
        GridDirective.params = ['share-id'];
        GridDirective = __decorate([
            packadic.Directive('grid'), 
            __metadata('design:paramtypes', [])
        ], GridDirective);
        return GridDirective;
    })(packadic.BaseDirective);
    packadic.GridDirective = GridDirective;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var PageBreadcrumbItemComponent = (function (_super) {
        __extends(PageBreadcrumbItemComponent, _super);
        function PageBreadcrumbItemComponent() {
            _super.apply(this, arguments);
        }
        PageBreadcrumbItemComponent.prototype.beforeCompile = function () {
            var _this = this;
            if (packadic.defined(this.item))
                Object.keys(this.item).forEach(function (key) {
                    _this[key] = _this.item[key];
                });
        };
        Object.defineProperty(PageBreadcrumbItemComponent.prototype, "link", {
            get: function () {
                var link = {
                    type: this.type
                };
                link[this.type] = this[this.type];
                return link;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            packadic.Prop({ type: Object, required: false }), 
            __metadata('design:type', Object)
        ], PageBreadcrumbItemComponent.prototype, "item");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return 'href'; } }), 
            __metadata('design:type', String)
        ], PageBreadcrumbItemComponent.prototype, "type");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], PageBreadcrumbItemComponent.prototype, "route");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], PageBreadcrumbItemComponent.prototype, "path");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return 'javascript:;'; } }), 
            __metadata('design:type', String)
        ], PageBreadcrumbItemComponent.prototype, "href");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], PageBreadcrumbItemComponent.prototype, "title");
        __decorate([
            packadic.Prop({ type: Boolean, required: false, 'default': function () { return true; } }), 
            __metadata('design:type', Boolean)
        ], PageBreadcrumbItemComponent.prototype, "arrow");
        Object.defineProperty(PageBreadcrumbItemComponent.prototype, "beforeCompile",
            __decorate([
                packadic.LifecycleHook('beforeCompile'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], PageBreadcrumbItemComponent.prototype, "beforeCompile", Object.getOwnPropertyDescriptor(PageBreadcrumbItemComponent.prototype, "beforeCompile")));
        PageBreadcrumbItemComponent = __decorate([
            packadic.Component('page-breadcrumb'), 
            __metadata('design:paramtypes', [])
        ], PageBreadcrumbItemComponent);
        return PageBreadcrumbItemComponent;
    })(packadic.BaseComponent);
    packadic.PageBreadcrumbItemComponent = PageBreadcrumbItemComponent;
    var PageBreadcrumbsComponent = (function (_super) {
        __extends(PageBreadcrumbsComponent, _super);
        function PageBreadcrumbsComponent() {
            _super.apply(this, arguments);
        }
        PageBreadcrumbsComponent.prototype.isLast = function (index) {
            return this.items.length === index - 1;
        };
        PageBreadcrumbsComponent.prototype.beforeCompile = function () {
            if (this.autofix && packadic.defined(this.items)) {
                this.items[this.items.length - 1]['arrow'] = false;
            }
        };
        PageBreadcrumbsComponent.prototype.ready = function () {
            if (this.autofix && !packadic.defined(this.items)) {
                var lia = this.$els['pageBreadcrumbs'].querySelectorAll('li');
                if (!lia.length > 0)
                    return;
                var i = lia.item(lia.length - 1).getElementsByTagName('i');
                if (!i.length > 0)
                    return;
                i[0].remove();
            }
        };
        __decorate([
            packadic.Prop({ type: Array, required: false }), 
            __metadata('design:type', Array)
        ], PageBreadcrumbsComponent.prototype, "items");
        __decorate([
            packadic.Prop({ type: Boolean, required: false, 'default': function () { return true; } }), 
            __metadata('design:type', Boolean)
        ], PageBreadcrumbsComponent.prototype, "autofix");
        Object.defineProperty(PageBreadcrumbsComponent.prototype, "beforeCompile",
            __decorate([
                packadic.LifecycleHook('beforeCompile'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], PageBreadcrumbsComponent.prototype, "beforeCompile", Object.getOwnPropertyDescriptor(PageBreadcrumbsComponent.prototype, "beforeCompile")));
        Object.defineProperty(PageBreadcrumbsComponent.prototype, "ready",
            __decorate([
                packadic.LifecycleHook('ready'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], PageBreadcrumbsComponent.prototype, "ready", Object.getOwnPropertyDescriptor(PageBreadcrumbsComponent.prototype, "ready")));
        PageBreadcrumbsComponent = __decorate([
            packadic.Component('page-breadcrumbs'), 
            __metadata('design:paramtypes', [])
        ], PageBreadcrumbsComponent);
        return PageBreadcrumbsComponent;
    })(packadic.BaseComponent);
    packadic.PageBreadcrumbsComponent = PageBreadcrumbsComponent;
    var PageComponent = (function (_super) {
        __extends(PageComponent, _super);
        function PageComponent() {
            _super.apply(this, arguments);
        }
        __decorate([
            packadic.Prop({ type: String, required: false }), 
            __metadata('design:type', String)
        ], PageComponent.prototype, "title");
        __decorate([
            packadic.Prop({ type: String, required: false }), 
            __metadata('design:type', String)
        ], PageComponent.prototype, "subtitle");
        __decorate([
            packadic.Prop({ type: Boolean, required: false, 'default': function () { return true; } }), 
            __metadata('design:type', String)
        ], PageComponent.prototype, "seperator");
        PageComponent = __decorate([
            packadic.Component('page'), 
            __metadata('design:paramtypes', [])
        ], PageComponent);
        return PageComponent;
    })(packadic.BaseComponent);
    packadic.PageComponent = PageComponent;
    var PageContentSizerDirective = (function (_super) {
        __extends(PageContentSizerDirective, _super);
        function PageContentSizerDirective() {
            _super.apply(this, arguments);
        }
        PageContentSizerDirective.prototype.listener = function () {
            if (packadic.getViewPort().width >= packadic.App.layout.getBreakpoint('md')) {
                $(this.el).css('min-height', packadic.App.layout.calculateViewportHeight());
            }
            else {
                $(this.el).removeAttr('style');
            }
        };
        ;
        PageContentSizerDirective.prototype.bind = function () {
            var _this = this;
            $(function () { return packadic.App.on('layout:resize', function () { return _this.listener(); }) && _this.listener(); });
        };
        PageContentSizerDirective.prototype.unbind = function () {
            var _this = this;
            packadic.App.off('layout:resize', function () { return _this.listener(); });
        };
        PageContentSizerDirective = __decorate([
            packadic.Directive('page-height-resizer'), 
            __metadata('design:paramtypes', [])
        ], PageContentSizerDirective);
        return PageContentSizerDirective;
    })(packadic.BaseDirective);
    packadic.PageContentSizerDirective = PageContentSizerDirective;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.route = function route(name, path, viewPath, config) {
        if (config === void 0) { config = {}; }
        packadic.App.router.on(path, packadic._.merge({
            name: name,
            component: packadic.view(viewPath)
        }, config));
    };
    packadic.route.link = function (type, typeValue, target) {
        var link = {};
        link.type = type;
        link[link.type] = typeValue;
        if (target) {
            link.target = target;
        }
        return link;
    };
    var LinkComponent = (function (_super) {
        __extends(LinkComponent, _super);
        function LinkComponent() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(LinkComponent.prototype, "_type", {
            get: function () {
                if (!packadic.defined(this.type)) {
                    if (packadic.defined(this.path) && this.path.length > 0) {
                        return 'path';
                    }
                    else if (packadic.defined(this.route) && this.route.length > 0) {
                        return 'route';
                    }
                    else {
                        return 'href';
                    }
                }
                else {
                    return this.type;
                }
            },
            enumerable: true,
            configurable: true
        });
        LinkComponent.prototype.isType = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return args.indexOf(this._type) !== -1;
        };
        Object.defineProperty(LinkComponent.prototype, "attrs", {
            get: function () {
                var attrs = {
                    target: '_' + this.target
                };
                if (this.isType('href')) {
                    attrs.href = this.href;
                }
                return attrs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkComponent.prototype, "vlink", {
            get: function () {
                var vlink = {};
                if (this.isType('route')) {
                    vlink['name'] = this.route;
                }
                else if (this.isType('path')) {
                    vlink['path'] = this.path;
                }
                return vlink;
            },
            enumerable: true,
            configurable: true
        });
        LinkComponent.prototype.beforeCompile = function () {
            var _this = this;
            if (packadic.defined(this.link))
                Object.keys(this.link).forEach(function (key) {
                    _this[key] = _this.link[key];
                });
        };
        __decorate([
            packadic.Prop({ type: Object, required: false }), 
            __metadata('design:type', Object)
        ], LinkComponent.prototype, "link");
        __decorate([
            packadic.Prop({ type: String, required: false }), 
            __metadata('design:type', String)
        ], LinkComponent.prototype, "type");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return 'javascript:;'; } }), 
            __metadata('design:type', String)
        ], LinkComponent.prototype, "href");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], LinkComponent.prototype, "route");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], LinkComponent.prototype, "path");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return 'self'; } }), 
            __metadata('design:type', String)
        ], LinkComponent.prototype, "target");
        Object.defineProperty(LinkComponent.prototype, "beforeCompile",
            __decorate([
                packadic.LifecycleHook('beforeCompile'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], LinkComponent.prototype, "beforeCompile", Object.getOwnPropertyDescriptor(LinkComponent.prototype, "beforeCompile")));
        LinkComponent = __decorate([
            packadic.Component('alink'), 
            __metadata('design:paramtypes', [])
        ], LinkComponent);
        return LinkComponent;
    })(packadic.BaseComponent);
    packadic.LinkComponent = LinkComponent;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var SidebarItemComponent = (function (_super) {
        __extends(SidebarItemComponent, _super);
        function SidebarItemComponent() {
            _super.apply(this, arguments);
            this.children = [];
            this.isOpen = false;
        }
        Object.defineProperty(SidebarItemComponent.prototype, "hasSubmenu", {
            get: function () {
                return (this.hasChildren === true || this.children.length > 0) && this.type === 'folder';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidebarItemComponent.prototype, "link", {
            get: function () {
                var link = {
                    type: this.type
                };
                link[this.type] = this[this.type];
                return link;
            },
            enumerable: true,
            configurable: true
        });
        SidebarItemComponent.prototype.toggle = function () {
            this.isOpen ? this.close() : this.open(true);
        };
        SidebarItemComponent.prototype.isType = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return args.indexOf(this.type) !== -1;
        };
        SidebarItemComponent.prototype.close = function () {
            this.isOpen = false;
        };
        SidebarItemComponent.prototype.open = function (closeOthers) {
            if (closeOthers === void 0) { closeOthers = false; }
            if (!this.hasSubmenu)
                return;
            if (closeOthers)
                this.$parent.$eval('closeSubmenus()');
            this.isOpen = true;
        };
        SidebarItemComponent.prototype.closeSubmenus = function () {
            this.close();
            return true;
        };
        SidebarItemComponent.prototype.beforeCompile = function () {
            var _this = this;
            if (packadic.defined(this.item))
                Object.keys(this.item).forEach(function (key) {
                    _this[key] = _this.item[key];
                });
        };
        SidebarItemComponent.template = packadic.templates['sidebar-item'];
        __decorate([
            packadic.Prop({ type: Object, required: false }), 
            __metadata('design:type', Object)
        ], SidebarItemComponent.prototype, "item");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], SidebarItemComponent.prototype, "title");
        __decorate([
            packadic.Prop({ type: String, required: false }), 
            __metadata('design:type', String)
        ], SidebarItemComponent.prototype, "icon");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return 'javascript:;'; } }), 
            __metadata('design:type', String)
        ], SidebarItemComponent.prototype, "href");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return 'href'; } }), 
            __metadata('design:type', String)
        ], SidebarItemComponent.prototype, "type");
        __decorate([
            packadic.Prop({ type: Boolean, required: false, 'default': function () { return false; } }), 
            __metadata('design:type', Boolean)
        ], SidebarItemComponent.prototype, "isActive");
        __decorate([
            packadic.Prop({ type: Boolean, required: false, 'default': function () { return false; } }), 
            __metadata('design:type', Boolean)
        ], SidebarItemComponent.prototype, "hasChildren");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], SidebarItemComponent.prototype, "route");
        __decorate([
            packadic.Prop({ type: String, required: false, 'default': function () { return ''; } }), 
            __metadata('design:type', String)
        ], SidebarItemComponent.prototype, "path");
        Object.defineProperty(SidebarItemComponent.prototype, "closeSubmenus",
            __decorate([
                packadic.EventHook('closeSubmenus'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', Boolean)
            ], SidebarItemComponent.prototype, "closeSubmenus", Object.getOwnPropertyDescriptor(SidebarItemComponent.prototype, "closeSubmenus")));
        Object.defineProperty(SidebarItemComponent.prototype, "beforeCompile",
            __decorate([
                packadic.LifecycleHook('beforeCompile'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], SidebarItemComponent.prototype, "beforeCompile", Object.getOwnPropertyDescriptor(SidebarItemComponent.prototype, "beforeCompile")));
        return SidebarItemComponent;
    })(packadic.BaseComponent);
    packadic.SidebarItemComponent = SidebarItemComponent;
    var SidebarComponent = (function (_super) {
        __extends(SidebarComponent, _super);
        function SidebarComponent() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(SidebarComponent.prototype, "bodyClass", {
            get: function () {
                return document.body.classList;
            },
            enumerable: true,
            configurable: true
        });
        SidebarComponent.prototype.ensureBodyClass = function (name, shouldExist) {
            if (shouldExist === void 0) { shouldExist = true; }
            if (shouldExist && !this.bodyClass.contains(name)) {
                this.bodyClass.add(name);
            }
            else if (!shouldExist && this.bodyClass.contains(name)) {
                this.bodyClass.remove(name);
            }
            this._digest();
            return this;
        };
        Object.defineProperty(SidebarComponent.prototype, "closed", {
            get: function () {
                return this.bodyClass.contains('page-sidebar-closed');
            },
            set: function (value) {
                this.closeSubmenus();
                this.ensureBodyClass('page-sidebar-closed', value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Object.defineProperty(SidebarComponent.prototype, "hidden", {
            get: function () {
                return this.bodyClass.contains('page-sidebar-hide');
            },
            set: function (value) {
                this.ensureBodyClass('page-sidebar-closed', value)
                    .ensureBodyClass('page-sidebar-hide', value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Object.defineProperty(SidebarComponent.prototype, "condensed", {
            get: function () {
                return this.bodyClass.contains('page-sidebar-condensed');
            },
            set: function (value) {
                this.ensureBodyClass('page-sidebar-condensed', value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        SidebarComponent.prototype.toggle = function () {
            if (this.closed) {
                this.closed = false;
            }
            else {
                this.closed = true;
            }
        };
        SidebarComponent.prototype.closeSubmenus = function () {
            this.$broadcast('closeSubmenus');
        };
        __decorate([
            packadic.Prop({ type: Array, required: false }), 
            __metadata('design:type', Array)
        ], SidebarComponent.prototype, "items");
        SidebarComponent = __decorate([
            packadic.Component('sidebar', { 'item': SidebarItemComponent }), 
            __metadata('design:paramtypes', [])
        ], SidebarComponent);
        return SidebarComponent;
    })(packadic.BaseComponent);
    packadic.SidebarComponent = SidebarComponent;
    var SlideToggleTransition = (function (_super) {
        __extends(SlideToggleTransition, _super);
        function SlideToggleTransition() {
            _super.apply(this, arguments);
        }
        SlideToggleTransition.prototype.enter = function (el, done) {
            $(el).slideDown(400, 'linear', done);
        };
        SlideToggleTransition.prototype.leave = function (el, done) {
            $(el).slideUp(250, 'linear', done);
        };
        SlideToggleTransition = __decorate([
            packadic.Transition('sidebar-submenu', false), 
            __metadata('design:paramtypes', [])
        ], SlideToggleTransition);
        return SlideToggleTransition;
    })(packadic.BaseJqueryTransition);
    packadic.SlideToggleTransition = SlideToggleTransition;
    var SidebarDirective = (function (_super) {
        __extends(SidebarDirective, _super);
        function SidebarDirective() {
            _super.apply(this, arguments);
        }
        SidebarDirective.prototype.update = function (oldVal, newVal) {
            var _this = this;
            this.el['on' + this.params['sOn']] = function () {
                var action = _this.params['sAction'];
                var sidebar = _this.vm.$root.$refs['sidebar'];
                if (typeof sidebar[action] === 'undefined') {
                    packadic.log.warn('SidebarActionDirective could not do action ' + action);
                    return;
                }
                sidebar[action].call();
            };
        };
        SidebarDirective.params = ['s-action', 's-on'];
        SidebarDirective = __decorate([
            packadic.Directive('sidebar'), 
            __metadata('design:paramtypes', [])
        ], SidebarDirective);
        return SidebarDirective;
    })(packadic.BaseDirective);
    packadic.SidebarDirective = SidebarDirective;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    function view(viewPath) {
        return function (resolve) {
            System.import(viewPath).then(function (module) {
                var mod;
                if (packadic.defined(module.default)) {
                    mod = module.default;
                }
                else {
                    mod = module;
                }
                if (packadic.defined(mod.COMPONENT)) {
                    mod = packadic.componentOptions(mod);
                }
                resolve(mod);
            });
        };
    }
    packadic.view = view;
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            _super.apply(this, arguments);
        }
        View.breadcrumb = function (title, type, typeValue, target) {
            var breadcrumb = packadic.route.link(type, typeValue, target);
            breadcrumb.title = title;
            return breadcrumb;
        };
        View.VIEW = true;
        return View;
    })(packadic.BaseComponent);
    packadic.View = View;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var DropdownComponent = (function (_super) {
        __extends(DropdownComponent, _super);
        function DropdownComponent() {
            _super.apply(this, arguments);
        }
        DropdownComponent.prototype.toggleDropdown = function (e) {
            e.preventDefault();
            this.$el.classList.toggle('open');
        };
        DropdownComponent.prototype.ready = function () {
            var el = this.$el;
            var toggle = el.querySelector('[data-toggle="dropdown"]');
            toggle.addEventListener('click', this.toggleDropdown);
            this['_closeEvent'] = packadic.EventListener.listen(window, 'click', function (e) {
                if (!el.contains(e.target))
                    el.classList.remove('open');
            });
        };
        DropdownComponent.prototype.beforeDestroy = function () {
            if (this['_closeEvent'])
                this['_closeEvent'].remove();
        };
        DropdownComponent.template = "\n        <div class=\"btn-group\">\n            <slot></slot>\n        </div>\n        ";
        Object.defineProperty(DropdownComponent.prototype, "ready",
            __decorate([
                packadic.LifecycleHook('ready'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], DropdownComponent.prototype, "ready", Object.getOwnPropertyDescriptor(DropdownComponent.prototype, "ready")));
        Object.defineProperty(DropdownComponent.prototype, "beforeDestroy",
            __decorate([
                packadic.LifecycleHook('beforeDestroy'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], DropdownComponent.prototype, "beforeDestroy", Object.getOwnPropertyDescriptor(DropdownComponent.prototype, "beforeDestroy")));
        DropdownComponent = __decorate([
            packadic.Component('dropdown'), 
            __metadata('design:paramtypes', [])
        ], DropdownComponent);
        return DropdownComponent;
    })(packadic.BaseComponent);
    packadic.DropdownComponent = DropdownComponent;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    function normalizeParams(params, removePrefix) {
        params = packadic._.cloneDeep(params);
        if (removePrefix) {
            var prefix = new RegExp('^' + removePrefix + '([A-Z].*)');
            Object.keys(params).forEach(function (key) {
                if (!prefix.test(key))
                    return;
                var newKey = key.replace(prefix, '$1').toLowerCase();
                params[newKey] = params[key];
                delete params[key];
            });
        }
        return params;
    }
    var TooltipDirective = (function (_super) {
        __extends(TooltipDirective, _super);
        function TooltipDirective() {
            _super.apply(this, arguments);
        }
        TooltipDirective.prototype.initPlugin = function (config) {
            var _this = this;
            if (config === void 0) { config = {}; }
            $(function () { return $(_this.el).tooltip(packadic._.merge({ container: 'body' }, normalizeParams(_this.params, 't'), config)); });
        };
        TooltipDirective.prototype.bind = function () {
            this.initPlugin();
        };
        TooltipDirective.prototype.update = function (value) {
            this.initPlugin(value);
        };
        TooltipDirective.params = ['t-trigger', 't-animation', 'title', 't-placement', 't-container'];
        TooltipDirective = __decorate([
            packadic.Directive('tooltip'), 
            __metadata('design:paramtypes', [])
        ], TooltipDirective);
        return TooltipDirective;
    })(packadic.BaseDirective);
    packadic.TooltipDirective = TooltipDirective;
    var PopoverDirective = (function (_super) {
        __extends(PopoverDirective, _super);
        function PopoverDirective() {
            _super.apply(this, arguments);
        }
        PopoverDirective.prototype.initPlugin = function (config) {
            var _this = this;
            if (config === void 0) { config = {}; }
            $(function () { return $(_this.el).popover(packadic._.merge({ container: 'body', trigger: 'click focus' }, normalizeParams(_this.params, 'p'), config)); });
        };
        PopoverDirective.prototype.bind = function () {
            this.initPlugin();
        };
        PopoverDirective.prototype.update = function (value) {
            this.initPlugin(value);
        };
        PopoverDirective.params = ['p-trigger', 'p-animation', 'title', 'p-placement', 'p-content', 't-container'];
        PopoverDirective = __decorate([
            packadic.Directive('popover'), 
            __metadata('design:paramtypes', [])
        ], PopoverDirective);
        return PopoverDirective;
    })(packadic.BaseDirective);
    packadic.PopoverDirective = PopoverDirective;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    packadic.popoverMixin = {
        props: {
            trigger: {
                type: String,
                default: 'click'
            },
            effect: {
                type: String,
                default: 'fadein'
            },
            title: {
                type: String
            },
            content: {
                type: String
            },
            header: {
                type: Boolean,
                default: true
            },
            placement: {
                type: String
            }
        },
        data: function () {
            return {
                position: {
                    top: 0,
                    left: 0
                },
                show: true
            };
        },
        methods: {
            toggle: function () {
                this.show = !this.show;
            }
        },
        ready: function () {
            var _this = this;
            if (!this.$els.popover)
                return console.error("Couldn't find popover v-el in your component that uses popoverMixin.");
            var popover = this.$els.popover;
            var triger = this.$els.trigger.children[0];
            if (this.trigger === 'hover') {
                this._mouseenterEvent = packadic.EventListener.listen(triger, 'mouseenter', function () { return _this.show = true; });
                this._mouseleaveEvent = packadic.EventListener.listen(triger, 'mouseleave', function () { return _this.show = false; });
            }
            else if (this.trigger === 'focus') {
                this._focusEvent = packadic.EventListener.listen(triger, 'focus', function () { return _this.show = true; });
                this._blurEvent = packadic.EventListener.listen(triger, 'blur', function () { return _this.show = false; });
            }
            else {
                this._clickEvent = packadic.EventListener.listen(triger, 'click', this.toggle);
            }
            switch (this.placement) {
                case 'top':
                    this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
                    this.position.top = triger.offsetTop - popover.offsetHeight;
                    break;
                case 'left':
                    this.position.left = triger.offsetLeft - popover.offsetWidth;
                    this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2;
                    break;
                case 'right':
                    this.position.left = triger.offsetLeft + triger.offsetWidth;
                    this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2;
                    break;
                case 'bottom':
                    this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
                    this.position.top = triger.offsetTop + triger.offsetHeight;
                    break;
                default:
                    console.log('Wrong placement prop');
            }
            popover.style.top = this.position.top + 'px';
            popover.style.left = this.position.left + 'px';
            popover.style.display = 'none';
            this.show = !this.show;
        },
        beforeDestroy: function () {
            if (this._blurEvent) {
                this._blurEvent.remove();
                this._focusEvent.remove();
            }
            if (this._mouseenterEvent) {
                this._mouseenterEvent.remove();
                this._mouseleaveEvent.remove();
            }
            if (this._clickEvent)
                this._clickEvent.remove();
        }
    };
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var TabComponent = (function (_super) {
        __extends(TabComponent, _super);
        function TabComponent() {
            _super.apply(this, arguments);
            this.show = false;
            this.index = 0;
        }
        Object.defineProperty(TabComponent.prototype, "show", {
            get: function () {
                return (this.$parent.activeIndex == this.index);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabComponent.prototype, "transition", {
            get: function () {
                return this.$parent.effect;
            },
            enumerable: true,
            configurable: true
        });
        TabComponent.prototype.created = function () {
            this.$parent.renderData.push({
                header: this.header,
                disabled: this.disabled
            });
        };
        TabComponent.prototype.ready = function () {
            for (var c in this.$parent.$children) {
                if (this.$parent.$children[c].$el == this.$el) {
                    this.index = c;
                    break;
                }
            }
        };
        TabComponent.template = "\n    <div role=\"tabpanel\" class=\"tab-pane\"\n        v-bind:class=\"{hide:!show}\"\n        v-show=\"show\"\n        :transition=\"transition\"\n    >\n        <slot></slot>\n    </div>\n    <style scoped>\n      .tab-content > .tab-pane {\n        display: block;\n      }\n      .tab-content > .tab-pane.hide {\n        position: absolute;\n      }\n    </style>\n    ";
        __decorate([
            packadic.Prop({ type: String }), 
            __metadata('design:type', String)
        ], TabComponent.prototype, "header");
        __decorate([
            packadic.Prop({ type: Boolean, 'default': function () { return false; } }), 
            __metadata('design:type', String)
        ], TabComponent.prototype, "disabled");
        Object.defineProperty(TabComponent.prototype, "created",
            __decorate([
                packadic.LifecycleHook('created'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], TabComponent.prototype, "created", Object.getOwnPropertyDescriptor(TabComponent.prototype, "created")));
        Object.defineProperty(TabComponent.prototype, "ready",
            __decorate([
                packadic.LifecycleHook('ready'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], TabComponent.prototype, "ready", Object.getOwnPropertyDescriptor(TabComponent.prototype, "ready")));
        TabComponent = __decorate([
            packadic.Component('tab'), 
            __metadata('design:paramtypes', [])
        ], TabComponent);
        return TabComponent;
    })(packadic.BaseComponent);
    packadic.TabComponent = TabComponent;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var TabsetComponent = (function (_super) {
        __extends(TabsetComponent, _super);
        function TabsetComponent() {
            _super.apply(this, arguments);
            this.renderData = [];
            this.activeIndex = 0;
        }
        TabsetComponent.prototype.handleTabListClick = function (index, el) {
            if (!el.disabled)
                this.activeIndex = index;
        };
        TabsetComponent.template = "\n    <div>\n        <ul class=\"nav nav-tabs\" role=\"tablist\">\n            <li class=\"nav-item\"\n                v-for=\"r in renderData\"\n\n                @click.prevent=\"handleTabListClick($index, r)\"\n                :disabled=\"disabled === true\"\n            >\n                <a href=\"#\" v-bind:class=\"{ 'active': ($index === activeIndex) }\" class=\"nav-link\">{{r.header}}</a>\n            </li>\n        </ul>\n        <div class=\"tab-content\" v-el=\"tabContent\">\n            <slot></slot>\n        </div>\n    </div>\n    ";
        __decorate([
            packadic.Prop({ type: String, 'default': function () { return 'fadein'; } }), 
            __metadata('design:type', String)
        ], TabsetComponent.prototype, "effect");
        TabsetComponent = __decorate([
            packadic.Component('tabs'), 
            __metadata('design:paramtypes', [])
        ], TabsetComponent);
        return TabsetComponent;
    })(packadic.BaseComponent);
    packadic.TabsetComponent = TabsetComponent;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var PageLoaderDirective = (function (_super) {
        __extends(PageLoaderDirective, _super);
        function PageLoaderDirective() {
            _super.apply(this, arguments);
        }
        PageLoaderDirective.prototype.update = function (showLoader, odlval) {
            var hasClass = this.el.classList.contains('page-loading');
            showLoader === true && hasClass === false && this.el.classList.add('page-loading');
            showLoader === false && hasClass === true && this.el.classList.remove('page-loading');
        };
        PageLoaderDirective = __decorate([
            packadic.Directive('page-loader'), 
            __metadata('design:paramtypes', [])
        ], PageLoaderDirective);
        return PageLoaderDirective;
    })(packadic.BaseDirective);
    packadic.PageLoaderDirective = PageLoaderDirective;
    var TestDirective = (function (_super) {
        __extends(TestDirective, _super);
        function TestDirective() {
            _super.apply(this, arguments);
        }
        TestDirective.prototype.watchA = function (val, oldVal) {
            console.log('watch a');
        };
        TestDirective.params = ['a'];
        Object.defineProperty(TestDirective.prototype, "watchA",
            __decorate([
                packadic.ParamWatcher('a'), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', void 0)
            ], TestDirective.prototype, "watchA", Object.getOwnPropertyDescriptor(TestDirective.prototype, "watchA")));
        TestDirective = __decorate([
            packadic.Directive('test-directive'), 
            __metadata('design:paramtypes', [])
        ], TestDirective);
        return TestDirective;
    })(packadic.BaseDirective);
    packadic.TestDirective = TestDirective;
})(packadic || (packadic = {}));
var packadic;
(function (packadic) {
    var BaseTransition = (function () {
        function BaseTransition() {
        }
        BaseTransition.prototype.enterCancelled = function (el) {
            $(el).stop();
        };
        BaseTransition.prototype.leaveCancelled = function (el) {
            $(el).stop();
        };
        return BaseTransition;
    })();
    packadic.BaseTransition = BaseTransition;
    function _speed(el, def) {
        if (def === void 0) { def = 500; }
        return el.hasAttribute('transition-speed') ? parseInt(el.getAttribute('transition-speed')) : def;
    }
    var FadeTransition = (function (_super) {
        __extends(FadeTransition, _super);
        function FadeTransition() {
            _super.apply(this, arguments);
        }
        FadeTransition.prototype.enter = function (el, done) {
            var speed = _speed(el);
            $(el)
                .css('opacity', 0)
                .animate({ opacity: 1 }, speed, done);
        };
        FadeTransition.prototype.leave = function (el, done) {
            var speed = _speed(el);
            $(el).animate({ opacity: 0 }, speed, done);
        };
        FadeTransition = __decorate([
            packadic.Transition('fade', false), 
            __metadata('design:paramtypes', [])
        ], FadeTransition);
        return FadeTransition;
    })(BaseTransition);
    packadic.FadeTransition = FadeTransition;
    var FadeInTransition = (function (_super) {
        __extends(FadeInTransition, _super);
        function FadeInTransition() {
            _super.apply(this, arguments);
        }
        FadeInTransition.prototype.enter = function (el, done) {
            var speed = _speed(el);
            $(el)
                .css('opacity', 0)
                .animate({ opacity: 1 }, speed, done);
        };
        FadeInTransition = __decorate([
            packadic.Transition('fadein', false), 
            __metadata('design:paramtypes', [])
        ], FadeInTransition);
        return FadeInTransition;
    })(BaseTransition);
    packadic.FadeInTransition = FadeInTransition;
    var FadeOutTransition = (function (_super) {
        __extends(FadeOutTransition, _super);
        function FadeOutTransition() {
            _super.apply(this, arguments);
        }
        FadeOutTransition.prototype.leave = function (el, done) {
            var speed = _speed(el);
            $(el).animate({ opacity: 0 }, speed, done);
        };
        FadeOutTransition = __decorate([
            packadic.Transition('fadeout', false), 
            __metadata('design:paramtypes', [])
        ], FadeOutTransition);
        return FadeOutTransition;
    })(BaseTransition);
    packadic.FadeOutTransition = FadeOutTransition;
    var ViewFadeTransition = (function (_super) {
        __extends(ViewFadeTransition, _super);
        function ViewFadeTransition() {
            _super.apply(this, arguments);
        }
        ViewFadeTransition.prototype.enter = function (el, done) {
            var speed = _speed(el);
            $(el)
                .css({ 'margin-left': 100, 'opacity': 0 })
                .animate({ 'margin-left': 0, 'opacity': 1 }, speed, done);
        };
        ViewFadeTransition.prototype.leave = function (el, done) {
            var speed = _speed(el);
            $(el)
                .css({ 'margin-left': 0, 'opacity': 1 })
                .animate({ 'margin-left': 100, 'opacity': 0 }, speed, done);
        };
        ViewFadeTransition = __decorate([
            packadic.Transition('view-fade', false), 
            __metadata('design:paramtypes', [])
        ], ViewFadeTransition);
        return ViewFadeTransition;
    })(BaseTransition);
    packadic.ViewFadeTransition = ViewFadeTransition;
})(packadic || (packadic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FkaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9AaW5pdC50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL3ZpZXdzL2FsaW5rLmh0bWwudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy92aWV3cy9ncmlkLmh0bWwudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy92aWV3cy9wYWdlLWJyZWFkY3J1bWIuaHRtbC50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL3ZpZXdzL3BhZ2UtYnJlYWRjcnVtYnMuaHRtbC50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL3ZpZXdzL3BhZ2UuaHRtbC50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL3ZpZXdzL3BhZ2luYXRpb24uaHRtbC50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL3ZpZXdzL3NpZGViYXItaXRlbS5odG1sLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvdmlld3Mvc2lkZWJhci5odG1sLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvbGliL0pTT04udHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9saWIvYnJvd3Nlci50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2xpYi9jb25maWcudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9saWIvZXZlbnRzLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvbGliL2dlbmVyYWwudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9saWIvbG9nZ2VyLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvbGliL21hdGVyaWFsLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvbGliL21ldGFzdG9yZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2xpYi9vYmplY3QudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9saWIvcHJvbWlzZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2xpYi9zdG9yYWdlLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvbGliL3ZlcnNpb24udHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9hcHAvbGF5b3V0LnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvYXBwL2FkZG9ucy9jb21wb25lbnQudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9hcHAvYWRkb25zL2RpcmVjdGl2ZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2FwcC9hZGRvbnMvdHJhbnNpdGlvbi50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2FwcC9hcHAudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9jb21wb25lbnRzL2FwcC9ncmlkLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvY29tcG9uZW50cy9hcHAvcGFnZS50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvYXBwL3JvdXRpbmcudHMiLCIuLi8uLi9zcmMvc2NyaXB0cy9wYWNrYWRpYy9jb21wb25lbnRzL2FwcC9zaWRlYmFyLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvY29tcG9uZW50cy9hcHAvdmlldy50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvYm9vdHN0cmFwL2Ryb3Bkb3duLnRzIiwiLi4vLi4vc3JjL3NjcmlwdHMvcGFja2FkaWMvY29tcG9uZW50cy9ib290c3RyYXAvbWFpbi50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvYm9vdHN0cmFwL3BvcG92ZXJNaXhpbi50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvYm9vdHN0cmFwL3RhYi50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvYm9vdHN0cmFwL3RhYnNldC50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvZGlyZWN0aXZlcy50cyIsIi4uLy4uL3NyYy9zY3JpcHRzL3BhY2thZGljL2NvbXBvbmVudHMvdHJhbnNpdGlvbnMudHMiXSwibmFtZXMiOlsicGFja2FkaWMiLCJwYWNrYWRpYy5KU09OIiwicGFja2FkaWMuSlNPTi5zdHJpbmdpZnkiLCJwYWNrYWRpYy5KU09OLnBhcnNlIiwicGFja2FkaWMuSlNPTi5jbG9uZSIsInBhY2thZGljLm9wZW5XaW5kb3ciLCJwYWNrYWRpYy5jcmUiLCJwYWNrYWRpYy5nZXRWaWV3UG9ydCIsInBhY2thZGljLmlzVG91Y2hEZXZpY2UiLCJwYWNrYWRpYy5jb2RlSW5kZW50Rml4IiwicGFja2FkaWMucHJlQ29kZUluZGVudEZpeCIsInBhY2thZGljLnJlZ2lzdGVySlF1ZXJ5SGVscGVycyIsInBhY2thZGljLkJyb3dzZXJQcmV0dHlDb25zb2xlIiwicGFja2FkaWMuQnJvd3NlclByZXR0eUNvbnNvbGUuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5Ccm93c2VyUHJldHR5Q29uc29sZS5hZGRNYXRlcmlhbFN0eWxlIiwicGFja2FkaWMuQnJvd3NlclByZXR0eUNvbnNvbGUuYWRkRm9udFN0eWxlIiwicGFja2FkaWMuQnJvd3NlclByZXR0eUNvbnNvbGUuYWRkU3R5bGUiLCJwYWNrYWRpYy5Ccm93c2VyUHJldHR5Q29uc29sZS5hbGxTdHlsZXMiLCJwYWNrYWRpYy5Ccm93c2VyUHJldHR5Q29uc29sZS5nZXRTdHlsZSIsInBhY2thZGljLkJyb3dzZXJQcmV0dHlDb25zb2xlLmhhc1N0eWxlIiwicGFja2FkaWMuQnJvd3NlclByZXR0eUNvbnNvbGUuYWRkRGVmYXVsdHMiLCJwYWNrYWRpYy5Ccm93c2VyUHJldHR5Q29uc29sZS5jcmVhdGVNYWNybyIsInBhY2thZGljLkJyb3dzZXJQcmV0dHlDb25zb2xlLm1hY3JvIiwicGFja2FkaWMuQnJvd3NlclByZXR0eUNvbnNvbGUud3JpdGUiLCJwYWNrYWRpYy5nZXRQcmVmZmVyZEJhZyIsInBhY2thZGljLkNvbmZpZ09ic2VydmVyIiwicGFja2FkaWMuQ29uZmlnT2JzZXJ2ZXIuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5Db25maWdPYnNlcnZlci5zZXRJbnNwZWN0YWJsZU9iamVjdCIsInBhY2thZGljLkNvbmZpZ09ic2VydmVyLmluc3BlY3QiLCJwYWNrYWRpYy5Db25maWdPYnNlcnZlci5wYXRoIiwicGFja2FkaWMuQ29uZmlnIiwicGFja2FkaWMuQ29uZmlnLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuQ29uZmlnLnVuc2V0IiwicGFja2FkaWMuQ29uZmlnLmhhcyIsInBhY2thZGljLkNvbmZpZy5yYXciLCJwYWNrYWRpYy5Db25maWcuZ2V0IiwicGFja2FkaWMuQ29uZmlnLnNldCIsInBhY2thZGljLkNvbmZpZy5tZXJnZSIsInBhY2thZGljLkNvbmZpZy5wcm9jZXNzIiwicGFja2FkaWMuQ29uZmlnLmFkZERlbGltaXRlcnMiLCJwYWNrYWRpYy5Db25maWcuc2V0RGVsaW1pdGVycyIsInBhY2thZGljLkNvbmZpZy5wcm9jZXNzVGVtcGxhdGUiLCJwYWNrYWRpYy5Db25maWcub2JzZXJ2ZXIiLCJwYWNrYWRpYy5Db25maWcuYXR0YWNoT2JzZXJ2ZXIiLCJwYWNrYWRpYy5Db25maWcuc3RvcmUiLCJwYWNrYWRpYy5Db25maWcubG9hZCIsInBhY2thZGljLkNvbmZpZy5oYXNTdG9yYWdlIiwicGFja2FkaWMuQ29uZmlnLnNldFN0b3JhZ2UiLCJwYWNrYWRpYy5Db25maWcubWFrZVByb3BlcnR5IiwicGFja2FkaWMuQ29uZmlnLm1ha2VPYnNlcnZlciIsInBhY2thZGljLkNvbmZpZy5nZXRQcm9wU3RyaW5nIiwicGFja2FkaWMuQ29uZmlnLmVzY2FwZSIsInBhY2thZGljLkNvbmZpZy50b1N0cmluZyIsInBhY2thZGljLkNvbmZpZ09iamVjdCIsInBhY2thZGljLkNvbmZpZ09iamVjdC5jb25zdHJ1Y3RvciIsInBhY2thZGljLkV2ZW50RW1pdHRlciIsInBhY2thZGljLkV2ZW50RW1pdHRlci5jb25zdHJ1Y3RvciIsInBhY2thZGljLmxpc3RlbiIsInBhY2thZGljLmxpc3Rlbi5yZW1vdmUiLCJwYWNrYWRpYy5hc3NpZ24iLCJwYWNrYWRpYy5tYWtlRXZlbnRFbWl0dGVyIiwicGFja2FkaWMucm91bmQiLCJwYWNrYWRpYy5tYWtlU3RyaW5nIiwicGFja2FkaWMuZGVmYXVsdFRvV2hpdGVTcGFjZSIsInBhY2thZGljLmtpbmRPZiIsInBhY2thZGljLmRlZiIsInBhY2thZGljLmRlZmluZWQiLCJwYWNrYWRpYy5nZXRSYW5kb21JZCIsInBhY2thZGljLmNvbG9yIiwicGFja2FkaWMuTWV0YVN0b3JlIiwicGFja2FkaWMuTWV0YVN0b3JlLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuTWV0YVN0b3JlLnRlbXBsYXRlIiwicGFja2FkaWMuTWV0YVN0b3JlLmhhc1RlbXBsYXRlIiwicGFja2FkaWMuTWV0YVN0b3JlLnN0b3JlIiwicGFja2FkaWMuTWV0YVN0b3JlLmZvciIsInBhY2thZGljLk1ldGFTdG9yZS5zdG9yZVB1c2giLCJwYWNrYWRpYy5NZXRhU3RvcmUuY2xlYW5UYXJnZXQiLCJwYWNrYWRpYy5NZXRhU3RvcmUuZW5zdXJlSGFzTWV0YVN0b3JlIiwicGFja2FkaWMuZ2V0UGFydHMiLCJwYWNrYWRpYy5vYmplY3RHZXQiLCJwYWNrYWRpYy5vYmplY3RTZXQiLCJwYWNrYWRpYy5vYmplY3RFeGlzdHMiLCJwYWNrYWRpYy5yZWN1cnNlIiwicGFja2FkaWMucmVjdXJzZS5yZWN1cnNlIiwicGFja2FkaWMuY29weU9iamVjdCIsInBhY2thZGljLmRvdGl6ZSIsInBhY2thZGljLmRvdGl6ZS5yZWN1cnNlIiwicGFja2FkaWMuZG90aXplLmlzTnVtYmVyIiwicGFja2FkaWMuZG90aXplLmlzRW1wdHlPYmoiLCJwYWNrYWRpYy5hcHBseU1peGlucyIsInBhY2thZGljLkRlcGVuZGVuY3lTb3J0ZXIiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5hZGQiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLmFkZEl0ZW0iLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLnNldEl0ZW0iLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLnNvcnQiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLnNhdGlzZmllZCIsInBhY2thZGljLkRlcGVuZGVuY3lTb3J0ZXIuc2V0U29ydGVkIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5leGlzdHMiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLnJlbW92ZURlcGVuZGVudHMiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLnNldENpcmN1bGFyIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5zZXRNaXNzaW5nIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5zZXRGb3VuZCIsInBhY2thZGljLkRlcGVuZGVuY3lTb3J0ZXIuaXNTb3J0ZWQiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLnJlcXVpcmVkQnkiLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLmlzRGVwZW5kZW50IiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5oYXNEZXBlbmRlbnRzIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5oYXNNaXNzaW5nIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5pc01pc3NpbmciLCJwYWNrYWRpYy5EZXBlbmRlbmN5U29ydGVyLmhhc0NpcmN1bGFyIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5pc0NpcmN1bGFyIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5nZXREZXBlbmRlbnRzIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5nZXRNaXNzaW5nIiwicGFja2FkaWMuRGVwZW5kZW5jeVNvcnRlci5nZXRDaXJjdWxhciIsInBhY2thZGljLkRlcGVuZGVuY3lTb3J0ZXIuZ2V0SGl0cyIsInBhY2thZGljLmNyZWF0ZVByb21pc2UiLCJwYWNrYWRpYy53aGVuIiwicGFja2FkaWMuRGlzcGF0Y2hEZWZlcnJlZCIsInBhY2thZGljLlByb21pc2VTdGF0ZSIsInBhY2thZGljLkNsaWVudCIsInBhY2thZGljLkNsaWVudC5jb25zdHJ1Y3RvciIsInBhY2thZGljLkNsaWVudC5yZXNvbHZlIiwicGFja2FkaWMuQ2xpZW50LnJlamVjdCIsInBhY2thZGljLkNsaWVudC5fZGlzcGF0Y2hDYWxsYmFjayIsInBhY2thZGljLkRlZmVycmVkIiwicGFja2FkaWMuRGVmZXJyZWQuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5EZWZlcnJlZC5fdGhlbiIsInBhY2thZGljLkRlZmVycmVkLnJlc29sdmUiLCJwYWNrYWRpYy5EZWZlcnJlZC5fcmVzb2x2ZSIsInBhY2thZGljLkRlZmVycmVkLnJlamVjdCIsInBhY2thZGljLkRlZmVycmVkLl9yZWplY3QiLCJwYWNrYWRpYy5Qcm9taXNlIiwicGFja2FkaWMuUHJvbWlzZS5jb25zdHJ1Y3RvciIsInBhY2thZGljLlByb21pc2UudGhlbiIsInBhY2thZGljLlByb21pc2Uub3RoZXJ3aXNlIiwicGFja2FkaWMuUHJvbWlzZS5hbHdheXMiLCJwYWNrYWRpYy5oYXNCYWciLCJwYWNrYWRpYy5jcmVhdGVCYWciLCJwYWNrYWRpYy5nZXRCYWciLCJwYWNrYWRpYy5TdG9yYWdlQmFnIiwicGFja2FkaWMuU3RvcmFnZUJhZy5jb25zdHJ1Y3RvciIsInBhY2thZGljLlN0b3JhZ2VCYWcub24iLCJwYWNrYWRpYy5TdG9yYWdlQmFnLnNldCIsInBhY2thZGljLlN0b3JhZ2VCYWcuZ2V0IiwicGFja2FkaWMuU3RvcmFnZUJhZy5kZWwiLCJwYWNrYWRpYy5TdG9yYWdlQmFnLmNsZWFyIiwicGFja2FkaWMuU3RvcmFnZUJhZy5nZXRTaXplIiwicGFja2FkaWMuTG9jYWxTdG9yYWdlIiwicGFja2FkaWMuTG9jYWxTdG9yYWdlLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuTG9jYWxTdG9yYWdlLmxlbmd0aCIsInBhY2thZGljLkxvY2FsU3RvcmFnZS5nZXRTaXplIiwicGFja2FkaWMuTG9jYWxTdG9yYWdlLm9uU3RvcmVFdmVudCIsInBhY2thZGljLkxvY2FsU3RvcmFnZS5jbGVhciIsInBhY2thZGljLkxvY2FsU3RvcmFnZS5nZXRJdGVtIiwicGFja2FkaWMuTG9jYWxTdG9yYWdlLmtleSIsInBhY2thZGljLkxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtIiwicGFja2FkaWMuTG9jYWxTdG9yYWdlLnNldEl0ZW0iLCJwYWNrYWRpYy5TZXNzaW9uU3RvcmFnZSIsInBhY2thZGljLlNlc3Npb25TdG9yYWdlLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuU2Vzc2lvblN0b3JhZ2UubGVuZ3RoIiwicGFja2FkaWMuU2Vzc2lvblN0b3JhZ2UuZ2V0U2l6ZSIsInBhY2thZGljLlNlc3Npb25TdG9yYWdlLm9uU3RvcmVFdmVudCIsInBhY2thZGljLlNlc3Npb25TdG9yYWdlLmNsZWFyIiwicGFja2FkaWMuU2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSIsInBhY2thZGljLlNlc3Npb25TdG9yYWdlLmtleSIsInBhY2thZGljLlNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0iLCJwYWNrYWRpYy5TZXNzaW9uU3RvcmFnZS5zZXRJdGVtIiwicGFja2FkaWMuQ29va2llU3RvcmFnZSIsInBhY2thZGljLkNvb2tpZVN0b3JhZ2UuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLmxlbmd0aCIsInBhY2thZGljLkNvb2tpZVN0b3JhZ2UuZ2V0U2l6ZSIsInBhY2thZGljLkNvb2tpZVN0b3JhZ2UubGlzdGVuQ29va2llQ2hhbmdlIiwicGFja2FkaWMuQ29va2llU3RvcmFnZS5vblN0b3JlRXZlbnQiLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLmNsZWFyIiwicGFja2FkaWMuQ29va2llU3RvcmFnZS5rZXkiLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLmdldEl0ZW0iLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLnNldEl0ZW0iLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLnJlbW92ZUl0ZW0iLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLmhhc0l0ZW0iLCJwYWNrYWRpYy5Db29raWVTdG9yYWdlLmtleXMiLCJwYWNrYWRpYy5wYXJzZSIsInBhY2thZGljLnZhbGlkIiwicGFja2FkaWMuY2xlYW4iLCJwYWNrYWRpYy5TZW1WZXIiLCJwYWNrYWRpYy5TZW1WZXIuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5TZW1WZXIuZm9ybWF0IiwicGFja2FkaWMuU2VtVmVyLmluc3BlY3QiLCJwYWNrYWRpYy5TZW1WZXIudG9TdHJpbmciLCJwYWNrYWRpYy5TZW1WZXIuY29tcGFyZSIsInBhY2thZGljLlNlbVZlci5jb21wYXJlTWFpbiIsInBhY2thZGljLlNlbVZlci5jb21wYXJlUHJlIiwicGFja2FkaWMuU2VtVmVyLmluYyIsInBhY2thZGljLmluYyIsInBhY2thZGljLmRpZmYiLCJwYWNrYWRpYy5jb21wYXJlSWRlbnRpZmllcnMiLCJwYWNrYWRpYy5yY29tcGFyZUlkZW50aWZpZXJzIiwicGFja2FkaWMubWFqb3IiLCJwYWNrYWRpYy5taW5vciIsInBhY2thZGljLnBhdGNoIiwicGFja2FkaWMuY29tcGFyZSIsInBhY2thZGljLmNvbXBhcmVMb29zZSIsInBhY2thZGljLnJjb21wYXJlIiwicGFja2FkaWMuc29ydCIsInBhY2thZGljLnJzb3J0IiwicGFja2FkaWMuZ3QiLCJwYWNrYWRpYy5sdCIsInBhY2thZGljLmVxIiwicGFja2FkaWMubmVxIiwicGFja2FkaWMuZ3RlIiwicGFja2FkaWMubHRlIiwicGFja2FkaWMuY21wIiwicGFja2FkaWMuQ29tcGFyYXRvciIsInBhY2thZGljLkNvbXBhcmF0b3IuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5Db21wYXJhdG9yLnBhcnNlIiwicGFja2FkaWMuQ29tcGFyYXRvci5pbnNwZWN0IiwicGFja2FkaWMuQ29tcGFyYXRvci50b1N0cmluZyIsInBhY2thZGljLkNvbXBhcmF0b3IudGVzdCIsInBhY2thZGljLlZlcnNpb25SYW5nZSIsInBhY2thZGljLlZlcnNpb25SYW5nZS5jb25zdHJ1Y3RvciIsInBhY2thZGljLlZlcnNpb25SYW5nZS5pbnNwZWN0IiwicGFja2FkaWMuVmVyc2lvblJhbmdlLmZvcm1hdCIsInBhY2thZGljLlZlcnNpb25SYW5nZS50b1N0cmluZyIsInBhY2thZGljLlZlcnNpb25SYW5nZS5wYXJzZVJhbmdlIiwicGFja2FkaWMuVmVyc2lvblJhbmdlLnRlc3QiLCJwYWNrYWRpYy50b0NvbXBhcmF0b3JzIiwicGFja2FkaWMucGFyc2VDb21wYXJhdG9yIiwicGFja2FkaWMuaXNYIiwicGFja2FkaWMucmVwbGFjZVRpbGRlcyIsInBhY2thZGljLnJlcGxhY2VUaWxkZSIsInBhY2thZGljLnJlcGxhY2VDYXJldHMiLCJwYWNrYWRpYy5yZXBsYWNlQ2FyZXQiLCJwYWNrYWRpYy5yZXBsYWNlWFJhbmdlcyIsInBhY2thZGljLnJlcGxhY2VYUmFuZ2UiLCJwYWNrYWRpYy5yZXBsYWNlU3RhcnMiLCJwYWNrYWRpYy5oeXBoZW5SZXBsYWNlIiwicGFja2FkaWMudGVzdFNldCIsInBhY2thZGljLnNhdGlzZmllcyIsInBhY2thZGljLm1heFNhdGlzZnlpbmciLCJwYWNrYWRpYy52YWxpZFJhbmdlIiwicGFja2FkaWMubHRyIiwicGFja2FkaWMuZ3RyIiwicGFja2FkaWMub3V0c2lkZSIsImdldEtleSIsImdldFByb3BTdHJpbmciLCJhZGQiLCJwYWNrYWRpYy5MYXlvdXQiLCJwYWNrYWRpYy5MYXlvdXQuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5MYXlvdXQuc2V0dGluZ3MiLCJwYWNrYWRpYy5MYXlvdXQuZ2V0QnJlYWtwb2ludCIsInBhY2thZGljLkxheW91dC5jYWxjdWxhdGVWaWV3cG9ydEhlaWdodCIsInBhY2thZGljLkxheW91dC5zY3JvbGxUbyIsInBhY2thZGljLkxheW91dC5zY3JvbGxUb3AiLCJwYWNrYWRpYy5CYXNlQ29tcG9uZW50IiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC5jb25zdHJ1Y3RvciIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGFkZCIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGFkZENoaWxkIiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC4kYWZ0ZXIiLCJwYWNrYWRpYy5CYXNlQ29tcG9uZW50LiRhcHBlbmRUbyIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGJlZm9yZSIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGJyb2FkY2FzdCIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGNvbXBpbGUiLCJwYWNrYWRpYy5CYXNlQ29tcG9uZW50LiRkZWxldGUiLCJwYWNrYWRpYy5CYXNlQ29tcG9uZW50LiRkZXN0cm95IiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC4kZGlzcGF0Y2giLCJwYWNrYWRpYy5CYXNlQ29tcG9uZW50LiRlbWl0IiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC4kZXZhbCIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGdldCIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJGludGVycG9sYXRlIiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC4kbG9nIiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC4kbW91bnQiLCJwYWNrYWRpYy5CYXNlQ29tcG9uZW50LiRuZXh0VGljayIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJG9mZiIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJG9uIiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC4kb25jZSIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJHJlbW92ZSIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJHNldCIsInBhY2thZGljLkJhc2VDb21wb25lbnQuJHdhdGNoIiwicGFja2FkaWMuQmFzZUNvbXBvbmVudC5fZGlnZXN0IiwicGFja2FkaWMuTGlmZWN5Y2xlSG9vayIsInBhY2thZGljLkV2ZW50SG9vayIsInBhY2thZGljLlByb3AiLCJwYWNrYWRpYy5jb21wb25lbnRPcHRpb25zIiwicGFja2FkaWMuQ29tcG9uZW50IiwicGFja2FkaWMuRGlyZWN0aXZlIiwicGFja2FkaWMuUGFyYW1XYXRjaGVyIiwicGFja2FkaWMuQmFzZURpcmVjdGl2ZSIsInBhY2thZGljLkJhc2VEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5CYXNlRGlyZWN0aXZlLiRlbCIsInBhY2thZGljLkJhc2VEaXJlY3RpdmUuJHNldCIsInBhY2thZGljLkJhc2VEaXJlY3RpdmUuJGRlbGV0ZSIsInBhY2thZGljLkJhc2VEaXJlY3RpdmUuc2V0IiwicGFja2FkaWMuQmFzZURpcmVjdGl2ZS5vbiIsInBhY2thZGljLkJhc2VEaXJlY3RpdmUuYmluZCIsInBhY2thZGljLkJhc2VEaXJlY3RpdmUudW5iaW5kIiwicGFja2FkaWMuQmFzZURpcmVjdGl2ZS51cGRhdGUiLCJwYWNrYWRpYy5UcmFuc2l0aW9uIiwicGFja2FkaWMuQmFzZVRyYW5zaXRpb24iLCJwYWNrYWRpYy5CYXNlVHJhbnNpdGlvbi5jb25zdHJ1Y3RvciIsInBhY2thZGljLkJhc2VUcmFuc2l0aW9uLmVudGVyIiwicGFja2FkaWMuQmFzZUpxdWVyeVRyYW5zaXRpb24iLCJwYWNrYWRpYy5CYXNlSnF1ZXJ5VHJhbnNpdGlvbi5jb25zdHJ1Y3RvciIsInBhY2thZGljLkJhc2VKcXVlcnlUcmFuc2l0aW9uLmVudGVyQ2FuY2VsbGVkIiwicGFja2FkaWMuQmFzZUpxdWVyeVRyYW5zaXRpb24ubGVhdmVDYW5jZWxsZWQiLCJwYWNrYWRpYy5BcHBTdGF0ZSIsInBhY2thZGljLkFwcCIsInBhY2thZGljLkFwcC5jb25zdHJ1Y3RvciIsInBhY2thZGljLkFwcC5vbiIsInBhY2thZGljLkFwcC5vbmNlIiwicGFja2FkaWMuQXBwLm9mZiIsInBhY2thZGljLkFwcC5lbWl0IiwicGFja2FkaWMuQXBwLmxvZyIsInBhY2thZGljLkFwcC5vdXQiLCJwYWNrYWRpYy5BcHAubGF5b3V0IiwicGFja2FkaWMuQXBwLnZtIiwicGFja2FkaWMuQXBwLnN0YXRlIiwicGFja2FkaWMuQXBwLnJvdXRlciIsInBhY2thZGljLkFwcC4kZSIsInBhY2thZGljLkFwcC5pbml0IiwicGFja2FkaWMuQXBwLnN0YXJ0IiwicGFja2FkaWMuQXBwLmRhdGFSZXF1ZXN0IiwicGFja2FkaWMuQXBwLnNoYXJlIiwicGFja2FkaWMuQXBwLnNoYXJlZCIsInBhY2thZGljLlNoYXJlZEdyaWREYXRhIiwicGFja2FkaWMuU2hhcmVkR3JpZERhdGEuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5TaGFyZWRHcmlkRGF0YS5wYWdpbmF0b3IiLCJwYWNrYWRpYy5TaGFyZWRHcmlkRGF0YS5ncmlkIiwicGFja2FkaWMuR3JpZENvbXBvbmVudCIsInBhY2thZGljLkdyaWRDb21wb25lbnQuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5HcmlkQ29tcG9uZW50LnBhZ2VyIiwicGFja2FkaWMuR3JpZENvbXBvbmVudC5maWx0ZXJlZFJvd3MiLCJwYWNrYWRpYy5HcmlkQ29tcG9uZW50LmN1cnJlbnRQYWdlIiwicGFja2FkaWMuR3JpZENvbXBvbmVudC5zb3J0QnkiLCJwYWNrYWRpYy5HcmlkQ29tcG9uZW50LmJlZm9yZUNvbXBpbGUiLCJwYWNrYWRpYy5HcmlkQ29tcG9uZW50LmNvbXBpbGVkIiwicGFja2FkaWMuUGFnaW5hdGlvbkNvbXBvbmVudCIsInBhY2thZGljLlBhZ2luYXRpb25Db21wb25lbnQuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5QYWdpbmF0aW9uQ29tcG9uZW50LmJlZm9yZUNvbXBpbGUiLCJwYWNrYWRpYy5QYWdpbmF0aW9uQ29tcG9uZW50LnBhZ2VyIiwicGFja2FkaWMuUGFnaW5hdGlvbkNvbXBvbmVudC5pc0N1cnJlbnQiLCJwYWNrYWRpYy5QYWdpbmF0aW9uQ29tcG9uZW50LmdvdG8iLCJwYWNrYWRpYy5QYWdpbmF0aW9uQ29tcG9uZW50Lm5leHQiLCJwYWNrYWRpYy5QYWdpbmF0aW9uQ29tcG9uZW50LnByZXYiLCJwYWNrYWRpYy5HcmlkRGlyZWN0aXZlIiwicGFja2FkaWMuR3JpZERpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsInBhY2thZGljLkdyaWREaXJlY3RpdmUucGFnaW5hdG9yIiwicGFja2FkaWMuR3JpZERpcmVjdGl2ZS5wYWdlciIsInBhY2thZGljLkdyaWREaXJlY3RpdmUuYmluZCIsInBhY2thZGljLkdyaWREaXJlY3RpdmUudXBkYXRlIiwicGFja2FkaWMuUGFnZUJyZWFkY3J1bWJJdGVtQ29tcG9uZW50IiwicGFja2FkaWMuUGFnZUJyZWFkY3J1bWJJdGVtQ29tcG9uZW50LmNvbnN0cnVjdG9yIiwicGFja2FkaWMuUGFnZUJyZWFkY3J1bWJJdGVtQ29tcG9uZW50LmJlZm9yZUNvbXBpbGUiLCJwYWNrYWRpYy5QYWdlQnJlYWRjcnVtYkl0ZW1Db21wb25lbnQubGluayIsInBhY2thZGljLlBhZ2VCcmVhZGNydW1ic0NvbXBvbmVudCIsInBhY2thZGljLlBhZ2VCcmVhZGNydW1ic0NvbXBvbmVudC5jb25zdHJ1Y3RvciIsInBhY2thZGljLlBhZ2VCcmVhZGNydW1ic0NvbXBvbmVudC5pc0xhc3QiLCJwYWNrYWRpYy5QYWdlQnJlYWRjcnVtYnNDb21wb25lbnQuYmVmb3JlQ29tcGlsZSIsInBhY2thZGljLlBhZ2VCcmVhZGNydW1ic0NvbXBvbmVudC5yZWFkeSIsInBhY2thZGljLlBhZ2VDb21wb25lbnQiLCJwYWNrYWRpYy5QYWdlQ29tcG9uZW50LmNvbnN0cnVjdG9yIiwicGFja2FkaWMuUGFnZUNvbnRlbnRTaXplckRpcmVjdGl2ZSIsInBhY2thZGljLlBhZ2VDb250ZW50U2l6ZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5QYWdlQ29udGVudFNpemVyRGlyZWN0aXZlLmxpc3RlbmVyIiwicGFja2FkaWMuUGFnZUNvbnRlbnRTaXplckRpcmVjdGl2ZS5iaW5kIiwicGFja2FkaWMuUGFnZUNvbnRlbnRTaXplckRpcmVjdGl2ZS51bmJpbmQiLCJwYWNrYWRpYy5yb3V0ZSIsInBhY2thZGljLkxpbmtDb21wb25lbnQiLCJwYWNrYWRpYy5MaW5rQ29tcG9uZW50LmNvbnN0cnVjdG9yIiwicGFja2FkaWMuTGlua0NvbXBvbmVudC5fdHlwZSIsInBhY2thZGljLkxpbmtDb21wb25lbnQuaXNUeXBlIiwicGFja2FkaWMuTGlua0NvbXBvbmVudC5hdHRycyIsInBhY2thZGljLkxpbmtDb21wb25lbnQudmxpbmsiLCJwYWNrYWRpYy5MaW5rQ29tcG9uZW50LmJlZm9yZUNvbXBpbGUiLCJwYWNrYWRpYy5TaWRlYmFySXRlbUNvbXBvbmVudCIsInBhY2thZGljLlNpZGViYXJJdGVtQ29tcG9uZW50LmNvbnN0cnVjdG9yIiwicGFja2FkaWMuU2lkZWJhckl0ZW1Db21wb25lbnQuaGFzU3VibWVudSIsInBhY2thZGljLlNpZGViYXJJdGVtQ29tcG9uZW50LmxpbmsiLCJwYWNrYWRpYy5TaWRlYmFySXRlbUNvbXBvbmVudC50b2dnbGUiLCJwYWNrYWRpYy5TaWRlYmFySXRlbUNvbXBvbmVudC5pc1R5cGUiLCJwYWNrYWRpYy5TaWRlYmFySXRlbUNvbXBvbmVudC5jbG9zZSIsInBhY2thZGljLlNpZGViYXJJdGVtQ29tcG9uZW50Lm9wZW4iLCJwYWNrYWRpYy5TaWRlYmFySXRlbUNvbXBvbmVudC5jbG9zZVN1Ym1lbnVzIiwicGFja2FkaWMuU2lkZWJhckl0ZW1Db21wb25lbnQuYmVmb3JlQ29tcGlsZSIsInBhY2thZGljLlNpZGViYXJDb21wb25lbnQiLCJwYWNrYWRpYy5TaWRlYmFyQ29tcG9uZW50LmNvbnN0cnVjdG9yIiwicGFja2FkaWMuU2lkZWJhckNvbXBvbmVudC5ib2R5Q2xhc3MiLCJwYWNrYWRpYy5TaWRlYmFyQ29tcG9uZW50LmVuc3VyZUJvZHlDbGFzcyIsInBhY2thZGljLlNpZGViYXJDb21wb25lbnQuY2xvc2VkIiwicGFja2FkaWMuU2lkZWJhckNvbXBvbmVudC5oaWRkZW4iLCJwYWNrYWRpYy5TaWRlYmFyQ29tcG9uZW50LmNvbmRlbnNlZCIsInBhY2thZGljLlNpZGViYXJDb21wb25lbnQudG9nZ2xlIiwicGFja2FkaWMuU2lkZWJhckNvbXBvbmVudC5jbG9zZVN1Ym1lbnVzIiwicGFja2FkaWMuU2xpZGVUb2dnbGVUcmFuc2l0aW9uIiwicGFja2FkaWMuU2xpZGVUb2dnbGVUcmFuc2l0aW9uLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuU2xpZGVUb2dnbGVUcmFuc2l0aW9uLmVudGVyIiwicGFja2FkaWMuU2xpZGVUb2dnbGVUcmFuc2l0aW9uLmxlYXZlIiwicGFja2FkaWMuU2lkZWJhckRpcmVjdGl2ZSIsInBhY2thZGljLlNpZGViYXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5TaWRlYmFyRGlyZWN0aXZlLnVwZGF0ZSIsInBhY2thZGljLnZpZXciLCJwYWNrYWRpYy5WaWV3IiwicGFja2FkaWMuVmlldy5jb25zdHJ1Y3RvciIsInBhY2thZGljLlZpZXcuYnJlYWRjcnVtYiIsInBhY2thZGljLkRyb3Bkb3duQ29tcG9uZW50IiwicGFja2FkaWMuRHJvcGRvd25Db21wb25lbnQuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5Ecm9wZG93bkNvbXBvbmVudC50b2dnbGVEcm9wZG93biIsInBhY2thZGljLkRyb3Bkb3duQ29tcG9uZW50LnJlYWR5IiwicGFja2FkaWMuRHJvcGRvd25Db21wb25lbnQuYmVmb3JlRGVzdHJveSIsInBhY2thZGljLm5vcm1hbGl6ZVBhcmFtcyIsInBhY2thZGljLlRvb2x0aXBEaXJlY3RpdmUiLCJwYWNrYWRpYy5Ub29sdGlwRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuVG9vbHRpcERpcmVjdGl2ZS5pbml0UGx1Z2luIiwicGFja2FkaWMuVG9vbHRpcERpcmVjdGl2ZS5iaW5kIiwicGFja2FkaWMuVG9vbHRpcERpcmVjdGl2ZS51cGRhdGUiLCJwYWNrYWRpYy5Qb3BvdmVyRGlyZWN0aXZlIiwicGFja2FkaWMuUG9wb3ZlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsInBhY2thZGljLlBvcG92ZXJEaXJlY3RpdmUuaW5pdFBsdWdpbiIsInBhY2thZGljLlBvcG92ZXJEaXJlY3RpdmUuYmluZCIsInBhY2thZGljLlBvcG92ZXJEaXJlY3RpdmUudXBkYXRlIiwicGFja2FkaWMuZGF0YSIsInBhY2thZGljLnRvZ2dsZSIsInBhY2thZGljLnJlYWR5IiwicGFja2FkaWMuYmVmb3JlRGVzdHJveSIsInBhY2thZGljLlRhYkNvbXBvbmVudCIsInBhY2thZGljLlRhYkNvbXBvbmVudC5jb25zdHJ1Y3RvciIsInBhY2thZGljLlRhYkNvbXBvbmVudC5zaG93IiwicGFja2FkaWMuVGFiQ29tcG9uZW50LnRyYW5zaXRpb24iLCJwYWNrYWRpYy5UYWJDb21wb25lbnQuY3JlYXRlZCIsInBhY2thZGljLlRhYkNvbXBvbmVudC5yZWFkeSIsInBhY2thZGljLlRhYnNldENvbXBvbmVudCIsInBhY2thZGljLlRhYnNldENvbXBvbmVudC5jb25zdHJ1Y3RvciIsInBhY2thZGljLlRhYnNldENvbXBvbmVudC5oYW5kbGVUYWJMaXN0Q2xpY2siLCJwYWNrYWRpYy5QYWdlTG9hZGVyRGlyZWN0aXZlIiwicGFja2FkaWMuUGFnZUxvYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsInBhY2thZGljLlBhZ2VMb2FkZXJEaXJlY3RpdmUudXBkYXRlIiwicGFja2FkaWMuVGVzdERpcmVjdGl2ZSIsInBhY2thZGljLlRlc3REaXJlY3RpdmUuY29uc3RydWN0b3IiLCJwYWNrYWRpYy5UZXN0RGlyZWN0aXZlLndhdGNoQSIsInBhY2thZGljLkJhc2VUcmFuc2l0aW9uLmVudGVyQ2FuY2VsbGVkIiwicGFja2FkaWMuQmFzZVRyYW5zaXRpb24ubGVhdmVDYW5jZWxsZWQiLCJwYWNrYWRpYy5fc3BlZWQiLCJwYWNrYWRpYy5GYWRlVHJhbnNpdGlvbiIsInBhY2thZGljLkZhZGVUcmFuc2l0aW9uLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuRmFkZVRyYW5zaXRpb24uZW50ZXIiLCJwYWNrYWRpYy5GYWRlVHJhbnNpdGlvbi5sZWF2ZSIsInBhY2thZGljLkZhZGVJblRyYW5zaXRpb24iLCJwYWNrYWRpYy5GYWRlSW5UcmFuc2l0aW9uLmNvbnN0cnVjdG9yIiwicGFja2FkaWMuRmFkZUluVHJhbnNpdGlvbi5lbnRlciIsInBhY2thZGljLkZhZGVPdXRUcmFuc2l0aW9uIiwicGFja2FkaWMuRmFkZU91dFRyYW5zaXRpb24uY29uc3RydWN0b3IiLCJwYWNrYWRpYy5GYWRlT3V0VHJhbnNpdGlvbi5sZWF2ZSIsInBhY2thZGljLlZpZXdGYWRlVHJhbnNpdGlvbiIsInBhY2thZGljLlZpZXdGYWRlVHJhbnNpdGlvbi5jb25zdHJ1Y3RvciIsInBhY2thZGljLlZpZXdGYWRlVHJhbnNpdGlvbi5lbnRlciIsInBhY2thZGljLlZpZXdGYWRlVHJhbnNpdGlvbi5sZWF2ZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxRQUFRLENBa0JqQjtBQWxCRCxXQUFVLFFBQVEsRUFBQyxDQUFDO0lBQXBCQSxpQkFrQkNBO0lBVkdBLENBQUNBLEtBQUtBLEVBQUVBLFdBQVdBLEVBQUVBLGFBQWFBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQVdBO1FBQy9EQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxjQUFZLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBLENBQUFBO0lBQ2xFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVIQSxZQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBU0EsQ0FBQ0EsQ0FBQ0E7SUFDbkJBLFlBQUdBLENBQUNBLEdBQUdBLENBQUNBLG9CQUFXQSxDQUFDQSxDQUFDQTtJQUNyQkEsWUFBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDeEJBLFlBQUdBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO0lBRWJBLGtCQUFTQSxHQUEwQkEsRUFBRUEsQ0FBQ0E7QUFDckRBLENBQUNBLEVB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LEVBQUVBO1lBQ0hBLElBQUlBLEVBQUlBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtTQUNwQkE7UUFFREEsTUFBTUEsRUFBRUE7WUFDSkEsSUFBSUEsRUFBSUEsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1NBQ3BCQTtRQUVEQSxRQUFRQSxFQUFFQTtZQUNOQSxJQUFJQSxFQUFJQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7U0FDcEJBO1FBRURBLGFBQWFBLEVBQUVBO1lBQ1hBLElBQUlBLEVBQUlBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtTQUNwQkE7UUFFREEsUUFBUUEsRUFBRUE7WUFDTkEsSUFBSUEsRUFBSUEsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1NBQ3BCQTtRQUVEQSxNQUFNQSxFQUFFQTtZQUNKQSxJQUFJQSxFQUFJQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7U0FDcEJBO1FBRURBLFlBQVlBLEVBQUVBO1lBQ1ZBLElBQUlBLEVBQUlBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtTQUNwQkE7UUFFREEsTUFBTUEsRUFBRUE7WUFDSkEsSUFBSUEsRUFBSUEsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1NBQ3BCQTtRQUVEQSxNQUFNQSxFQUFFQTtZQUNKQSxJQUFJQSxFQUFJQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7U0FDcEJBO1FBRURBLE9BQU9BLEVBQUVBO1lBQ0xBLElBQUlBLEVBQUlBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtTQUNwQkE7UUFFREEsYUFBYUEsRUFBRUE7WUFDWEEsSUFBSUEsRUFBSUEsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1NBQ3BCQTtRQUVEQSxNQUFNQSxFQUFFQTtZQUNKQSxJQUFJQSxFQUFJQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7U0FDcEJBO1FBRURBLFFBQVFBLEVBQUVBO1lBQ05BLElBQUlBLEVBQUlBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtTQUNwQkE7UUFFREEsT0FBT0EsRUFBRUE7WUFDTEEsSUFBSUEsRUFBSUEsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1NBQ3BCQTtRQUVEQSxRQUFRQSxFQUFFQTtZQUNOQSxJQUFJQSxFQUFJQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7U0FDcEJBO1FBRURBLGFBQWFBLEVBQUVBO1lBQ1hBLElBQUlBLEVBQUlBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxLQUFLQSxFQUFHQSxTQUFTQTtZQUNqQkEsS0FBS0EsRUFBR0EsU0FBU0E7WUFDakJBLEtBQUtBLEVBQUdBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtZQUNqQkEsTUFBTUEsRUFBRUEsU0FBU0E7WUFDakJBLE1BQU1BLEVBQUVBLFNBQVNBO1lBQ2pCQSxNQUFNQSxFQUFFQSxTQUFTQTtTQUNwQkE7UUFFREEsT0FBT0EsRUFBRUE7WUFDTEEsSUFBSUEsRUFBR0EsU0FBU0E7WUFDaEJBLEtBQUtBLEVBQUVBLFNBQVNBO1lBQ2hCQSxLQUFLQSxFQUFFQSxTQUFTQTtZQUNoQkEsS0FBS0EsRUFBRUEsU0FBU0E7WUFDaEJBLEtBQUtBLEVBQUVBLFNBQVNBO1lBQ2hCQSxLQUFLQSxFQUFFQSxTQUFTQTtZQUNoQkEsS0FBS0EsRUFBRUEsU0FBU0E7WUFDaEJBLEtBQUtBLEVBQUVBLFNBQVNBO1lBQ2hCQSxLQUFLQSxFQUFFQSxTQUFTQTtZQUNoQkEsS0FBS0EsRUFBRUEsU0FBU0E7U0FDbkJBO1FBRURBLE1BQU1BLEVBQUVBO1lBQ0pBLElBQUlBLEVBQUdBLFNBQVNBO1lBQ2hCQSxLQUFL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QUFDQSxHQUFHQSxHQUFHQTtRQUN4REEsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxHQUFHQTtRQUN2Q0EsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxHQUFHQTtRQUN2Q0EsS0FBS0EsR0FBR0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsSUFBSUE7UUFDOUJBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEdBQUdBO1FBQ2hCQSxNQUFNQSxDQUFDQTtJQUVYQSxJQUFJQSxnQkFBZ0JBLEdBQUlBLENBQUNBLEVBQUVBLENBQUNBO0lBQzVCQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLFdBQVdBLEdBQUdBLEdBQUdBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsR0FBR0EsR0FBR0E7UUFDbEVBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsR0FBR0EsR0FBR0E7UUFDNUNBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsR0FBR0EsR0FBR0E7UUFDNUNBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLEdBQUdBLElBQUlBO1FBQ25DQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxHQUFHQTtRQUNoQkEsTUFBTUEsQ0FBQ0E7SUFFWEEsSUFBSUEsTUFBTUEsR0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7SUFDdkJBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLEdBQVFBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO0lBQ3JFQSxJQUFJQSxXQUFXQSxHQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtJQUN2QkEsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUkxRUEsSUFBSUEsU0FBU0EsR0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7SUFDckJBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO0lBRTNCQSxJQUFJQSxTQUFTQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQTtJQUMzQkEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBU0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDMURBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLEdBQVVBLElBQUlBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO0lBQ3ZEQSxJQUFJQSxnQkFBZ0JBLEdBQUdBLEtBQUtBLENBQUNBO0lBRTdCQSxJQUFJQSxLQUFLQSxHQUFTQSxDQUFDQSxFQUFFQSxDQUFDQTtJQUN0QkEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBUUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFDaEVBLElBQUlBLFVBQVVBLEdBQUlBLENBQUNBLEVBQUVBLENBQUNBO0lBQ3RCQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO0lBSXJFQSxJQUFJQSxTQUFTQSxHQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtJQUNyQkEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0E7SUFFM0JBLElBQUlBLFNBQVNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBO0lBQzNCQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFTQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUMxREEsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBVUEsSUFBSUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDdkRBLElBQUlBLGdCQUFnQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7SUFFN0JBLElBQUlBLEtBQUtBLEdBQVNBLENBQUNBLEVBQUVBLENBQUNBO0lBQ3RCQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFRQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUNoRUEsSUFBSUEsVUFBVUEsR0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7SUFDdEJBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFHckVBLElBQUlBLGVBQWVBLEdBQUlBLENBQUNBLEVBQUVBLENBQUNBO0lBQzNCQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxPQUFPQSxHQUFHQSxVQUFVQSxHQUFHQSxPQUFPQSxDQUFDQTtJQUN4RUEsSUFBSUEsVUFBVUEsR0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7SUFDM0JBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLEdBQVFBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLE9BQU9BLEdBQUdBLFNBQVNBLEdBQUdBLE9BQU9BLENBQUNBO0lBS3ZFQSxJQUFJQSxjQUFjQSxHQUFJ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Q0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2RBLEtBQUtBLFVBQVVBO29CQUNYQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDM0JBLElBQUlBLENBQUNBLEtBQUtBLEdBQWVBLENBQUNBLENBQUNBO29CQUMzQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBZUEsQ0FBQ0EsQ0FBQ0E7b0JBQzNCQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDYkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsVUFBVUE7b0JBQ1hBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO29CQUMzQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBZUEsQ0FBQ0EsQ0FBQ0E7b0JBQzNCQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDYkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxLQUFLQSxDQUFDQTtnQkFDVkEsS0FBS0EsVUFBVUE7b0JBSVhBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO29CQUMzQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7b0JBQzlCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtvQkFDNUJBLEtBQUtBLENBQUNBO2dCQUdWQSxLQUFLQSxZQUFZQTtvQkFDYkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7d0JBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtvQkFDbENBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO29CQUM1QkEsS0FBS0EsQ0FBQ0E7Z0JBRVZBLEtBQUtBLE9BQU9BO29CQUtSQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQTt3QkFDckVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO29CQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBUUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3BCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFRQSxDQUFDQSxDQUFDQTtvQkFDcEJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBO29CQUNyQkEsS0FBS0EsQ0FBQ0E7Z0JBQ1ZBLEtBQUtBLE9BQU9BO29CQUtSQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQTt3QkFDakRBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO29CQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBUUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3BCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDckJBLEtBQUtBLENBQUNBO2dCQUNWQSxLQUFLQSxPQUFPQTtvQkFLUkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7d0JBQzdCQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDakJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBO29CQUNyQkEsS0FBS0EsQ0FBQ0E7Z0JBR1ZBLEtBQUtBLEtBQUtBO29CQUNOQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQTt3QkFDN0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUMxQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ0ZBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBO3dCQUMvQkEsT0FBT0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7NEJBQ2RBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dDQUN6Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0NBQ3JCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDWEEsQ0FBQ0E7d0JBQ0xBLENBQUNBO3dCQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDVEEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hDQSxDQUFDQTtvQkFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBR2JBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNwQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQzFCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDMUNBLENBQUNBO3dCQUFDQSxJQUFJQTs0QkFDRkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFDQSxDQUFDQTtvQkFDREEsS0FBS0EsQ0FBQ0E7Z0JBRVZBO29CQUNJQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSw4QkFBOEJBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2xFQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNkQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTFIsYUFBQ0E7SUFBREEsQ0FBQ0EsQUEvTkR2TCxJQStOQ0E7SUEvTllBLGVBQU1BLFNBK05sQkEsQ0FBQUE7SUFFREEsYUFBYUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsS0FBS0EsRUFBRUEsVUFBVUE7UUFDNUNnTSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDbkJBLEtBQUtBLEdBQVFBLFNBQVNBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxNQUFNQSxDQUFDQSxPQUFPQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUN2RUEsQ0FBRUE7UUFBQUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO0lBQ0xBLENBQUNBO0lBRURoTSxjQUFjQSxRQUFZQSxFQUFFQSxRQUFZQTtRQUNwQ2lNLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDSkEsSUFBSUEsRUFBRUEsR0FBT0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLEVBQUVBLEdBQU9BLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzdCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxJQUFJQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0NBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsT0FBT0EsSUFBSUEsR0FBR0EsS0FBS0EsT0FBT0EsSUFBSUEsR0FBR0EsS0FBS0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3hEQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdEJBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBO3dCQUN2QkEsQ0FBQ0E7b0JBQ0xBLENBQUNBO2dCQUNMQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBQ0RBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsT0FBT0EsSUFBSUEsR0FBR0EsS0FBS0EsT0FB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Z0JBQ3pDQSxHQUFHQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDZEEsS0FBS0EsQ0FBQ0E7WUFDVkEsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDUkEsS0FBS0EsR0FBR0EsQ0FBQ0E7WUFDVEEsS0FBS0EsSUFBSUE7Z0JBQ0xBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN0QkEsS0FBS0EsQ0FBQ0E7WUFDVkEsS0FBS0EsSUFBSUE7Z0JBQ0xBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN2QkEsS0FBS0EsQ0FBQ0E7WUFDVkEsS0FBS0EsR0FBR0E7Z0JBQ0pBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN0QkEsS0FBS0EsQ0FBQ0E7WUFDVkEsS0FBS0EsSUFBSUE7Z0JBQ0xBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN2QkEsS0FBS0EsQ0FBQ0E7WUFDVkEsS0FBS0EsR0FBR0E7Z0JBQ0pBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN0QkEsS0FBS0EsQ0FBQ0E7WUFDVkEsS0FBS0EsSUFBSUE7Z0JBQ0xBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN2QkEsS0FBS0EsQ0FBQ0E7WUFDVkE7Z0JBQ0lBLE1BQU1BLElBQUlBLFNBQVNBLENBQUNBLG9CQUFvQkEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDdkRBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO0lBQ2ZBLENBQUNBO0lBRURsTjtRQU1JbU4sb0JBQVlBLElBQVNBLEVBQUVBLEtBQVVBO1lBQzdCQyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDN0JBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEtBQUtBLEtBQUtBLENBQUNBO29CQUNyQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hCQSxJQUFJQTtvQkFDQUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDMUJBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLFlBQVlBLFVBQVVBLENBQUNBLENBQUNBO2dCQUM5QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsSUFBSUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFHdkNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ25CQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUVqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsS0FBS0EsR0FBR0EsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNwQkEsSUFBSUE7Z0JBQ0FBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO1FBR3pEQSxDQUFDQTtRQUVNRCwwQkFBS0EsR0FBWkEsVUFBYUEsSUFBSUE7WUFDYkUsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsRUFBRUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRXRCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDSEEsTUFBTUEsSUFBSUEsU0FBU0EsQ0FBQ0Esc0JBQXNCQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUV2REEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEtBQUtBLEdBQUdBLENBQUNBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFHdkJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNOQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUN0QkEsSUFBSUE7Z0JBQ0FBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ25EQSxDQUFDQTtRQUVNRiw0QkFBT0EsR0FBZEE7WUFDSUcsTUFBTUEsQ0FBQ0Esc0JBQXNCQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNoREEsQ0FBQ0E7UUFFTUgsNkJBQVFBLEdBQWZBO1lBQ0lJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUVNSix5QkFBSUEsR0FBWEEsVUFBWUEsT0FBT0E7WUFHZkssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsS0FBS0EsR0FBR0EsQ0FBQ0E7Z0JBQ3BCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUVoQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsT0FBT0EsS0FBS0EsUUFBUUEsQ0FBQ0E7Z0JBQzVCQSxPQUFPQSxHQUFHQSxJQUFJQSxNQUFN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UUFDM0NBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEVBQUVBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBO1lBRTNDLElBQUksR0FBRyxDQUFDO1lBRVIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNsRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO29CQUNWLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2xFLElBQUk7b0JBQ0EsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDOUQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVaLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO29CQUNyQixFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMs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QUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUM3Q0EsQ0FBQ0E7SUFPRHpPLHVCQUF1QkEsRUFBRUEsRUFDRkEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFDekJBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBO1FBRTFDME8sRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDUkEsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDZEEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDYkEsSUFBSUEsR0FBR0EsSUFBSUEsR0FBR0EsRUFBRUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ2JBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3ZDQSxJQUFJQTtZQUNBQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDUkEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDWkEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDbENBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ2JBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNUQSxFQUFFQSxHQUFHQSxJQUFJQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUNyREEsSUFBSUE7WUFDQUEsRUFBRUEsR0FBR0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFbkJBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQU1EMU8saUJBQWlCQSxHQUFHQSxFQUFFQSxPQUFPQTtRQUN6QjJPLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDdEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ3JCQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQU01QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0Es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Q0FBQ0E7O1dBQUNBLDZDQUFJQSxFQUFpQkE7UUFFNURBO1lBQUNBLGFBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQUlBLE9BQUFBLE1BQU1BLEVBQU5BLENBQU1BLEVBQUNBLENBQUNBOztXQUFDQSw2Q0FBSUEsRUFBUUE7UUFDMUVBO1lBQUNBLGFBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQUlBLE9BQUFBLEVBQUVBLEVBQUZBLENBQUVBLEVBQUNBLENBQUNBOztXQUFDQSw4Q0FBS0EsRUFBUUE7UUFDdkVBO1lBQUNBLGFBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQUlBLE9BQUFBLEVBQUVBLEVBQUZBLENBQUVBLEVBQUNBLENBQUNBOztXQUFDQSw2Q0FBSUEsRUFBUUE7UUFDdEVBO1lBQUNBLGFBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQUlBLE9BQUFBLGNBQWNBLEVBQWRBLENBQWNBLEVBQUNBLENBQUNBOztXQUFDQSw2Q0FBSUEsRUFBUUE7UUFFbEZBO1lBQUNBLGFBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQUlBLE9BQUFBLEVBQUVBLEVBQUZBLENBQUVBLEVBQUNBLENBQUNBOztXQUFDQSw4Q0FBS0EsRUFBUUE7UUFDdkVBO1lBQUNBLGFBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQUtBLE9BQUFBLElBQUlB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QUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFDQSxDQUFDQTs7V0FBQ0Esc0NBQUlBLEVBQWNBO1FBQ3pEQTtZQUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxjQUFJQSxPQUFBQSxFQUFFQSxFQUFGQSxDQUFFQSxFQUFDQSxDQUFDQTs7V0FBQ0EsdUNBQUtBLEVBQVFBO1FBQ3ZFQTtZQUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFDQSxDQUFDQTs7V0FBQ0Esc0NBQUlBLEVBQVFBO1FBQ25EQTtZQUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxjQUFJQSxPQUFBQSxjQUFjQSxFQUFkQSxDQUFjQSxFQUFDQSxDQUFDQTs7V0FBQ0Esc0NBQUlBLEVBQVFBO1FBQ2xGQTtZQUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxjQUFJQSxPQUFBQSxNQUFNQSxFQUFOQSxDQUFNQSxFQUFDQSxDQUFDQTs7V0FBQ0Esc0NBQUlBLEVBQVFBO1FBQzFFQTtZQUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxjQUFJQSxPQUFBQSxLQUFLQSxFQUFMQSxDQUFLQSxFQUFDQSxDQUFDQTs7V0FBQ0EsMENBQVFBLEVBQVNBO1FBQy9FQTtZQUFDQSxhQUFJQSxDQUFDQSxFQUFDQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxTQUFTQSxF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QUNBO2dCQUNyQkEsS0FBS0EsS0FBS0E7b0JBQ05BLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLEdBQUdBLE9BQU9BLENBQUNBLFdBQVdBLEdBQUdBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLEdBQUdBLENBQUNBLENBQUFBO29CQUN6RkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsR0FBSUEsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQUE7b0JBQzVEQSxLQUFLQSxDQUFBQTtnQkFDVEEsS0FBS0EsTUFBTUE7b0JBQ1BBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLEdBQUdBLE9BQU9BLENBQUNBLFdBQVdBLENBQUFBO29CQUM1REEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsR0FBSUEsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQUE7b0JBQzFGQSxLQUFLQSxDQUFBQTtnQkFDVEEsS0FBS0EsT0FBT0E7b0JBQ1JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLENBQUFBO29CQUMzREEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsR0FBSUEsTUFBTUEsQ0FBQ0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQUE7b0JBQzFGQSxLQUFLQSxDQUFBQTtnQkFDVEEsS0FBS0EsUUFBUUE7b0JBQ1RBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLEdBQUdB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QUNBLENBQUNBO1FBQ2xFQSxDQUFDQTtRQWRMSDtZQUFDQSxtQkFBVUEsQ0FBQ0EsV0FBV0EsRUFBRUEsS0FBS0EsQ0FBQ0E7OytCQWU5QkE7UUFBREEseUJBQUNBO0lBQURBLENBQUNBLEFBZkRsYyxFQUN3Q0EsY0FBY0EsRUFjckRBO0lBZFlBLDJCQUFrQkEscUJBYzlCQSxDQUFBQTtBQUVMQSxDQUFDQSxFQWhFUyxRQUFRLEtBQVIsUUFBUSxRQWdFakIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgcGFja2FkaWMge1xuXG4gICAgZXhwb3J0IGRlY2xhcmUgdmFyIFZ1ZTp0eXBlb2YgdnVlanMuVnVlLFxuICAgICAgICBWdWVSZXNvdXJjZTphbnksXG4gICAgICAgIFZ1ZVJvdXRlcjphbnksXG4gICAgICAgIF86Xy5Mb0Rhc2hTdGF0aWMsXG4gICAgICAgIF9zOlVuZGVyc2NvcmVTdHJpbmdTdGF0aWM7XG5cbiAgICBbJ1Z1ZScsICdWdWVSb3V0ZXInLCAnVnVlUmVzb3VyY2UnLCAnXycsICdfcyddLmZvckVhY2goKG5hbWU6c3RyaW5nKSA9PiB7XG4gICAgICAgIHBhY2thZGljW25hbWVdID0gZnVuY3Rpb24oKXsgcmV0dXJuIHdpbmRvd1tuYW1lXTsgfS5jYWxsKHRoaXMpXG4gICAgfSk7XG5cbiAgICBWdWUudXNlKFZ1ZVJvdXRlcik7XG4gICAgVnVlLnVzZShWdWVSZXNvdXJjZSk7XG4gICAgVnVlLmNvbmZpZy5hc3luYyA9IHRydWU7XG4gICAgVnVlLmNvbmZpZy5kZWJ1ZyA9IHRydWU7XG5cbiAgICBleHBvcnQgdmFyIHRlbXBsYXRlczp7W25hbWU6c3RyaW5nXTpzdHJpbmd9ID0ge307XG59XG4vL2V4cG9ydCA9IHBhY2thZGljO1xuIiwibmFtZXNwYWNlIHBhY2thZGljIHsgdGVtcGxhdGVzWydhbGluayddID0gJzxhIHYtYmluZD1cImF0dHJzXCIgdi1saW5rPVwidmxpbmtcIj48c2xvdD48L3Nsb3Q+PC9hPic7IH0iLCJuYW1lc3BhY2UgcGFja2FkaWMgeyB0ZW1wbGF0ZXNbJ2dyaWQnXSA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPiAgICA8dGhlYWQ+ICAgIDx0cj4gICAgICAgIDx0aCB2LWZvcj1cImNvbHVtbiBpbiBjb2x1bW5zXCIgdi1vbjpjbGljaz1cInNvcnRCeShjb2x1bW4pXCIgdi1iaW5kOmNsYXNzPVwieyBcXCdkcm9wdXBcXCc6IHJldmVyc2VkW2NvbHVtbl0gfVwiPiAgICAgICAgICAgIHt7Y29sdW1uIHwgY2FwaXRhbGl6ZX19ICAgICAgICAgICAgPHNwYW4gdi1iaW5kOmNsYXNzPVwieyBcXCdjYXJldFxcJzogc29ydENvbHVtbiA9PSBjb2x1bW4gfVwiPjwvc3Bhbj4gICAgICAgIDwvdGg+ICAgIDwvdHI+ICAgIDwvdGhlYWQ+ICAgIDx0Ym9keT4gICAgPHRyIHYtZm9yPVwicm93IGluIGN1cnJlbnRQYWdlIHwgb3JkZXJCeSBzb3J0Q29sdW1uIHJldmVyc2VkW3NvcnRDb2x1bW5dXCIgdHJhbnNpdGlvbj1cImZhZGVpblwiPiAgICAgICAgPHRkIHYtZm9yPVwiY29sdW1uIGluIGNvbHVtbnNcIj4gICAgICAgICAgICB7e3Jvd1tjb2x1bW5dfX0gICAgICAgIDwvdGQ+ICAgIDwvdHI+ICAgIDwvdGJvZHk+PC90YWJsZT4nOyB9IiwibmFtZXNwYWNlIHBhY2thZGljIHsgdGVtcGxhdGVzWydwYWdlLWJyZWFkY3J1bWInXSA9ICc8bGk+ICAgIDxhbGluayB2LWJpbmQ6bGluaz1cImxpbmtcIj48c2xvdD57e3RpdGxlfX08L3Nsb3Q+PC9hbGluaz4gICAgPGkgY2xhc3M9XCJmYSBmYS1hcnJvdy1yaWdodFwiIHYtaWY9XCJhcnJvd1wiPjwvaT48L2xpPic7IH0iLCJuYW1lc3BhY2UgcGFja2FkaWMgeyB0ZW1wbGF0ZXNbJ3BhZ2UtYnJlYWRjcnVtYnMnXSA9ICc8dWwgY2xhc3M9XCJwYWdlLWJyZWFkY3J1bWIgYnJlYWRjcnVtYlwiIHYtZWw6cGFnZS1icmVhZGNydW1icz4gICAgPHNsb3Q+ICAgICAgICA8cGFnZS1icmVhZGNydW1iIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiICAgICAgICAgICAgICAgICAgICAgICAgIDppdGVtPVwiaXRlbVwiICAgICAgICAgICAgICAgICAgICAgICAgIDppbmRleD1cIiRpbmRleFwiICAgICAgICA+PC9wYWdlLWJyZWFkY3J1bWI+ICAgIDwvc2xvdD48L3VsPic7IH0iLCJuYW1lc3BhY2UgcGFja2FkaWMgeyB0ZW1wbGF0ZXNbJ3BhZ2UnXSA9ICc8ZGl2IGNsYXNzPVwicGFnZS1oZWFkXCIgdi1pZj1cInRpdGxlXCI+ICAgIDxkaXYgY2xhc3M9XCJwYWdlLXRpdGxlXCI+ICAgICAgICA8aDE+e3t0aXRsZX19IDxzbWFsbCB2LWlmPVwic3VidGl0bGVcIj57e3N1YnRpdGxlfX08L3NtYWxsPjwvaDE+ICAgIDwvZGl2PjwvZGl2PjxzbG90IG5hbWU9XCJicmVhZGNydW1iXCI+PC9zbG90PjxkaXYgdi1pZj1cInNlcGVyYXRvclwiIGNsYXNzPVwicGFnZS1jb250ZW50LXNlcGVyYXRvclwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwYWdlLWNvbnRlbnQtaW5uZXJcIj4gICAgPHNsb3Q+PC9zbG90PjwvZGl2Pic7IH0iLCJuYW1lc3BhY2UgcGFja2FkaWMgeyB0ZW1wbGF0ZXNbJ3BhZ2luYXRpb24nXSA9ICc8dWwgY2xhc3M9XCJwYWdpbmF0aW9uXCI+ICAgIDxsaT4gICAgICAgIDxhIGhyZWY9XCIjXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdi1vbjpjbGljaz1cInByZXYoJGV2ZW50KVwiPiAgICAgICAgICAgIDxzbG90IG5hbWU9XCJwcmV2aW91c1wiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZsYXF1bzs8L3NwYW4+PC9zbG90PiAgICAgICAgPC9hPiAgICA8L2xpPiAgICA8bGkgdi1mb3I9XCJjIGluIHBhZ2VyLnJhbmdlXCIgdi1iaW5kOmNsYXNzPVwieyBcXCdhY3RpdmVcXCc6IGlzQ3VycmVudChjKSB9XCI+ICAgICAgICA8YSBocmVmPVwiI1wiIHYtb246Y2xpY2s9XCJnb3RvKGMsJGV2ZW50KVwiPnt7Y319PC9hPiAgICA8L2xpPiAgICA8bGk+ICAgICAgICA8YSBocmVmPVwiI1wiIGFyaWEtbGFiZWw9XCJOZXh0XCIgdi1vbjpjbGljaz1cIm5leHQoJGV2ZW50KVwiPiAgICAgICAgICAgIDxzbG90IG5hbWU9XCJuZXh0XCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnJhcXVvOzwvc3Bhbj48L3Nsb3Q+ICAgICAgICA8L2E+ICAgIDwvbGk+PC91bD4nOyB9IiwibmFtZXNwYWNlIHBhY2thZGljIHsgdGVtcGxhdGVzWydzaWRlYmFyLWl0ZW0nXSA9ICc8bGkgdi1iaW5kOmNsYXNzPVwieyBcXCdvcGVuXFwnOiBpc09wZW4gJiYgaGFzU3VibWVudSwgXFwnYWN0aXZlXFwnOiBpc0FjdGl2ZSwgXFwnaGVhZGluZ1xcJzogaXNUeXBlKFxcJ2hlYWRpbmdcXCcpIH1cIj4gICAgPGgzIHYtaWY9XCJpc1R5cGUoXFwnaGVhZGluZ1xcJylcIj57e3RpdGxlfX08L2gzPiAgICA8YSB2LWlmPVwiaXNUeXBlKFxcJ2ZvbGRlclxcJylcIiBocmVmPVwiamF2YXNjcmlwdDo7XCIgdi1vbjpjbGljaz1cInRvZ2dsZSgpXCI+ICAgICAgICA8aSB2LWlmPVwiaWNvblwiIGNsYXNzPVwie3tpY29ufX1cIj48L2k+ICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+e3t0aXRsZX19PC9zcGFuPiAgICAgICAgPHNwYW4gdi1pZj1cImhhc1N1Ym1lbnVcIiBjbGFzcz1cImFycm93XCIgdi1iaW5kOmNsYXNzPVwieyBcXCdvcGVuXFwnOiBpc09wZW4gJiYgaGFzU3VibWVudSB9XCI+PC9zcGFuPiAgICA8L2E+ICAgIDxhbGluayB2LWlmPVwiaXNUeXBlKFxcJ2hyZWZcXCcsIFxcJ3JvdXRlXFwnLCBcXCdwYXRoXFwnKVwiIHYtYmluZDpsaW5rPVwibGlua1wiPjxpIHYtaWY9XCJpY29uXCIgY2xhc3M9XCJ7e2ljb259fVwiPjwvaT48c3BhbiBjbGFzcz1cInRpdGxlXCI+e3t0aXRsZX19PC9zcGFuPjwvYWxpbms+ICAgIDx1bCB2LWlmPVwiaGFzU3VibWVudSAmJiBpc1R5cGUoXFwnZm9sZGVyXFwnLCBcXCdocmVmXFwnKVwiIHYtc2hvdz1cImlzT3BlblwiIGNsYXNzPVwic3ViLW1lbnVcIiB0cmFuc2l0aW9uPVwic2lkZWJhci1zdWJtZW51XCI+ICAgICAgICA8c2xvdD4gPGl0ZW0gdi1mb3I9XCJzdWJpdGVtIGluIGNoaWxkcmVuXCIgOml0ZW09XCJzdWJpdGVtXCIgOmluZGV4PVwiJGluZGV4XCI+PC9pdGVtPiA8L3Nsb3Q+ICAgIDwvdWw+PC9saT4nOyB9IiwibmFtZXNwYWNlIHBhY2thZGljIHsgdGVtcGxhdGVzWydzaWRlYmFyJ10gPSAnPGRpdiBjbGFzcz1cInBhZ2Utc2lkZWJhciBuYXZiYXItY29sbGFwc2UgY29sbGFwc2VcIiB2LWVsPVwic2lkZWJhclwiPiAgICA8dWwgY2xhc3M9XCJwYWdlLXNpZGViYXItbWVudVwiIHYtYmluZDpjbGFzcz1cInsgXFwncGFnZS1zaWRlYmFyLW1lbnUtY2xvc2VkXFwnOiBjbG9zZWQgfVwiIHYtZWw9XCJtZW51XCI+ICAgICAgICA8c2xvdD4gICAgICAgICAgICA8aXRlbSB2LWZvcj1cIml0ZW0gaW4gaXRlbXNcIiAgICAgICAgICAgICAgICAgIDppdGVtPVwiaXRlbVwiICAgICAgICAgICAgICAgICAgOmluZGV4PVwiJGluZGV4XCIgICAgICAgICAgICA+PC9pdGVtPiAgICAgICAgPC9zbG90PiAgICA8L3VsPjwvZGl2Pic7IH0iLCJuYW1lc3BhY2UgcGFja2FkaWMuSlNPTiB7XG4gICAgdmFyIG9sZF9qc29uOmFueSA9IEpTT047XG5cblxuICAgIC8qKlxuICAgICAqIFN0cmluZ2lmeSBhIEpTT04gb2JqZWN0LCBzdXBwb3J0cyBmdW5jdGlvbnNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIGpzb24gb2JqZWN0XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KG9iajphbnkpIHtcblxuICAgICAgICByZXR1cm4gb2xkX2pzb24uc3RyaW5naWZ5KG9iaiwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uIHx8IHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ19QeEVnRXJfJyArIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIHN0cmluZyBpbnRvIGpzb24sIHN1cHBvcnQgZnVuY3Rpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gcGFyc2VcbiAgICAgKiBAcGFyYW0gZGF0ZTJvYmogLSBJIGZvcmdvdCwgc29ycnlcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBwYXJzZShzdHI6c3RyaW5nLCBkYXRlMm9iaj86YW55KSB7XG5cbiAgICAgICAgdmFyIGlzbzgwNjEgPSBkYXRlMm9iaiA/IC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8gOiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gb2xkX2pzb24ucGFyc2Uoc3RyLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByZWZpeDtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcHJlZml4ID0gdmFsdWUuc3Vic3RyaW5nKDAsIDgpO1xuXG4gICAgICAgICAgICBpZiAoaXNvODA2MSAmJiB2YWx1ZS5tYXRjaChpc284MDYxKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJlZml4ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2YWwoJygnICsgdmFsdWUgKyAnKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gJ19QeEVnRXJfJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmFsKHZhbHVlLnNsaWNlKDgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9uZSBhbiBvYmplY3RcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkYXRlMm9ialxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNsb25lKG9iajphbnksIGRhdGUyb2JqPzphbnkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlKHN0cmluZ2lmeShvYmopLCBkYXRlMm9iaik7XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE9wZW5XaW5kb3dPcHRpb25zIHtcbiAgICAgICAgd2lkdGg/Om51bWJlcjtcbiAgICAgICAgaGVpZ2h0PzpudW1iZXI7XG4gICAgICAgIHVybD86c3RyaW5nO1xuICAgICAgICB0YXJnZXQ/OnN0cmluZztcbiAgICAgICAgZmVhdHVyZXM/OnN0cmluZztcbiAgICAgICAgcmVwbGFjZT86Ym9vbGVhbjtcbiAgICAgICAgY29udGVudD86c3RyaW5nO1xuICAgICAgICBjYj86RnVuY3Rpb247XG4gICAgfVxuXG4gICAgZXhwb3J0IHZhciBvcGVuV2luZG93RGVmYXVsdHM6T3BlbldpbmRvd09wdGlvbnMgPSB7XG4gICAgICAgIHdpZHRoIDogNjAwLFxuICAgICAgICBoZWlnaHQ6IDYwMFxuICAgIH07XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gb3BlbldpbmRvdyhvcHRzOk9wZW5XaW5kb3dPcHRpb25zID0ge30pOldpbmRvdyB7XG4gICAgICAgIG9wdHMgICAgPSBfLm1lcmdlKG9wZW5XaW5kb3dEZWZhdWx0cywgb3B0cyk7XG4gICAgICAgIHZhciB3aW4gPSB3aW5kb3cub3BlbignJywgJycsICd3aWR0aD0nICsgb3B0cy53aWR0aCArICcsIGhlaWdodD0nICsgb3B0cy5oZWlnaHQpO1xuICAgICAgICBpZiAoZGVmaW5lZChvcHRzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICB3aW4uZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBvcHRzLmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBlbGVtZW50IHdyYXBwZWQgaW4galF1ZXJ5XG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmUobmFtZT86c3RyaW5nKSB7XG4gICAgICAgIGlmICghZGVmaW5lZChuYW1lKSkge1xuICAgICAgICAgICAgbmFtZSA9ICdkaXYnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB2aWV3cG9ydFxuICAgICAqIEByZXR1cm5zIHt7d2lkdGg6ICosIGhlaWdodDogKn19XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFZpZXdQb3J0KCk6YW55IHtcbiAgICAgICAgdmFyIGU6YW55ID0gd2luZG93LFxuICAgICAgICAgICAgYTphbnkgPSAnaW5uZXInO1xuICAgICAgICBpZiAoISgnaW5uZXJXaWR0aCcgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgYSA9ICdjbGllbnQnO1xuICAgICAgICAgICAgZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoIDogZVthICsgJ1dpZHRoJ10sXG4gICAgICAgICAgICBoZWlnaHQ6IGVbYSArICdIZWlnaHQnXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZGV2aWNlIGN1cnJlbnRseSB1c2VkIGlzIGEgdG91Y2ggZGV2aWNlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzVG91Y2hEZXZpY2UoKTpib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiVG91Y2hFdmVudFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjb2RlSW5kZW50Rml4KHN0cjpzdHJpbmcpIHtcbiAgICAgICAgdmFyIGZpeCA9IChjb2RlOnN0cmluZywgbGVhZGluZzpib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHR4dCA9IGNvZGU7XG4gICAgICAgICAgICBpZiAobGVhZGluZykge1xuICAgICAgICAgICAgICAgIHR4dCA9IHR4dC5yZXBsYWNlKC9eW1xcclxcbl0rLywgXCJcIikucmVwbGFjZSgvXFxzKyQvZywgXCJcIik7XHQvLyBzdHJpcCBsZWFkaW5nIG5ld2xpbmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgvXlxcUy9nbS50ZXN0KHR4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYXQsIHN0ciwgcmUgPSAvXltcXHQgXSsvZ20sIGxlbiwgbWluID0gMWUzO1xuICAgICAgICAgICAgd2hpbGUgKG1hdCA9IHJlLmV4ZWModHh0KSkge1xuICAgICAgICAgICAgICAgIGxlbiA9IG1hdFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IG1pbikge1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBsZW47XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IG1hdFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluID09IDFlMylcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgIHJldHVybiB0eHQucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgc3RyLCAnZ20nKSwgXCJcIik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmaXgoc3RyKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcHJlQ29kZUluZGVudEZpeChlbDpIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29kZUluZGVudEZpeChlbC50ZXh0Q29udGVudCk7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJKUXVlcnlIZWxwZXJzKCkge1xuICAgICAgICBpZiAoa2luZE9mKCQuZm4ucHJlZml4ZWREYXRhKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICQuZm4ucHJlZml4ZWREYXRhID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICAgICAgdmFyIG9yaWdEYXRhID0gJCh0aGlzKS5maXJzdCgpLmRhdGEoKTtcbiAgICAgICAgICAgIHZhciBkYXRhICAgICA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBvcmlnRGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cChcIl5cIiArIHByZWZpeCArIFwiW0EtWl0rXCIpO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnRGF0YS5oYXNPd25Qcm9wZXJ0eShwKSAmJiBwYXR0ZXJuLnRlc3QocCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNob3J0TmFtZSAgID0gcFtwcmVmaXgubGVuZ3RoXS50b0xvd2VyQ2FzZSgpICsgcC5zdWJzdHIocHJlZml4Lmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhW3Nob3J0TmFtZV0gPSBvcmlnRGF0YVtwXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfTtcblxuICAgICAgICAkLmZuLnJlbW92ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKTpKUXVlcnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSAkLm1hcCh0aGlzLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIGltZyAgICAgICAgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICQuZWFjaChhdHRyaWJ1dGVzLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpbWcucmVtb3ZlQXR0cihpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICQuZm4uZW5zdXJlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhczpzdHJpbmcsIGhhczpib29sZWFuID0gdHJ1ZSk6SlF1ZXJ5IHtcblxuICAgICAgICAgICAgdmFyICR0aGlzOkpRdWVyeSA9ICQodGhpcyk7XG4gICAgICAgICAgICBpZiAoaGFzID09PSB0cnVlICYmICR0aGlzLmhhc0NsYXNzKGNsYXMpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKGNsYXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXMgPT09IGZhbHNlICYmICR0aGlzLmhhc0NsYXNzKGNsYXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoY2xhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAkLmZuLm9uQ2xpY2sgPSBmdW5jdGlvbiAoLi4uYXJnczphbnlbXSk6SlF1ZXJ5IHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gJHRoaXMub24uYXBwbHkoJHRoaXMsIFtpc1RvdWNoRGV2aWNlKCkgPyAndG91Y2hlbmQnIDogJ2NsaWNrJ10uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIEJyb3dzZXJQcmV0dHlDb25zb2xlIHtcblxuICAgICAgICBwcm90ZWN0ZWQgbWF0Y2hlcjpSZWdFeHAgPSAvXFxbc3R5bGVcXD0oW1xcd1xcZFxcX1xcLVxcLF0qPylcXF0oLio/KVxcW3N0eWxlXFxdL2c7XG4gICAgICAgIHByb3RlY3RlZCBzdHlsZXM6e1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgICAgIHB1YmxpYyBwcmludEZuOkZ1bmN0aW9uO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaW50Rm4/OkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlcyAgPSB7fTtcbiAgICAgICAgICAgIHRoaXMucHJpbnRGbiA9IHByaW50Rm4gfHwgY29uc29sZS5sb2dcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRNYXRlcmlhbFN0eWxlKG5hbWU6c3RyaW5nW118c3RyaW5nLCB2YXJpYW50OmFueSA9ICc1MDAnKTpCcm93c2VyUHJldHR5Q29uc29sZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhcmlhbnQgIT09ICc1MDAnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gdmFyaWFudC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlc1soPHN0cmluZz5uYW1lKS50b1N0cmluZygpXSA9ICdjb2xvcjogJyArIGNvbG9yKCg8c3RyaW5nPm5hbWUpLnRvU3RyaW5nKCksIHZhcmlhbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAoPHN0cmluZ1tdPiBuYW1lKS5mb3JFYWNoKGZ1bmN0aW9uIChuOnN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE1hdGVyaWFsU3R5bGUobiwgdmFyaWFudCk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYWRkRm9udFN0eWxlKG5hbWU6c3RyaW5nLCBmZjpzdHJpbmcpOkJyb3dzZXJQcmV0dHlDb25zb2xlIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW25hbWVdID0gJ2ZvbnQtZmFtaWx5OiAnICsgZmY7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRTdHlsZShuYW1lOnN0cmluZywgdmFsOnN0cmluZ3xzdHJpbmdbXSk6QnJvd3NlclByZXR0eUNvbnNvbGUge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZXNbbmFtZV0gPSB2YWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjc3MgPSAnJztcbiAgICAgICAgICAgICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbiAodjpzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN0eWxlc1t2XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyArPSB0aGlzLnN0eWxlc1t2XSArICc7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyArPSB2ICsgJzsnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlc1tuYW1lXSA9IGNzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFsbFN0eWxlcygpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0U3R5bGUobmFtZTpzdHJpbmcpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZXNbbmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzU3R5bGUobmFtZTpzdHJpbmcpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmluZWQodGhpcy5zdHlsZXNbbmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFkZERlZmF1bHRzKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDg7IGkgPCAzMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdHlsZSgnZnMnICsgaS50b1N0cmluZygpLCAnZm9udC1zaXplOiAnICsgaS50b1N0cmluZygpICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlKCdib2xkJywgJ2ZvbnQtd2VpZ2h0OmJvbGQnKVxuICAgICAgICAgICAgICAgIC5hZGRTdHlsZSgnY29kZS1ib3gnLCAnYmFja2dyb3VuZDogIzM3NDc0RjsgcGFkZGluZzogMXB4IDVweDsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgjMzczYTNjLCAwLjEpOyBsaW5lLWhlaWdodDogMThweCcpXG4gICAgICAgICAgICAgICAgLmFkZE1hdGVyaWFsU3R5bGUoT2JqZWN0LmtleXMoY29sb3JzKSlcbiAgICAgICAgICAgICAgICAuYWRkRm9udFN0eWxlKCdjb2RlJywgJ1wiU291cmNlIENvZGUgUHJvXCIsIFwiQ291cmllciBOZXdcIiwgQ291cmllciwgbW9ub3NwYWNlJylcbiAgICAgICAgICAgICAgICAuYWRkRm9udFN0eWxlKCdhcmlhbCcsICdBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJylcbiAgICAgICAgICAgICAgICAuYWRkRm9udFN0eWxlKCd2ZXJkYW5hJywgJ1ZlcmRhbmEsIEdlbmV2YSwgc2Fucy1zZXJpZicpXG4gICAgICAgICAgICAgICAgLmFkZFN0eWxlKCdjb2RleC1vcmFuZ2UnLCAnY29sb3I6I2VkNjYyNjsnKTtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNYWNybygndGl0bGUnLCBmdW5jdGlvbiAodGl0bGU6c3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZSgnW3N0eWxlPWJsb2NrLGJvbGQsZnMyMCxjb2RlLGNvZGV4LW9yYW5nZV0nICsgdGl0bGUgKyAnW3N0eWxlXScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFjcm8oJ2FsZXJ0JywgZnVuY3Rpb24gKHRleHQ6c3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZSgnW3N0eWxlPWNvZGUtYm94LGNvZGUscmVkXScgKyB0ZXh0ICsgJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy9bc3R5bGU9Y29kZS1ib3gsY29kZSxyZWRdJyArIGRlc2MgKyAnW3N0eWxlXVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIG1hY3JvczphbnkgPSB7fTtcblxuICAgICAgICBwdWJsaWMgY3JlYXRlTWFjcm8obmFtZTpzdHJpbmcsIGZuOkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1hY3Jvc1tuYW1lXSA9IGZuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG1hY3JvKC4uLmFyZ3M6YW55W10pIHtcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghZGVmaW5lZCh0aGlzLm1hY3Jvc1tuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2Nhbm5vdCBkbyBtYWNybycsIG5hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWFjcm9zW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHdyaXRlKG1lc3NhZ2U6c3RyaW5nLCAuLi5hcmdzOmFueVtdKSB7XG4gICAgICAgICAgICB2YXIgYXBwbHlBcmdzID0gW107XG4gICAgICAgICAgICBhcHBseUFyZ3MucHVzaChtZXNzYWdlLnJlcGxhY2UodGhpcy5tYXRjaGVyLCAnJWMkMiVjJykpO1xuXG4gICAgICAgICAgICB2YXIgbWF0Y2hlZDtcbiAgICAgICAgICAgIHdoaWxlICgobWF0Y2hlZCA9IHRoaXMubWF0Y2hlci5leGVjKG1lc3NhZ2UpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBjc3MgPSAnJztcbiAgICAgICAgICAgICAgICBtYXRjaGVkWzFdLnNwbGl0KCcsJykuZm9yRWFjaCgoc3R5bGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3NzICs9IHRoaXMuZ2V0U3R5bGUoc3R5bGUpICsgJzsnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXBwbHlBcmdzLnB1c2goY3NzKTtcbiAgICAgICAgICAgICAgICBhcHBseUFyZ3MucHVzaCgnJyk7IC8vIHB1c2ggZXh0cmEgZW1wdHkgdG8gcmVzZXQgc3R5bGVzIGZvciBzZWNvbmQgJWNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJpbnRGbi5hcHBseShjb25zb2xlLCBhcHBseUFyZ3MuY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG5cbiAgICBmdW5jdGlvbiBnZXRQcmVmZmVyZEJhZyhiYWdOYW1lOnN0cmluZyk6SVN0b3JhZ2VCYWcge1xuICAgICAgICBpZiAoaGFzQmFnKGJhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QmFnKGJhZ05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5hbWVzOnN0cmluZ1tdID0gT2JqZWN0LmtleXMoYmFncyk7XG4gICAgICAgICAgICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCYWcobmFtZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGVsaW1pdGVyc0NvbGxlY3Rpb24ge1xuICAgICAgICBbaW5kZXg6IHN0cmluZ106IElEZWxpbWl0ZXI7XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURlbGltaXRlckxvZGFzaCB7XG4gICAgICAgIGV2YWx1YXRlOiBSZWdFeHA7XG4gICAgICAgIGludGVycG9sYXRlOiBSZWdFeHA7XG4gICAgICAgIGVzY2FwZTogUmVnRXhwO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIElEZWxpbWl0ZXIge1xuICAgICAgICBvcGVuZXI/OiBzdHJpbmc7XG4gICAgICAgIGNsb3Nlcj86IHN0cmluZztcbiAgICAgICAgbG9kYXNoPzogSURlbGltaXRlckxvZGFzaDtcbiAgICB9XG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnIHtcbiAgICAgICAgZ2V0KHByb3A/OmFueSk6IGFueTtcbiAgICAgICAgc2V0KHByb3A6c3RyaW5nLCB2YWx1ZTphbnkpOiBJQ29uZmlnO1xuICAgICAgICBtZXJnZShvYmo6T2JqZWN0KTogSUNvbmZpZztcbiAgICAgICAgbWVyZ2UocHJvcDpzdHJpbmcsIG9iajpPYmplY3QpOiBJQ29uZmlnO1xuICAgICAgICByYXcocHJvcD86YW55KTogYW55O1xuICAgICAgICBwcm9jZXNzKHJhdzphbnkpOiBhbnk7XG4gICAgICAgIHVuc2V0KHByb3A6YW55KTogYW55O1xuICAgICAgICBoYXMocHJvcDphbnkpOmJvb2xlYW47XG5cblxuICAgICAgICBvYnNlcnZlcj86SUNvbmZpZ09ic2VydmVyIDtcbiAgICAgICAgYXR0YWNoT2JzZXJ2ZXIob2JzZXJ2ZXI6YW55fElDb25maWdPYnNlcnZlcik6SUNvbmZpZyA7XG5cbiAgICB9XG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUHJvcGVydHkgZXh0ZW5kcyBJQ29uZmlnIHtcbiAgICAgICAgKGFyZ3M/OmFueSk6IGFueTtcbiAgICB9XG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnT2JzZXJ2ZXIge1xuICAgICAgICBzZXRJbnNwZWN0YWJsZU9iamVjdChvYmo6YW55KTtcbiAgICAgICAgaW5zcGVjdChjYjpGdW5jdGlvbilcbiAgICAgICAgcGF0aChleHByZXNzaW9uOnN0cmluZywgZGVmYXVsdFZhbHVlOmFueSwgY2hhbmdlRm46RnVuY3Rpb24sIG9wdFJlY2VpdmVyOmFueSk6YW55O1xuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIENvbmZpZ09ic2VydmVyIGltcGxlbWVudHMgSUNvbmZpZ09ic2VydmVyIHtcbiAgICAgICAgcHJvdGVjdGVkIG9iajphbnk7XG4gICAgICAgIHByb3RlY3RlZCBvbzpvYnNlcnZlanMuSU9iamVjdE9ic2VydmVyO1xuICAgICAgICBwcm90ZWN0ZWQgcG9zOm9ic2VydmVqcy5PYnNlcnZhYmxlW10gICAgICAgPSBbXTtcbiAgICAgICAgcHJvdGVjdGVkIG9vQ2FsbGJhY2tzOkZ1bmN0aW9uW10gPSBbXTtcbiAgICAgICAgcHJvdGVjdGVkIGRlYnVnT3V0cHV0OmJvb2xlYW4gICAgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iaj86YW55KSB7XG4gICAgICAgICAgICB0aGlzLnNldEluc3BlY3RhYmxlT2JqZWN0KG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRJbnNwZWN0YWJsZU9iamVjdChvYmo6YW55KSB7XG4gICAgICAgICAgICBpZiAoIWRlZmluZWQob2JqKSlyZXR1cm47XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMub28gID0gbmV3IG9ic2VydmVqcy5PYmplY3RPYnNlcnZlcih0aGlzLm9iaik7XG4gICAgICAgICAgICB0aGlzLm9vLm9wZW4oKGFkZGVkOmFueSwgcmVtb3ZlZDphbnksIGNoYW5nZWQ6YW55LCBnZXRPbGRWYWx1ZUZuOmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJlc3BvbmQgdG8gY2hhbmdlcyB0byB0aGUgb2JqLlxuXG4gICAgICAgICAgICAgICAgdGhpcy5vb0NhbGxiYWNrcy5mb3JFYWNoKChjYjpGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5hcHBseSh0aGlzLCBbe2FkZGVkOiBhZGRlZCwgcmVtb3ZlZDogcmVtb3ZlZCwgY2hhbmdlZDogY2hhbmdlZH0sIHRoaXMub28sIGdldE9sZFZhbHVlRm5dKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnT3V0cHV0ICE9PSB0cnVlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbicsICdhZGRlZCcsIGFkZGVkLCAncmVtb3ZlZCcsIHJlbW92ZWQsICdjaGFuZ2VkJywgY2hhbmdlZCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoYWRkZWQpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSwgLy8gYSBwcm9wZXJ0eSB3aGljaCBoYXMgYmVlbiBiZWVuIGFkZGVkIHRvIG9ialxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRbcHJvcGVydHldIC8vIGl0cyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVtb3ZlZCkuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHksIC8vIGEgcHJvcGVydHkgd2hpY2ggaGFzIGJlZW4gYmVlbiByZW1vdmVkIGZyb20gb2JqXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRPbGRWYWx1ZUZuKHByb3BlcnR5KSAvLyBpdHMgb2xkIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VkKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSwgLy8gYSBwcm9wZXJ0eSBvbiBvYmogd2hpY2ggaGFzIGNoYW5nZWQgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkW3Byb3BlcnR5XSwgLy8gaXRzIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRPbGRWYWx1ZUZuKHByb3BlcnR5KSAvLyBpdHMgb2xkIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5zcGVjdChjYjpGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vb0NhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGgoZXhwcmVzc2lvbjpzdHJpbmcsIGRlZmF1bHRWYWx1ZTphbnksIGNoYW5nZUZuOmFueSwgb3B0UmVjZWl2ZXI6YW55KTphbnkge1xuICAgICAgICAgICAgdmFyIHBvID0gbmV3IG9ic2VydmVqcy5QYXRoT2JzZXJ2ZXIodGhpcy5vYmosIGV4cHJlc3Npb24sIGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICBwby5vcGVuKGNoYW5nZUZuLCBvcHRSZWNlaXZlcik7XG4gICAgICAgICAgICB0aGlzLnBvcy5wdXNoKHBvKTtcbiAgICAgICAgICAgIHJldHVybiBwbztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIENvbmZpZyBpbXBsZW1lbnRzIElDb25maWcge1xuICAgICAgICBwcm90ZWN0ZWQgZGF0YTpPYmplY3Q7XG4gICAgICAgIHByb3RlY3RlZCBhbGxEZWxpbWl0ZXJzOklEZWxpbWl0ZXJzQ29sbGVjdGlvbjtcbiAgICAgICAgcHJvdGVjdGVkIHN0YXRpYyBwcm9wU3RyaW5nVG1wbFJlOlJlZ0V4cCA9IC9ePCU9XFxzKihbYS16MC05XyRdKyg/OlxcLlthLXowLTlfJF0rKSopXFxzKiU+JC9pO1xuICAgICAgICBwcm90ZWN0ZWQgX29ic2VydmVyOklDb25maWdPYnNlcnZlcjtcbiAgICAgICAgcHJvdGVjdGVkIHN0b3JhZ2VCYWc6SVN0b3JhZ2VCYWc7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqPzpPYmplY3QsIHN0b3JhZ2VCYWc/OnN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5hbGxEZWxpbWl0ZXJzID0ge307XG4gICAgICAgICAgICB0aGlzLmFkZERlbGltaXRlcnMoJ2NvbmZpZycsICc8JScsICclPicpO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gb2JqIHx8IHt9O1xuICAgICAgICAgICAgaWYgKHN0b3JhZ2VCYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWcgPSBnZXRQcmVmZmVyZEJhZyhzdG9yYWdlQmFnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHVuc2V0KHByb3A6YW55KTphbnkge1xuICAgICAgICAgICAgcHJvcCAgICA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwcm9wLnBvcCgpO1xuICAgICAgICAgICAgdmFyIG9iaiA9IG9iamVjdEdldCh0aGlzLmRhdGEsIENvbmZpZ09iamVjdC5nZXRQcm9wU3RyaW5nKHByb3Auam9pbignLicpKSk7XG4gICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzKHByb3A6YW55KTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3RFeGlzdHModGhpcy5kYXRhLCBDb25maWdPYmplY3QuZ2V0UHJvcFN0cmluZyhwcm9wKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmF3KHByb3A/OmFueSk6YW55IHtcbiAgICAgICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdEdldCh0aGlzLmRhdGEsIENvbmZpZ09iamVjdC5nZXRQcm9wU3RyaW5nKHByb3ApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXQocHJvcD86YW55KTphbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzcyh0aGlzLnJhdyhwcm9wKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0KHByb3A6c3RyaW5nLCB2YWx1ZTphbnkpOklDb25maWcge1xuICAgICAgICAgICAgb2JqZWN0U2V0KHRoaXMuZGF0YSwgQ29uZmlnT2JqZWN0LmdldFByb3BTdHJpbmcocHJvcCksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG1lcmdlKC4uLmFyZ3M6YW55W10pOklDb25maWcge1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gXy5tZXJnZSh0aGlzLmRhdGEsIGFyZ3NbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcDpzdHJpbmcgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHByb3AsIF8ubWVyZ2UodGhpcy5yYXcocHJvcCksIGFyZ3NbMV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgcHJvY2VzcyhyYXc6YW55KTphbnkge1xuICAgICAgICAgICAgdmFyIHNlbGY6Q29uZmlnT2JqZWN0ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiByZWN1cnNlKHJhdywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN0cmluZywgcmV0dXJuIGl0LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgcG9zc2libGUsIGFjY2VzcyB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IHZpYSBjb25maWcuZ2V0LCBpbiBjYXNlIGl0XG4gICAgICAgICAgICAgICAgLy8gZG9lc24ndCByZWZlciB0byBhIHN0cmluZywgYnV0IGluc3RlYWQgcmVmZXJzIHRvIGFuIG9iamVjdCBvciBhcnJheS5cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKENvbmZpZ09iamVjdC5wcm9wU3RyaW5nVG1wbFJlKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHNlbGYuZ2V0KG1hdGNoZXNbMV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmVzdWx0IHJldHJpZXZlZCBmcm9tIHRoZSBjb25maWcgZGF0YSB3YXNuJ3QgbnVsbCBvciB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBpdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHN0cmluZyBhcyBhIHRlbXBsYXRlLlxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnByb2Nlc3NUZW1wbGF0ZSh2YWx1ZSwge2RhdGE6IHNlbGYuZGF0YX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGFkZERlbGltaXRlcnMobmFtZSwgb3BlbmVyLCBjbG9zZXIpIHtcbiAgICAgICAgICAgIHZhciBkZWxpbWl0ZXJzOklEZWxpbWl0ZXIgPSB0aGlzLmFsbERlbGltaXRlcnNbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgIC8vIFVzZWQgYnkgZ3J1bnQuXG4gICAgICAgICAgICBkZWxpbWl0ZXJzLm9wZW5lciA9IG9wZW5lcjtcbiAgICAgICAgICAgIGRlbGltaXRlcnMuY2xvc2VyID0gY2xvc2VyO1xuICAgICAgICAgICAgLy8gR2VuZXJhdGUgUmVnRXhwIHBhdHRlcm5zIGR5bmFtaWNhbGx5LlxuICAgICAgICAgICAgdmFyIGEgPSBkZWxpbWl0ZXJzLm9wZW5lci5yZXBsYWNlKC8oLikvZywgJ1xcXFwkMScpO1xuICAgICAgICAgICAgdmFyIGIgPSAnKFtcXFxcc1xcXFxTXSs/KScgKyBkZWxpbWl0ZXJzLmNsb3Nlci5yZXBsYWNlKC8oLikvZywgJ1xcXFwkMScpO1xuICAgICAgICAgICAgLy8gVXNlZCBieSBMby1EYXNoLlxuICAgICAgICAgICAgZGVsaW1pdGVycy5sb2Rhc2ggPSB7XG4gICAgICAgICAgICAgICAgZXZhbHVhdGUgICA6IG5ldyBSZWdFeHAoYSArIGIsICdnJyksXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6IG5ldyBSZWdFeHAoYSArICc9JyArIGIsICdnJyksXG4gICAgICAgICAgICAgICAgZXNjYXBlICAgICA6IG5ldyBSZWdFeHAoYSArICctJyArIGIsICdnJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHNldERlbGltaXRlcnMobmFtZSkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBhcHByb3ByaWF0ZSBkZWxpbWl0ZXJzLlxuICAgICAgICAgICAgdmFyIGRlbGltaXRlcnM6SURlbGltaXRlciA9IHRoaXMuYWxsRGVsaW1pdGVyc1tuYW1lIGluIHRoaXMuYWxsRGVsaW1pdGVycyA/IG5hbWUgOiAnY29uZmlnJ107XG5cbiAgICAgICAgICAgIC8vIFRlbGwgTG8tRGFzaCB3aGljaCBkZWxpbWl0ZXJzIHRvIHVzZS5cbiAgICAgICAgICAgIF8udGVtcGxhdGVTZXR0aW5ncyA9IGRlbGltaXRlcnMubG9kYXNoO1xuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBkZWxpbWl0ZXJzLlxuICAgICAgICAgICAgcmV0dXJuIGRlbGltaXRlcnM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHByb2Nlc3NUZW1wbGF0ZSh0bXBsOnN0cmluZywgb3B0aW9uczphbnkpOnN0cmluZyB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXQgZGVsaW1pdGVycywgYW5kIGdldCBhIG9wZW5pbmcgbWF0Y2ggY2hhcmFjdGVyLlxuICAgICAgICAgICAgdmFyIGRlbGltaXRlcnMgPSB0aGlzLnNldERlbGltaXRlcnMob3B0aW9ucy5kZWxpbWl0ZXJzKTtcbiAgICAgICAgICAgIC8vIENsb25lIGRhdGEsIGluaXRpYWxpemluZyB0byBjb25maWcgZGF0YSBvciBlbXB0eSBvYmplY3QgaWYgb21pdHRlZC5cbiAgICAgICAgICAgIHZhciBkYXRhID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zLmRhdGEgfHwgdGhpcy5kYXRhIHx8IHt9KTtcblxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiBsYXN0IGNoYW5nZS5cbiAgICAgICAgICAgIHZhciBsYXN0ID0gdG1wbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gQXMgbG9uZyBhcyB0bXBsIGNvbnRhaW5zIHRlbXBsYXRlIHRhZ3MsIHJlbmRlciBpdCBhbmQgZ2V0IHRoZSByZXN1bHQsXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGp1c3QgdXNlIHRoZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRtcGwuaW5kZXhPZihkZWxpbWl0ZXJzLm9wZW5lcikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0bXBsID0gXy50ZW1wbGF0ZSh0bXBsKShkYXRhKTsgLy8sIGRlbGltaXRlcnMubG9kYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWJvcnQgaWYgdGVtcGxhdGUgZGlkbid0IGNoYW5nZSAtIG5vdGhpbmcgbGVmdCB0byBwcm9jZXNzIVxuICAgICAgICAgICAgICAgICAgICBpZiAodG1wbCA9PT0gbGFzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IHRtcGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS53YXJuKCdjb25maWcgcHJvY2VzcyB0ZW1wbGF0ZSBmYWlsOiAnICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIGxpbmVmZWVkcyBhbmQgcmV0dXJuLlxuICAgICAgICAgICAgcmV0dXJuIHRtcGwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHJcXG58XFxuL2csICdcXG4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGdldCBvYnNlcnZlcigpOklDb25maWdPYnNlcnZlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb2JzZXJ2ZXJcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhdHRhY2hPYnNlcnZlcihvYnNlcnZlcjpJQ29uZmlnT2JzZXJ2ZXIpOklDb25maWcge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuc2V0SW5zcGVjdGFibGVPYmplY3QodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHN0b3JlKGtleTpzdHJpbmcpOklDb25maWcge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1N0b3JhZ2UoKSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFnLnNldChrZXksIHRoaXMucmF3KCksIHtqc29uOiB0cnVlfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBsb2FkKGtleTpzdHJpbmcpOklDb25maWcge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1N0b3JhZ2UoKSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5zdG9yYWdlQmFnLmdldChrZXksIHtkZWY6IHRoaXMucmF3KCksIGpzb246IHRydWV9KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzU3RvcmFnZSgpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmluZWQodGhpcy5zdG9yYWdlQmFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRTdG9yYWdlKGJhZzpJU3RvcmFnZUJhZykge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFnID0gYmFnO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RhdGljIG1ha2VQcm9wZXJ0eShjb25maWc6SUNvbmZpZyk6SUNvbmZpZ1Byb3BlcnR5IHtcbiAgICAgICAgICAgIHZhciBjZjphbnkgPSBmdW5jdGlvbiAocHJvcD86YW55KTphbnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcuZ2V0KHByb3ApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNmLmdldCAgICAgPSBjb25maWcuZ2V0LmJpbmQoY29uZmlnKTtcbiAgICAgICAgICAgIGNmLnNldCAgICAgPSBjb25maWcuc2V0LmJpbmQoY29uZmlnKTtcbiAgICAgICAgICAgIGNmLnVuc2V0ICAgPSBjb25maWcudW5zZXQuYmluZChjb25maWcpO1xuICAgICAgICAgICAgY2YubWVyZ2UgICA9IGNvbmZpZy5tZXJnZS5iaW5kKGNvbmZpZyk7XG4gICAgICAgICAgICBjZi5yYXcgICAgID0gY29uZmlnLnJhdy5iaW5kKGNvbmZpZyk7XG4gICAgICAgICAgICBjZi5wcm9jZXNzID0gY29uZmlnLnByb2Nlc3MuYmluZChjb25maWcpO1xuICAgICAgICAgICAgY2YuaGFzICAgICA9IGNvbmZpZy5oYXMuYmluZChjb25maWcpO1xuXG4gICAgICAgICAgICByZXR1cm4gY2Y7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIG1ha2VPYnNlcnZlcihjb25maWc6SUNvbmZpZyk6SUNvbmZpZ09ic2VydmVyIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcuYXR0YWNoT2JzZXJ2ZXIobmV3IENvbmZpZ09ic2VydmVyKCkpLm9ic2VydmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRQcm9wU3RyaW5nKHByb3A6YW55KTpzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocHJvcCkgPyBwcm9wLm1hcCh0aGlzLmVzY2FwZSkuam9pbignLicpIDogcHJvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXNjYXBlKHN0cjpzdHJpbmcpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGV4cG9ydCBjbGFzcyBDb25maWdPYmplY3QgZXh0ZW5kcyBDb25maWcge1xuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG5cbiAgICBleHBvcnQgdmFyIGRlZmF1bHRFRTJPcHRpb25zOkV2ZW50RW1pdHRlcjJDb25maWd1cmF0aW9uID0gPEV2ZW50RW1pdHRlcjJDb25maWd1cmF0aW9uPiB7XG4gICAgICAgIHdpbGRjYXJkICAgIDogdHJ1ZSxcbiAgICAgICAgZGVsaW1pdGVyICAgOiAnOicsXG4gICAgICAgIG5ld0xpc3RlbmVyIDogdHJ1ZSxcbiAgICAgICAgbWF4TGlzdGVuZXJzOiA1MFxuICAgIH07XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgRXZlbnRFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyMiB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGV2ZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBzdXBlcihfLm1lcmdlKGRlZmF1bHRFRTJPcHRpb25zLCBldmVudE9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgdmFyIEV2ZW50TGlzdGVuZXIgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaXN0ZW4gdG8gRE9NIGV2ZW50cyBkdXJpbmcgdGhlIGJ1YmJsZSBwaGFzZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtET01FdmVudFRhcmdldH0gdGFyZ2V0IERPTSBlbGVtZW50IHRvIHJlZ2lzdGVyIGxpc3RlbmVyIG9uLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIEV2ZW50IHR5cGUsIGUuZy4gJ2NsaWNrJyBvciAnbW91c2VvdmVyJy5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IHdpdGggYSBgcmVtb3ZlYCBtZXRob2QuXG4gICAgICAgICAqL1xuICAgICAgICAgICAgbGlzdGVuKHRhcmdldCwgZXZlbnRUeXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBjYWxsYmFjaywgZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBjYWxsYmFjaywgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnRUeXBlLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50VHlwZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ24ob2JqLCBtZXRob2ROYW1lLCBjKSB7XG4gICAgICAgIHZhciBhc3NpZ25Ub1Byb3BlcnR5ID0gYy5hc3NpZ25Ub1Byb3BlcnR5LFxuICAgICAgICAgICAgZm5DdXN0b21SZXR1cm4gICA9IGMuZm5DdXN0b21SZXR1cm47XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvYmpbYXNzaWduVG9Qcm9wZXJ0eV1bbWV0aG9kTmFtZV0uYXBwbHkob2JqW2Fzc2lnblRvUHJvcGVydHldLCBfLnRvQXJyYXkoYXJndW1lbnRzKSk7XG5cbiAgICAgICAgICAgIGlmICghXy5pc051bGwoZm5DdXN0b21SZXR1cm4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuQ3VzdG9tUmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2VFdmVudEVtaXR0ZXIob2JqOmFueSwgb3B0aW9uczphbnkpIHtcbiAgICAgICAgdmFyIGM6YW55ID0gXy5tZXJnZSh7XG4gICAgICAgICAgICBhc3NpZ25NZXRob2RzICAgICAgIDogWydvbicsICdvbmNlJywgJ29mZiddLFxuICAgICAgICAgICAgYXNzaWduUHJpdmF0ZU1ldGhvZHM6IFsnZW1pdCddLFxuICAgICAgICAgICAgYXNzaWduVG9Qcm9wZXJ0eSAgICA6ICdfZXZlbnRzJyxcbiAgICAgICAgICAgIHByaXZhdGVNZXRob2RQcmVmaXggOiAnXycsXG5cbiAgICAgICAgICAgIGFzc2lnbkJ5QWxpYXNlczogZmFsc2UsXG4gICAgICAgICAgICBhbGlhc2VzICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBvbjogWydvbkV2ZW50JywgJ2FkZExpc3RlbmVyJ11cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50Q2xhc3MgICAgICAgOiBFdmVudEVtaXR0ZXIyLFxuICAgICAgICAgICAgZXZlbnRDbGFzc09wdGlvbnM6IGRlZmF1bHRFRTJPcHRpb25zLFxuICAgICAgICAgICAgYXNzaWduVG9Qcm90b3R5cGU6IGZhbHNlLFxuICAgICAgICAgICAgZm5DdXN0b21SZXR1cm4gICA6IG51bGwsXG4gICAgICAgICAgICBkZWJ1ZyAgICAgICAgICAgIDogZmFsc2VcblxuICAgICAgICB9LCBvcHRpb25zKTtcblxuXG4gICAgICAgIC8vIGluc3RhbmNpYXRlIGFuZCBhc3NpZ24gdGhlIGV2ZW50IGNsYXNzIHRvIGEgcHJvcGVydHkgb2YgdGhlIG9iamVjdFxuICAgICAgICBpZiAoYy5hc3NpZ25Ub1Byb3RvdHlwZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLmlzTnVsbChjLmV2ZW50Q2xhc3NPcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9ialtjLmFzc2lnblRvUHJvcGVydHldID0gbmV3IGNbJ2V2ZW50Q2xhc3MnXSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbYy5hc3NpZ25Ub1Byb3BlcnR5XSA9IG5ldyBjWydldmVudENsYXNzJ10oYy5ldmVudENsYXNzT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fzc2lnblRvUHJvdG90eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMuYXNzaWduQnlBbGlhc2VzKSB7XG4gICAgICAgICAgICBfLmVhY2goYy5hbGlhc2VzLCBmdW5jdGlvbiAoYWxpYXNlczphbnksIG1ldGhvZE5hbWU6YW55KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsaWFzc2VzIGRlZmluaXRpb24gaXMgYSBzdHJpbmcsIG1ha2UgaXQgaW50byBhbiBhcnJheSB3aXRoIHRoZSBzdHJpbmcgYXMgYXJyYXkgaXRlbVxuICAgICAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGFsaWFzZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWFzZXMgPSBbYWxpYXNlc107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWxpYXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2RBc3NpZ25tZW50TmFtZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIG9ialttZXRob2RBc3NpZ25tZW50TmFtZV0gPSBhc3NpZ24ob2JqLCBtZXRob2ROYW1lLCBjKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgWydhc3NpZ25NZXRob2RzJywgJ2Fzc2lnblByaXZhdGVNZXRob2RzJ10uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kVHlwZTphbnkpIHtcbiAgICAgICAgICAgICAgICBjW21ldGhvZFR5cGVdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWU6YW55KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFzc2lnbiB0byBwcm90b3R5cGUgb2Ygb2JqZWN0LCB3ZSBkbyBub3QgYXNzaWduIHByaXZhdGUgbWV0aG9kcywgd2Ugd2lsbCByZXR1cm4gc29tZSBvdGhlciB3YXlcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZFR5cGUgPT09ICdhc3NpZ25Qcml2YXRlTWV0aG9kcycgJiYgYy5hc3NpZ25Ub1Byb3RvdHlwZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsaWFzc2VzIGRlZmluaXRpb24gaXMgYSBzdHJpbmcsIG1ha2UgaXQgaW50byBhbiBhcnJheSB3aXRoIHRoZSBzdHJpbmcgYXMgYXJyYXkgaXRlbVxuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhjLmFsaWFzZXNbbWV0aG9kTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmFsaWFzZXNbbWV0aG9kTmFtZV0gPSBbYy5hbGlhc2VzW21ldGhvZE5hbWVdXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc0FycmF5KGMuYWxpYXNlc1ttZXRob2ROYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuYWxpYXNlc1ttZXRob2ROYW1lXSA9IFttZXRob2ROYW1lXVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5hbGlhc2VzW21ldGhvZE5hbWVdLnB1c2gobWV0aG9kTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjLmFsaWFzZXNbbWV0aG9kTmFtZV0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kQXNzaWdubWVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG1ldGhvZCBzaG91bGQgYmUgcHJpdmF0ZWx5IGFzc2lnbmVkLCB3ZSBwcmVmaXggaXQgd2l0aCAoZGVmYXVsdCk6IF9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2RUeXBlID09PSAnYXNzaWduUHJpdmF0ZU1ldGhvZHMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kQXNzaWdubWVudE5hbWUgPSBjLnByaXZhdGVNZXRob2RQcmVmaXggKyBtZXRob2RBc3NpZ25tZW50TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBzaG9ydGN1dCBtZXRob2QgdG8gdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW21ldGhvZEFzc2lnbm1lbnROYW1lXSA9IGFzc2lnbihvYmosIG1ldGhvZE5hbWUsIGMpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuICAgIGV4cG9ydCB2YXIgc3RyOlVuZGVyc2NvcmVTdHJpbmdTdGF0aWMgPSBfcztcblxuICAgIC8qKlxuICAgICAqIFJvdW5kIGEgdmFsdWUgdG8gYSBwcmVjaXNpb25cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gcGxhY2VzXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcm91bmQodmFsdWUsIHBsYWNlcykge1xuICAgICAgICB2YXIgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwbGFjZXMpO1xuICAgICAgICByZXR1cm4gKE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXIpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc3RyaW5nIGZyb20gYW4gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gbWFrZVN0cmluZyhvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gJyc7XG4gICAgICAgIHJldHVybiAnJyArIG9iamVjdDtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0VG9XaGl0ZVNwYWNlKGNoYXJhY3RlcnMpIHtcbiAgICAgICAgaWYgKGNoYXJhY3RlcnMgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiAnXFxcXHMnO1xuICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJzLnNvdXJjZSlcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJzLnNvdXJjZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHN0ci5lc2NhcGVSZWdFeHAoY2hhcmFjdGVycykgKyAnXSc7XG4gICAgfVxuXG5cbiAgICB2YXIga2luZHNPZjphbnkgPSB7fTtcbiAgICAnTnVtYmVyIFN0cmluZyBCb29sZWFuIEZ1bmN0aW9uIFJlZ0V4cCBBcnJheSBEYXRlIEVycm9yJy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAga2luZHNPZlsnW29iamVjdCAnICsgayArICddJ10gPSBrLnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gICAgdmFyIG5hdGl2ZVRyaW0gPSBTdHJpbmcucHJvdG90eXBlLnRyaW07XG5cbiAgICB2YXIgZW50aXR5TWFwID0ge1xuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgICAgIFwiPlwiOiBcIiZndDtcIixcbiAgICAgICAgJ1wiJzogJyZxdW90OycsXG4gICAgICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICAgICBcIi9cIjogJyYjeDJGOydcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdHlwZSBvZiBhIHZhcmlhYmxzZVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24ga2luZE9mKHZhbHVlOmFueSk6YW55IHtcbiAgICAgICAgLy8gTnVsbCBvciB1bmRlZmluZWQuXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFdmVyeXRoaW5nIGVsc2UuXG4gICAgICAgIHJldHVybiBraW5kc09mW2tpbmRzT2YudG9TdHJpbmcuY2FsbCh2YWx1ZSldIHx8ICdvYmplY3QnO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWYgdmFsIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gZGVmIGFzIGRlZmF1bHRcbiAgICAgKiBAcGFyYW0gdmFsXG4gICAgICogQHBhcmFtIGRlZlxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlZih2YWwsIGRlZikge1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh2YWwpID8gdmFsIDogZGVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3ZXRoZXIgdGhlIHBhc3NlZCB2YXJpYWJsZSBpcyBkZWZpbmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlZmluZWQob2JqPzphbnkpIHtcbiAgICAgICAgcmV0dXJuICFfLmlzVW5kZWZpbmVkKG9iaik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgcmFuZG9tIGdlbmVyYXRlZCBpZCBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsZW5ndGhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21JZChsZW5ndGg/Om51bWJlcik6c3RyaW5nIHtcbiAgICAgICAgaWYgKCFfLmlzTnVtYmVyKGxlbmd0aCkpIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IDE1O1xuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0OnN0cmluZyAgICAgPSBcIlwiO1xuICAgICAgICB2YXIgcG9zc2libGU6c3RyaW5nID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuICAgIGV4cG9ydCB2YXIgbG9nOnR5cGVvZiBsb2dsZXZlbCA9IGxvZ2xldmVsO1xuICAgIGV4cG9ydCB2YXIgb3V0ICAgICAgICAgICAgICAgICA9IG5ldyBCcm93c2VyUHJldHR5Q29uc29sZSgpO1xufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICB2YXIgbWF0ZXJpYWxDb2xvcnM6YW55ID0ge1xuICAgICAgICAncmVkJzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2ZmZWJlZScsXG4gICAgICAgICAgICAnMTAwJyA6ICcjZmZjZGQyJyxcbiAgICAgICAgICAgICcyMDAnIDogJyNlZjlhOWEnLFxuICAgICAgICAgICAgJzMwMCcgOiAnI2U1NzM3MycsXG4gICAgICAgICAgICAnNDAwJyA6ICcjZWY1MzUwJyxcbiAgICAgICAgICAgICc1MDAnIDogJyNmNDQzMzYnLFxuICAgICAgICAgICAgJzYwMCcgOiAnI2U1MzkzNScsXG4gICAgICAgICAgICAnNzAwJyA6ICcjZDMyZjJmJyxcbiAgICAgICAgICAgICc4MDAnIDogJyNjNjI4MjgnLFxuICAgICAgICAgICAgJzkwMCcgOiAnI2I3MWMxYycsXG4gICAgICAgICAgICAnYTEwMCc6ICcjZmY4YTgwJyxcbiAgICAgICAgICAgICdhMjAwJzogJyNmZjUyNTInLFxuICAgICAgICAgICAgJ2E0MDAnOiAnI2ZmMTc0NCcsXG4gICAgICAgICAgICAnYTcwMCc6ICcjZDUwMDAwJyxcbiAgICAgICAgfSxcblxuICAgICAgICAncGluayc6IHtcbiAgICAgICAgICAgICc1MCcgIDogJyNmY2U0ZWMnLFxuICAgICAgICAgICAgJzEwMCcgOiAnI2Y4YmJkMCcsXG4gICAgICAgICAgICAnMjAwJyA6ICcjZjQ4ZmIxJyxcbiAgICAgICAgICAgICczMDAnIDogJyNmMDYyOTInLFxuICAgICAgICAgICAgJzQwMCcgOiAnI2VjNDA3YScsXG4gICAgICAgICAgICAnNTAwJyA6ICcjZTkxZTYzJyxcbiAgICAgICAgICAgICc2MDAnIDogJyNkODFiNjAnLFxuICAgICAgICAgICAgJzcwMCcgOiAnI2MyMTg1YicsXG4gICAgICAgICAgICAnODAwJyA6ICcjYWQxNDU3JyxcbiAgICAgICAgICAgICc5MDAnIDogJyM4ODBlNGYnLFxuICAgICAgICAgICAgJ2ExMDAnOiAnI2ZmODBhYicsXG4gICAgICAgICAgICAnYTIwMCc6ICcjZmY0MDgxJyxcbiAgICAgICAgICAgICdhNDAwJzogJyNmNTAwNTcnLFxuICAgICAgICAgICAgJ2E3MDAnOiAnI2M1MTE2MicsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ3B1cnBsZSc6IHtcbiAgICAgICAgICAgICc1MCcgIDogJyNmM2U1ZjUnLFxuICAgICAgICAgICAgJzEwMCcgOiAnI2UxYmVlNycsXG4gICAgICAgICAgICAnMjAwJyA6ICcjY2U5M2Q4JyxcbiAgICAgICAgICAgICczMDAnIDogJyNiYTY4YzgnLFxuICAgICAgICAgICAgJzQwMCcgOiAnI2FiNDdiYycsXG4gICAgICAgICAgICAnNTAwJyA6ICcjOWMyN2IwJyxcbiAgICAgICAgICAgICc2MDAnIDogJyM4ZTI0YWEnLFxuICAgICAgICAgICAgJzcwMCcgOiAnIzdiMWZhMicsXG4gICAgICAgICAgICAnODAwJyA6ICcjNmExYjlhJyxcbiAgICAgICAgICAgICc5MDAnIDogJyM0YTE0OGMnLFxuICAgICAgICAgICAgJ2ExMDAnOiAnI2VhODBmYycsXG4gICAgICAgICAgICAnYTIwMCc6ICcjZTA0MGZiJyxcbiAgICAgICAgICAgICdhNDAwJzogJyNkNTAwZjknLFxuICAgICAgICAgICAgJ2E3MDAnOiAnI2FhMDBmZicsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2RlZXAtcHVycGxlJzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2VkZTdmNicsXG4gICAgICAgICAgICAnMTAwJyA6ICcjZDFjNGU5JyxcbiAgICAgICAgICAgICcyMDAnIDogJyNiMzlkZGInLFxuICAgICAgICAgICAgJzMwMCcgOiAnIzk1NzVjZCcsXG4gICAgICAgICAgICAnNDAwJyA6ICcjN2U1N2MyJyxcbiAgICAgICAgICAgICc1MDAnIDogJyM2NzNhYjcnLFxuICAgICAgICAgICAgJzYwMCcgOiAnIzVlMzViMScsXG4gICAgICAgICAgICAnNzAwJyA6ICcjNTEyZGE4JyxcbiAgICAgICAgICAgICc4MDAnIDogJyM0NTI3YTAnLFxuICAgICAgICAgICAgJzkwMCcgOiAnIzMxMWI5MicsXG4gICAgICAgICAgICAnYTEwMCc6ICcjYjM4OGZmJyxcbiAgICAgICAgICAgICdhMjAwJzogJyM3YzRkZmYnLFxuICAgICAgICAgICAgJ2E0MDAnOiAnIzY1MWZmZicsXG4gICAgICAgICAgICAnYTcwMCc6ICcjNjIwMGVhJyxcbiAgICAgICAgfSxcblxuICAgICAgICAnaW5kaWdvJzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2U4ZWFmNicsXG4gICAgICAgICAgICAnMTAwJyA6ICcjYzVjYWU5JyxcbiAgICAgICAgICAgICcyMDAnIDogJyM5ZmE4ZGEnLFxuICAgICAgICAgICAgJzMwMCcgOiAnIzc5ODZjYicsXG4gICAgICAgICAgICAnNDAwJyA6ICcjNWM2YmMwJyxcbiAgICAgICAgICAgICc1MDAnIDogJyMzZjUxYjUnLFxuICAgICAgICAgICAgJzYwMCcgOiAnIzM5NDlhYicsXG4gICAgICAgICAgICAnNzAwJyA6ICcjMzAzZjlmJyxcbiAgICAgICAgICAgICc4MDAnIDogJyMyODM1OTMnLFxuICAgICAgICAgICAgJzkwMCcgOiAnIzFhMjM3ZScsXG4gICAgICAgICAgICAnYTEwMCc6ICcjOGM5ZWZmJyxcbiAgICAgICAgICAgICdhMjAwJzogJyM1MzZkZmUnLFxuICAgICAgICAgICAgJ2E0MDAnOiAnIzNkNWFmZScsXG4gICAgICAgICAgICAnYTcwMCc6ICcjMzA0ZmZlJyxcbiAgICAgICAgfSxcblxuICAgICAgICAnYmx1ZSc6IHtcbiAgICAgICAgICAgICc1MCcgIDogJyNlM2YyZmQnLFxuICAgICAgICAgICAgJzEwMCcgOiAnI2JiZGVmYicsXG4gICAgICAgICAgICAnMjAwJyA6ICcjOTBjYWY5JyxcbiAgICAgICAgICAgICczMDAnIDogJyM2NGI1ZjYnLFxuICAgICAgICAgICAgJzQwMCcgOiAnIzQyYTVmNScsXG4gICAgICAgICAgICAnNTAwJyA6ICcjMjE5NmYzJyxcbiAgICAgICAgICAgICc2MDAnIDogJyMxZTg4ZTUnLFxuICAgICAgICAgICAgJzcwMCcgOiAnIzE5NzZkMicsXG4gICAgICAgICAgICAnODAwJyA6ICcjMTU2NWMwJyxcbiAgICAgICAgICAgICc5MDAnIDogJyMwZDQ3YTEnLFxuICAgICAgICAgICAgJ2ExMDAnOiAnIzgyYjFmZicsXG4gICAgICAgICAgICAnYTIwMCc6ICcjNDQ4YWZmJyxcbiAgICAgICAgICAgICdhNDAwJzogJyMyOTc5ZmYnLFxuICAgICAgICAgICAgJ2E3MDAnOiAnIzI5NjJmZicsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2xpZ2h0LWJsdWUnOiB7XG4gICAgICAgICAgICAnNTAnICA6ICcjZTFmNWZlJyxcbiAgICAgICAgICAgICcxMDAnIDogJyNiM2U1ZmMnLFxuICAgICAgICAgICAgJzIwMCcgOiAnIzgxZDRmYScsXG4gICAgICAgICAgICAnMzAwJyA6ICcjNGZjM2Y3JyxcbiAgICAgICAgICAgICc0MDAnIDogJyMyOWI2ZjYnLFxuICAgICAgICAgICAgJzUwMCcgOiAnIzAzYTlmNCcsXG4gICAgICAgICAgICAnNjAwJyA6ICcjMDM5YmU1JyxcbiAgICAgICAgICAgICc3MDAnIDogJyMwMjg4ZDEnLFxuICAgICAgICAgICAgJzgwMCcgOiAnIzAyNzdiZCcsXG4gICAgICAgICAgICAnOTAwJyA6ICcjMDE1NzliJyxcbiAgICAgICAgICAgICdhMTAwJzogJyM4MGQ4ZmYnLFxuICAgICAgICAgICAgJ2EyMDAnOiAnIzQwYzRmZicsXG4gICAgICAgICAgICAnYTQwMCc6ICcjMDBiMGZmJyxcbiAgICAgICAgICAgICdhNzAwJzogJyMwMDkxZWEnLFxuICAgICAgICB9LFxuXG4gICAgICAgICdjeWFuJzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2UwZjdmYScsXG4gICAgICAgICAgICAnMTAwJyA6ICcjYjJlYmYyJyxcbiAgICAgICAgICAgICcyMDAnIDogJyM4MGRlZWEnLFxuICAgICAgICAgICAgJzMwMCcgOiAnIzRkZDBlMScsXG4gICAgICAgICAgICAnNDAwJyA6ICcjMjZjNmRhJyxcbiAgICAgICAgICAgICc1MDAnIDogJyMwMGJjZDQnLFxuICAgICAgICAgICAgJzYwMCcgOiAnIzAwYWNjMScsXG4gICAgICAgICAgICAnNzAwJyA6ICcjMDA5N2E3JyxcbiAgICAgICAgICAgICc4MDAnIDogJyMwMDgzOGYnLFxuICAgICAgICAgICAgJzkwMCcgOiAnIzAwNjA2NCcsXG4gICAgICAgICAgICAnYTEwMCc6ICcjODRmZmZmJyxcbiAgICAgICAgICAgICdhMjAwJzogJyMxOGZmZmYnLFxuICAgICAgICAgICAgJ2E0MDAnOiAnIzAwZTVmZicsXG4gICAgICAgICAgICAnYTcwMCc6ICcjMDBiOGQ0JyxcbiAgICAgICAgfSxcblxuICAgICAgICAndGVhbCc6IHtcbiAgICAgICAgICAgICc1MCcgIDogJyNlMGYyZjEnLFxuICAgICAgICAgICAgJzEwMCcgOiAnI2IyZGZkYicsXG4gICAgICAgICAgICAnMjAwJyA6ICcjODBjYmM0JyxcbiAgICAgICAgICAgICczMDAnIDogJyM0ZGI2YWMnLFxuICAgICAgICAgICAgJzQwMCcgOiAnIzI2YTY5YScsXG4gICAgICAgICAgICAnNTAwJyA6ICcjMDA5Njg4JyxcbiAgICAgICAgICAgICc2MDAnIDogJyMwMDg5N2InLFxuICAgICAgICAgICAgJzcwMCcgOiAnIzAwNzk2YicsXG4gICAgICAgICAgICAnODAwJyA6ICcjMDA2OTVjJyxcbiAgICAgICAgICAgICc5MDAnIDogJyMwMDRkNDAnLFxuICAgICAgICAgICAgJ2ExMDAnOiAnI2E3ZmZlYicsXG4gICAgICAgICAgICAnYTIwMCc6ICcjNjRmZmRhJyxcbiAgICAgICAgICAgICdhNDAwJzogJyMxZGU5YjYnLFxuICAgICAgICAgICAgJ2E3MDAnOiAnIzAwYmZhNScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2dyZWVuJzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2U4ZjVlOScsXG4gICAgICAgICAgICAnMTAwJyA6ICcjYzhlNmM5JyxcbiAgICAgICAgICAgICcyMDAnIDogJyNhNWQ2YTcnLFxuICAgICAgICAgICAgJzMwMCcgOiAnIzgxYzc4NCcsXG4gICAgICAgICAgICAnNDAwJyA6ICcjNjZiYjZhJyxcbiAgICAgICAgICAgICc1MDAnIDogJyM0Y2FmNTAnLFxuICAgICAgICAgICAgJzYwMCcgOiAnIzQzYTA0NycsXG4gICAgICAgICAgICAnNzAwJyA6ICcjMzg4ZTNjJyxcbiAgICAgICAgICAgICc4MDAnIDogJyMyZTdkMzInLFxuICAgICAgICAgICAgJzkwMCcgOiAnIzFiNWUyMCcsXG4gICAgICAgICAgICAnYTEwMCc6ICcjYjlmNmNhJyxcbiAgICAgICAgICAgICdhMjAwJzogJyM2OWYwYWUnLFxuICAgICAgICAgICAgJ2E0MDAnOiAnIzAwZTY3NicsXG4gICAgICAgICAgICAnYTcwMCc6ICcjMDBjODUzJyxcbiAgICAgICAgfSxcblxuICAgICAgICAnbGlnaHQtZ3JlZW4nOiB7XG4gICAgICAgICAgICAnNTAnICA6ICcjZjFmOGU5JyxcbiAgICAgICAgICAgICcxMDAnIDogJyNkY2VkYzgnLFxuICAgICAgICAgICAgJzIwMCcgOiAnI2M1ZTFhNScsXG4gICAgICAgICAgICAnMzAwJyA6ICcjYWVkNTgxJyxcbiAgICAgICAgICAgICc0MDAnIDogJyM5Y2NjNjUnLFxuICAgICAgICAgICAgJzUwMCcgOiAnIzhiYzM0YScsXG4gICAgICAgICAgICAnNjAwJyA6ICcjN2NiMzQyJyxcbiAgICAgICAgICAgICc3MDAnIDogJyM2ODlmMzgnLFxuICAgICAgICAgICAgJzgwMCcgOiAnIzU1OGIyZicsXG4gICAgICAgICAgICAnOTAwJyA6ICcjMzM2OTFlJyxcbiAgICAgICAgICAgICdhMTAwJzogJyNjY2ZmOTAnLFxuICAgICAgICAgICAgJ2EyMDAnOiAnI2IyZmY1OScsXG4gICAgICAgICAgICAnYTQwMCc6ICcjNzZmZjAzJyxcbiAgICAgICAgICAgICdhNzAwJzogJyM2NGRkMTcnLFxuICAgICAgICB9LFxuXG4gICAgICAgICdsaW1lJzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2Y5ZmJlNycsXG4gICAgICAgICAgICAnMTAwJyA6ICcjZjBmNGMzJyxcbiAgICAgICAgICAgICcyMDAnIDogJyNlNmVlOWMnLFxuICAgICAgICAgICAgJzMwMCcgOiAnI2RjZTc3NScsXG4gICAgICAgICAgICAnNDAwJyA6ICcjZDRlMTU3JyxcbiAgICAgICAgICAgICc1MDAnIDogJyNjZGRjMzknLFxuICAgICAgICAgICAgJzYwMCcgOiAnI2MwY2EzMycsXG4gICAgICAgICAgICAnNzAwJyA6ICcjYWZiNDJiJyxcbiAgICAgICAgICAgICc4MDAnIDogJyM5ZTlkMjQnLFxuICAgICAgICAgICAgJzkwMCcgOiAnIzgyNzcxNycsXG4gICAgICAgICAgICAnYTEwMCc6ICcjZjRmZjgxJyxcbiAgICAgICAgICAgICdhMjAwJzogJyNlZWZmNDEnLFxuICAgICAgICAgICAgJ2E0MDAnOiAnI2M2ZmYwMCcsXG4gICAgICAgICAgICAnYTcwMCc6ICcjYWVlYTAwJyxcbiAgICAgICAgfSxcblxuICAgICAgICAneWVsbG93Jzoge1xuICAgICAgICAgICAgJzUwJyAgOiAnI2ZmZmRlNycsXG4gICAgICAgICAgICAnMTAwJyA6ICcjZmZmOWM0JyxcbiAgICAgICAgICAgICcyMDAnIDogJyNmZmY1OWQnLFxuICAgICAgICAgICAgJzMwMCcgOiAnI2ZmZjE3NicsXG4gICAgICAgICAgICAnNDAwJyA6ICcjZmZlZTU4JyxcbiAgICAgICAgICAgICc1MDAnIDogJyNmZmViM2InLFxuICAgICAgICAgICAgJzYwMCcgOiAnI2ZkZDgzNScsXG4gICAgICAgICAgICAnNzAwJyA6ICcjZmJjMDJkJyxcbiAgICAgICAgICAgICc4MDAnIDogJyNmOWE4MjUnLFxuICAgICAgICAgICAgJzkwMCcgOiAnI2Y1N2YxNycsXG4gICAgICAgICAgICAnYTEwMCc6ICcjZmZmZjhkJyxcbiAgICAgICAgICAgICdhMjAwJzogJyNmZmZmMDAnLFxuICAgICAgICAgICAgJ2E0MDAnOiAnI2ZmZWEwMCcsXG4gICAgICAgICAgICAnYTcwMCc6ICcjZmZkNjAwJyxcbiAgICAgICAgfSxcblxuICAgICAgICAnYW1iZXInOiB7XG4gICAgICAgICAgICAnNTAnICA6ICcjZmZmOGUxJyxcbiAgICAgICAgICAgICcxMDAnIDogJyNmZmVjYjMnLFxuICAgICAgICAgICAgJzIwMCcgOiAnI2ZmZTA4MicsXG4gICAgICAgICAgICAnMzAwJyA6ICcjZmZkNTRmJyxcbiAgICAgICAgICAgICc0MDAnIDogJyNmZmNhMjgnLFxuICAgICAgICAgICAgJzUwMCcgOiAnI2ZmYzEwNycsXG4gICAgICAgICAgICAnNjAwJyA6ICcjZmZiMzAwJyxcbiAgICAgICAgICAgICc3MDAnIDogJyNmZmEwMDAnLFxuICAgICAgICAgICAgJzgwMCcgOiAnI2ZmOGYwMCcsXG4gICAgICAgICAgICAnOTAwJyA6ICcjZmY2ZjAwJyxcbiAgICAgICAgICAgICdhMTAwJzogJyNmZmU1N2YnLFxuICAgICAgICAgICAgJ2EyMDAnOiAnI2ZmZDc0MCcsXG4gICAgICAgICAgICAnYTQwMCc6ICcjZmZjNDAwJyxcbiAgICAgICAgICAgICdhNzAwJzogJyNmZmFiMDAnLFxuICAgICAgICB9LFxuXG4gICAgICAgICdvcmFuZ2UnOiB7XG4gICAgICAgICAgICAnNTAnICA6ICcjZmZmM2UwJyxcbiAgICAgICAgICAgICcxMDAnIDogJyNmZmUwYjInLFxuICAgICAgICAgICAgJzIwMCcgOiAnI2ZmY2M4MCcsXG4gICAgICAgICAgICAnMzAwJyA6ICcjZmZiNzRkJyxcbiAgICAgICAgICAgICc0MDAnIDogJyNmZmE3MjYnLFxuICAgICAgICAgICAgJzUwMCcgOiAnI2ZmOTgwMCcsXG4gICAgICAgICAgICAnNjAwJyA6ICcjZmI4YzAwJyxcbiAgICAgICAgICAgICc3MDAnIDogJyNmNTdjMDAnLFxuICAgICAgICAgICAgJzgwMCcgOiAnI2VmNmMwMCcsXG4gICAgICAgICAgICAnOTAwJyA6ICcjZTY1MTAwJyxcbiAgICAgICAgICAgICdhMTAwJzogJyNmZmQxODAnLFxuICAgICAgICAgICAgJ2EyMDAnOiAnI2ZmYWI0MCcsXG4gICAgICAgICAgICAnYTQwMCc6ICcjZmY5MTAwJyxcbiAgICAgICAgICAgICdhNzAwJzogJyNmZjZkMDAnLFxuICAgICAgICB9LFxuXG4gICAgICAgICdkZWVwLW9yYW5nZSc6IHtcbiAgICAgICAgICAgICc1MCcgIDogJyNmYmU5ZTcnLFxuICAgICAgICAgICAgJzEwMCcgOiAnI2ZmY2NiYycsXG4gICAgICAgICAgICAnMjAwJyA6ICcjZmZhYjkxJyxcbiAgICAgICAgICAgICczMDAnIDogJyNmZjhhNjUnLFxuICAgICAgICAgICAgJzQwMCcgOiAnI2ZmNzA0MycsXG4gICAgICAgICAgICAnNTAwJyA6ICcjZmY1NzIyJyxcbiAgICAgICAgICAgICc2MDAnIDogJyNmNDUxMWUnLFxuICAgICAgICAgICAgJzcwMCcgOiAnI2U2NGExOScsXG4gICAgICAgICAgICAnODAwJyA6ICcjZDg0MzE1JyxcbiAgICAgICAgICAgICc5MDAnIDogJyNiZjM2MGMnLFxuICAgICAgICAgICAgJ2ExMDAnOiAnI2ZmOWU4MCcsXG4gICAgICAgICAgICAnYTIwMCc6ICcjZmY2ZTQwJyxcbiAgICAgICAgICAgICdhNDAwJzogJyNmZjNkMDAnLFxuICAgICAgICAgICAgJ2E3MDAnOiAnI2RkMmMwMCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2Jyb3duJzoge1xuICAgICAgICAgICAgJzUwJyA6ICcjZWZlYmU5JyxcbiAgICAgICAgICAgICcxMDAnOiAnI2Q3Y2NjOCcsXG4gICAgICAgICAgICAnMjAwJzogJyNiY2FhYTQnLFxuICAgICAgICAgICAgJzMwMCc6ICcjYTE4ODdmJyxcbiAgICAgICAgICAgICc0MDAnOiAnIzhkNmU2MycsXG4gICAgICAgICAgICAnNTAwJzogJyM3OTU1NDgnLFxuICAgICAgICAgICAgJzYwMCc6ICcjNmQ0YzQxJyxcbiAgICAgICAgICAgICc3MDAnOiAnIzVkNDAzNycsXG4gICAgICAgICAgICAnODAwJzogJyM0ZTM0MmUnLFxuICAgICAgICAgICAgJzkwMCc6ICcjM2UyNzIzJyxcbiAgICAgICAgfSxcblxuICAgICAgICAnZ3JleSc6IHtcbiAgICAgICAgICAgICc1MCcgOiAnI2ZhZmFmYScsXG4gICAgICAgICAgICAnMTAwJzogJyNmNWY1ZjUnLFxuICAgICAgICAgICAgJzIwMCc6ICcjZWVlZWVlJyxcbiAgICAgICAgICAgICczMDAnOiAnI2UwZTBlMCcsXG4gICAgICAgICAgICAnNDAwJzogJyNiZGJkYmQnLFxuICAgICAgICAgICAgJzUwMCc6ICcjOWU5ZTllJyxcbiAgICAgICAgICAgICc2MDAnOiAnIzc1NzU3NScsXG4gICAgICAgICAgICAnNzAwJzogJyM2MTYxNjEnLFxuICAgICAgICAgICAgJzgwMCc6ICcjNDI0MjQyJyxcbiAgICAgICAgICAgICc5MDAnOiAnIzIxMjEyMScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2JsdWUtZ3JleSc6IHtcbiAgICAgICAgICAgICc1MCcgIDogJyNlY2VmZjEnLFxuICAgICAgICAgICAgJzEwMCcgOiAnI2NmZDhkYycsXG4gICAgICAgICAgICAnMjAwJyA6ICcjYjBiZWM1JyxcbiAgICAgICAgICAgICczMDAnIDogJyM5MGE0YWUnLFxuICAgICAgICAgICAgJzQwMCcgOiAnIzc4OTA5YycsXG4gICAgICAgICAgICAnNTAwJyA6ICcjNjA3ZDhiJyxcbiAgICAgICAgICAgICc2MDAnIDogJyM1NDZlN2EnLFxuICAgICAgICAgICAgJzcwMCcgOiAnIzQ1NWE2NCcsXG4gICAgICAgICAgICAnODAwJyA6ICcjMzc0NzRmJyxcbiAgICAgICAgICAgICc5MDAnIDogJyMyNjMyMzgnLFxuICAgICAgICAgICAgJzEwMDAnOiAnIzExMTcxYScsXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydCB2YXIgY29sb3JzOmFueSAgPSBtYXRlcmlhbENvbG9ycztcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjb2xvcihuYW1lOnN0cmluZywgdmFyaWFudDphbnkgPSAnNTAwJywgcHJlZml4SGV4U3ltYm9sOmJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sb3JzW25hbWVdID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgY29sb3JzW25hbWVdWzxzdHJpbmc+IHZhcmlhbnRdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeEhleFN5bWJvbCA/IGNvbG9yc1tuYW1lXVs8c3RyaW5nPiB2YXJpYW50XSA6IGNvbG9yc1tuYW1lXVs8c3RyaW5nPiB2YXJpYW50XS5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgY29sb3IgWycgKyBuYW1lICsgJ10gdmFyaWFudCBbJyArIDxzdHJpbmc+IHZhcmlhbnQgKyAnXSBpbiBtYXRlcmlhbHMuY29sb3IoKScpO1xuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG5cbiAgICBleHBvcnQgY2xhc3MgTWV0YVN0b3JlIHtcblxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIHRlbXBsYXRlczphbnkgPSB7fTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlKHR5cGU6c3RyaW5nLCBkZWZhdWx0TWV0YVN0b3JlOmFueSkge1xuICAgICAgICAgICAgaWYgKCFNZXRhU3RvcmUuaGFzVGVtcGxhdGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgICBNZXRhU3RvcmUudGVtcGxhdGVzW3R5cGVdID0gZGVmYXVsdE1ldGFTdG9yZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBoYXNUZW1wbGF0ZSh0eXBlOnN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmluZWQoTWV0YVN0b3JlLnRlbXBsYXRlc1t0eXBlXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBnZXQgc3RvcmUoKTpJQ29uZmlnUHJvcGVydHkge1xuICAgICAgICAgICAgcmV0dXJuIENvbmZpZ09iamVjdC5tYWtlUHJvcGVydHkodGhpcy50YXJnZXRbdGhpcy5vcHRpb25zLmtleV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIHRhcmdldDphbnk7XG4gICAgICAgIHByb3RlY3RlZCB0eXBlOmFueTtcblxuICAgICAgICBwcm90ZWN0ZWQgb3B0aW9uczphbnkgPSB7XG4gICAgICAgICAgICBrZXk6ICdfZGVjb3JhdG9yTWV0YVN0b3JlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHRhcmdldDphbnksIHR5cGU6c3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgIHRoaXMudHlwZSAgID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlSGFzTWV0YVN0b3JlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGZvcih0YXJnZXQ6YW55LCB0eXBlOnN0cmluZyA9ICdkZWZhdWx0Jyk6TWV0YVN0b3JlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWV0YVN0b3JlKHRhcmdldCwgdHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RvcmVQdXNoKGtleTpzdHJpbmcsIHZhbDphbnkpOk1ldGFTdG9yZSB7XG4gICAgICAgICAgICB2YXIgaXRlbXM6YW55ID0gdGhpcy5zdG9yZS5oYXMoa2V5KSA/IHRoaXMuc3RvcmUuZ2V0KGtleSkgOiBbXTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuc2V0KGtleSwgaXRlbXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY2xlYW5UYXJnZXQoKTpNZXRhU3RvcmUge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0W3RoaXMub3B0aW9ucy5rZXldO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgZW5zdXJlSGFzTWV0YVN0b3JlKCkge1xuICAgICAgICAgICAgaWYgKCFkZWZpbmVkKHRoaXMudGFyZ2V0W3RoaXMub3B0aW9ucy5rZXldKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0W3RoaXMub3B0aW9ucy5rZXldID0gbmV3IENvbmZpZ09iamVjdCgpO1xuICAgICAgICAgICAgICAgIGlmIChNZXRhU3RvcmUuaGFzVGVtcGxhdGUodGhpcy50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLm1lcmdlKE1ldGFTdG9yZS50ZW1wbGF0ZXNbdGhpcy50eXBlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRQYXJ0cyhzdHIpOmFueSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxcXFxcLi9nLCAnXFx1ZmZmZicpLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9cXHVmZmZmL2csICcuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIGNoaWxkIG9mIHRoZSBvYmplY3QgdXNpbmcgZG90IG5vdGF0aW9uXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqIEBwYXJhbSBwYXJ0c1xuICAgICAqIEBwYXJhbSBjcmVhdGVcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBvYmplY3RHZXQob2JqPzphbnksIHBhcnRzPzphbnksIGNyZWF0ZT86YW55KTphbnkge1xuICAgICAgICBpZiAodHlwZW9mIHBhcnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFydHMgPSBnZXRQYXJ0cyhwYXJ0cyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydDtcbiAgICAgICAgd2hpbGUgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAmJiBwYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCEocGFydCBpbiBvYmopICYmIGNyZWF0ZSkge1xuICAgICAgICAgICAgICAgIG9ialtwYXJ0XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqID0gb2JqW3BhcnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSB2YWx1ZSBvZiBhIGNoaWxkIG9mIHRoZSBvYmplY3QgdXNpbmcgZG90IG5vdGF0aW9uXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqIEBwYXJhbSBwYXJ0c1xuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFNldChvYmosIHBhcnRzLCB2YWx1ZSkge1xuICAgICAgICBwYXJ0cyA9IGdldFBhcnRzKHBhcnRzKTtcblxuICAgICAgICB2YXIgcHJvcCA9IHBhcnRzLnBvcCgpO1xuICAgICAgICBvYmogICAgICA9IG9iamVjdEdldChvYmosIHBhcnRzLCB0cnVlKTtcbiAgICAgICAgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIChvYmpbcHJvcF0gPSB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIGNoaWxkIG9mIHRoZSBvYmplY3QgZXhpc3RzIHVzaW5nIGRvdCBub3RhdGlvblxuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKiBAcGFyYW0gcGFydHNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxhbnl9XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9iamVjdEV4aXN0cyhvYmosIHBhcnRzKSB7XG4gICAgICAgIHBhcnRzID0gZ2V0UGFydHMocGFydHMpO1xuXG4gICAgICAgIHZhciBwcm9wID0gcGFydHMucG9wKCk7XG4gICAgICAgIG9iaiAgICAgID0gb2JqZWN0R2V0KG9iaiwgcGFydHMpO1xuXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogJiYgcHJvcCBpbiBvYmo7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlY3Vyc2UodmFsdWU6T2JqZWN0LCBmbjpGdW5jdGlvbiwgZm5Db250aW51ZT86RnVuY3Rpb24pOmFueSB7XG4gICAgICAgIGZ1bmN0aW9uIHJlY3Vyc2UodmFsdWUsIGZuLCBmbkNvbnRpbnVlLCBzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAgICAgaWYgKHN0YXRlLm9ianMuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgICAgICA9IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkICgnICsgc3RhdGUucGF0aCArICcpJyk7XG4gICAgICAgICAgICAgICAgZXJyb3IucGF0aCA9IHN0YXRlLnBhdGg7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvYmosIGtleTtcbiAgICAgICAgICAgIGlmIChmbkNvbnRpbnVlICYmIGZuQ29udGludWUodmFsdWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8vIFNraXAgdmFsdWUgaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2luZE9mKHZhbHVlKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgICAgIC8vIElmIHZhbHVlIGlzIGFuIGFycmF5LCByZWN1cnNlLlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN1cnNlKGl0ZW0sIGZuLCBmbkNvbnRpbnVlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpzOiBzdGF0ZS5vYmpzLmNvbmNhdChbdmFsdWVdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHN0YXRlLnBhdGggKyAnWycgKyBpbmRleCArICddJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtpbmRPZih2YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdmFsdWUgaXMgYW4gb2JqZWN0LCByZWN1cnNlLlxuICAgICAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gcmVjdXJzZSh2YWx1ZVtrZXldLCBmbiwgZm5Db250aW51ZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Jqczogc3RhdGUub2Jqcy5jb25jYXQoW3ZhbHVlXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBzdGF0ZS5wYXRoICsgKC9cXFcvLnRlc3Qoa2V5KSA/ICdbXCInICsga2V5ICsgJ1wiXScgOiAnLicgKyBrZXkpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHBhc3MgdmFsdWUgaW50byBmbiBhbmQgcmV0dXJuLlxuICAgICAgICAgICAgICAgIHJldHVybiBmbih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjdXJzZSh2YWx1ZSwgZm4sIGZuQ29udGludWUsIHtvYmpzOiBbXSwgcGF0aDogJyd9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3B5IGFuIG9iamVjdCwgY3JlYXRpbmcgYSBuZXcgb2JqZWN0IGFuZCBsZWF2aW5nIHRoZSBvbGQgaW50YWN0XG4gICAgICogQHBhcmFtIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjb3B5T2JqZWN0PFQ+IChvYmplY3Q6VCk6VCB7XG4gICAgICAgIHZhciBvYmplY3RDb3B5ID0gPFQ+e307XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0Q29weVtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0Q29weTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGbGF0dGVuIGFuIG9iamVjdCB0byBhIGRvdCBub3RhdGVkIGFzc29jaWF0aXZlIGFycmF5XG4gICAgICogQHBhcmFtIG9ialxuICAgICAqIEBwYXJhbSBwcmVmaXhcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBkb3RpemUob2JqOmFueSwgcHJlZml4PzphbnkpIHtcbiAgICAgICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld09iaiAgICAgPSB7fTtcbiAgICAgICAgICAgICAgICBuZXdPYmpbcHJlZml4XSA9IG9iajtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3T2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3T2JqID0ge307XG5cbiAgICAgICAgZnVuY3Rpb24gcmVjdXJzZShvOmFueSwgcDphbnksIGlzQXJyYXlJdGVtPzphbnkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGYgaW4gbykge1xuICAgICAgICAgICAgICAgIGlmIChvW2ZdICYmIHR5cGVvZiBvW2ZdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9bZl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gcmVjdXJzZShvW2ZdLCAocCA/IHAgOiBcIlwiKSArIChpc051bWJlcihmKSA/IFwiW1wiICsgZiArIFwiXVwiIDogXCIuXCIgKyBmKSwgdHJ1ZSk7IC8vIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXlJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHJlY3Vyc2Uob1tmXSwgKHAgPyBwIDogXCJcIikgKyBcIltcIiArIGYgKyBcIl1cIik7IC8vIGFycmF5IGl0ZW0gb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gcmVjdXJzZShvW2ZdLCAocCA/IHAgKyBcIi5cIiA6IFwiXCIpICsgZik7IC8vIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXlJdGVtIHx8IGlzTnVtYmVyKGYpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqW3AgKyBcIltcIiArIGYgKyBcIl1cIl0gPSBvW2ZdOyAvLyBhcnJheSBpdGVtIHByaW1pdGl2ZVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmpbKHAgPyBwICsgXCIuXCIgOiBcIlwiKSArIGZdID0gb1tmXTsgLy8gcHJpbWl0aXZlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNFbXB0eU9iaihuZXdPYmopKVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc051bWJlcihmKSB7XG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlSW50KGYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzRW1wdHlPYmoob2JqKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjdXJzZShvYmosIHByZWZpeCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWl4aW5zKGRlcml2ZWRDdG9yOmFueSwgYmFzZUN0b3JzOmFueVtdKSB7XG4gICAgICAgIGJhc2VDdG9ycy5mb3JFYWNoKGJhc2VDdG9yID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGVwZW5kZW5jeVNvcnRlciB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB2YXIgYXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBpdGVtczphbnkgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHZhciBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGRlcGVuZGVuY2llczphbnkgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHZhciBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGRlcGVuZHNPbjphbnkgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHZhciBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIG1pc3Npbmc6YW55ID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB2YXIgYXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjaXJjdWxhcjphbnkgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHZhciBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGhpdHM6YW55ID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB2YXIgYXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBzb3J0ZWQ6YW55ID0ge307XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFkZChpdGVtczp7W25hbWU6c3RyaW5nXTpzdHJpbmd8c3RyaW5nW119KSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykuZm9yRWFjaCgobmFtZTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0obmFtZSwgaXRlbXNbbmFtZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYWRkSXRlbShuYW1lOnN0cmluZywgZGVwcz86c3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZGVwcyA9IGRlcHMgfHwgW107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXBzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRlcHMgPSAoPHN0cmluZz4gZGVwcykudG9TdHJpbmcoKS5zcGxpdCgvLFxccz8vKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRJdGVtKG5hbWUsIDxzdHJpbmdbXT4gZGVwcyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0SXRlbShuYW1lOnN0cmluZywgZGVwczpzdHJpbmdbXSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgZGVwcy5mb3JFYWNoKChkZXA6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGRlcCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGVwZW5kc09uW2RlcF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXBlbmRzT25bZGVwXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGVwZW5kc09uW2RlcF1bbmFtZV0gPSBuYW1lO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oaXRzW2RlcF0gPSAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXMgICAgICAgICAgICAgID0gXy51bmlxKHRoaXMuaXRlbXMpO1xuICAgICAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXNbbmFtZV0gPSBkZXBzO1xuICAgICAgICAgICAgdGhpcy5oaXRzW25hbWVdICAgICAgICAgPSAwO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc29ydCgpOnN0cmluZ1tdIHtcbiAgICAgICAgICAgIHRoaXMuc29ydGVkICAgICAgICAgICAgPSBbXTtcbiAgICAgICAgICAgIHZhciBoYXNDaGFuZ2VkOmJvb2xlYW4gPSB0cnVlO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuc29ydGVkLmxlbmd0aCA8IHRoaXMuaXRlbXMubGVuZ3RoICYmIGhhc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBoYXNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRlcGVuZGVuY2llcykuZm9yRWFjaCgoaXRlbTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F0aXNmaWVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNvcnRlZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGVwZW5kZW50cyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGl0c1tpdGVtXSsrO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0ZWQ7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByb3RlY3RlZCBzYXRpc2ZpZWQobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBwYXNzOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmdldERlcGVuZGVudHMobmFtZSkuZm9yRWFjaCgoZGVwOnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU29ydGVkKGRlcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5leGlzdHMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaXNzaW5nKG5hbWUsIGRlcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRGVwZW5kZW50cyhkZXApKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZvdW5kKG5hbWUsIGRlcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGVwZW5kZW50KG5hbWUsIGRlcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDaXJjdWxhcihuYW1lLCBkZXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHBhc3M7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXRTb3J0ZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGl0ZW1cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBzZXRTb3J0ZWQoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0ZWQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBleGlzdHMoaXRlbSk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pICE9PSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmVEZXBlbmRlbnRzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcmVtb3ZlRGVwZW5kZW50cyhpdGVtKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kZXBlbmRlbmNpZXNbaXRlbV07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0Q2lyY3VsYXJcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGl0ZW1cbiAgICAgICAgICogQHBhcmFtIGl0ZW0yXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgc2V0Q2lyY3VsYXIoaXRlbSwgaXRlbTIpIHtcbiAgICAgICAgICAgIHRoaXMuY2lyY3VsYXJbaXRlbV0gICAgICAgID0gdGhpcy5jaXJjdWxhcltpdGVtXSB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMuY2lyY3VsYXJbaXRlbV1baXRlbTJdID0gaXRlbTI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0TWlzc2luZ1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAgICAgKiBAcGFyYW0gaXRlbTJcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBzZXRNaXNzaW5nKGl0ZW0sIGl0ZW0yKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NpbmdbaXRlbV0gICAgICAgID0gdGhpcy5taXNzaW5nW2l0ZW1dIHx8IHt9O1xuICAgICAgICAgICAgdGhpcy5taXNzaW5nW2l0ZW1dW2l0ZW0yXSA9IGl0ZW0yO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldEZvdW5kXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICAgICAqIEBwYXJhbSBpdGVtMlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHNldEZvdW5kKGl0ZW0sIGl0ZW0yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubWlzc2luZ1tpdGVtXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5taXNzaW5nW2l0ZW1dW2l0ZW0yXTtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5taXNzaW5nW2l0ZW1dKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1pc3NpbmdbaXRlbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlzU29ydGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICAgICAqIEByZXR1cm4gYm9vbFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGlzU29ydGVkKGl0ZW06c3RyaW5nKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5zb3J0ZWRbaXRlbV0gIT09ICd1bmRlZmluZWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlcXVpcmVkQnkoaXRlbTpzdHJpbmcpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmRlcGVuZHNPbltpdGVtXSAhPT0gJ3VuZGVmaW5lZCcgPyB0aGlzLmRlcGVuZHNPbltpdGVtXSA6IFtdO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgaXNEZXBlbmRlbnQoaXRlbTpzdHJpbmcsIGl0ZW0yOnN0cmluZyk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuZGVwZW5kc09uW2l0ZW1dICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5kZXBlbmRzT25baXRlbV1baXRlbTJdICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNEZXBlbmRlbnRzKGl0ZW0pOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmRlcGVuZGVuY2llc1tpdGVtXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzTWlzc2luZyhpdGVtKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5taXNzaW5nW2l0ZW1dICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGlzTWlzc2luZyhkZXA6c3RyaW5nKTpib29sZWFuIHtcbiAgICAgICAgICAgIHZhciBtaXNzaW5nOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubWlzc2luZykuZm9yRWFjaCgoaXRlbTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwczpzdHJpbmdbXSA9IHRoaXMubWlzc2luZ1tpdGVtXTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwcy5pbmRleE9mKGRlcCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pc3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbWlzc2luZztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNDaXJjdWxhcihpdGVtOnN0cmluZyk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuY2lyY3VsYXJbaXRlbV0gIT09ICd1bmRlZmluZWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGlzQ2lyY3VsYXIoZGVwKSB7XG4gICAgICAgICAgICB2YXIgY2lyY3VsYXI6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5jaXJjdWxhcikuZm9yRWFjaCgoaXRlbTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwczpzdHJpbmdbXSA9IHRoaXMuY2lyY3VsYXJbaXRlbV07XG4gICAgICAgICAgICAgICAgaWYgKGRlcHMuaW5kZXhPZihkZXApICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjaXJjdWxhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBjaXJjdWxhcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGdldERlcGVuZGVudHNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGl0ZW1cbiAgICAgICAgICogQHJldHVybiBtaXhlZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldERlcGVuZGVudHMoaXRlbSk6c3RyaW5nW10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVwZW5kZW5jaWVzW2l0ZW1dO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgZ2V0TWlzc2luZyhzdHI/OmFueSk6c3RyaW5nW10ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWlzc2luZ1tzdHJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5taXNzaW5nO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgZ2V0Q2lyY3VsYXIoc3RyPzphbnkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNpcmN1bGFyW3N0cl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNpcmN1bGFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEhpdHMoc3RyPzphbnkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhpdHNbc3RyXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIEltbWVkaWF0ZVN1Y2Nlc3NDQjxULCBUUD4ge1xuICAgICAgICAodmFsdWU6VCk6IFRQO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSW1tZWRpYXRlRXJyb3JDQjxUUD4ge1xuICAgICAgICAoZXJyOmFueSk6IFRQO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRGVmZXJyZWRTdWNjZXNzQ0I8VCwgVFA+IHtcbiAgICAgICAgKHZhbHVlOlQpOiBUaGVuYWJsZUludGVyZmFjZTxUUD47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBEZWZlcnJlZEVycm9yQ0I8VFA+IHtcbiAgICAgICAgKGVycm9yOmFueSk6IFRoZW5hYmxlSW50ZXJmYWNlPFRQPjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFRoZW5hYmxlSW50ZXJmYWNlPFQ+IHtcbiAgICAgICAgdGhlbjxUUD4oc3VjY2Vzc0NCPzpEZWZlcnJlZFN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkRlZmVycmVkRXJyb3JDQjxUUD4pOiBUaGVuYWJsZUludGVyZmFjZTxUUD47XG5cbiAgICAgICAgdGhlbjxUUD4oc3VjY2Vzc0NCPzpEZWZlcnJlZFN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VFA+KTogVGhlbmFibGVJbnRlcmZhY2U8VFA+O1xuXG4gICAgICAgIHRoZW48VFA+KHN1Y2Nlc3NDQj86SW1tZWRpYXRlU3VjY2Vzc0NCPFQsIFRQPixcbiAgICAgICAgICAgICAgICAgZXJyb3JDQj86RGVmZXJyZWRFcnJvckNCPFRQPik6IFRoZW5hYmxlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICB0aGVuPFRQPihzdWNjZXNzQ0I/OkltbWVkaWF0ZVN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VFA+KTogVGhlbmFibGVJbnRlcmZhY2U8VFA+O1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUHJvbWlzZUludGVyZmFjZTxUPiBleHRlbmRzIFRoZW5hYmxlSW50ZXJmYWNlPFQ+IHtcbiAgICAgICAgdGhlbjxUUD4oc3VjY2Vzc0NCPzpEZWZlcnJlZFN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkRlZmVycmVkRXJyb3JDQjxUUD4pOiBQcm9taXNlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICB0aGVuPFRQPihzdWNjZXNzQ0I/OkRlZmVycmVkU3VjY2Vzc0NCPFQsIFRQPixcbiAgICAgICAgICAgICAgICAgZXJyb3JDQj86SW1tZWRpYXRlRXJyb3JDQjxUUD4pOiBQcm9taXNlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICB0aGVuPFRQPihzdWNjZXNzQ0I/OkltbWVkaWF0ZVN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkRlZmVycmVkRXJyb3JDQjxUUD4pOiBQcm9taXNlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICB0aGVuPFRQPihzdWNjZXNzQ0I/OkltbWVkaWF0ZVN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VFA+KTogUHJvbWlzZUludGVyZmFjZTxUUD47XG5cblxuICAgICAgICBvdGhlcndpc2UoZXJyb3JDQj86RGVmZXJyZWRFcnJvckNCPFQ+KSA6IFByb21pc2VJbnRlcmZhY2U8VD47XG5cbiAgICAgICAgb3RoZXJ3aXNlKGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VD4pOiBQcm9taXNlSW50ZXJmYWNlPFQ+O1xuXG4gICAgICAgIGFsd2F5czxUUD4oZXJyb3JDQj86RGVmZXJyZWRFcnJvckNCPFRQPikgOiBQcm9taXNlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICBhbHdheXM8VFA+KGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VFA+KTogUHJvbWlzZUludGVyZmFjZTxUUD47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBEZWZlcnJlZEludGVyZmFjZTxUPiB7XG4gICAgICAgIHJlc29sdmUodmFsdWU/OlRoZW5hYmxlSW50ZXJmYWNlPFQ+KTogRGVmZXJyZWRJbnRlcmZhY2U8VD47XG5cbiAgICAgICAgcmVzb2x2ZSh2YWx1ZT86VCk6IERlZmVycmVkSW50ZXJmYWNlPFQ+O1xuXG4gICAgICAgIHJlamVjdChlcnJvcj86YW55KTogRGVmZXJyZWRJbnRlcmZhY2U8VD47XG5cbiAgICAgICAgcHJvbWlzZTogUHJvbWlzZUludGVyZmFjZTxUPjtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvbWlzZTxUPigpOkRlZmVycmVkSW50ZXJmYWNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWZlcnJlZChEaXNwYXRjaERlZmVycmVkKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gd2hlbjxUPih2YWx1ZT86VGhlbmFibGVJbnRlcmZhY2U8VD4pOlByb21pc2VJbnRlcmZhY2U8VD47XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gd2hlbjxUPih2YWx1ZT86VCk6UHJvbWlzZUludGVyZmFjZTxUPjtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiB3aGVuKHZhbHVlPzphbnkpOmFueSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlUHJvbWlzZSgpLnJlc29sdmUodmFsdWUpLnByb21pc2U7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIERpc3BhdGNoZXJJbnRlcmZhY2Uge1xuICAgICAgICAoY2xvc3VyZTooKSA9PiB2b2lkKTogdm9pZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBEaXNwYXRjaERlZmVycmVkKGNsb3N1cmU6KCkgPT4gdm9pZCkge1xuICAgICAgICBzZXRUaW1lb3V0KGNsb3N1cmUsIDApO1xuICAgIH1cblxuICAgIGVudW0gUHJvbWlzZVN0YXRlIHtQZW5kaW5nLCBSZXNvbHV0aW9uSW5Qcm9ncmVzcywgUmVzb2x2ZWQsIFJlamVjdGVkfVxuXG4gICAgY2xhc3MgQ2xpZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlzcGF0Y2hlcjpEaXNwYXRjaGVySW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9zdWNjZXNzQ0I6YW55LFxuICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9lcnJvckNCOmFueSkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBuZXcgRGVmZXJyZWQ8YW55PihfZGlzcGF0Y2hlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKHZhbHVlOmFueSwgZGVmZXI6Ym9vbGVhbik6dm9pZCB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMuX3N1Y2Nlc3NDQikgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZWZlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIoKCkgPT4gdGhpcy5fZGlzcGF0Y2hDYWxsYmFjayh0aGlzLl9zdWNjZXNzQ0IsIHZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoQ2FsbGJhY2sodGhpcy5fc3VjY2Vzc0NCLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZWplY3QoZXJyb3I6YW55LCBkZWZlcjpib29sZWFuKTp2b2lkIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5fZXJyb3JDQikgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlZmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlcigoKSA9PiB0aGlzLl9kaXNwYXRjaENhbGxiYWNrKHRoaXMuX2Vycm9yQ0IsIGVycm9yKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoQ2FsbGJhY2sodGhpcy5fZXJyb3JDQiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZGlzcGF0Y2hDYWxsYmFjayhjYWxsYmFjazooYXJnOmFueSkgPT4gYW55LCBhcmc6YW55KTp2b2lkIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ6YW55LFxuICAgICAgICAgICAgICAgIHRoZW46YW55LFxuICAgICAgICAgICAgICAgIHR5cGU6c3RyaW5nO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGFyZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0OkRlZmVycmVkSW50ZXJmYWNlPGFueT47XG4gICAgfVxuXG4gICAgY2xhc3MgRGVmZXJyZWQ8VD4gaW1wbGVtZW50cyBEZWZlcnJlZEludGVyZmFjZTxUPiB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rpc3BhdGNoZXI6RGlzcGF0Y2hlckludGVyZmFjZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2U8VD4odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhlbihzdWNjZXNzQ0I6YW55LCBlcnJvckNCOmFueSk6YW55IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc3VjY2Vzc0NCKSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YoZXJyb3JDQikgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2xpZW50ID0gbmV3IENsaWVudCh0aGlzLl9kaXNwYXRjaGVyLCBzdWNjZXNzQ0IsIGVycm9yQ0IpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBQcm9taXNlU3RhdGUuUGVuZGluZzpcbiAgICAgICAgICAgICAgICBjYXNlIFByb21pc2VTdGF0ZS5SZXNvbHV0aW9uSW5Qcm9ncmVzczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2sucHVzaChjbGllbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgUHJvbWlzZVN0YXRlLlJlc29sdmVkOlxuICAgICAgICAgICAgICAgICAgICBjbGllbnQucmVzb2x2ZSh0aGlzLl92YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBQcm9taXNlU3RhdGUuUmVqZWN0ZWQ6XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudC5yZWplY3QodGhpcy5fZXJyb3IsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5yZXN1bHQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUodmFsdWU/OlQpOkRlZmVycmVkSW50ZXJmYWNlPFQ+O1xuXG4gICAgICAgIHJlc29sdmUodmFsdWU/OlByb21pc2VJbnRlcmZhY2U8VD4pOkRlZmVycmVkSW50ZXJmYWNlPFQ+O1xuXG4gICAgICAgIHJlc29sdmUodmFsdWU/OmFueSk6RGVmZXJyZWRJbnRlcmZhY2U8VD4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBQcm9taXNlU3RhdGUuUGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9yZXNvbHZlKHZhbHVlOmFueSk6RGVmZXJyZWRJbnRlcmZhY2U8VD4ge1xuICAgICAgICAgICAgdmFyIHR5cGUgICAgPSB0eXBlb2YodmFsdWUpLFxuICAgICAgICAgICAgICAgIHRoZW46YW55LFxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHRoZW4gPSB2YWx1ZS50aGVuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMucHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmVjdXJzaXZlIHJlc29sdXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gUHJvbWlzZVN0YXRlLlJlc29sdXRpb25JblByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0OmFueSk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjphbnkpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBQcm9taXNlU3RhdGUuUmVzb2x1dGlvbkluUHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFByb21pc2VTdGF0ZS5SZXNvbHZlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpOm51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFja1NpemUgPSB0aGlzLl9zdGFjay5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdGFja1NpemU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrW2ldLnJlc29sdmUodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKDAsIHN0YWNrU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWplY3QoZXJyb3I/OmFueSk6RGVmZXJyZWRJbnRlcmZhY2U8VD4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBQcm9taXNlU3RhdGUuUGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3JlamVjdChlcnJvcj86YW55KTpEZWZlcnJlZEludGVyZmFjZTxUPiB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFByb21pc2VTdGF0ZS5SZXNvbHV0aW9uSW5Qcm9ncmVzcztcblxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBQcm9taXNlU3RhdGUuUmVqZWN0ZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IgPSBlcnJvcjtcblxuICAgICAgICAgICAgICAgIHZhciBzdGFja1NpemUgPSB0aGlzLl9zdGFjay5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGkgICAgICAgICA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RhY2tTaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2tbaV0ucmVqZWN0KGVycm9yLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKDAsIHN0YWNrU2l6ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlOlByb21pc2VJbnRlcmZhY2U8VD47XG5cbiAgICAgICAgcHJpdmF0ZSBfc3RhY2s6QXJyYXk8Q2xpZW50PiA9IFtdO1xuICAgICAgICBwcml2YXRlIF9zdGF0ZSAgICAgICAgICAgICAgID0gUHJvbWlzZVN0YXRlLlBlbmRpbmc7XG4gICAgICAgIHByaXZhdGUgX3ZhbHVlOlQ7XG4gICAgICAgIHByaXZhdGUgX2Vycm9yOmFueTtcbiAgICB9XG5cbiAgICBjbGFzcyBQcm9taXNlPFQ+IGltcGxlbWVudHMgUHJvbWlzZUludGVyZmFjZTxUPiB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RlZmVycmVkOkRlZmVycmVkPFQ+KSB7XG4gICAgICAgIH1cblxuICAgICAgICB0aGVuPFRQPihzdWNjZXNzQ0I/OkRlZmVycmVkU3VjY2Vzc0NCPFQsIFRQPixcbiAgICAgICAgICAgICAgICAgZXJyb3JDQj86RGVmZXJyZWRFcnJvckNCPFRQPik6UHJvbWlzZUludGVyZmFjZTxUUD47XG5cbiAgICAgICAgdGhlbjxUUD4oc3VjY2Vzc0NCPzpEZWZlcnJlZFN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VFA+KTpQcm9taXNlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICB0aGVuPFRQPihzdWNjZXNzQ0I/OkltbWVkaWF0ZVN1Y2Nlc3NDQjxULCBUUD4sXG4gICAgICAgICAgICAgICAgIGVycm9yQ0I/OkRlZmVycmVkRXJyb3JDQjxUUD4pOlByb21pc2VJbnRlcmZhY2U8VFA+O1xuXG4gICAgICAgIHRoZW48VFA+KHN1Y2Nlc3NDQj86SW1tZWRpYXRlU3VjY2Vzc0NCPFQsIFRQPixcbiAgICAgICAgICAgICAgICAgZXJyb3JDQj86SW1tZWRpYXRlRXJyb3JDQjxUUD4pOlByb21pc2VJbnRlcmZhY2U8VFA+O1xuXG4gICAgICAgIHRoZW4oc3VjY2Vzc0NCOmFueSwgZXJyb3JDQjphbnkpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmZXJyZWQuX3RoZW4oc3VjY2Vzc0NCLCBlcnJvckNCKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyd2lzZShlcnJvckNCPzpJbW1lZGlhdGVFcnJvckNCPFQ+KTpQcm9taXNlSW50ZXJmYWNlPFQ+O1xuXG4gICAgICAgIG90aGVyd2lzZShlcnJvckNCPzpEZWZlcnJlZEVycm9yQ0I8VD4pOlByb21pc2VJbnRlcmZhY2U8VD47XG5cbiAgICAgICAgb3RoZXJ3aXNlKGVycm9yQ0I6YW55KTphbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmVycmVkLl90aGVuKHVuZGVmaW5lZCwgZXJyb3JDQik7XG4gICAgICAgIH1cblxuICAgICAgICBhbHdheXM8VFA+KGVycm9yQ0I/OkltbWVkaWF0ZUVycm9yQ0I8VFA+KTpQcm9taXNlSW50ZXJmYWNlPFRQPjtcblxuICAgICAgICBhbHdheXM8VFA+KGVycm9yQ0I/OkRlZmVycmVkRXJyb3JDQjxUUD4pOlByb21pc2VJbnRlcmZhY2U8VFA+O1xuXG4gICAgICAgIGFsd2F5czxUUD4oZXJyb3JDQj86YW55KTphbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmVycmVkLl90aGVuKGVycm9yQ0IsIGVycm9yQ0IpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICBkZWNsYXJlIHZhciB3aW5kb3c6YW55O1xuXG4gICAgZXhwb3J0IHZhciBiYWdzOntbbmFtZTpzdHJpbmddOklTdG9yYWdlQmFnfSA9IHt9O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGhhc0JhZyhuYW1lOnN0cmluZyk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYmFnc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhZyhuYW1lOnN0cmluZywgcHJvdmlkZXI6SVN0b3JhZ2VQcm92aWRlcik6SVN0b3JhZ2VCYWcge1xuICAgICAgICBpZiAoaGFzQmFnKG5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JhZ2VCYWcgJyArIG5hbWUgKyAnIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhZ3NbbmFtZV0gPSBuZXcgU3RvcmFnZUJhZyhwcm92aWRlcik7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEJhZyhuYW1lOnN0cmluZyk6SVN0b3JhZ2VCYWcge1xuICAgICAgICBpZiAoIWhhc0JhZyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yYWdlQmFnICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiYWdzW25hbWVdO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVN0b3JhZ2VQcm92aWRlciB7XG4gICAgICAgIGxlbmd0aDogbnVtYmVyO1xuICAgICAgICBvblN0b3JlRXZlbnQoY2FsbGJhY2s6RnVuY3Rpb24pO1xuICAgICAgICBjbGVhcigpOiB2b2lkO1xuICAgICAgICBnZXRJdGVtKGtleTpzdHJpbmcpOiBhbnk7XG4gICAgICAgIGtleShpbmRleDpudW1iZXIpOiBzdHJpbmc7XG4gICAgICAgIHJlbW92ZUl0ZW0oa2V5OnN0cmluZyk6IHZvaWQ7XG4gICAgICAgIHNldEl0ZW0oa2V5OnN0cmluZywgZGF0YTpzdHJpbmcpOiB2b2lkO1xuICAgICAgICBnZXRTaXplKGtleTphbnkpOnN0cmluZztcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElTdG9yYWdlQmFnIHtcbiAgICAgICAgZ2V0KGtleTphbnksIG9wdGlvbnM/OmFueSk7XG4gICAgICAgIHNldChrZXk6YW55LCB2YWw6YW55LCBvcHRpb25zPzphbnkpO1xuICAgICAgICBvbihjYWxsYmFjazphbnkpO1xuICAgICAgICBkZWwoa2V5OmFueSk7XG4gICAgICAgIGNsZWFyKCk7XG4gICAgICAgIGdldFNpemUoa2V5OmFueSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFN0b3JhZ2VCYWcgaW1wbGVtZW50cyBJU3RvcmFnZUJhZyB7XG4gICAgICAgIHByb3ZpZGVyOklTdG9yYWdlUHJvdmlkZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvdmlkZXI6SVN0b3JhZ2VQcm92aWRlcikge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBhIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgJ29uc3RvcmFnZScgZXZlbnRcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBvbihjYWxsYmFjazpGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlci5vblN0b3JlRXZlbnQoY2FsbGJhY2spO1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uc3RvcmFnZVwiLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGVkZWYgU3RvcmFnZVNldE9wdGlvbnNcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBbanNvbj1mYWxzZV0gLSBTZXQgdG8gdHJ1ZSBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIGEgSlNPTiBvYmplY3RcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8Ym9vbGVhbn0gW2V4cGlyZXM9ZmFsc2VdIC0gTWludXRlcyB1bnRpbCBleHBpcmVkXG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogU2F2ZSBhIHZhbHVlIHRvIHRoZSBzdG9yYWdlXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0ga2V5ICAgICAgICAgICAgICAgLSBUaGUgdW5pcXVlIGlkIHRvIHNhdmUgdGhlIGRhdGEgb25cbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWwgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFRoZSB2YWx1ZSwgY2FuIGJlIGFueSBkYXRhdHlwZS4gSWYgaXQncyBhbiBvYmplY3QsIG1ha2Ugc3VyZSB0byBlbmFibGUganNvbiBpbiB0aGUgb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge1N0b3JhZ2VTZXRPcHRpb25zfSBbb3B0aW9uc10gICAgIC0gQWRkaXRpb25hbCBvcHRpb25zLCBjaGVjayB0aGUgZG9jc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldChrZXk6YW55LCB2YWw6YW55LCBvcHRpb25zPzphbnkpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zOmFueSA9IF8ubWVyZ2Uoe2pzb246IGZhbHNlLCBleHBpcmVzOiBmYWxzZX0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuanNvbikge1xuICAgICAgICAgICAgICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5leHBpcmVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLyAxMDAwKSAvIDYwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVyLnNldEl0ZW0oa2V5ICsgJzpleHBpcmUnLCBub3cgKyBvcHRpb25zLmV4cGlyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm92aWRlci5zZXRJdGVtKGtleSwgdmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZWRlZiBTdG9yYWdlR2V0T3B0aW9uc1xuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IFtqc29uPWZhbHNlXSAgICAgLSBTZXQgdG8gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBKU09OIG9iamVjdFxuICAgICAgICAgKiBAcHJvcGVydHkgeyp9IFtkZWZhdWx0PWZhbHNlXSAgICAgICAgLSBUaGUgZGVmYXVsdCB2YWx1ZSB0byByZXR1cm4gaWYgdGhlIHJlcXVlc3RlZCBrZXkgZG9lcyBub3QgZXhpc3RcbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSB2YWx1ZSBmcm9tIHRoZSBzdG9yYWdlXG4gICAgICAgICAqIEBwYXJhbSBrZXlcbiAgICAgICAgICogQHBhcmFtIHtTdG9yYWdlR2V0T3B0aW9uc30gW29wdGlvbnNdIC0gT3B0aW9uYWwgb3B0aW9ucywgY2hlY2sgdGhlIGRvY3NcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0KGtleTphbnksIG9wdGlvbnM/OmFueSkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnM6YW55ID0gXy5tZXJnZSh7anNvbjogZmFsc2UsIGRlZjogbnVsbH0sIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAoIWRlZmluZWQoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmRlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcodGhpcy5wcm92aWRlci5nZXRJdGVtKGtleSkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcodGhpcy5wcm92aWRlci5nZXRJdGVtKGtleSArICc6ZXhwaXJlJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgICAgID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAvIDEwMDApIC8gNjApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwaXJlcyA9IHBhcnNlSW50KHRoaXMucHJvdmlkZXIuZ2V0SXRlbShrZXkgKyAnOmV4cGlyZScpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+IGV4cGlyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbChrZXkgKyAnOmV4cGlyZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsOmFueSA9IHRoaXMucHJvdmlkZXIuZ2V0SXRlbShrZXkpO1xuXG4gICAgICAgICAgICBpZiAoIWRlZmluZWQodmFsKSB8fCBkZWZpbmVkKHZhbCkgJiYgdmFsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5kZWY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmpzb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlbGV0ZSBhIHZhbHVlIGZyb20gdGhlIHN0b3JhZ2VcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBrZXlcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBkZWwoa2V5KSB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhciB0aGUgc3RvcmFnZSwgd2lsbCBjbGVhbiBhbGwgc2F2ZWQgaXRlbXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIuY2xlYXIoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0b3RhbCBsb2NhbHN0b3JhZ2Ugc2l6ZSBpbiBNQi4gSWYga2V5IGlzIHByb3ZpZGVkLFxuICAgICAgICAgKiBpdCB3aWxsIHJldHVybiBzaXplIGluIE1CIG9ubHkgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0uXG4gICAgICAgICAqIEBwYXJhbSBba2V5XVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGdldFNpemUoa2V5OmFueSk6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyLmdldFNpemUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2UgaW1wbGVtZW50cyBJU3RvcmFnZVByb3ZpZGVyIHtcbiAgICAgICAgcHVibGljIGdldCBsZW5ndGgoKTpudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFNpemUoa2V5OmFueSk6c3RyaW5nIHtcbiAgICAgICAgICAgIGtleSA9IGtleSB8fCBmYWxzZTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh3aW5kb3cubG9jYWxTdG9yYWdlW3hdLmxlbmd0aCAqIDIpIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsICs9ICh3aW5kb3cubG9jYWxTdG9yYWdlW3hdLmxlbmd0aCAqIDIpIC8gMTAyNCAvIDEwMjQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25TdG9yZUV2ZW50KGNhbGxiYWNrOkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgPGFueT4gY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25zdG9yYWdlXCIsIDxhbnk+IGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyKCk6dm9pZCB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRJdGVtKGtleTpzdHJpbmcpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBrZXkoaW5kZXg6bnVtYmVyKTpzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2Uua2V5KGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUl0ZW0oa2V5OnN0cmluZyk6dm9pZCB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEl0ZW0oa2V5OnN0cmluZywgZGF0YTpzdHJpbmcpOnZvaWQge1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU2Vzc2lvblN0b3JhZ2UgaW1wbGVtZW50cyBJU3RvcmFnZVByb3ZpZGVyIHtcbiAgICAgICAgcHVibGljIGdldCBsZW5ndGgoKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRTaXplKGtleTphbnkpOnN0cmluZyB7XG4gICAgICAgICAgICBrZXkgPSBrZXkgfHwgZmFsc2U7XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgod2luZG93LnNlc3Npb25TdG9yYWdlW3hdLmxlbmd0aCAqIDIpIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwgKz0gKHdpbmRvdy5zZXNzaW9uU3RvcmFnZVt4XS5sZW5ndGggKiAyKSAvIDEwMjQgLyAxMDI0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWwudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9uU3RvcmVFdmVudChjYWxsYmFjazpGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzdG9yYWdlXCIsIDxhbnk+IGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uc3RvcmFnZVwiLCA8YW55PiBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpOnZvaWQge1xuICAgICAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRJdGVtKGtleTpzdHJpbmcpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleShpbmRleDpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlLmtleShpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVJdGVtKGtleTpzdHJpbmcpOnZvaWQge1xuICAgICAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEl0ZW0oa2V5OnN0cmluZywgZGF0YTpzdHJpbmcpOnZvaWQge1xuICAgICAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBDb29raWVTdG9yYWdlIGltcGxlbWVudHMgSVN0b3JhZ2VQcm92aWRlciB7XG4gICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5cygpLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRTaXplKGtleTphbnkpOnN0cmluZyB7XG4gICAgICAgICAgICBrZXkgPSBrZXkgfHwgZmFsc2U7XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgod2luZG93LnNlc3Npb25TdG9yYWdlW3hdLmxlbmd0aCAqIDIpIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwgKz0gKHdpbmRvdy5zZXNzaW9uU3RvcmFnZVt4XS5sZW5ndGggKiAyKSAvIDEwMjQgLyAxMDI0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWwudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvb2tpZVJlZ2lzdHJ5OmFueVtdID0gW107XG5cbiAgICAgICAgcHJvdGVjdGVkIGxpc3RlbkNvb2tpZUNoYW5nZShjb29raWVOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0l0ZW0oY29va2llTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0SXRlbShjb29raWVOYW1lKSAhPSB0aGlzLmNvb2tpZVJlZ2lzdHJ5W2Nvb2tpZU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcmVnaXN0cnkgc28gd2UgZG9udCBnZXQgdHJpZ2dlcmVkIGFnYWluXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvb2tpZVJlZ2lzdHJ5W2Nvb2tpZU5hbWVdID0gdGhpcy5nZXRJdGVtKGNvb2tpZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvb2tpZVJlZ2lzdHJ5W2Nvb2tpZU5hbWVdID0gdGhpcy5nZXRJdGVtKGNvb2tpZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIG9uU3RvcmVFdmVudChjYWxsYmFjazpGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5rZXlzKCkuZm9yRWFjaCgobmFtZTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbkNvb2tpZUNoYW5nZShuYW1lLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXIoKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMua2V5cygpLmZvckVhY2goKG5hbWU6c3RyaW5nKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAga2V5KGluZGV4Om51bWJlcik6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtleXMoKVtpbmRleF07XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBnZXRJdGVtKHNLZXkpIHtcbiAgICAgICAgICAgIGlmICghc0tleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKD86KD86XnwuKjspXFxcXHMqXCIgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgXCJcXFxcJCZcIikgKyBcIlxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJFwiKSwgXCIkMVwiKSkgfHwgbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRJdGVtKHNLZXk6YW55LCBzVmFsdWU6YW55LCB2RW5kPzphbnksIHNQYXRoPzphbnksIHNEb21haW4/OmFueSwgYlNlY3VyZT86YW55KTp2b2lkIHtcbiAgICAgICAgICAgIGlmICghc0tleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChzS2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzRXhwaXJlcyA9IFwiXCI7XG4gICAgICAgICAgICBpZiAodkVuZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodkVuZC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gdkVuZCA9PT0gSW5maW5pdHkgPyBcIjsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVFwiIDogXCI7IG1heC1hZ2U9XCIgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIHZFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBEYXRlOlxuICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIHZFbmQudG9VVENTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChzS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNWYWx1ZSkgKyBzRXhwaXJlcyArIChzRG9tYWluID8gXCI7IGRvbWFpbj1cIiArIHNEb21haW4gOiBcIlwiKSArIChzUGF0aCA/IFwiOyBwYXRoPVwiICsgc1BhdGggOiBcIlwiKSArIChiU2VjdXJlID8gXCI7IHNlY3VyZVwiIDogXCJcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyByZW1vdmVJdGVtKGtleTpzdHJpbmcsIHNQYXRoPzphbnksIHNEb21haW4/OmFueSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0l0ZW0oa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCIgKyAoc0RvbWFpbiA/IFwiOyBkb21haW49XCIgKyBzRG9tYWluIDogXCJcIikgKyAoc1BhdGggPyBcIjsgcGF0aD1cIiArIHNQYXRoIDogXCJcIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNJdGVtKHNLZXkpIHtcbiAgICAgICAgICAgIGlmICghc0tleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAobmV3IFJlZ0V4cChcIig/Ol58O1xcXFxzKilcIiArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArIFwiXFxcXHMqXFxcXD1cIikpLnRlc3QoZG9jdW1lbnQuY29va2llKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBrZXlzKCkge1xuICAgICAgICAgICAgdmFyIGFLZXlzID0gZG9jdW1lbnQuY29va2llLnJlcGxhY2UoLygoPzpefFxccyo7KVteXFw9XSspKD89O3wkKXxeXFxzKnxcXHMqKD86XFw9W147XSopPyg/OlxcMXwkKS9nLCBcIlwiKS5zcGxpdCgvXFxzKig/OlxcPVteO10qKT87XFxzKi8pO1xuICAgICAgICAgICAgZm9yICh2YXIgbkxlbiA9IGFLZXlzLmxlbmd0aCwgbklkeCA9IDA7IG5JZHggPCBuTGVuOyBuSWR4KyspIHtcbiAgICAgICAgICAgICAgICBhS2V5c1tuSWR4XSA9IGRlY29kZVVSSUNvbXBvbmVudChhS2V5c1tuSWR4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYUtleXM7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChkZWZpbmVkKHdpbmRvdykpIHtcblxuICAgICAgICBpZiAoIWRlZmluZWQod2luZG93LmxvY2FsU3RvcmFnZSkpIHtcbiAgICAgICAgICAgIGNyZWF0ZUJhZygnbG9jYWwnLCA8SVN0b3JhZ2VQcm92aWRlcj4gbmV3IExvY2FsU3RvcmFnZSgpKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkZWZpbmVkKHdpbmRvdy5zZXNzaW9uU3RvcmFnZSkpIHtcbiAgICAgICAgICAgIGNyZWF0ZUJhZygnc2Vzc2lvbicsIDxJU3RvcmFnZVByb3ZpZGVyPiBuZXcgU2Vzc2lvblN0b3JhZ2UoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGVmaW5lZCh3aW5kb3cuZG9jdW1lbnQuY29va2llKSkge1xuICAgICAgICAgICAgY3JlYXRlQmFnKCdjb29raWUnLCA8SVN0b3JhZ2VQcm92aWRlcj4gbmV3IENvb2tpZVN0b3JhZ2UoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG4gICAgdmFyIGV4cHI6YW55ID0ge307XG5cbi8vIE5vdGU6IHRoaXMgaXMgdGhlIHNlbXZlci5vcmcgdmVyc2lvbiBvZiB0aGUgc3BlYyB0aGF0IGl0IGltcGxlbWVudHNcbi8vIE5vdCBuZWNlc3NhcmlseSB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIHRoaXMgY29kZS5cbiAgICBleHByLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnO1xuXG4gICAgdmFyIE1BWF9MRU5HVEggICAgICAgPSAyNTY7XG4gICAgdmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1ZBTFVFIHx8IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG4gICAgdmFyIHJlID0gZXhwci5yZSA9IFtdO1xuICAgIHZhciBzcmMgPSBleHByLnNyYyA9IFtdO1xuICAgIHZhciBSID0gMDtcblxuLy8gVGhlIGZvbGxvd2luZyBSZWd1bGFyIEV4cHJlc3Npb25zIGNhbiBiZSB1c2VkIGZvciB0b2tlbml6aW5nLFxuLy8gdmFsaWRhdGluZywgYW5kIHBhcnNpbmcgU2VtVmVyIHZlcnNpb24gc3RyaW5ncy5cblxuLy8gIyMgTnVtZXJpYyBJZGVudGlmaWVyXG4vLyBBIHNpbmdsZSBgMGAsIG9yIGEgbm9uLXplcm8gZGlnaXQgZm9sbG93ZWQgYnkgemVybyBvciBtb3JlIGRpZ2l0cy5cblxuICAgIHZhciBOVU1FUklDSURFTlRJRklFUiAgICAgICA9IFIrKztcbiAgICBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICAgICAgPSAnMHxbMS05XVxcXFxkKic7XG4gICAgdmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgID0gUisrO1xuICAgIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSA9ICdbMC05XSsnO1xuXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbiAgICB2YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgID0gUisrO1xuICAgIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gPSAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKic7XG5cblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbiAgICB2YXIgTUFJTlZFUlNJT04gID0gUisrO1xuICAgIHNyY1tNQUlOVkVSU0lPTl0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG4gICAgdmFyIE1BSU5WRVJTSU9OTE9PU0UgID0gUisrO1xuICAgIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKSc7XG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxuICAgIHZhciBQUkVSRUxFQVNFSURFTlRJRklFUiAgPSBSKys7XG4gICAgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArXG4gICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbiAgICB2YXIgUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRSAgPSBSKys7XG4gICAgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxuICAgIHZhciBQUkVSRUxFQVNFICA9IFIrKztcbiAgICBzcmNbUFJFUkVMRUFTRV0gPSAnKD86LSgnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArXG4gICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICsgJykqKSknO1xuXG4gICAgdmFyIFBSRVJFTEVBU0VMT09TRSAgPSBSKys7XG4gICAgc3JjW1BSRVJFTEVBU0VMT09TRV0gPSAnKD86LT8oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gKyAnKSopKSc7XG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbiAgICB2YXIgQlVJTERJREVOVElGSUVSICA9IFIrKztcbiAgICBzcmNbQlVJTERJREVOVElGSUVSXSA9ICdbMC05QS1aYS16LV0rJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbiAgICB2YXIgQlVJTEQgID0gUisrO1xuICAgIHNyY1tCVUlMRF0gPSAnKD86XFxcXCsoJyArIHNyY1tCVUlMRElERU5USUZJRVJdICtcbiAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tCVUlMRElERU5USUZJRVJdICsgJykqKSknO1xuXG5cbi8vICMjIEZ1bGwgVmVyc2lvbiBTdHJpbmdcbi8vIEEgbWFpbiB2ZXJzaW9uLCBmb2xsb3dlZCBvcHRpb25hbGx5IGJ5IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiBhbmRcbi8vIGJ1aWxkIG1ldGFkYXRhLlxuXG4vLyBOb3RlIHRoYXQgdGhlIG9ubHkgbWFqb3IsIG1pbm9yLCBwYXRjaCwgYW5kIHByZS1yZWxlYXNlIHNlY3Rpb25zIG9mXG4vLyB0aGUgdmVyc2lvbiBzdHJpbmcgYXJlIGNhcHR1cmluZyBncm91cHMuICBUaGUgYnVpbGQgbWV0YWRhdGEgaXMgbm90IGFcbi8vIGNhcHR1cmluZyBncm91cCwgYmVjYXVzZSBpdCBzaG91bGQgbm90IGV2ZXIgYmUgdXNlZCBpbiB2ZXJzaW9uXG4vLyBjb21wYXJpc29uLlxuXG4gICAgdmFyIEZVTEwgICAgICA9IFIrKztcbiAgICB2YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICBzcmNbUFJFUkVMRUFTRV0gKyAnPycgK1xuICAgICAgICBzcmNbQlVJTERdICsgJz8nO1xuXG4gICAgc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnO1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG4gICAgdmFyIExPT1NFUExBSU4gPSAnW3Y9XFxcXHNdKicgKyBzcmNbTUFJTlZFUlNJT05MT09TRV0gK1xuICAgICAgICBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICc/JyArXG4gICAgICAgIHNyY1tCVUlMRF0gKyAnPyc7XG5cbiAgICB2YXIgTE9PU0UgID0gUisrO1xuICAgIHNyY1tMT09TRV0gPSAnXicgKyBMT09TRVBMQUlOICsgJyQnO1xuXG4gICAgdmFyIEdUTFQgID0gUisrO1xuICAgIHNyY1tHVExUXSA9ICcoKD86PHw+KT89PyknO1xuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG4gICAgdmFyIFhSQU5HRUlERU5USUZJRVJMT09TRSAgPSBSKys7XG4gICAgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnfHh8WHxcXFxcKic7XG4gICAgdmFyIFhSQU5HRUlERU5USUZJRVIgICAgICAgPSBSKys7XG4gICAgc3JjW1hSQU5HRUlERU5USUZJRVJdICAgICAgPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJ3x4fFh8XFxcXConO1xuXG4gICAgdmFyIFhSQU5HRVBMQUlOICA9IFIrKztcbiAgICBzcmNbWFJBTkdFUExBSU5dID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFXSArICcpPycgK1xuICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgJyk/KT8nO1xuXG4gICAgdmFyIFhSQU5HRVBMQUlOTE9PU0UgID0gUisrO1xuICAgIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICcpPycgK1xuICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgJyk/KT8nO1xuXG4gICAgdmFyIFhSQU5HRSAgICAgICA9IFIrKztcbiAgICBzcmNbWFJBTkdFXSAgICAgID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xuICAgIHZhciBYUkFOR0VMT09TRSAgPSBSKys7XG4gICAgc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxuICAgIHZhciBMT05FVElMREUgID0gUisrO1xuICAgIHNyY1tMT05FVElMREVdID0gJyg/On4+PyknO1xuXG4gICAgdmFyIFRJTERFVFJJTSAgICAgICAgPSBSKys7XG4gICAgc3JjW1RJTERFVFJJTV0gICAgICAgPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJztcbiAgICByZVtUSUxERVRSSU1dICAgICAgICA9IG5ldyBSZWdFeHAoc3JjW1RJTERFVFJJTV0sICdnJyk7XG4gICAgdmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+JztcblxuICAgIHZhciBUSUxERSAgICAgICA9IFIrKztcbiAgICBzcmNbVElMREVdICAgICAgPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG4gICAgdmFyIFRJTERFTE9PU0UgID0gUisrO1xuICAgIHNyY1tUSUxERUxPT1NFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxuICAgIHZhciBMT05FQ0FSRVQgID0gUisrO1xuICAgIHNyY1tMT05FQ0FSRVRdID0gJyg/OlxcXFxeKSc7XG5cbiAgICB2YXIgQ0FSRVRUUklNICAgICAgICA9IFIrKztcbiAgICBzcmNbQ0FSRVRUUklNXSAgICAgICA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORUNBUkVUXSArICdcXFxccysnO1xuICAgIHJlW0NBUkVUVFJJTV0gICAgICAgID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKTtcbiAgICB2YXIgY2FyZXRUcmltUmVwbGFjZSA9ICckMV4nO1xuXG4gICAgdmFyIENBUkVUICAgICAgID0gUisrO1xuICAgIHNyY1tDQVJFVF0gICAgICA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbiAgICB2YXIgQ0FSRVRMT09TRSAgPSBSKys7XG4gICAgc3JjW0NBUkVUTE9PU0VdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG4gICAgdmFyIENPTVBBUkFUT1JMT09TRSAgPSBSKys7XG4gICAgc3JjW0NPTVBBUkFUT1JMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJykkfF4kJztcbiAgICB2YXIgQ09NUEFSQVRPUiAgICAgICA9IFIrKztcbiAgICBzcmNbQ09NUEFSQVRPUl0gICAgICA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCc7XG5cblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbiAgICB2YXIgQ09NUEFSQVRPUlRSSU0gID0gUisrO1xuICAgIHNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICd8JyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKSc7XG5cbi8vIHRoaXMgb25lIGhhcyB0byB1c2UgdGhlIC9nIGZsYWdcbiAgICByZVtDT01QQVJBVE9SVFJJTV0gICAgICAgID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpO1xuICAgIHZhciBjb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJztcblxuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxuICAgIHZhciBIWVBIRU5SQU5HRSAgPSBSKys7XG4gICAgc3JjW0hZUEhFTlJBTkdFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICdcXFxccyokJztcblxuICAgIHZhciBIWVBIRU5SQU5HRUxPT1NFICA9IFIrKztcbiAgICBzcmNbSFlQSEVOUkFOR0VMT09TRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgJ1xcXFxzKiQnO1xuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG4gICAgdmFyIFNUQVIgID0gUisrO1xuICAgIHNyY1tTVEFSXSA9ICcoPHw+KT89P1xcXFxzKlxcXFwqJztcblxuLy8gQ29tcGlsZSB0byBhY3R1YWwgcmVnZXhwIG9iamVjdHMuXG4vLyBBbGwgYXJlIGZsYWctZnJlZSwgdW5sZXNzIHRoZXkgd2VyZSBjcmVhdGVkIGFib3ZlIHdpdGggYSBmbGFnLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUjsgaSsrKSB7XG4gICAgICAgIGlmICghcmVbaV0pXG4gICAgICAgICAgICByZVtpXSA9IG5ldyBSZWdFeHAoc3JjW2ldKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZSh2ZXJzaW9uPzphbnksIGxvb3NlPzphbnkpIHtcbiAgICAgICAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpXG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcblxuICAgICAgICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciByID0gbG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXTtcbiAgICAgICAgaWYgKCFyLnRlc3QodmVyc2lvbikpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICAgICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZCh2ZXJzaW9uLCBsb29zZSkge1xuICAgICAgICB2YXIgdjphbnkgPSBwYXJzZSh2ZXJzaW9uLCBsb29zZSk7XG4gICAgICAgIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbih2ZXJzaW9uLCBsb29zZSkge1xuICAgICAgICB2YXIgczphbnkgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIGxvb3NlKTtcbiAgICAgICAgcmV0dXJuIHMgPyBzLnZlcnNpb24gOiBudWxsO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTZW1WZXIge1xuICAgICAgICBwcm90ZWN0ZWQgbG9vc2U6YW55O1xuICAgICAgICBwcm90ZWN0ZWQgcmF3OmFueTtcbiAgICAgICAgcHVibGljIG1ham9yOmFueTtcbiAgICAgICAgcHVibGljIG1pbm9yOmFueTtcbiAgICAgICAgcHVibGljIHBhdGNoOmFueTtcbiAgICAgICAgcHJvdGVjdGVkIHByZXJlbGVhc2U6YW55O1xuICAgICAgICBwcm90ZWN0ZWQgYnVpbGQ6YW55O1xuICAgICAgICBwcm90ZWN0ZWQgdmVyc2lvbjphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IodmVyc2lvbjphbnksIGxvb3NlPzphbnkpIHtcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZlcnNpb24ubG9vc2UgPT09IGxvb3NlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb247XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuXG4gICAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG5cblxuICAgICAgICAgICAgdGhpcy5sb29zZSA9IGxvb3NlO1xuICAgICAgICAgICAgdmFyIG0gICAgICA9IHZlcnNpb24udHJpbSgpLm1hdGNoKGxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF0pO1xuXG4gICAgICAgICAgICBpZiAoIW0pXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG5cbiAgICAgICAgICAgIHRoaXMucmF3ID0gdmVyc2lvbjtcblxuICAgICAgICAgICAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgICAgICAgICAgIHRoaXMubWFqb3IgPSArbVsxXTtcbiAgICAgICAgICAgIHRoaXMubWlub3IgPSArbVsyXTtcbiAgICAgICAgICAgIHRoaXMucGF0Y2ggPSArbVszXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWFqb3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWFqb3IgPCAwKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wYXRjaCA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5wYXRjaCA8IDApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcblxuICAgICAgICAgICAgLy8gbnVtYmVyaWZ5IGFueSBwcmVyZWxlYXNlIG51bWVyaWMgaWRzXG4gICAgICAgICAgICBpZiAoIW1bNF0pXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcChmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW0gPSAraWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudW1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW107XG4gICAgICAgICAgICB0aGlzLmZvcm1hdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZvcm1hdCgpOmFueSB7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2g7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb24gKz0gJy0nICsgdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5zcGVjdCgpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gJzxTZW1WZXIgXCInICsgdGhpcyArICdcIj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29tcGFyZShvdGhlcjphbnkpOmFueSB7XG5cbiAgICAgICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICAgICAgICAgICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb21wYXJlTWFpbihvdGhlcjphbnkpOmFueSB7XG4gICAgICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgICAgICAgICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgICAgICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICAgICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb21wYXJlUHJlKG90aGVyOmFueSk6YW55IHtcbiAgICAgICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICAgICAgICAgICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gICAgICAgICAgICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcblxuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHZhciBhID0gdGhpcy5wcmVyZWxlYXNlW2ldO1xuICAgICAgICAgICAgICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKTtcbiAgICAgICAgICAgIH0gd2hpbGUgKCsraSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5jKHJlbGVhc2U6YW55LCBpZGVudGlmaWVyOmFueSk6YW55IHtcbiAgICAgICAgICAgIHN3aXRjaCAocmVsZWFzZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0Y2ggICAgICAgICAgICAgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbm9yICAgICAgICAgICAgID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZW1pbm9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0Y2ggICAgICAgICAgICAgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbm9yKys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJlcGF0Y2gnOlxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgYSBwcmVyZWxlYXNlLCBpdCB3aWxsIGJ1bXAgdG8gdGhlIG5leHQgdmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAvLyBkcm9wIGFueSBwcmVyZWxlYXNlcyB0aGF0IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgICAgICAgICAgICAgICAvLyByZWxldmFudCBhdCB0aGlzIHBvaW50LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgbm9uLXByZXJlbGVhc2UgdmVyc2lvbiwgdGhpcyBhY3RzIHRoZSBzYW1lIGFzXG4gICAgICAgICAgICAgICAgLy8gcHJlcGF0Y2guXG4gICAgICAgICAgICAgICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtYWpvcic6XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWFqb3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtYWpvciB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1ham9yLlxuICAgICAgICAgICAgICAgICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAgICAgICAgICAgICAgIC8vIDEuMS4wIGJ1bXBzIHRvIDIuMC4wXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbm9yICE9PSAwIHx8IHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFqb3IrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5vciAgICAgID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRjaCAgICAgID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbm9yJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAgICAgICAgICAgICAgIC8vIDEuMi4wLTUgYnVtcHMgdG8gMS4yLjBcbiAgICAgICAgICAgICAgICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWlub3IrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRjaCAgICAgID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgICAgICAgICAgICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRjaCsrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAgICAgICAgICAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgICAgICAgICAgICAgY2FzZSAncHJlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF07XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByZXJlbGVhc2VbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gLTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IC0xKSAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxLjIuMC1iZXRhLmZvb2JseiBvciAxLjIuMC1iZXRhIGJ1bXBzIHRvIDEuMi4wLWJldGEuMFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZVswXSA9PT0gaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5jcmVtZW50IGFyZ3VtZW50OiAnICsgcmVsZWFzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZvcm1hdCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluYyh2ZXJzaW9uLCByZWxlYXNlLCBsb29zZSwgaWRlbnRpZmllcikge1xuICAgICAgICBpZiAodHlwZW9mKGxvb3NlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSBsb29zZTtcbiAgICAgICAgICAgIGxvb3NlICAgICAgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uO1xuICAgICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWZmKHZlcnNpb24xOmFueSwgdmVyc2lvbjI6YW55KSB7XG4gICAgICAgIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB2MTphbnkgPSBwYXJzZSh2ZXJzaW9uMSk7XG4gICAgICAgICAgICB2YXIgdjI6YW55ID0gcGFyc2UodmVyc2lvbjIpO1xuICAgICAgICAgICAgaWYgKHYxLnByZXJlbGVhc2UubGVuZ3RoIHx8IHYyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZScgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwcmVyZWxlYXNlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBudW1lcmljID0gL15bMC05XSskLztcblxuICAgIGZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gICAgICAgIHZhciBhbnVtID0gbnVtZXJpYy50ZXN0KGEpO1xuICAgICAgICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKTtcblxuICAgICAgICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgICAgICAgICBhID0gK2E7XG4gICAgICAgICAgICBiID0gK2I7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGFudW0gJiYgIWJudW0pID8gLTEgOlxuICAgICAgICAgICAgICAgKGJudW0gJiYgIWFudW0pID8gMSA6XG4gICAgICAgICAgICAgICBhIDwgYiA/IC0xIDpcbiAgICAgICAgICAgICAgIGEgPiBiID8gMSA6XG4gICAgICAgICAgICAgICAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJjb21wYXJlSWRlbnRpZmllcnMoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGIsIGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ham9yKGEsIGxvb3NlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtaW5vcihhLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF0Y2goYSwgbG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUoYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGFyZUxvb3NlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmUoYiwgYSwgbG9vc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvcnQobGlzdCwgbG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHIuY29tcGFyZShhLCBiLCBsb29zZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJzb3J0KGxpc3QsIGxvb3NlKSB7XG4gICAgICAgIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBleHByLnJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ3QoYSwgYiwgbG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsdChhLCBiLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVxKGE6YW55LCBiOmFueSwgbG9vc2U/OmFueSkge1xuICAgICAgICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmVxKGEsIGIsIGxvb3NlKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBndGUoYSwgYiwgbG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbHRlKGEsIGIsIGxvb3NlKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNtcChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgc3dpdGNoIChvcCkge1xuICAgICAgICAgICAgY2FzZSAnPT09JzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICAgICAgICAgICAgcmV0ID0gYSA9PT0gYjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJyE9PSc6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSBiID0gYi52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIHJldCA9IGEgIT09IGI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgY2FzZSAnPSc6XG4gICAgICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICAgICAgcmV0ID0gZXEoYSwgYiwgbG9vc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnIT0nOlxuICAgICAgICAgICAgICAgIHJldCA9IG5lcShhLCBiLCBsb29zZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgICAgICByZXQgPSBndChhLCBiLCBsb29zZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICAgICAgcmV0ID0gZ3RlKGEsIGIsIGxvb3NlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgICAgIHJldCA9IGx0KGEsIGIsIGxvb3NlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAgICAgICByZXQgPSBsdGUoYSwgYiwgbG9vc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9wZXJhdG9yOiAnICsgb3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIENvbXBhcmF0b3Ige1xuICAgICAgICBwdWJsaWMgbG9vc2U6YW55O1xuICAgICAgICBwdWJsaWMgc2VtdmVyOmFueTtcbiAgICAgICAgcHVibGljIHZhbHVlOmFueTtcbiAgICAgICAgcHVibGljIG9wZXJhdG9yOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihjb21wPzphbnksIGxvb3NlPzphbnkpIHtcbiAgICAgICAgICAgIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChjb21wLmxvb3NlID09PSBsb29zZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXA7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjb21wID0gY29tcC52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG5cblxuICAgICAgICAgICAgdGhpcy5sb29zZSA9IGxvb3NlO1xuICAgICAgICAgICAgdGhpcy5wYXJzZShjb21wKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wZXJhdG9yICsgdGhpcy5zZW12ZXIudmVyc2lvbjtcblxuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcGFyc2UoY29tcCkge1xuICAgICAgICAgICAgdmFyIHIgPSB0aGlzLmxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICAgICAgICAgICAgdmFyIG0gPSBjb21wLm1hdGNoKHIpO1xuXG4gICAgICAgICAgICBpZiAoIW0pXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjb21wYXJhdG9yOiAnICsgY29tcCk7XG5cbiAgICAgICAgICAgIHRoaXMub3BlcmF0b3IgPSBtWzFdO1xuICAgICAgICAgICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9JylcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG5cbiAgICAgICAgICAgIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICAgICAgICAgICAgaWYgKCFtWzJdKVxuICAgICAgICAgICAgICAgIHRoaXMuc2VtdmVyID0gQU5ZO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLmxvb3NlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbnNwZWN0KCkge1xuICAgICAgICAgICAgcmV0dXJuICc8U2VtVmVyIENvbXBhcmF0b3IgXCInICsgdGhpcyArICdcIj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRlc3QodmVyc2lvbik6YW55IHtcblxuXG4gICAgICAgICAgICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5sb29zZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgQU5ZID0ge307XG5cbiAgICBleHBvcnQgY2xhc3MgVmVyc2lvblJhbmdlIHtcbiAgICAgICAgcHVibGljIGxvb3NlOmFueTtcbiAgICAgICAgcHVibGljIHJhdzphbnk7XG4gICAgICAgIHB1YmxpYyBzZXQ6YW55O1xuICAgICAgICBwdWJsaWMgcmFuZ2U6YW55O1xuXG5cbiAgICAgICAgY29uc3RydWN0b3IocmFuZ2UsIGxvb3NlKSB7XG4gICAgICAgICAgICBpZiAoKHJhbmdlIGluc3RhbmNlb2YgVmVyc2lvblJhbmdlKSAmJiByYW5nZS5sb29zZSA9PT0gbG9vc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuXG4gICAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVmVyc2lvblJhbmdlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlcnNpb25SYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmxvb3NlID0gbG9vc2U7XG5cbiAgICAgICAgICAgIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gICAgICAgICAgICB0aGlzLnJhdyA9IHJhbmdlO1xuICAgICAgICAgICAgdGhpcy5zZXQgPSByYW5nZS5zcGxpdCgvXFxzKlxcfFxcfFxccyovKS5tYXAoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpO1xuICAgICAgICAgICAgfSwgdGhpcykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgcmVsZXZhbnQgZm9yIHdoYXRldmVyIHJlYXNvblxuICAgICAgICAgICAgICAgIHJldHVybiBjLmxlbmd0aDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCgpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgaW5zcGVjdCgpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gJzxTZW1WZXIgUmFuZ2UgXCInICsgdGhpcy5yYW5nZSArICdcIj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZvcm1hdCgpOmFueSB7XG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gdGhpcy5zZXQubWFwKGZ1bmN0aW9uIChjb21wcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wcy5qb2luKCcgJykudHJpbSgpO1xuICAgICAgICAgICAgfSkuam9pbignfHwnKS50cmltKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwYXJzZVJhbmdlKHJhbmdlOmFueSk6YW55IHtcbiAgICAgICAgICAgIHZhciBsb29zZSA9IHRoaXMubG9vc2U7XG4gICAgICAgICAgICByYW5nZSAgICAgPSByYW5nZS50cmltKCk7XG5cbiAgICAgICAgICAgIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICAgICAgICAgICAgdmFyIGhyID0gbG9vc2UgPyByZVtIWVBIRU5SQU5HRUxPT1NFXSA6IHJlW0hZUEhFTlJBTkdFXTtcbiAgICAgICAgICAgIHJhbmdlICA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UpO1xuXG4gICAgICAgICAgICAvLyBgPiAxLjIuMyA8IDEuMi41YCA9PiBgPjEuMi4zIDwxLjIuNWBcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSk7XG5cblxuICAgICAgICAgICAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gICAgICAgICAgICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSk7XG5cbiAgICAgICAgICAgIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpO1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgc3BhY2VzXG4gICAgICAgICAgICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpO1xuXG4gICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAgICAgICAgICAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICAgICAgICAgICAgdmFyIGNvbXBSZSA9IGxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICAgICAgICAgICAgdmFyIHNldCAgICA9IHJhbmdlLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gICAgICAgICAgICB9KS5qb2luKCcgJykuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3NlKSB7XG4gICAgICAgICAgICAgICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICAgICAgICAgICAgICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWNvbXAubWF0Y2goY29tcFJlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldCA9IHNldC5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdGVzdCh2ZXJzaW9uOmFueSk6YW55IHtcbiAgICAgICAgICAgIGlmICghdmVyc2lvbilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbikpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbiAgICBmdW5jdGlvbiB0b0NvbXBhcmF0b3JzKHJhbmdlLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlcnNpb25SYW5nZShyYW5nZSwgbG9vc2UpLnNldC5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjLnZhbHVlO1xuICAgICAgICAgICAgfSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbiAgICBmdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcblxuXG4gICAgICAgIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKTtcblxuICAgICAgICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSk7XG5cbiAgICAgICAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIGxvb3NlKTtcblxuICAgICAgICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIGxvb3NlKTtcblxuICAgICAgICByZXR1cm4gY29tcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1goaWQpIHtcbiAgICAgICAgcmV0dXJuICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJztcbiAgICB9XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG4gICAgZnVuY3Rpb24gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgbG9vc2UpO1xuICAgICAgICB9KS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKSB7XG4gICAgICAgIHZhciByID0gbG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXTtcbiAgICAgICAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbiAoXywgTSwgbSwgcCwgcHIpIHtcblxuICAgICAgICAgICAgdmFyIHJldDtcblxuICAgICAgICAgICAgaWYgKGlzWChNKSlcbiAgICAgICAgICAgICAgICByZXQgPSAnJztcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgICAgICAgICBlbHNlIGlmIChpc1gocCkpXG4gICAgICAgICAgICAvLyB+MS4yID09ID49MS4yLjAtIDwxLjMuMC1cbiAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgICAgICAgZWxzZSBpZiAocHIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgICAgICAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wXG4gICAgICAgICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuXG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wXG4gICAgZnVuY3Rpb24gcmVwbGFjZUNhcmV0cyhjb21wLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlQ2FyZXQoY29tcCwgbG9vc2UpO1xuICAgICAgICB9KS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKSB7XG5cbiAgICAgICAgdmFyIHIgPSBsb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdO1xuICAgICAgICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChfLCBNLCBtLCBwLCBwcikge1xuXG4gICAgICAgICAgICB2YXIgcmV0O1xuXG4gICAgICAgICAgICBpZiAoaXNYKE0pKVxuICAgICAgICAgICAgICAgIHJldCA9ICcnO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgICAgICAgICAgIGlmIChNID09PSAnMCcpXG4gICAgICAgICAgICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgICAgICAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgICAgICAgICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtID09PSAnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpIHtcblxuICAgICAgICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpO1xuICAgICAgICB9KS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSkge1xuICAgICAgICBjb21wICA9IGNvbXAudHJpbSgpO1xuICAgICAgICB2YXIgciA9IGxvb3NlID8gcmVbWFJBTkdFTE9PU0VdIDogcmVbWFJBTkdFXTtcbiAgICAgICAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbiAocmV0LCBndGx0LCBNLCBtLCBwLCBwcikge1xuXG4gICAgICAgICAgICB2YXIgeE0gICA9IGlzWChNKTtcbiAgICAgICAgICAgIHZhciB4bSAgID0geE0gfHwgaXNYKG0pO1xuICAgICAgICAgICAgdmFyIHhwICAgPSB4bSB8fCBpc1gocCk7XG4gICAgICAgICAgICB2YXIgYW55WCA9IHhwO1xuXG4gICAgICAgICAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpXG4gICAgICAgICAgICAgICAgZ3RsdCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoeE0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3RsdCA9PT0gJz4nIHx8IGd0bHQgPT09ICc8Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBub3RoaW5nIGlzIGFsbG93ZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gJzwwLjAuMCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gJyonO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgICAgICAgICAgIGlmICh4bSlcbiAgICAgICAgICAgICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHhwKVxuICAgICAgICAgICAgICAgICAgICBwID0gMDtcblxuICAgICAgICAgICAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAgICAgICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgICAgICAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgICAgICAgICAgICAgIGd0bHQgPSAnPj0nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE0gPSArTSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gK20gKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgICAgICAgICAgICAgIGd0bHQgPSAnPCdcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhtKVxuICAgICAgICAgICAgICAgICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0ID0gZ3RsdCArIE0gKyAnLicgKyBtICsgJy4nICsgcDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgICAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG4gICAgZnVuY3Rpb24gcmVwbGFjZVN0YXJzKGNvbXAsIGxvb3NlKSB7XG5cbiAgICAgICAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gICAgICAgIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJyk7XG4gICAgfVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBzdHJpbmcucmVwbGFjZShyZVtIWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMFxuICAgIGZ1bmN0aW9uIGh5cGhlblJlcGxhY2UoJDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8sIHRNLCB0bSwgdHAsIHRwciwgdGIpIHtcblxuICAgICAgICBpZiAoaXNYKGZNKSlcbiAgICAgICAgICAgIGZyb20gPSAnJztcbiAgICAgICAgZWxzZSBpZiAoaXNYKGZtKSlcbiAgICAgICAgICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLjAuMCc7XG4gICAgICAgIGVsc2UgaWYgKGlzWChmcCkpXG4gICAgICAgICAgICBmcm9tID0gJz49JyArIGZNICsgJy4nICsgZm0gKyAnLjAnO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcm9tID0gJz49JyArIGZyb207XG5cbiAgICAgICAgaWYgKGlzWCh0TSkpXG4gICAgICAgICAgICB0byA9ICcnO1xuICAgICAgICBlbHNlIGlmIChpc1godG0pKVxuICAgICAgICAgICAgdG8gPSAnPCcgKyAoK3RNICsgMSkgKyAnLjAuMCc7XG4gICAgICAgIGVsc2UgaWYgKGlzWCh0cCkpXG4gICAgICAgICAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJztcbiAgICAgICAgZWxzZSBpZiAodHByKVxuICAgICAgICAgICAgdG8gPSAnPD0nICsgdE0gKyAnLicgKyB0bSArICcuJyArIHRwICsgJy0nICsgdHByO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0byA9ICc8PScgKyB0bztcblxuICAgICAgICByZXR1cm4gKGZyb20gKyAnICcgKyB0bykudHJpbSgpO1xuICAgIH1cblxuXG4vLyBpZiBBTlkgb2YgdGhlIHNldHMgbWF0Y2ggQUxMIG9mIGl0cyBjb21wYXJhdG9ycywgdGhlbiBwYXNzXG5cblxuICAgIGZ1bmN0aW9uIHRlc3RTZXQoc2V0LCB2ZXJzaW9uKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2ZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgICAgICAgICAgLy8gVGhhdCBzaG91bGQgYWxsb3cgYDEuMi4zLXByLjJgIHRvIHBhc3MuXG4gICAgICAgICAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBBTlkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gc2V0W2ldLnNlbXZlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmFuZ2UgPSBuZXcgVmVyc2lvblJhbmdlKHJhbmdlLCBsb29zZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhbmdlLnRlc3QodmVyc2lvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF4U2F0aXNmeWluZyh2ZXJzaW9ucywgcmFuZ2UsIGxvb3NlKSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSk7XG4gICAgICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgICAgICAgICAgIH0pWzBdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZXJzaW9uUmFuZ2UocmFuZ2UsIGxvb3NlKS5yYW5nZSB8fCAnKic7XG4gICAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG4gICAgZnVuY3Rpb24gbHRyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBsb29zZSk7XG4gICAgfVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG4gICAgZnVuY3Rpb24gZ3RyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICAgICAgICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBsb29zZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgaGlsbywgbG9vc2UpIHtcbiAgICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICAgICAgICByYW5nZSAgID0gbmV3IFZlcnNpb25SYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gICAgICAgIHZhciBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXA7XG4gICAgICAgIHN3aXRjaCAoaGlsbykge1xuICAgICAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICAgICAgZ3RmbiAgPSBndDtcbiAgICAgICAgICAgICAgICBsdGVmbiA9IGx0ZTtcbiAgICAgICAgICAgICAgICBsdGZuICA9IGx0O1xuICAgICAgICAgICAgICAgIGNvbXAgID0gJz4nO1xuICAgICAgICAgICAgICAgIGVjb21wID0gJz49JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgICAgIGd0Zm4gID0gbHQ7XG4gICAgICAgICAgICAgICAgbHRlZm4gPSBndGU7XG4gICAgICAgICAgICAgICAgbHRmbiAgPSBndDtcbiAgICAgICAgICAgICAgICBjb21wICA9ICc8JztcbiAgICAgICAgICAgICAgICBlY29tcCA9ICc8PSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBpdCBzYXRpc2lmZXMgdGhlIHJhbmdlIGl0IGlzIG5vdCBvdXRzaWRlXG4gICAgICAgIGlmIChzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gICAgICAgIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldO1xuXG4gICAgICAgICAgICB2YXIgaGlnaDphbnkgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGxvdzphbnkgID0gbnVsbDtcblxuICAgICAgICAgICAgY29tcGFyYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJhdG9yLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmF0b3IgPSBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgbG93ICA9IGxvdyB8fCBjb21wYXJhdG9yO1xuICAgICAgICAgICAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvdyA9IGNvbXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgICAgICAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgICAgICAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgICAgICAgICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgICAgICAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICAgICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICB2YXIgbGF5b3V0U3R5bGU6YW55ID0ge307XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzczJrZXk6YW55ID0ge307XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0S2V5KGNsYXNzTmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzczJrZXlbY2xhc3NOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFByb3BTdHJpbmcocHJvcDphbnkpOnN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwcm9wKSA/IHByb3AubWFwKHRoaXMuZXNjYXBlKS5qb2luKCcuJykgOiBwcm9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkKGtleTpzdHJpbmcsIGNsYXNzTmFtZTpzdHJpbmcsIGRlZjpib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICAgICAgY2xhc3Mya2V5W2NsYXNzTmFtZV0gPSBrZXk7XG4gICAgICAgICAgICBvYmplY3RTZXQobGF5b3V0U3R5bGUsIGdldFByb3BTdHJpbmcoa2V5KSwgZGVmKTtcbiAgICAgICAgICAgIGRlZiA9PT0gdHJ1ZSAmJiAhZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgdmFyIHBhdGhPYnNlcnZlciA9IG5ldyBvYnNlcnZlanMuUGF0aE9ic2VydmVyKGxheW91dFN0eWxlLCBnZXRQcm9wU3RyaW5nKGtleSksIGRlZik7XG4gICAgICAgICAgICBwYXRoT2JzZXJ2ZXIub3BlbihmdW5jdGlvbiAobmV3VmFsdWU6YW55LCBvbGRWYWx1ZTphbnkpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXRoIG9icy5vcGVuJywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdDpET01Ub2tlbkxpc3QgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdDtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUgJiYgIWxpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgPT09IGZhbHNlICYmIGxpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbGF5b3V0U3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYm9keU9ic2VydmVyOk11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zOmFueSkgPT4ge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uOk11dGF0aW9uUmVjb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbXV0YXRpb24nLCBtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q6RE9NVG9rZW5MaXN0ID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3Q7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQ6c3RyaW5nW10gID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICB2YXIgb2xkOnN0cmluZ1tdICAgICAgPSBtdXRhdGlvbi5vbGRWYWx1ZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRlZDpib29sZWFuICAgICA9IGN1cnJlbnQubGVuZ3RoID4gb2xkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlczpzdHJpbmdbXSAgPSBfLmRpZmZlcmVuY2UoYWRkZWQgPyBjdXJyZW50IDogb2xkLCBhZGRlZCA/IG9sZCA6IGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lOnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlZmluZWQoZ2V0S2V5KGNsYXNzTmFtZSkpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFNldChsYXlvdXRTdHlsZSwgZ2V0UHJvcFN0cmluZyhnZXRLZXkoY2xhc3NOYW1lKSksIGFkZGVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5lZChBcHAudm0pKSBBcHAudm0uX2RpZ2VzdCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGJvZHlPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHthdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnY2xhc3MnXSwgYXR0cmlidXRlT2xkVmFsdWU6IHRydWV9KTtcblxuICAgICAgICBsYXlvdXRTdHlsZS5fYWRkID0gYWRkO1xuICAgICAgICBsYXlvdXRTdHlsZS5fYWRkKCdmb290ZXIuZml4ZWQnLCAncGFnZS1mb290ZXItZml4ZWQnKVxuICAgICAgICAgICAgLl9hZGQoJ2hlYWRlci5maXhlZCcsICdwYWdlLWhlYWRlci1maXhlZCcpXG4gICAgICAgICAgICAuX2FkZCgncGFnZS5lZGdlZCcsICdwYWdlLWVkZ2VkJylcbiAgICAgICAgICAgIC5fYWRkKCdwYWdlLmJveGVkJywgJ3BhZ2UtYm94ZWQnKTtcblxuXG4gICAgfSk7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBMYXlvdXQge1xuICAgICAgICBwdWJsaWMgc3R5bGU6YW55ID0gbGF5b3V0U3R5bGU7XG5cbiAgICAgICAgcHVibGljIGdldCBzZXR0aW5ncygpOmFueSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnBhcnNlKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHksICc6OmJlZm9yZScpLmdldFByb3BlcnR5VmFsdWUoJ2NvbnRlbnQnKSkpLnN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgICAgIHZhciByZXNpemU6bnVtYmVyO1xuICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocmVzaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzaXplID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFwcC5lbWl0KCdsYXlvdXQ6cmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0QnJlYWtwb2ludCh3aGljaDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnNldHRpbmdzLmJyZWFrcG9pbnRzW3doaWNoXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY2FsY3VsYXRlVmlld3BvcnRIZWlnaHQoKSB7XG4gICAgICAgICAgICB2YXIgc2lkZWJhckhlaWdodCA9IGdldFZpZXdQb3J0KCkuaGVpZ2h0IC0gQXBwLiRlKCdoZWFkZXInKS5vdXRlckhlaWdodCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGUuZm9vdGVyLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhckhlaWdodCA9IHNpZGViYXJIZWlnaHQgLSBBcHAuJGUoJ2Zvb3RlcicpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzaWRlYmFySGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuaW1hdGVkIHNjcm9sbCB0byB0aGUgZ2l2ZW4gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0gZWxlXG4gICAgICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzY3JvbGxUbyhlbGU/OmFueSwgb2Zmc2V0PzpudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciAkZWw6SlF1ZXJ5ID0gdHlwZW9mKGVsZSkgPT09ICdzdHJpbmcnID8gJChlbGUpIDogZWxlO1xuICAgICAgICAgICAgdmFyIHBvcyAgICAgICAgPSAoJGVsICYmICRlbC5zaXplKCkgPiAwKSA/ICRlbC5vZmZzZXQoKS50b3AgOiAwO1xuXG4gICAgICAgICAgICBpZiAoJGVsKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXBwLiRlKCdib2R5JykuaGFzQ2xhc3MoJ3BhZ2UtaGVhZGVyLWZpeGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gcG9zIC0gQXBwLiRlKCdoZWFkZXInKS5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zID0gcG9zICsgKG9mZnNldCA/IG9mZnNldCA6IC0xICogJGVsLmhlaWdodCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBwb3NcbiAgICAgICAgICAgIH0sICdzbG93Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2Nyb2xsVG9wKCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUbygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG5cbiAgICBleHBvcnQgY2xhc3MgQmFzZUNvbXBvbmVudCB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ09NUE9ORU5UOmJvb2xlYW4gPSB0cnVlO1xuICAgICAgICAvLyBwdWJsaWMgcHJvcGVydGllczogaHR0cDovL3Z1ZWpzLm9yZy9hcGkvaW5zdGFuY2UtcHJvcGVydGllcy5odG1sXG4gICAgICAgICQ6YW55O1xuICAgICAgICAkJDphbnk7XG4gICAgICAgICRkYXRhOmFueTtcbiAgICAgICAgJGNoaWxkcmVuOkFycmF5PHZ1ZWpzLlZ1ZT47XG4gICAgICAgICRlbDpIVE1MRWxlbWVudDtcbiAgICAgICAgJGVsczp7W25hbWU6c3RyaW5nXTpIVE1MRWxlbWVudH07XG4gICAgICAgICRvcHRpb25zOmFueTtcbiAgICAgICAgJHBhcmVudDp2dWVqcy5WdWV8QmFzZUNvbXBvbmVudDtcbiAgICAgICAgJHJvb3Q6dnVlanMuVnVlO1xuICAgICAgICAvLyRodHRwOnZ1ZWpzLlZ1ZVJlc291cmNlSHR0cDtcblxuICAgICAgICAvLyBtZXRob2RzOiBodHRwOi8vdnVlanMub3JnL2FwaS9pbnN0YW5jZS1tZXRob2RzLmh0bWxcbiAgICAgICAgJGFkZChrZXk6c3RyaW5nLCB2YWw6YW55KTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgICRhZGRDaGlsZChvcHRpb25zPzphbnksIGNvbnN0cnVjdG9yPzooKT0+dm9pZCk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkYWZ0ZXIodGFyZ2V0OkhUTUxFbGVtZW50fHN0cmluZywgY2I6KCk9PnZvaWQpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJGFwcGVuZFRvKHRhcmdldDpIVE1MRWxlbWVudHxzdHJpbmcsIGNiPzooKT0+dm9pZCk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkYmVmb3JlKHRhcmdldDpIVE1MRWxlbWVudHxzdHJpbmcsIGNiPzooKT0+dm9pZCk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkYnJvYWRjYXN0KGV2ZW50OnN0cmluZywgLi4uYXJnczpBcnJheTxhbnk+KTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgICRjb21waWxlKGVsOkhUTUxFbGVtZW50KTpGdW5jdGlvbiB7XG4gICAgICAgICAgICByZXR1cm4gKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkZGVsZXRlKGtleTpzdHJpbmcpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJGRlc3Ryb3kocmVtb3ZlOmJvb2xlYW4pOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJGRpc3BhdGNoKGV2ZW50OnN0cmluZywgLi4uYXJnczpBcnJheTxhbnk+KTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbWl0KGV2ZW50OnN0cmluZywgLi4uYXJnczpBcnJheTxhbnk+KTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgICRldmFsKHRleHQ6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgICRnZXQoZXhwOnN0cmluZyk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkaW50ZXJwb2xhdGUodGV4dDpzdHJpbmcpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJGxvZyhwYXRoPzpzdHJpbmcpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJG1vdW50KGVsOkhUTUxFbGVtZW50fHN0cmluZyk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkbmV4dFRpY2soZm46KCk9PnZvaWQpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJG9mZihldmVudDpzdHJpbmcsIGZuOiguLi5hcmdzOkFycmF5PGFueT4pPT52b2lkfGJvb2xlYW4pOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uKGV2ZW50OnN0cmluZywgZm46KC4uLmFyZ3M6QXJyYXk8YW55Pik9PnZvaWR8Ym9vbGVhbik6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkb25jZShldmVudDpzdHJpbmcsIGZuOiguLi5hcmdzOkFycmF5PGFueT4pPT52b2lkfGJvb2xlYW4pOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJHJlbW92ZShjYj86KCk9PnZvaWQpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgJHNldChleHA6c3RyaW5nLCB2YWw6YW55KTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgICR3YXRjaChleHA6c3RyaW5nfCgoKT0+c3RyaW5nKSxcbiAgICAgICAgICAgICAgIGNiOih2YWw6YW55LCBvbGQ/OmFueSk9PmFueSxcbiAgICAgICAgICAgICAgIG9wdGlvbnM/OnsgZGVlcD86IGJvb2xlYW47IGltbWVkaWF0ZT86IGJvb2xlYW4gfSk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBfZGlnZXN0KCkge1xuICAgICAgICB9XG5cbiAgICB9XG5cbi8vIHJlZ2lzdGVyIGEgbGlmZWN5Y2wgaG9vaywgaHR0cDovL3Z1ZWpzLm9yZy9hcGkvb3B0aW9ucy5odG1sI0xpZmVjeWNsZVxuICAgIGV4cG9ydCBmdW5jdGlvbiBMaWZlY3ljbGVIb29rKGhvb2s6c3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAoY2xzOmFueSwgbmFtZTpzdHJpbmcsIGRlc2M6UHJvcGVydHlEZXNjcmlwdG9yKTpQcm9wZXJ0eURlc2NyaXB0b3IgPT4ge1xuICAgICAgICAgICAgaWYgKFtcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWQnLCAnYmVmb3JlQ29tcGlsZScsICdjb21waWxlZCcsICdyZWFkeScsICdhdHRhY2hlZCcsICdkZXRhY2hlZCcsICdiZWZvcmVEZXN0cm95JywgJ2Rlc3Ryb3llZCdcbiAgICAgICAgICAgICAgICBdLmluZGV4T2YoaG9vaykgPT0gLTEpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIExpZmVjeWxlIEhvb2s6ICcgKyBob29rKTtcbiAgICAgICAgICAgIGlmICghY2xzLmhhc093blByb3BlcnR5KCdfX2hvb2tzX18nKSlcbiAgICAgICAgICAgICAgICBjbHMuX19ob29rc19fID0ge307XG4gICAgICAgICAgICBjbHMuX19ob29rc19fW25hbWVdID0gY2xzW25hbWVdO1xuICAgICAgICAgICAgZGVzYy52YWx1ZSAgICAgICAgICA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiBkZXNjO1xuICAgICAgICB9XG4gICAgfVxuXG4vLyByZWdpc3RlciBhbiBldmVudCwgaHR0cDovL3Z1ZWpzLm9yZy9hcGkvb3B0aW9ucy5odG1sI2V2ZW50c1xuICAgIGV4cG9ydCBmdW5jdGlvbiBFdmVudEhvb2soaG9vazpzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIChjbHM6YW55LCBuYW1lOnN0cmluZywgZGVzYzpQcm9wZXJ0eURlc2NyaXB0b3IpOlByb3BlcnR5RGVzY3JpcHRvciA9PiB7XG4gICAgICAgICAgICBpZiAoIWNscy5oYXNPd25Qcm9wZXJ0eSgnX19ldmVudHNfXycpKVxuICAgICAgICAgICAgICAgIGNscy5fX2V2ZW50c19fID0ge307XG4gICAgICAgICAgICBjbHMuX19ldmVudHNfX1tuYW1lXSA9IGNsc1tuYW1lXTtcbiAgICAgICAgICAgIGRlc2MudmFsdWUgICAgICAgICAgID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICAgIH1cbiAgICB9XG5cbi8vIGV4cG9zZSB0aGUgcHJvcGVydHkgYXMgYXR0cmlidXRlXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFByb3Aob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNsczphbnksIG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAoIWNscy5oYXNPd25Qcm9wZXJ0eSgnX19wcm9wc19fJykpXG4gICAgICAgICAgICAgICAgY2xzLl9fcHJvcHNfXyA9IHt9O1xuICAgICAgICAgICAgY2xzLl9fcHJvcHNfX1tuYW1lXSA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY29tcG9uZW50T3B0aW9ucyhjbHM6YW55KSB7XG5cblxuICAgICAgICBsZXQgb3B0aW9uczphbnkgPSB7XG4gICAgICAgICAgICBkYXRhICAgIDogKCgpOmFueSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjbHMoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWV0aG9kcyA6IHt9LFxuICAgICAgICAgICAgY29tcHV0ZWQ6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHJlcGxhY2UgYW5kIHRlbXBsYXRlXG4gICAgICAgIGlmIChjbHMuaGFzT3duUHJvcGVydHkoJ3JlcGxhY2UnKSlcbiAgICAgICAgICAgIG9wdGlvbnMucmVwbGFjZSA9IGNscy5yZXBsYWNlO1xuXG4gICAgICAgIGlmIChjbHMuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlJykpXG4gICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlID0gY2xzLnRlbXBsYXRlO1xuICAgICAgICBpZiAoY2xzLmhhc093blByb3BlcnR5KCdjb21wb25lbnRzJykpXG4gICAgICAgICAgICBvcHRpb25zLmNvbXBvbmVudHMgPSBjbHMuY29tcG9uZW50cztcbiAgICAgICAgaWYgKGNscy5oYXNPd25Qcm9wZXJ0eSgnbWl4aW5zJykpXG4gICAgICAgICAgICBvcHRpb25zLm1peGlucyA9IGNscy5taXhpbnM7XG5cbiAgICAgICAgLy8gY3JlYXRlIG9iamVjdCBhbmQgZ2V0IHByb3RvdHlwZVxuICAgICAgICBsZXQgb2JqOmFueSAgID0gbmV3IGNscygpO1xuICAgICAgICBsZXQgcHJvdG86YW55ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG5cbiAgICAgICAgaWYgKHByb3RvLmhhc093blByb3BlcnR5KCdfX3Byb3BzX18nKSlcbiAgICAgICAgICAgIG9wdGlvbnMucHJvcHMgPSBwcm90by5fX3Byb3BzX187XG5cbiAgICAgICAgaWYgKHByb3RvLmhhc093blByb3BlcnR5KCdfX2V2ZW50c19fJykpXG4gICAgICAgICAgICBvcHRpb25zLmV2ZW50cyA9IHByb3RvLl9fZXZlbnRzX187XG5cbiAgICAgICAgaWYgKHByb3RvLmhhc093blByb3BlcnR5KCdfX2hvb2tzX18nKSlcbiAgICAgICAgICAgIFZ1ZVsndXRpbCddLmV4dGVuZChvcHRpb25zLCBwcm90by5fX2hvb2tzX18pO1xuXG4gICAgICAgIC8vIGdldCBtZXRob2RzXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5mb3JFYWNoKChtZXRob2Q6c3RyaW5nKTp2b2lkID0+IHtcblxuICAgICAgICAgICAgLy8gc2tpcCB0aGUgY29uc3RydWN0b3IgYW5kIHRoZSBpbnRlcm5hbCBvcHRpb24ga2VlcGVyXG4gICAgICAgICAgICBpZiAoWydjb25zdHJ1Y3RvciddLmluZGV4T2YobWV0aG9kKSA+IC0xKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IGRlc2M6UHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbWV0aG9kKTtcblxuICAgICAgICAgICAgLy8gbm9ybWFsIG1ldGhvZHNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICBvcHRpb25zLm1ldGhvZHNbbWV0aG9kXSA9IHByb3RvW21ldGhvZF07XG5cbiAgICAgICAgICAgIC8vIGlmIGdldHRlciBhbmQgc2V0dGVyIGFyZSBkZWZpZWQsIHBhc3MgdGhlIGZ1bmN0aW9uIGFzIGNvbXB1dGVkIHByb3BlcnR5XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGVzYy5zZXQgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wdXRlZFttZXRob2RdID0ge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGRlc2MuZ2V0LFxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGRlc2Muc2V0XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIG1ldGhvZCBvbmx5IGhhcyBhIGdldHRlciwganVzdCBwdXQgdGhlIGdldHRlciB0byB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGVzYy5nZXQgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wdXRlZFttZXRob2RdID0gZGVzYy5nZXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuLy8gcmVnaXN0ZXIgYSBjbGFzcyBhcyBjb21wb25lbnQgaW4gdnVlXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudChuYW1lOnN0cmluZywgY2hpbGRyZW4/OmFueSk6KGNsczphbnkpPT52b2lkIHtcbiAgICAgICAgcmV0dXJuIChjbHM6YW55KTp2b2lkID0+IHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zOmFueSA9IGNvbXBvbmVudE9wdGlvbnMoY2xzKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoJ0NvbXBvbmVudDogJyArIG5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NscycsIGNscyk7XG5cbiAgICAgICAgICAgIGlmKCFkZWZpbmVkKG9wdGlvbnMudGVtcGxhdGUpICYmIGRlZmluZWQodGVtcGxhdGVzW25hbWVdKSl7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSA9IHRlbXBsYXRlc1tuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWZpbmVkKGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29tcG9uZW50cyA9IG9wdGlvbnMuY29tcG9uZW50cyB8fCB7fTtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGlsZHJlbikuZm9yRWFjaCgoa2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbXBvbmVudHNba2V5XSAgICAgID0gY29tcG9uZW50T3B0aW9ucyhjaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wb25lbnRzW2tleV0ubmFtZSA9IGtleTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGlsZHJlbicsIGNoaWxkcmVuKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcblxuICAgICAgICAgICAgVnVlLmNvbXBvbmVudChuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICB9XG5cblxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcblxuICAgIE1ldGFTdG9yZS50ZW1wbGF0ZSgnZGlyZWN0aXZlJywge1xuICAgICAgICBwYXJhbXMgICAgICAgICA6IFtdLFxuICAgICAgICBwYXJhbVdhdGNoZXJzICA6IHt9LFxuICAgICAgICBkZWVwICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICB0d29XYXkgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBhY2NlcHRTdGF0ZW1lbnQ6IGZhbHNlLFxuXG4gICAgICAgIGJpbmQgIDogKCkgPT4ge1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6ICgpID0+IHtcbiAgICAgICAgfSxcbiAgICAgICAgdW5iaW5kOiAoKSA9PiB7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gRGlyZWN0aXZlKGlkOnN0cmluZywgZWxlbWVudERpcmVjdGl2ZTpib29sZWFuID0gZmFsc2UpOkNsYXNzRGVjb3JhdG9yIHtcblxuICAgICAgICByZXR1cm4gKHRhcmdldDphbnkpID0+IHtcblxuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZCgnRGlyZWN0aXZlOiAnICsgaWQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb3RvdHlwZScsIHRhcmdldC5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgICB2YXIgb3B0aW9uczphbnkgPSBNZXRhU3RvcmUuZm9yKHRhcmdldC5wcm90b3R5cGUsICdkaXJlY3RpdmUnKS5zdG9yZS5nZXQoKTtcblxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0LnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJykgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICAvL3ZhciBhbGxvd2VkRm5zID0gWydiaW5kJywgJ3VwZGF0ZScsICd1bmJpbmQnXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LnByb3RvdHlwZSwga2V5KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gZGVzY3JpcHRvci52YWx1ZVxuICAgICAgICAgICAgICAgIH0vLyBlbHNlIGlmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCkge31cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjb3B5IHN0YXRpYyBvcHRpb25zXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHRhcmdldFtrZXldXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnREaXJlY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBWdWUuZWxlbWVudERpcmVjdGl2ZShpZCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFZ1ZS5kaXJlY3RpdmUoaWQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RpcmVjdGl2ZScsIGlkLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgTWV0YVN0b3JlLmZvcih0YXJnZXQucHJvdG90eXBlKS5jbGVhblRhcmdldCgpO1xuICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBhcmFtV2F0Y2hlcihpZD86c3RyaW5nKTpNZXRob2REZWNvcmF0b3Ige1xuXG4gICAgICAgIHJldHVybiAodGFyZ2V0OmFueSwga2V5OmFueSkgPT4ge1xuICAgICAgICAgICAgaWQgPSBpZCB8fCBrZXk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGFyYW1XYXRjaGVyJywgaWQpO1xuICAgICAgICAgICAgTWV0YVN0b3JlLmZvcih0YXJnZXQsICdkaXJlY3RpdmUnKS5zdG9yZS5zZXQoJ3BhcmFtV2F0Y2hlcnMuJyArIGlkLCB0YXJnZXRba2V5XSk7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEJhc2VEaXJlY3RpdmUge1xuICAgICAgICBlbDpIVE1MRWxlbWVudDtcbiAgICAgICAgdm06dnVlanMuVnVlO1xuICAgICAgICBleHByZXNzaW9uOnN0cmluZztcbiAgICAgICAgYXJnOmFueTtcbiAgICAgICAgcmF3OnN0cmluZztcbiAgICAgICAgbmFtZTpzdHJpbmc7XG4gICAgICAgIHBhcmFtczphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIG1lbWJlcnMsIHRoZXkgYXJlIG9ubHkgbmVlZGVkIGF0IGNvbXBpbGUgdGltZS5cbiAgICAgICAgICAgIHZhciBteVByb3RvdHlwZSA9ICg8RnVuY3Rpb24+QmFzZURpcmVjdGl2ZSkucHJvdG90eXBlO1xuXG4gICAgICAgICAgICBfLmVhY2gobXlQcm90b3R5cGUsIChwcm9wZXJ0eU5hbWU6c3RyaW5nLCB2YWx1ZTphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbXlQcm90b3R5cGVbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXQgJGVsKCk6SlF1ZXJ5IHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWV0aG9kczogaHR0cDovL3Z1ZWpzLm9yZy9hcGkvaW5zdGFuY2UtbWV0aG9kcy5odG1sXG4gICAgICAgICRzZXQoZXhwOnN0cmluZywgdmFsOmFueSk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAkZGVsZXRlKGtleTpzdHJpbmcpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0KHZhbHVlOmFueSk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBvbihldmVudDpzdHJpbmcsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZCgpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgdW5iaW5kKCk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUobmV3VmFsdWU6YW55LCBvbGRWYWx1ZTphbnkpOnZvaWQge1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBUcmFuc2l0aW9uKGlkOnN0cmluZywgY3NzOmJvb2xlYW4gPSB0cnVlKTpDbGFzc0RlY29yYXRvciB7XG5cbiAgICAgICAgcmV0dXJuICh0YXJnZXQ6YW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKCdUcmFuc2l0aW9uOiAnICsgaWQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaWQsIHRhcmdldC5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgICB2YXIgb3B0aW9uczphbnkgPSB7Y3NzOiBjc3N9O1xuXG4gICAgICAgICAgICAvLyBjb3B5IHN0YXRpYyBvcHRpb25zXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHRhcmdldFtrZXldXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY29weSBwcm90b3R5cGUgb3B0aW9uc1xuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0LnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQucHJvdG90eXBlLCBrZXkpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBkZXNjcmlwdG9yLnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZ1ZS50cmFuc2l0aW9uKGlkLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zJywgb3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRyYW5zaXRpb24ge1xuICAgICAgICBjc3M/OmJvb2xlYW47XG4gICAgICAgIGVudGVyID86IChlbDpIVE1MRWxlbWVudCwgZG9uZTpGdW5jdGlvbikgPT4gdm9pZDtcbiAgICAgICAgZW50ZXJDYW5jZWxsZWQgPzogKGVsOkhUTUxFbGVtZW50KSA9PiB2b2lkIDtcbiAgICAgICAgbGVhdmUgPzogKGVsOkhUTUxFbGVtZW50LCBkb25lOkZ1bmN0aW9uKSA9PiB2b2lkO1xuICAgICAgICBsZWF2ZUNhbmNlbGxlZCA/OiAoZWw6SFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gICAgICAgIHN0YWdnZXIgPzogKGluZGV4Om51bWJlcikgPT4gbnVtYmVyO1xuICAgICAgICBlbnRlclN0YWdnZXIgPzogKGluZGV4Om51bWJlcikgPT5udW1iZXI7XG4gICAgICAgIGxlYXZlU3RhZ2dlciA/OiAoaW5kZXg6bnVtYmVyKSA9Pm51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVRyYW5zaXRpb24gaW1wbGVtZW50cyBJVHJhbnNpdGlvbiB7XG4gICAgICAgIGVudGVyKGVsOkhUTUxFbGVtZW50LCBkb25lKXt9O1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlSnF1ZXJ5VHJhbnNpdGlvbiBleHRlbmRzIEJhc2VUcmFuc2l0aW9uIHtcblxuICAgICAgICBlbnRlckNhbmNlbGxlZChlbCkge1xuICAgICAgICAgICAgJChlbCkuc3RvcCgpXG4gICAgICAgIH1cblxuICAgICAgICBsZWF2ZUNhbmNlbGxlZChlbCkge1xuICAgICAgICAgICAgJChlbCkuc3RvcCgpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuXG4gICAgcmVnaXN0ZXJKUXVlcnlIZWxwZXJzKCk7XG5cblxuXG4gICAgZXhwb3J0IGVudW0gQXBwU3RhdGUge1xuICAgICAgICBQUkVfSU5JVCwgSU5JVElBTElTSU5HLCBJTklUSUFMSVNFRCwgU1RBUlRJTkcsIFNUQVJURURcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBBcHAge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcHAgc2hvdWxkIG5vdCBiZSBpbnN0YW50aWF0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBvbiguLi5hcmdzOmFueVtdKSB7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgb25jZSguLi5hcmdzOmFueVtdKSB7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgb2ZmKC4uLmFyZ3M6YW55W10pIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBlbWl0KC4uLmFyZ3M6YW55W10pIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGxvZygpOnR5cGVvZiBsb2cge1xuICAgICAgICAgICAgcmV0dXJuIGxvZztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0IG91dCgpOkJyb3dzZXJQcmV0dHlDb25zb2xlIHtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIF9sYXlvdXQ6TGF5b3V0ID0gbmV3IExheW91dCgpO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBsYXlvdXQoKTpMYXlvdXQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBzdGF0aWMgX1ZNOmFueTtcblxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIF92bTp2dWVqcy5WdWU7XG4gICAgICAgIHN0YXRpYyBnZXQgdm0oKTp2dWVqcy5WdWUge1xuICAgICAgICAgICAgcmV0dXJuIEFwcC5fdm07XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIF9zdGF0ZTpBcHBTdGF0ZSA9IEFwcFN0YXRlLlBSRV9JTklUO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBzdGF0aWMgX3JvdXRlcjp2dWVqcy5WdWVSb3V0ZXI7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHJvdXRlcigpOnZ1ZWpzLlZ1ZVJvdXRlciB7XG4gICAgICAgICAgICByZXR1cm4gQXBwLl9yb3V0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljICRlKHZlbDpzdHJpbmcpOkpRdWVyeSB7XG4gICAgICAgICAgICByZXR1cm4gJChBcHAudm0uJGVsc1t2ZWxdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdHM6T2JqZWN0ID0ge1xuICAgICAgICAgICAgZGVidWcgIDogZmFsc2UsXG4gICAgICAgICAgICBsb2dnaW5nOiB7XG4gICAgICAgICAgICAgICAgbGV2ZWw6IGxvZy5sZXZlbHMuREVCVUdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByb3V0ZXIgOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtb3VudCAgOiAnPCU9IGFwcC5tb3VudCAlPicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBoYXNoYmFuZyAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFic3RyYWN0ICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHJvb3QgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGlua0FjdGl2ZUNsYXNzICAgOiAndi1saW5rLWFjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHNhdmVTY3JvbGxQb3NpdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25PbkxvYWQgIDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcHAgICAgOiB7XG4gICAgICAgICAgICAgICAgbW91bnQgOiAnaHRtbCcsXG4gICAgICAgICAgICAgICAgbG9hZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0hpZGVPblN0YXJ0OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY29uZmlnOklDb25maWdQcm9wZXJ0eTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGluaXQob3B0czpPYmplY3QgPSB7fSkge1xuICAgICAgICAgICAgQXBwLl9zdGF0ZSA9IEFwcFN0YXRlLklOSVRJQUxJU0lORztcbiAgICAgICAgICAgIEFwcC5lbWl0KCdJTklUSUFMSVNJTkcnKTtcbiAgICAgICAgICAgIEFwcC5vdXQuYWRkRGVmYXVsdHMoKTtcbiAgICAgICAgICAgIEFwcC5vdXQubWFjcm8oJ3RpdGxlJywgJ1BhY2thZGljJyk7XG4gICAgICAgICAgICBBcHAub3V0Lm1hY3JvKCdhbGVydCcsICd2MS4wLjAtYWxwaGEnKTtcblxuICAgICAgICAgICAgaWYgKEFwcC5jb25maWcoJ3JvdXRlci5lbmFibGVkJykpIHtcbiAgICAgICAgICAgICAgICBBcHAuX3JvdXRlciA9IG5ldyBWdWVSb3V0ZXIoQXBwLmNvbmZpZygncm91dGVyLm9wdGlvbnMnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX1ZNID0gVnVlLmV4dGVuZChfLm1lcmdlKHtcbiAgICAgICAgICAgICAgICBkYXRhICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1BhZ2VMb2FkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge3RleHQ6ICdDb3B5cmlnaHQgJmNvcHk7IENvZGV4ICcgKyAobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7dGl0bGU6ICdDb2RleCd9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhciAgICAgICA6IHtpdGVtczogW119XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IEFwcC5sYXlvdXQuc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9wdHMpKTtcblxuXG4gICAgICAgICAgICBBcHAuX3N0YXRlID0gQXBwU3RhdGUuSU5JVElBTElTRUQ7XG4gICAgICAgICAgICBBcHAuZW1pdCgnSU5JVElBTElTRUQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdGFydChvcHRzOmFueSA9IHt9KTpQcm9taXNlSW50ZXJmYWNlPGFueT4ge1xuICAgICAgICAgICAgdmFyIGRlZmVyOkRlZmVycmVkSW50ZXJmYWNlPGFueT4gPSBjcmVhdGVQcm9taXNlKCk7XG4gICAgICAgICAgICBBcHAuX3N0YXRlICAgICAgICAgICAgICAgICAgICAgICA9IEFwcFN0YXRlLlNUQVJUSU5HO1xuICAgICAgICAgICAgQXBwLmVtaXQoJ1NUQVJUSU5HJyk7XG4gICAgICAgICAgICBpZiAoZGVmaW5lZChvcHRzLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGE6YW55ID0gXy5jbG9uZURlZXAob3B0cy5kYXRhKTtcbiAgICAgICAgICAgICAgICBvcHRzLmRhdGEgICAgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdvcHRzIGRhdGEnLCBvcHRzKTtcbiAgICAgICAgICAgICQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcHAuY29uZmlnKCdyb3V0ZXIuZW5hYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIEFwcC5yb3V0ZXIuc3RhcnQoQXBwLl9WTS5leHRlbmQob3B0cyksIEFwcC5jb25maWcoJ3JvdXRlci5tb3VudCcpKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwLl92bSA9IEFwcC5yb3V0ZXIuYXBwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEFwcC5fdm0gPSBuZXcgQXBwLl9WTShvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwLnZtLiRtb3VudChBcHAuY29uZmlnKCdhcHAubW91bnQnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vdGhpcy5cbiAgICAgICAgICAgICAgICBpZiAoQXBwLmNvbmZpZygnYXBwLmxvYWRlci5lbmFibGVkJykgJiYgQXBwLmNvbmZpZygnYXBwLmxvYWRlci5hdXRvSGlkZU9uU3RhcnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBBcHAudm0uJHNldCgnc2hvd1BhZ2VMb2FkZXInLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJCgnYS5ub2dvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGU6SlF1ZXJ5RXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcHAuX3N0YXRlID0gQXBwU3RhdGUuU1RBUlRFRDtcbiAgICAgICAgICAgICAgICBBcHAuZW1pdCgnU1RBUlRFRCcpO1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVJlcXVlc3QobmFtZTpzdHJpbmcsIGZuOkZ1bmN0aW9uKTpQcm9taXNlIHtcbiAgICAgICAgICAgIHJldHVybiBBcHAudm0uJGh0dHAuZ2V0KCcvZGF0YS8nICsgbmFtZSArICcuanNvbicsIGZuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3VycmVudFZpZXc6c3RyaW5nO1xuXG4gICAgICAgIHByb3RlY3RlZCBzdGF0aWMgX3NoYXJlZENvbnN0cnVjdG9yczp7W25hbWU6c3RyaW5nXTphbnl9ID0ge307XG4gICAgICAgIHByb3RlY3RlZCBzdGF0aWMgX3NoYXJlZEluc3RhbmNlczp7W3NoYXJlSWQ6c3RyaW5nXTphbnl9ID0ge307XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzaGFyZShuYW1lOnN0cmluZywgY3JlYXRvcjpGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKGRlZmluZWQoQXBwLl9zaGFyZWRDb25zdHJ1Y3RvcnNbbmFtZV0pKSByZXR1cm47XG4gICAgICAgICAgICBBcHAuX3NoYXJlZENvbnN0cnVjdG9yc1tuYW1lXSA9IGNyZWF0b3I7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIHNoYXJlZChzaGFyZUlkOnN0cmluZywgbmFtZTpzdHJpbmcsIC4uLmFyZ3M6YW55W10pIHtcbiAgICAgICAgICAgIGlmICghZGVmaW5lZChBcHAuX3NoYXJlZEluc3RhbmNlc1tzaGFyZUlkXSkpIHtcbiAgICAgICAgICAgICAgICBBcHAuX3NoYXJlZEluc3RhbmNlc1tzaGFyZUlkXSA9IEFwcC5fc2hhcmVkQ29uc3RydWN0b3JzW25hbWVdLmFwcGx5KEFwcCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQXBwLl9zaGFyZWRJbnN0YW5jZXNbc2hhcmVJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY29uZmlnOkNvbmZpZ09iamVjdCA9IG5ldyBDb25maWdPYmplY3QoQXBwLmRlZmF1bHRzKTtcbiAgICBBcHAuY29uZmlnICAgICAgICAgICAgICA9IENvbmZpZ09iamVjdC5tYWtlUHJvcGVydHkoY29uZmlnKTtcbiAgICBtYWtlRXZlbnRFbWl0dGVyKEFwcCwge1xuICAgICAgICBhc3NpZ25NZXRob2RzICAgICAgIDogWydvbicsICdvbmNlJywgJ29mZicsICdlbWl0J10sXG4gICAgICAgIGFzc2lnblByaXZhdGVNZXRob2RzOiBbXVxuICAgIH0pO1xuICAgIEFwcC5vbignKionLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdldmVudCcsIHRoaXMuZXZlbnQsIGFyZ3VtZW50cyk7XG4gICAgfSk7XG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuXG4gICAgY2xhc3MgU2hhcmVkR3JpZERhdGEge1xuICAgICAgICBwcm90ZWN0ZWQgX3BhZ2luYXRvcjpOcG1QYWdpbmF0aW9uO1xuICAgICAgICBwdWJsaWMgZ2V0IHBhZ2luYXRvcigpOk5wbVBhZ2luYXRpb24ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2luYXRvclxuICAgICAgICB9O1xuXG4gICAgICAgIHByb3RlY3RlZCBfZ3JpZDpHcmlkQ29tcG9uZW50O1xuICAgICAgICBwdWJsaWMgZ2V0IGdyaWQoKTpHcmlkQ29tcG9uZW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ncmlkXG4gICAgICAgIH07XG5cbiAgICAgICAgcm93czphbnlbXTtcbiAgICAgICAgY29sdW1uczphbnlbXTtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGdyaWQ6R3JpZENvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5fZ3JpZCAgICAgID0gZ3JpZDtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2luYXRvciA9IHBhZ2luYXRpb24uY3JlYXRlKCdzZWFyY2gnLCB7cHJlbGluazogJy8nLCBjdXJyZW50OiAxLCByb3dzUGVyUGFnZTogMTAsIHRvdGFsUmVzdWx0OiAwfSk7XG4gICAgICAgIH1cbiAgICB9XG4vL0FwcC5zaGFyZSgnZ3JpZC1kYXRhJywgKGdyaWQ6R3JpZENvbXBvbmVudCkgPT4gbmV3IFNoYXJlZEdyaWREYXRhKGdyaWQpKTtcblxuICAgIEFwcC5zaGFyZSgncGFnaW5hdG9yJywgKCkgPT4gcGFnaW5hdGlvbi5jcmVhdGUoJ3NlYXJjaCcsIHtwcmVsaW5rOiAnLycsIGN1cnJlbnQ6IDEsIHJvd3NQZXJQYWdlOiAxMCwgdG90YWxSZXN1bHQ6IDB9KSk7XG5cblxuICAgIEBDb21wb25lbnQoJ2dyaWQnKVxuICAgIGV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgICAgIHN0YXRpYyB0ZW1wbGF0ZSA9IHRlbXBsYXRlc1snZ3JpZCddO1xuXG4gICAgICAgIEBQcm9wKHt0eXBlOiBBcnJheX0pIHJvd3M6YW55W107XG4gICAgICAgIEBQcm9wKHt0eXBlOiBBcnJheX0pIGNvbHVtbnM6YW55W107XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmd9KSBmaWx0ZXJLZXk6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogTnVtYmVyLCAnZGVmYXVsdCc6IDEwfSkgcGVyUGFnZTpudW1iZXI7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmd9KSBzaGFyZUlkOnN0cmluZztcblxuICAgICAgICBzb3J0Q29sdW1uOnN0cmluZyAgICAgICA9ICcnO1xuICAgICAgICByZXZlcnNlZDphbnkgICAgICAgICAgICA9IHt9O1xuICAgICAgICBwYWdpbmF0b3I6TnBtUGFnaW5hdGlvbiA9IE9iamVjdC5jcmVhdGUoe30pO1xuXG5cbiAgICAgICAgZ2V0IHBhZ2VyKCk6TnBtUGFnaW5hdGlvbkRhdGEge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGRhdGEucGFnaW5hdG9yLmdldFBhZ2luYXRpb25EYXRhKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZmlsdGVyZWRSb3dzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG9wdGlvbnMuZmlsdGVycy5maWx0ZXJCeSh0aGlzLnJvd3MsIHRoaXMuZmlsdGVyS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBjdXJyZW50UGFnZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkUm93cy5zbGljZSh0aGlzLnBhZ2VyLmZyb21SZXN1bHQsIHRoaXMucGFnZXIudG9SZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgc29ydEJ5KGNvbHVtbikge1xuICAgICAgICAgICAgdGhpcy4kc2V0KCdzb3J0Q29sdW1uJywgY29sdW1uKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEucmV2ZXJzZWRbY29sdW1uXSA9ICF0aGlzLiRkYXRhLnJldmVyc2VkW2NvbHVtbl07XG4gICAgICAgIH1cblxuICAgICAgICBATGlmZWN5Y2xlSG9vaygnY3JlYXRlZCcpIGJlZm9yZUNvbXBpbGUoKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLnBhZ2luYXRvciA9IEFwcC5zaGFyZWQodGhpcy5zaGFyZUlkLCAncGFnaW5hdG9yJyk7XG4gICAgICAgICAgICAvL3RoaXMuJGRhdGEuc2hhcmVkID0gQXBwLnNoYXJlZCh0aGlzLnNoYXJlSWQsICdncmlkLWRhdGEnLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBMaWZlY3ljbGVIb29rKCdjb21waWxlZCcpIGNvbXBpbGVkKCkge1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3Jvd3MgKyBwZXJQYWdlJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3Iuc2V0KCdyb3dzUGVyUGFnZScsIHRoaXMucGVyUGFnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3Iuc2V0KCd0b3RhbFJlc3VsdCcsIHRoaXMuZmlsdGVyZWRSb3dzLmxlbmd0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdzb3J0Q29sdW1uICsgcmV2ZXJzZWQnLCAoKSA9PiB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB0aGlzLiRzZXQoJ3JldmVyc2VkLicgKyBjb2x1bW4sIGZhbHNlKSkpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAQ29tcG9uZW50KCdwYWdpbmF0aW9uJylcbiAgICBleHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgICAgICBzdGF0aWMgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNbJ3BhZ2luYXRpb24nXTtcblxuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nfSkgc2hhcmVJZDpzdHJpbmc7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDV9KSBtYXhMaW5rczpudW1iZXI7XG5cbiAgICAgICAgcGFnaW5hdG9yOk5wbVBhZ2luYXRpb24gPSBPYmplY3QuY3JlYXRlKHt9KTtcblxuICAgICAgICBATGlmZWN5Y2xlSG9vaygnYmVmb3JlQ29tcGlsZScpIGJlZm9yZUNvbXBpbGUoKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLnBhZ2luYXRvciA9IEFwcC5zaGFyZWQodGhpcy5zaGFyZUlkLCAncGFnaW5hdG9yJyk7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLnBhZ2luYXRvci5zZXQoJ3BhZ2VMaW5rcycsIHRoaXMubWF4TGlua3MpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcGFnZXIoKTpOcG1QYWdpbmF0aW9uRGF0YSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYWdpbmF0b3IuZ2V0UGFnaW5hdGlvbkRhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzQ3VycmVudChpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFnaW5hdG9yLmdldFBhZ2luYXRpb25EYXRhKCkuY3VycmVudCA9PT0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBnb3RvKGluZGV4Om51bWJlciwgZXZlbnQ6TW91c2VFdmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnNldCgnY3VycmVudCcsIGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHQoZXZlbnQ6TW91c2VFdmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYWdlci5uZXh0KSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5zZXQoJ2N1cnJlbnQnLCB0aGlzLnBhZ2VyLm5leHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldihldmVudDpNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBhZ2VyLnByZXZpb3VzKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5zZXQoJ2N1cnJlbnQnLCB0aGlzLnBhZ2VyLnByZXZpb3VzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgQERpcmVjdGl2ZSgnZ3JpZCcpXG4gICAgZXhwb3J0IGNsYXNzIEdyaWREaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlIHtcbiAgICAgICAgc3RhdGljIHBhcmFtczphbnlbXSA9IFsnc2hhcmUtaWQnXTtcblxuICAgICAgICBnZXQgcGFnaW5hdG9yKCk6TnBtUGFnaW5hdGlvbiB7XG4gICAgICAgICAgICByZXR1cm4gQXBwLnNoYXJlZCh0aGlzLnBhcmFtcy5zaGFyZUlkLCAncGFnaW5hdG9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcGFnZXIoKTpOcG1QYWdpbmF0aW9uRGF0YSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYWdpbmF0b3IuZ2V0UGFnaW5hdGlvbkRhdGEoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYmluZCgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKHZhbHVlOmFueSkge1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWJMaW5rIGV4dGVuZHMgSUxpbmsge1xuICAgICAgICB0aXRsZT86c3RyaW5nO1xuICAgICAgICBhcnJvdz86Ym9vbGVhbjtcbiAgICB9XG5cblxuICAgIEBDb21wb25lbnQoJ3BhZ2UtYnJlYWRjcnVtYicpXG4gICAgZXhwb3J0IGNsYXNzIFBhZ2VCcmVhZGNydW1iSXRlbUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgICAgICBAUHJvcCh7dHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2V9KSBpdGVtOklCcmVhZGNydW1iTGluaztcblxuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCk9PidocmVmJ30pIHR5cGU6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCk9PicnfSkgcm91dGU6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCk9PicnfSkgcGF0aDpzdHJpbmc7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgJ2RlZmF1bHQnOiAoKT0+J2phdmFzY3JpcHQ6Oyd9KSBocmVmOnN0cmluZztcblxuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCk9PicnfSkgdGl0bGU6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IGZhbHNlLCAnZGVmYXVsdCc6ICgpPT4gdHJ1ZX0pIGFycm93OmJvb2xlYW47XG5cbiAgICAgICAgQExpZmVjeWNsZUhvb2soJ2JlZm9yZUNvbXBpbGUnKSBiZWZvcmVDb21waWxlKCk6dm9pZCB7XG4gICAgICAgICAgICBpZiAoZGVmaW5lZCh0aGlzLml0ZW0pKVxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaXRlbSkuZm9yRWFjaCgoa2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLml0ZW1ba2V5XTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBsaW5rKCkge1xuICAgICAgICAgICAgdmFyIGxpbms6YW55ICAgID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxpbmtbdGhpcy50eXBlXSA9IHRoaXNbdGhpcy50eXBlXTtcbiAgICAgICAgICAgIHJldHVybiBsaW5rO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQENvbXBvbmVudCgncGFnZS1icmVhZGNydW1icycpXG4gICAgZXhwb3J0IGNsYXNzIFBhZ2VCcmVhZGNydW1ic0NvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgICAgIEBQcm9wKHt0eXBlOiBBcnJheSwgcmVxdWlyZWQ6IGZhbHNlfSkgaXRlbXM6SUJyZWFkY3J1bWJMaW5rW107XG4gICAgICAgIEBQcm9wKHt0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCkgPT4gdHJ1ZX0pIGF1dG9maXg6Ym9vbGVhbjtcblxuXG4gICAgICAgIGlzTGFzdChpbmRleDpudW1iZXIpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoID09PSBpbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBATGlmZWN5Y2xlSG9vaygnYmVmb3JlQ29tcGlsZScpIGJlZm9yZUNvbXBpbGUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvZml4ICYmIGRlZmluZWQodGhpcy5pdGVtcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV1bJ2Fycm93J10gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBMaWZlY3ljbGVIb29rKCdyZWFkeScpIHJlYWR5KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b2ZpeCAmJiAhZGVmaW5lZCh0aGlzLml0ZW1zKSkge1xuICAgICAgICAgICAgICAgIHZhciBsaWEgPSB0aGlzLiRlbHNbJ3BhZ2VCcmVhZGNydW1icyddLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFsaWEubGVuZ3RoID4gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBpOkhUTUxFbGVtZW50W10gPSBsaWEuaXRlbShsaWEubGVuZ3RoIC0gMSkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKTtcbiAgICAgICAgICAgICAgICBpZiAoIWkubGVuZ3RoID4gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlbMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEBDb21wb25lbnQoJ3BhZ2UnKVxuICAgIGV4cG9ydCBjbGFzcyBQYWdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICAgICAgQFByb3Aoe3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlfSkgdGl0bGU6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2V9KSBzdWJ0aXRsZTpzdHJpbmc7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCkgPT4gdHJ1ZX0pIHNlcGVyYXRvcjpzdHJpbmc7XG4gICAgfVxuXG4gICAgQERpcmVjdGl2ZSgncGFnZS1oZWlnaHQtcmVzaXplcicpXG4gICAgZXhwb3J0IGNsYXNzIFBhZ2VDb250ZW50U2l6ZXJEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlIHtcbiAgICAgICAgbGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCd2LXBhZ2UtaGVpZ2h0LXJlc2l6ZXInLCB0aGlzLCBnZXRWaWV3UG9ydCgpLndpZHRoLCBBcHAubGF5b3V0LmdldEJyZWFrcG9pbnQoJ21kJykpXG4gICAgICAgICAgICBpZiAoZ2V0Vmlld1BvcnQoKS53aWR0aCA+PSBBcHAubGF5b3V0LmdldEJyZWFrcG9pbnQoJ21kJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZWwpLmNzcygnbWluLWhlaWdodCcsIEFwcC5sYXlvdXQuY2FsY3VsYXRlVmlld3BvcnRIZWlnaHQoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcy5lbCkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBiaW5kKCkge1xuXG4gICAgICAgICAgICAkKCgpPT4gQXBwLm9uKCdsYXlvdXQ6cmVzaXplJywgKCkgPT4gdGhpcy5saXN0ZW5lcigpKSAmJiB0aGlzLmxpc3RlbmVyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdW5iaW5kKCkge1xuICAgICAgICAgICAgQXBwLm9mZignbGF5b3V0OnJlc2l6ZScsICgpID0+IHRoaXMubGlzdGVuZXIoKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuICAgIGRlY2xhcmUgdmFyIGFsaW5rVGVtcGxhdGU7XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElMaW5rIHtcbiAgICAgICAgdHlwZT86c3RyaW5nO1xuICAgICAgICBocmVmPzpzdHJpbmc7XG4gICAgICAgIHJvdXRlPzpzdHJpbmc7XG4gICAgICAgIHBhdGg/OnN0cmluZztcbiAgICAgICAgdGFyZ2V0PzpzdHJpbmc7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUm91dGUge1xuICAgICAgICAobmFtZTpzdHJpbmcsIHBhdGg6c3RyaW5nLCB2aWV3UGF0aDpzdHJpbmcpOiBhbnk7XG4gICAgICAgIGxpbms/Oih0eXBlOnN0cmluZywgdHlwZVZhbHVlOnN0cmluZywgdGFyZ2V0PzpzdHJpbmcpPT5JTGluaztcbiAgICB9XG4gICAgZXhwb3J0IHZhciByb3V0ZTpJUm91dGUgPSBmdW5jdGlvbiByb3V0ZShuYW1lOnN0cmluZywgcGF0aDpzdHJpbmcsIHZpZXdQYXRoOnN0cmluZywgY29uZmlnOmFueSA9IHt9KSB7XG4gICAgICAgIEFwcC5yb3V0ZXIub24ocGF0aCwgXy5tZXJnZSh7XG4gICAgICAgICAgICBuYW1lICAgICA6IG5hbWUsXG4gICAgICAgICAgICBjb21wb25lbnQ6IHZpZXcodmlld1BhdGgpXG4gICAgICAgIH0sIGNvbmZpZykpXG4gICAgfTtcbiAgICByb3V0ZS5saW5rICAgICAgICAgICAgICA9ICh0eXBlOnN0cmluZywgdHlwZVZhbHVlOnN0cmluZywgdGFyZ2V0PzpzdHJpbmcpOklMaW5rID0+IHtcbiAgICAgICAgdmFyIGxpbms6SUxpbmsgID0ge307XG4gICAgICAgIGxpbmsudHlwZSAgICAgICA9IHR5cGU7XG4gICAgICAgIGxpbmtbbGluay50eXBlXSA9IHR5cGVWYWx1ZTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgbGluay50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxJTGluaz4gbGluaztcbiAgICB9O1xuXG5cbiAgICBAQ29tcG9uZW50KCdhbGluaycpXG4gICAgZXhwb3J0IGNsYXNzIExpbmtDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgSUxpbmsge1xuXG4gICAgICAgIEBQcm9wKHt0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZX0pIGxpbms6SUxpbms7XG5cbiAgICAgICAgQFByb3Aoe3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlfSkgdHlwZTpzdHJpbmc7XG5cbiAgICAgICAgQFByb3Aoe3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlLCAnZGVmYXVsdCc6ICgpPT4namF2YXNjcmlwdDo7J30pIGhyZWY6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCk9PicnfSkgcm91dGU6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsICdkZWZhdWx0JzogKCk9PicnfSkgcGF0aDpzdHJpbmc7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgJ2RlZmF1bHQnOiAoKT0+J3NlbGYnfSkgdGFyZ2V0OnN0cmluZztcblxuICAgICAgICBnZXQgX3R5cGUoKSB7XG4gICAgICAgICAgICBpZiAoIWRlZmluZWQodGhpcy50eXBlKSkge1xuICAgICAgICAgICAgICAgIGlmIChkZWZpbmVkKHRoaXMucGF0aCkgJiYgdGhpcy5wYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmluZWQodGhpcy5yb3V0ZSkgJiYgdGhpcy5yb3V0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncm91dGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaHJlZic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXNUeXBlKC4uLmFyZ3M6c3RyaW5nW10pIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmluZGV4T2YodGhpcy5fdHlwZSkgIT09IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGF0dHJzKCkge1xuICAgICAgICAgICAgdmFyIGF0dHJzOmFueSA9IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICdfJyArIHRoaXMudGFyZ2V0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1R5cGUoJ2hyZWYnKSkge1xuICAgICAgICAgICAgICAgIGF0dHJzLmhyZWYgPSB0aGlzLmhyZWY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhdHRycztcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB2bGluaygpIHtcbiAgICAgICAgICAgIHZhciB2bGluazphbnkgPSB7fTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVHlwZSgncm91dGUnKSkge1xuICAgICAgICAgICAgICAgIHZsaW5rWyduYW1lJ10gPSB0aGlzLnJvdXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVHlwZSgncGF0aCcpKSB7XG4gICAgICAgICAgICAgICAgdmxpbmtbJ3BhdGgnXSA9IHRoaXMucGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2bGluaztcbiAgICAgICAgfVxuXG4gICAgICAgIEBMaWZlY3ljbGVIb29rKCdiZWZvcmVDb21waWxlJykgYmVmb3JlQ29tcGlsZSgpOnZvaWQge1xuICAgICAgICAgICAgaWYgKGRlZmluZWQodGhpcy5saW5rKSlcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpbmspLmZvckVhY2goKGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gdGhpcy5saW5rW2tleV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJU2lkZWJhckl0ZW0ge1xuICAgICAgICB0aXRsZT86IHN0cmluZztcbiAgICAgICAgaWNvbj86IHN0cmluZztcbiAgICAgICAgY2hpbGRyZW4/OiBJU2lkZWJhckl0ZW1bXTtcbiAgICAgICAgaHJlZj86c3RyaW5nO1xuICAgICAgICByb3V0ZT86c3RyaW5nO1xuICAgICAgICBwYXRoPzpzdHJpbmc7XG4gICAgICAgIGFjdGl2ZT86Ym9vbGVhbjtcbiAgICAgICAgdHlwZT86IHN0cmluZzsgLy8gcGF0aCB8IHJvdXRlIHwgaHJlZiB8IGZvbGRlciB8IGhlYWRpbmdcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU2lkZWJhckl0ZW1Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICAgICAgc3RhdGljIHRlbXBsYXRlOnN0cmluZyA9IHRlbXBsYXRlc1snc2lkZWJhci1pdGVtJ107XG5cblxuICAgICAgICBAUHJvcCh7dHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2V9KSBpdGVtOklTaWRlYmFySXRlbTtcbiAgICAgICAgQFByb3Aoe3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlLCAnZGVmYXVsdCc6ICgpPT4nJ30pIHRpdGxlOnN0cmluZztcbiAgICAgICAgQFByb3Aoe3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlfSkgaWNvbjpzdHJpbmc7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgJ2RlZmF1bHQnOiAoKT0+J2phdmFzY3JpcHQ6Oyd9KSBocmVmOnN0cmluZztcbiAgICAgICAgQFByb3Aoe3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlLCAnZGVmYXVsdCc6ICgpPT4naHJlZid9KSB0eXBlOnN0cmluZztcbiAgICAgICAgQFByb3Aoe3R5cGU6IEJvb2xlYW4sIHJlcXVpcmVkOiBmYWxzZSwgJ2RlZmF1bHQnOiAoKT0+ZmFsc2V9KSBpc0FjdGl2ZTpib29sZWFuO1xuICAgICAgICBAUHJvcCh7dHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IGZhbHNlLCAnZGVmYXVsdCc6ICgpPT5mYWxzZX0pIGhhc0NoaWxkcmVuOmJvb2xlYW47XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgJ2RlZmF1bHQnOiAoKT0+Jyd9KSByb3V0ZTpzdHJpbmc7XG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgJ2RlZmF1bHQnOiAoKT0+Jyd9KSBwYXRoOnN0cmluZztcblxuICAgICAgICBjaGlsZHJlbjphbnlbXSA9IFtdO1xuICAgICAgICBpc09wZW46Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIGdldCBoYXNTdWJtZW51KCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmhhc0NoaWxkcmVuID09PSB0cnVlIHx8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkgJiYgdGhpcy50eXBlID09PSAnZm9sZGVyJztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0IGxpbmsoKSB7XG4gICAgICAgICAgICB2YXIgbGluazphbnkgICAgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGlua1t0aGlzLnR5cGVdID0gdGhpc1t0aGlzLnR5cGVdO1xuICAgICAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGUoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3Blbih0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzVHlwZSguLi5hcmdzOnN0cmluZ1tdKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy5pbmRleE9mKHRoaXMudHlwZSkgIT09IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xvc2UoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3BlbihjbG9zZU90aGVyczpib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNTdWJtZW51KSByZXR1cm47XG4gICAgICAgICAgICBpZiAoY2xvc2VPdGhlcnMpIHRoaXMuJHBhcmVudC4kZXZhbCgnY2xvc2VTdWJtZW51cygpJyk7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogdGhlIGV2ZW50IHByb3BhZ2F0aW9uIHdpbGwgZm9sbG93IG1hbnkgZGlmZmVyZW50IOKAnHBhdGhz4oCdLiBUaGUgcHJvcGFnYXRpb24gZm9yIGVhY2ggcGF0aCB3aWxsIHN0b3Agd2hlbiBhIGxpc3RlbmVyIGNhbGxiYWNrIGlzIGZpcmVkIGFsb25nIHRoYXQgcGF0aCwgdW5sZXNzIHRoZSBjYWxsYmFjayByZXR1cm5zIHRydWUuXG4gICAgICAgICAqIGh0dHA6Ly92dWVqcy5vcmcvYXBpLyN2bS1icm9hZGNhc3RcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBARXZlbnRIb29rKCdjbG9zZVN1Ym1lbnVzJykgY2xvc2VTdWJtZW51cygpOmJvb2xlYW4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBATGlmZWN5Y2xlSG9vaygnYmVmb3JlQ29tcGlsZScpIGJlZm9yZUNvbXBpbGUoKTp2b2lkIHtcbiAgICAgICAgICAgIGlmIChkZWZpbmVkKHRoaXMuaXRlbSkpXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5pdGVtKS5mb3JFYWNoKChrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHRoaXMuaXRlbVtrZXldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogKi9cbi8vIEMgICAgc2lkZWJhclxuICAgIC8qICovXG4gICAgQENvbXBvbmVudCgnc2lkZWJhcicsIHsnaXRlbSc6IFNpZGViYXJJdGVtQ29tcG9uZW50fSlcbiAgICBleHBvcnQgY2xhc3MgU2lkZWJhckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cbiAgICAgICAgQFByb3Aoe3R5cGU6IEFycmF5LCByZXF1aXJlZDogZmFsc2V9KSBpdGVtczpJU2lkZWJhckl0ZW1bXTtcblxuICAgICAgICBnZXQgYm9keUNsYXNzKCk6RE9NVG9rZW5MaXN0IHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuc3VyZUJvZHlDbGFzcyhuYW1lOnN0cmluZywgc2hvdWxkRXhpc3Q6Ym9vbGVhbiA9IHRydWUpOlNpZGViYXJDb21wb25lbnQge1xuICAgICAgICAgICAgaWYgKHNob3VsZEV4aXN0ICYmICF0aGlzLmJvZHlDbGFzcy5jb250YWlucyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9keUNsYXNzLmFkZChuYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNob3VsZEV4aXN0ICYmIHRoaXMuYm9keUNsYXNzLmNvbnRhaW5zKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3MucmVtb3ZlKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGlnZXN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBjbG9zZWQoKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvZHlDbGFzcy5jb250YWlucygncGFnZS1zaWRlYmFyLWNsb3NlZCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNldCBjbG9zZWQodmFsdWU6Ym9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVN1Ym1lbnVzKCk7XG4gICAgICAgICAgICB0aGlzLmVuc3VyZUJvZHlDbGFzcygncGFnZS1zaWRlYmFyLWNsb3NlZCcsIHZhbHVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBnZXQgaGlkZGVuKCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib2R5Q2xhc3MuY29udGFpbnMoJ3BhZ2Utc2lkZWJhci1oaWRlJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0IGhpZGRlbih2YWx1ZTpib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLmVuc3VyZUJvZHlDbGFzcygncGFnZS1zaWRlYmFyLWNsb3NlZCcsIHZhbHVlKVxuICAgICAgICAgICAgICAgIC5lbnN1cmVCb2R5Q2xhc3MoJ3BhZ2Utc2lkZWJhci1oaWRlJywgdmFsdWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGdldCBjb25kZW5zZWQoKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvZHlDbGFzcy5jb250YWlucygncGFnZS1zaWRlYmFyLWNvbmRlbnNlZCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNldCBjb25kZW5zZWQodmFsdWU6Ym9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5lbnN1cmVCb2R5Q2xhc3MoJ3BhZ2Utc2lkZWJhci1jb25kZW5zZWQnLCB2YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdG9nZ2xlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xvc2VTdWJtZW51cygpIHtcbiAgICAgICAgICAgIHRoaXMuJGJyb2FkY2FzdCgnY2xvc2VTdWJtZW51cycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFRyYW5zaXRpb24oJ3NpZGViYXItc3VibWVudScsIGZhbHNlKVxuICAgIGV4cG9ydCBjbGFzcyBTbGlkZVRvZ2dsZVRyYW5zaXRpb24gZXh0ZW5kcyBCYXNlSnF1ZXJ5VHJhbnNpdGlvbiB7XG4gICAgICAgIGVudGVyKGVsOkhUTUxFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICAkKGVsKS5zbGlkZURvd24oNDAwLCAnbGluZWFyJywgZG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZWF2ZShlbDpIVE1MRWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgJChlbCkuc2xpZGVVcCgyNTAsICdsaW5lYXInLCBkb25lKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyogKi9cbi8vIEQgICAgc2lkZWJhclxuICAgIC8qICovXG4gICAgQERpcmVjdGl2ZSgnc2lkZWJhcicpXG4gICAgZXhwb3J0IGNsYXNzIFNpZGViYXJEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlIHtcbiAgICAgICAgc3RhdGljIHBhcmFtczphbnlbXSA9IFsncy1hY3Rpb24nLCAncy1vbiddO1xuXG4gICAgICAgIHVwZGF0ZShvbGRWYWw6YW55LCBuZXdWYWw6YW55KSB7XG4gICAgICAgICAgICB0aGlzLmVsWydvbicgKyB0aGlzLnBhcmFtc1snc09uJ11dID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb246YW55ICAgICAgICAgICAgICAgPSB0aGlzLnBhcmFtc1snc0FjdGlvbiddO1xuICAgICAgICAgICAgICAgIHZhciBzaWRlYmFyOlNpZGViYXJDb21wb25lbnQgPSB0aGlzLnZtLiRyb290LiRyZWZzWydzaWRlYmFyJ107XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzaWRlYmFyW2FjdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy53YXJuKCdTaWRlYmFyQWN0aW9uRGlyZWN0aXZlIGNvdWxkIG5vdCBkbyBhY3Rpb24gJyArIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2lkZWJhclthY3Rpb25dLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAvL3NpZGViYXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIC8vYWN0aW9uID0gc2lkZWJhclthY3Rpb25dO1xuICAgICAgICAgICAgICAgIC8vIGFjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gdmlldyh2aWV3UGF0aDpzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBTeXN0ZW0uaW1wb3J0KHZpZXdQYXRoKS50aGVuKChtb2R1bGU6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZDphbnk7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmluZWQobW9kdWxlLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZCA9IG1vZHVsZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZCA9IG1vZHVsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVmaW5lZChtb2QuQ09NUE9ORU5UKSkge1xuICAgICAgICAgICAgICAgICAgICBtb2QgPSBjb21wb25lbnRPcHRpb25zKG1vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUobW9kKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXcgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICAgICAgc3RhdGljIFZJRVc6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgc3RhdGljIGJyZWFkY3J1bWIodGl0bGU6c3RyaW5nLCB0eXBlOnN0cmluZywgdHlwZVZhbHVlOnN0cmluZywgdGFyZ2V0PzpzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBicmVhZGNydW1iOklCcmVhZGNydW1iTGluayA9IDxJQnJlYWRjcnVtYkxpbms+IHJvdXRlLmxpbmsodHlwZSwgdHlwZVZhbHVlLCB0YXJnZXQpO1xuICAgICAgICAgICAgYnJlYWRjcnVtYi50aXRsZSAgICAgICAgICAgICAgID0gdGl0bGU7XG4gICAgICAgICAgICByZXR1cm4gYnJlYWRjcnVtYjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG4gICAgQENvbXBvbmVudCgnZHJvcGRvd24nKVxuICAgIGV4cG9ydCBjbGFzcyBEcm9wZG93bkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlOnN0cmluZyA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICB0b2dnbGVEcm9wZG93bihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKVxuICAgICAgICB9XG5cbiAgICAgICAgQExpZmVjeWNsZUhvb2soJ3JlYWR5JykgcmVhZHkoKSB7XG4gICAgICAgICAgICB2YXIgZWwgICAgICAgICA9IHRoaXMuJGVsO1xuICAgICAgICAgICAgdmFyIHRvZ2dsZTphbnkgPSBlbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXScpO1xuICAgICAgICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVEcm9wZG93bik7XG4gICAgICAgICAgICB0aGlzWydfY2xvc2VFdmVudCddID0gRXZlbnRMaXN0ZW5lci5saXN0ZW4od2luZG93LCAnY2xpY2snLCAoZSk9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbC5jb250YWlucyhlLnRhcmdldCkpIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEBMaWZlY3ljbGVIb29rKCdiZWZvcmVEZXN0cm95JykgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzWydfY2xvc2VFdmVudCddKSB0aGlzWydfY2xvc2VFdmVudCddLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgcGFja2FkaWMge1xuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVBhcmFtcyhwYXJhbXM6YW55LCByZW1vdmVQcmVmaXg/OnN0cmluZykge1xuICAgICAgICBwYXJhbXMgPSBfLmNsb25lRGVlcChwYXJhbXMpO1xuICAgICAgICBpZiAocmVtb3ZlUHJlZml4KSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gbmV3IFJlZ0V4cCgnXicgKyByZW1vdmVQcmVmaXggKyAnKFtBLVpdLiopJyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJlZml4LnRlc3Qoa2V5KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBuZXdLZXk6c3RyaW5nID0ga2V5LnJlcGxhY2UocHJlZml4LCAnJDEnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHBhcmFtc1tuZXdLZXldICAgID0gcGFyYW1zW2tleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtc1trZXldO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIEBEaXJlY3RpdmUoJ3Rvb2x0aXAnKVxuICAgIGV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZSB7XG4gICAgICAgIHN0YXRpYyBwYXJhbXM6YW55W10gPSBbJ3QtdHJpZ2dlcicsICd0LWFuaW1hdGlvbicsICd0aXRsZScsICd0LXBsYWNlbWVudCcsICd0LWNvbnRhaW5lciddO1xuXG4gICAgICAgIGluaXRQbHVnaW4oY29uZmlnOmFueSA9IHt9KSB7XG4gICAgICAgICAgICAkKCgpID0+ICQodGhpcy5lbCkudG9vbHRpcChfLm1lcmdlKHtjb250YWluZXI6ICdib2R5J30sIG5vcm1hbGl6ZVBhcmFtcyh0aGlzLnBhcmFtcywgJ3QnKSwgY29uZmlnKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZCgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFBsdWdpbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKHZhbHVlOmFueSkge1xuICAgICAgICAgICAgdGhpcy5pbml0UGx1Z2luKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBEaXJlY3RpdmUoJ3BvcG92ZXInKVxuICAgIGV4cG9ydCBjbGFzcyBQb3BvdmVyRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZSB7XG4gICAgICAgIHN0YXRpYyBwYXJhbXM6YW55W10gPSBbJ3AtdHJpZ2dlcicsICdwLWFuaW1hdGlvbicsICd0aXRsZScsICdwLXBsYWNlbWVudCcsICdwLWNvbnRlbnQnLCAndC1jb250YWluZXInXTtcblxuICAgICAgICBpbml0UGx1Z2luKGNvbmZpZzphbnkgPSB7fSkge1xuICAgICAgICAgICAgJCgoKSA9PiAkKHRoaXMuZWwpLnBvcG92ZXIoXy5tZXJnZSh7Y29udGFpbmVyOiAnYm9keScsIHRyaWdnZXI6ICdjbGljayBmb2N1cyd9LCBub3JtYWxpemVQYXJhbXModGhpcy5wYXJhbXMsICdwJyksIGNvbmZpZykpKVxuICAgICAgICB9XG5cbiAgICAgICAgYmluZCgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFBsdWdpbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKHZhbHVlOmFueSkge1xuICAgICAgICAgICAgdGhpcy5pbml0UGx1Z2luKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG4gICAgZXhwb3J0IHZhciBwb3BvdmVyTWl4aW46YW55ID0ge1xuICAgICAgICBwcm9wcyAgOiB7XG4gICAgICAgICAgICB0cmlnZ2VyICA6IHtcbiAgICAgICAgICAgICAgICB0eXBlICAgOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJ2NsaWNrJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVmZmVjdCAgIDoge1xuICAgICAgICAgICAgICAgIHR5cGUgICA6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAnZmFkZWluJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlICAgIDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRlbnQgIDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlciAgIDoge1xuICAgICAgICAgICAgICAgIHR5cGUgICA6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsYWNlbWVudDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0b3AgOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzaG93ICAgIDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICB0b2dnbGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvd1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZWFkeSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy4kZWxzLnBvcG92ZXIpIHJldHVybiBjb25zb2xlLmVycm9yKFwiQ291bGRuJ3QgZmluZCBwb3BvdmVyIHYtZWwgaW4geW91ciBjb21wb25lbnQgdGhhdCB1c2VzIHBvcG92ZXJNaXhpbi5cIik7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy4kZWxzLnBvcG92ZXJcbiAgICAgICAgICAgIGNvbnN0IHRyaWdlciAgPSB0aGlzLiRlbHMudHJpZ2dlci5jaGlsZHJlblswXVxuICAgICAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlZW50ZXJFdmVudCA9IEV2ZW50TGlzdGVuZXIubGlzdGVuKHRyaWdlciwgJ21vdXNlZW50ZXInLCAoKT0+IHRoaXMuc2hvdyA9IHRydWUpXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VsZWF2ZUV2ZW50ID0gRXZlbnRMaXN0ZW5lci5saXN0ZW4odHJpZ2VyLCAnbW91c2VsZWF2ZScsICgpPT4gdGhpcy5zaG93ID0gZmFsc2UpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2ZvY3VzJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZvY3VzRXZlbnQgPSBFdmVudExpc3RlbmVyLmxpc3Rlbih0cmlnZXIsICdmb2N1cycsICgpPT4gdGhpcy5zaG93ID0gdHJ1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVyRXZlbnQgPSBFdmVudExpc3RlbmVyLmxpc3Rlbih0cmlnZXIsICdibHVyJywgKCk9PiB0aGlzLnNob3cgPSBmYWxzZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpY2tFdmVudCA9IEV2ZW50TGlzdGVuZXIubGlzdGVuKHRyaWdlciwgJ2NsaWNrJywgdGhpcy50b2dnbGUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi5sZWZ0ID0gdHJpZ2VyLm9mZnNldExlZnQgLSBwb3BvdmVyLm9mZnNldFdpZHRoIC8gMiArIHRyaWdlci5vZmZzZXRXaWR0aCAvIDJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi50b3AgID0gdHJpZ2VyLm9mZnNldFRvcCAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ubGVmdCA9IHRyaWdlci5vZmZzZXRMZWZ0IC0gcG9wb3Zlci5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnRvcCAgPSB0cmlnZXIub2Zmc2V0VG9wICsgdHJpZ2VyLm9mZnNldEhlaWdodCAvIDIgLSBwb3BvdmVyLm9mZnNldEhlaWdodCAvIDJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ubGVmdCA9IHRyaWdlci5vZmZzZXRMZWZ0ICsgdHJpZ2VyLm9mZnNldFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24udG9wICA9IHRyaWdlci5vZmZzZXRUb3AgKyB0cmlnZXIub2Zmc2V0SGVpZ2h0IC8gMiAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ubGVmdCA9IHRyaWdlci5vZmZzZXRMZWZ0IC0gcG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIgKyB0cmlnZXIub2Zmc2V0V2lkdGggLyAyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24udG9wICA9IHRyaWdlci5vZmZzZXRUb3AgKyB0cmlnZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dyb25nIHBsYWNlbWVudCBwcm9wJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wICAgICA9IHRoaXMucG9zaXRpb24udG9wICsgJ3B4J1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ICAgID0gdGhpcy5wb3NpdGlvbi5sZWZ0ICsgJ3B4J1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICB0aGlzLnNob3cgICAgICAgICAgICAgPSAhdGhpcy5zaG93XG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYmx1ckV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmx1ckV2ZW50LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9jdXNFdmVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlZW50ZXJFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlZW50ZXJFdmVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlbGVhdmVFdmVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaWNrRXZlbnQpIHRoaXMuX2NsaWNrRXZlbnQucmVtb3ZlKClcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICBAQ29tcG9uZW50KCd0YWInKVxuICAgIGV4cG9ydCBjbGFzcyBUYWJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICAgICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZTpzdHJpbmcgPSBgXG4gICAgPGRpdiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1wYW5lXCJcbiAgICAgICAgdi1iaW5kOmNsYXNzPVwie2hpZGU6IXNob3d9XCJcbiAgICAgICAgdi1zaG93PVwic2hvd1wiXG4gICAgICAgIDp0cmFuc2l0aW9uPVwidHJhbnNpdGlvblwiXG4gICAgPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG4gICAgPHN0eWxlIHNjb3BlZD5cbiAgICAgIC50YWItY29udGVudCA+IC50YWItcGFuZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgICAgLnRhYi1jb250ZW50ID4gLnRhYi1wYW5lLmhpZGUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG4gICAgPC9zdHlsZT5cbiAgICBgO1xuXG4gICAgICAgICRwYXJlbnQ6VGFic2V0Q29tcG9uZW50O1xuXG4gICAgICAgIEBQcm9wKHt0eXBlOiBTdHJpbmd9KSBoZWFkZXI6c3RyaW5nO1xuICAgICAgICBAUHJvcCh7dHlwZTogQm9vbGVhbiwgJ2RlZmF1bHQnOiAoKT0+ZmFsc2V9KSBkaXNhYmxlZDpzdHJpbmc7XG5cblxuICAgICAgICBzaG93OmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaW5kZXg6bnVtYmVyID0gMDtcblxuICAgICAgICBnZXQgc2hvdygpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLiRwYXJlbnQuYWN0aXZlSW5kZXggPT0gdGhpcy5pbmRleCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0IHRyYW5zaXRpb24oKTpzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5lZmZlY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBATGlmZWN5Y2xlSG9vaygnY3JlYXRlZCcpIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucmVuZGVyRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBoZWFkZXIgIDogdGhpcy5oZWFkZXIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBATGlmZWN5Y2xlSG9vaygncmVhZHknKSByZWFkeSgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgaW4gdGhpcy4kcGFyZW50LiRjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQuJGNoaWxkcmVuW2NdLiRlbCA9PSB0aGlzLiRlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIHBhY2thZGljIHtcbiAgICBAQ29tcG9uZW50KCd0YWJzJylcbiAgICBleHBvcnQgY2xhc3MgVGFic2V0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGU6c3RyaW5nID0gYFxuICAgIDxkaXY+XG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiXG4gICAgICAgICAgICAgICAgdi1mb3I9XCJyIGluIHJlbmRlckRhdGFcIlxuXG4gICAgICAgICAgICAgICAgQGNsaWNrLnByZXZlbnQ9XCJoYW5kbGVUYWJMaXN0Q2xpY2soJGluZGV4LCByKVwiXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWQgPT09IHRydWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgdi1iaW5kOmNsYXNzPVwieyAnYWN0aXZlJzogKCRpbmRleCA9PT0gYWN0aXZlSW5kZXgpIH1cIiBjbGFzcz1cIm5hdi1saW5rXCI+e3tyLmhlYWRlcn19PC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCIgdi1lbD1cInRhYkNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcblxuICAgICAgICBAUHJvcCh7dHlwZTogU3RyaW5nLCAnZGVmYXVsdCc6ICgpPT4nZmFkZWluJ30pIGVmZmVjdDpzdHJpbmc7XG5cbiAgICAgICAgcmVuZGVyRGF0YTphbnlbXSAgID0gW107XG4gICAgICAgIGFjdGl2ZUluZGV4Om51bWJlciA9IDA7XG5cbiAgICAgICAgaGFuZGxlVGFiTGlzdENsaWNrKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgaWYgKCFlbC5kaXNhYmxlZCkgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG5cbiAgICAvKiAqL1xuLy8gRCAgICAgcGFnZS1sb2FkZXJcbiAgICAvKiAqL1xuICAgIEBEaXJlY3RpdmUoJ3BhZ2UtbG9hZGVyJylcbiAgICBleHBvcnQgY2xhc3MgUGFnZUxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUge1xuICAgICAgICAvL3N0YXRpYyBwYXJhbXM6YW55W10gPSBbJ2xvYWRlciddO1xuICAgICAgICAvL1xuICAgICAgICAvL0BQYXJhbVdhdGNoZXIoJ3Nob3cnKVxuICAgICAgICAvL3dhdGNoU2hvdyh2YWw6YW55LCBvbGRWYWw6YW55KSB7XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCd3YXRjaCBzaG93Jyk7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHVwZGF0ZShzaG93TG9hZGVyOmFueSwgb2RsdmFsOmFueSkgeyAgICAgICAgICAvLyBjb25zb2xlLmxvZygncGFnZS1sYW9kZSB1cGRhdGUnLCBzaG93TG9hZGVyKTtcbiAgICAgICAgICAgIHZhciBoYXNDbGFzczpib29sZWFuID0gdGhpcy5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2UtbG9hZGluZycpO1xuICAgICAgICAgICAgc2hvd0xvYWRlciA9PT0gdHJ1ZSAmJiBoYXNDbGFzcyA9PT0gZmFsc2UgJiYgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwYWdlLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIHNob3dMb2FkZXIgPT09IGZhbHNlICYmIGhhc0NsYXNzID09PSB0cnVlICYmIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGFnZS1sb2FkaW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qICovXG4vLyBEICAgICB0ZXN0LWRpcmVjdGl2ZVxuICAgIC8qICovXG4gICAgQERpcmVjdGl2ZSgndGVzdC1kaXJlY3RpdmUnKVxuICAgIGV4cG9ydCBjbGFzcyBUZXN0RGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZSB7XG4gICAgICAgIHN0YXRpYyBwYXJhbXM6YW55W10gPSBbJ2EnXTtcblxuICAgICAgICBAUGFyYW1XYXRjaGVyKCdhJylcbiAgICAgICAgd2F0Y2hBKHZhbDphbnksIG9sZFZhbDphbnkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3YXRjaCBhJylcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBwYWNrYWRpYyB7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VUcmFuc2l0aW9uIGltcGxlbWVudHMgSVRyYW5zaXRpb24ge1xuICAgICAgICBlbnRlckNhbmNlbGxlZChlbCkge1xuICAgICAgICAgICAgJChlbCkuc3RvcCgpXG4gICAgICAgIH1cblxuICAgICAgICBsZWF2ZUNhbmNlbGxlZChlbCkge1xuICAgICAgICAgICAgJChlbCkuc3RvcCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc3BlZWQoZWw6SFRNTEVsZW1lbnQsIGRlZjpudW1iZXIgPSA1MDApOm51bWJlciB7XG4gICAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUoJ3RyYW5zaXRpb24tc3BlZWQnKSA/IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgndHJhbnNpdGlvbi1zcGVlZCcpKSA6IGRlZjtcbiAgICB9XG5cbiAgICBAVHJhbnNpdGlvbignZmFkZScsIGZhbHNlKVxuICAgIGV4cG9ydCBjbGFzcyBGYWRlVHJhbnNpdGlvbiBleHRlbmRzIEJhc2VUcmFuc2l0aW9uIHtcbiAgICAgICAgZW50ZXIoZWw6SFRNTEVsZW1lbnQsIGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBzcGVlZDpudW1iZXIgPSBfc3BlZWQoZWwpO1xuICAgICAgICAgICAgJChlbClcbiAgICAgICAgICAgICAgICAuY3NzKCdvcGFjaXR5JywgMClcbiAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHNwZWVkLCBkb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxlYXZlKGVsLCBkb25lKSB7XG4gICAgICAgICAgICB2YXIgc3BlZWQ6bnVtYmVyID0gX3NwZWVkKGVsKTtcbiAgICAgICAgICAgICQoZWwpLmFuaW1hdGUoe29wYWNpdHk6IDB9LCBzcGVlZCwgZG9uZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBAVHJhbnNpdGlvbignZmFkZWluJywgZmFsc2UpXG4gICAgZXhwb3J0IGNsYXNzIEZhZGVJblRyYW5zaXRpb24gZXh0ZW5kcyBCYXNlVHJhbnNpdGlvbiB7XG4gICAgICAgIGVudGVyKGVsOkhUTUxFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICB2YXIgc3BlZWQ6bnVtYmVyID0gX3NwZWVkKGVsKTtcbiAgICAgICAgICAgICQoZWwpXG4gICAgICAgICAgICAgICAgLmNzcygnb3BhY2l0eScsIDApXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe29wYWNpdHk6IDF9LCBzcGVlZCwgZG9uZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQFRyYW5zaXRpb24oJ2ZhZGVvdXQnLCBmYWxzZSlcbiAgICBleHBvcnQgY2xhc3MgRmFkZU91dFRyYW5zaXRpb24gZXh0ZW5kcyBCYXNlVHJhbnNpdGlvbiB7XG4gICAgICAgIGxlYXZlKGVsLCBkb25lKSB7XG4gICAgICAgICAgICB2YXIgc3BlZWQ6bnVtYmVyID0gX3NwZWVkKGVsKTtcbiAgICAgICAgICAgICQoZWwpLmFuaW1hdGUoe29wYWNpdHk6IDB9LCBzcGVlZCwgZG9uZSlcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgQFRyYW5zaXRpb24oJ3ZpZXctZmFkZScsIGZhbHNlKVxuICAgIGV4cG9ydCBjbGFzcyBWaWV3RmFkZVRyYW5zaXRpb24gZXh0ZW5kcyBCYXNlVHJhbnNpdGlvbiB7XG4gICAgICAgIGVudGVyKGVsOkhUTUxFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICB2YXIgc3BlZWQ6bnVtYmVyID0gX3NwZWVkKGVsKTtcbiAgICAgICAgICAgICQoZWwpXG4gICAgICAgICAgICAgICAgLmNzcyh7J21hcmdpbi1sZWZ0JzogMTAwLCAnb3BhY2l0eSc6IDB9KVxuICAgICAgICAgICAgICAgIC5hbmltYXRlKHsnbWFyZ2luLWxlZnQnOiAwLCAnb3BhY2l0eSc6IDF9LCBzcGVlZCwgZG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZWF2ZShlbDpIVE1MRWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgdmFyIHNwZWVkOm51bWJlciA9IF9zcGVlZChlbCk7XG4gICAgICAgICAgICAkKGVsKVxuICAgICAgICAgICAgICAgIC5jc3MoeydtYXJnaW4tbGVmdCc6IDAsICdvcGFjaXR5JzogMX0pXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoeydtYXJnaW4tbGVmdCc6IDEwMCwgJ29wYWNpdHknOiAwfSwgc3BlZWQsIGRvbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=