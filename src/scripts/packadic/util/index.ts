module packadic.util {
    declare var $:any;
    declare var _s:UnderscoreStringStatic;

    //export var _:any = require('lodash');
    //export var _s:any = require('underscore.string');
    export var str:UnderscoreStringStatic = _s;
    export var arr:_.LoDashStatic         = _;

    export module num {
        /**
         * Round a value to a precision
         * @param value
         * @param places
         * @returns {number}
         */
        export function round(value, places) {
            var multiplier = Math.pow(10, places);
            return (Math.round(value * multiplier) / multiplier);
        }

    }

    export interface OpenWindowOptions {
        width?:number;
        height?:number;
        url?:string;
        target?:string;
        features?:string;
        replace?:boolean;
        content?:string;
        cb?:Function;
    }

    export var openWindowDefaults:OpenWindowOptions = {
        width : 600,
        height: 600
    };

    export function openWindow(opts:OpenWindowOptions = {}):Window {
        opts    = _.merge(openWindowDefaults, opts);
        var win = window.open('', '', 'width=' + opts.width + ', height=' + opts.height);
        if (defined(opts.content)) {
            win.document.body.innerHTML = opts.content;
        }
        return win;
    }

    export function codeIndentFix(str:string) {
        var fix = (code:string, leading:boolean = true) => {
            var txt = code;
            if (leading) {
                txt = txt.replace(/^[\r\n]+/, "").replace(/\s+$/g, "");	// strip leading newline
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

    export function preCodeIndentFix(el:HTMLElement) {
        return codeIndentFix(el.textContent);
    }

    /**
     * Create a string from an object
     *
     * @param object
     * @returns {any}
     */
    export function makeString(object) {
        if (object == null) return '';
        return '' + object;
    }


    export function defaultToWhiteSpace(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + str.escapeRegExp(characters) + ']';
    }



    /**
     * If val is not defined, return def as default
     * @param val
     * @param def
     * @returns {any}
     */
    export function def(val, def) {
        return defined(val) ? val : def;
    }

    /**
     * Checks wether the passed variable is defined
     *
     * @param obj
     * @returns {boolean}
     */
    export function defined(obj?:any) {
        return !_.isUndefined(obj);
    }

    /**
     * Create a element wrapped in jQuery
     * @param name
     * @returns {JQuery}
     */
    export function cre(name?:string) {
        if (!defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }

    /**
     * Get the current viewport
     * @returns {{width: *, height: *}}
     */
    export function getViewPort():any {
        var e:any = window,
            a:any = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }

        return {
            width : e[a + 'Width'],
            height: e[a + 'Height']
        };
    }

    /**
     * Checks if the device currently used is a touch device
     * @returns {boolean}
     */
    export function isTouchDevice():boolean {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Get a random generated id string
     *
     * @param length
     * @returns {string}
     */
    export function getRandomId(length?:number):string {
        if (!_.isNumber(length)) {
            length = 15;
        }
        var text:string     = "";
        var possible:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    export function getTemplate(name):any {

        if (!defined(window['JST'][name])) {
            throw new Error('Template [' + name + '] not found');
        }
        return window['JST'][name];
    }
}
