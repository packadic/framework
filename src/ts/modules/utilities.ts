/// <reference path="../types.d.ts" />
import $ = require('jquery');

module utilities {
    var kindsOf:any = {};
    'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
        kindsOf['[object ' + k + ']'] = k.toLowerCase();
    });
    var nativeTrim = String.prototype.trim;
    export function round(value, places) {
        var multiplier = Math.pow(10, places);
        return (Math.round(value * multiplier) / multiplier);
    }

    export function ucfirst(str:string):string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    export function makeString(object) {
        if (object == null) return '';
        return '' + object;
    }

    export function escapeRegExp(str) {
        return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }

    export function defaultToWhiteSpace(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + escapeRegExp(characters) + ']';
    }

    export function trim(str:string, characters?:any):string {
        str = makeString(str);
        if (!characters && nativeTrim) return nativeTrim.call(str);
        characters = defaultToWhiteSpace(characters);
        return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
    }

    export function unquote(str, quoteChar) {
        quoteChar = quoteChar || '"';
        if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
            return str.slice(1, str.length - 1);
        else return str;
    }

    export function def(val, def) {
        return defined(val) ? val : def;
    }

    export function defined(obj?:any) {
        return !_.isUndefined(obj);
    }

    export function cre(name?:string) {
        if (!defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }

    export function getParts(str):any {
        return str.replace(/\\\./g, '\uffff').split('.').map(function (s) {
            return s.replace(/\uffff/g, '.');
        });
    }

    export function objectGet(obj?:any, parts?:any, create?:any):any {
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

    export function objectSet(obj, parts, value) {
        parts = getParts(parts);

        var prop = parts.pop();
        obj = objectGet(obj, parts, true);
        if (obj && typeof obj === 'object') {
            return (obj[prop] = value);
        }
    }

    export function objectExists(obj, parts) {
        parts = getParts(parts);

        var prop = parts.pop();
        obj = objectGet(obj, parts);

        return typeof obj === 'object' && obj && prop in obj;
    }

    export function kindOf(value:any):any {
        // Null or undefined.
        if (value == null) {
            return String(value);
        }
        // Everything else.
        return kindsOf[kindsOf.toString.call(value)] || 'object';
    }

    export function recurse(value:Object, fn:Function, fnContinue?:Function):any {
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
            } else if (kindOf(value) === 'array') {
                // If value is an array, recurse.
                return value.map(function (item, index) {
                    return recurse(item, fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + '[' + index + ']',
                    });
                });
            } else if (kindOf(value) === 'object') {
                // If value is an object, recurse.
                obj = {};
                for (key in value) {
                    obj[key] = recurse(value[key], fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + (/\W/.test(key) ? '["' + key + '"]' : '.' + key),
                    });
                }
                return obj;
            } else {
                // Otherwise pass value into fn and return.
                return fn(value);
            }
        }

        return recurse(value, fn, fnContinue, {objs: [], path: ''});
    }

    export function copyObject<T> (object:T):T {
        var objectCopy = <T>{};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }

    export function getViewPort():any {
        var e:any = window,
            a:any = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }

        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };
    }

    export function isTouchDevice():boolean {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    export function getRandomId(length?:number):string {
        if (!_.isNumber(length)) {
            length = 15;
        }
        var text:string = "";
        var possible:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    export function applyMixins(derivedCtor:any, baseCtors:any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        });
    }


    export function addJqueryUtils() {
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

        $.fn.removeAttributes = function ():JQuery {
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

        $.fn.ensureClass = function (clas:string, has:boolean = true):JQuery {

            var $this:JQuery = $(this);
            if (has === true && $this.hasClass(clas) === false) {
                $this.addClass(clas);
            } else if (has === false && $this.hasClass(clas) === true) {
                $this.removeClass(clas);
            }
            return this;
        };
    }

}

export = utilities;
