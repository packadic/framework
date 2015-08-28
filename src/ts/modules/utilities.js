/// <reference path="../types.d.ts" />
var $ = require('jquery');
var utilities;
(function (utilities) {
    var kindsOf = {};
    'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
        kindsOf['[object ' + k + ']'] = k.toLowerCase();
    });
    var nativeTrim = String.prototype.trim;
    function round(value, places) {
        var multiplier = Math.pow(10, places);
        return (Math.round(value * multiplier) / multiplier);
    }
    utilities.round = round;
    function ucfirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    utilities.ucfirst = ucfirst;
    function makeString(object) {
        if (object == null)
            return '';
        return '' + object;
    }
    utilities.makeString = makeString;
    function escapeRegExp(str) {
        return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
    utilities.escapeRegExp = escapeRegExp;
    function defaultToWhiteSpace(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + escapeRegExp(characters) + ']';
    }
    utilities.defaultToWhiteSpace = defaultToWhiteSpace;
    function trim(str, characters) {
        str = makeString(str);
        if (!characters && nativeTrim)
            return nativeTrim.call(str);
        characters = defaultToWhiteSpace(characters);
        return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
    }
    utilities.trim = trim;
    function unquote(str, quoteChar) {
        quoteChar = quoteChar || '"';
        if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
            return str.slice(1, str.length - 1);
        else
            return str;
    }
    utilities.unquote = unquote;
    function def(val, def) {
        return defined(val) ? val : def;
    }
    utilities.def = def;
    function defined(obj) {
        return !_.isUndefined(obj);
    }
    utilities.defined = defined;
    function cre(name) {
        if (!defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }
    utilities.cre = cre;
    function getParts(str) {
        return str.replace(/\\\./g, '\uffff').split('.').map(function (s) {
            return s.replace(/\uffff/g, '.');
        });
    }
    utilities.getParts = getParts;
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
    utilities.objectGet = objectGet;
    function objectSet(obj, parts, value) {
        parts = getParts(parts);
        var prop = parts.pop();
        obj = objectGet(obj, parts, true);
        if (obj && typeof obj === 'object') {
            return (obj[prop] = value);
        }
    }
    utilities.objectSet = objectSet;
    function objectExists(obj, parts) {
        parts = getParts(parts);
        var prop = parts.pop();
        obj = objectGet(obj, parts);
        return typeof obj === 'object' && obj && prop in obj;
    }
    utilities.objectExists = objectExists;
    function kindOf(value) {
        // Null or undefined.
        if (value == null) {
            return String(value);
        }
        // Everything else.
        return kindsOf[kindsOf.toString.call(value)] || 'object';
    }
    utilities.kindOf = kindOf;
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
                // Skip value if necessary.
                return value;
            }
            else if (kindOf(value) === 'array') {
                // If value is an array, recurse.
                return value.map(function (item, index) {
                    return recurse(item, fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + '[' + index + ']',
                    });
                });
            }
            else if (kindOf(value) === 'object') {
                // If value is an object, recurse.
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
                // Otherwise pass value into fn and return.
                return fn(value);
            }
        }
        return recurse(value, fn, fnContinue, { objs: [], path: '' });
    }
    utilities.recurse = recurse;
    function copyObject(object) {
        var objectCopy = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }
        return objectCopy;
    }
    utilities.copyObject = copyObject;
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
    utilities.getViewPort = getViewPort;
    function isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }
    utilities.isTouchDevice = isTouchDevice;
    function getRandomId(length) {
        if (!_.isNumber(length)) {
            length = 15;
        }
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    utilities.getRandomId = getRandomId;
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    utilities.applyMixins = applyMixins;
    function addJqueryUtils() {
        if (kindOf($.fn.prefixedData) === 'function') {
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
    }
    utilities.addJqueryUtils = addJqueryUtils;
})(utilities || (utilities = {}));
module.exports = utilities;
//# sourceMappingURL=utilities.js.map