/// <reference path="../types.d.ts" />
declare var exports:any;
declare var module:any;
declare var global:any = window;

var trim = require('./trim');
var decap = require('./decapitalize');

export function camelize(str, decapitalize) {
    str = trim(str).replace(/[-_\s]+(.)?/g, function (match, c) {
        return c ? c.toUpperCase() : "";
    });

    if (decapitalize === true) {
        return decap(str);
    } else {
        return str;
    }
};


var makeString = require('./helper/makeString');

export function capitalize(str, lowercaseRest) {
    str = makeString(str);
    var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

    return str.charAt(0).toUpperCase() + remainingChars;
};


var makeString = require('./helper/makeString');

export function chars(str) {
    return makeString(str).split('');
};


export function chop(str, step) {
    if (str == null) return [];
    str = String(str);
    step = ~~step;
    return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

var capitalize = require('./capitalize');
var camelize = require('./camelize');
var makeString = require('./helper/makeString');

export function classify(str) {
    str = makeString(str);
    return capitalize(camelize(str.replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
};


var trim = require('./trim');

export function clean(str) {
    return trim(str).replace(/\s+/g, ' ');
};


var makeString = require('./helper/makeString');
//
//export function(str, substr) {
//    str = makeString(str);
//    substr = makeString(substr);
//
//    if (str.length === 0 || substr.length === 0) return 0;
//
//    return str.split(substr).length - 1;
//};


var trim = require('./trim');

export function dasherize(str) {
    return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};


var makeString = require('./helper/makeString');

export function decapitalize(str) {
    str = makeString(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
};


var makeString = require('./helper/makeString');

function getIndent(str) {
    var matches = str.match(/^[\s\\t]*/gm);
    var indent = matches[0].length;

    for (var i = 1; i < matches.length; i++) {
        indent = Math.min(matches[i].length, indent);
    }

    return indent;
}

export function dedent(str, pattern) {
    str = makeString(str);
    var indent = getIndent(str);
    var reg;

    if (indent === 0) return str;

    if (typeof pattern === 'string') {
        reg = new RegExp('^' + pattern, 'gm');
    } else {
        reg = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    }

    return str.replace(reg, '');
};


var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

export function endsWith(str, ends, position) {
    str = makeString(str);
    ends = '' + ends;
    if (typeof position == 'undefined') {
        position = str.length - ends.length;
    } else {
        position = Math.min(toPositive(position), str.length) - ends.length;
    }
    return position >= 0 && str.indexOf(ends, position) === position;
};


var makeString = require('./helper/makeString');
var escapeChars = require('./helper/escapeChars');
var reversedEscapeChars = {};

var regexString = "[";
for (var key in escapeChars) {
    regexString += key;
}
regexString += "]";

var regex = new RegExp(regexString, 'g');

export function escapeHTML(str) {

    return makeString(str).replace(regex, function (m) {
        return '&' + escapeChars[m] + ';';
    });
};

//
//export function() {
//    var result = {};
//
//    for (var prop in this) {
//        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse|join)$/)) continue;
//        result[prop] = this[prop];
//    }
//
//    return result;
//}

//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '3.1.1'

'use strict';

function s(value) {
    /* jshint validthis: true */
    if (!(this instanceof s)) return new s(value);
    this._wrapped = value;
}

declare var s:any;
s.VERSION = '3.1.1';

s.isBlank = require('./isBlank');
s.stripTags = require('./stripTags');
s.capitalize = require('./capitalize');
s.decapitalize = require('./decapitalize');
s.chop = require('./chop');
s.trim = require('./trim');
s.clean = require('./clean');
s.count = require('./count');
s.chars = require('./chars');
s.swapCase = require('./swapCase');
s.escapeHTML = require('./escapeHTML');
s.unescapeHTML = require('./unescapeHTML');
s.splice = require('./splice');
s.insert = require('./insert');
s.replaceAll = require('./replaceAll');
s.include = require('./include');
s.join = require('./join');
s.lines = require('./lines');
s.dedent = require('./dedent');
s.reverse = require('./reverse');
s.startsWith = require('./startsWith');
s.endsWith = require('./endsWith');
s.pred = require('./pred');
s.succ = require('./succ');
s.titleize = require('./titleize');
s.camelize = require('./camelize');
s.underscored = require('./underscored');
s.dasherize = require('./dasherize');
s.classify = require('./classify');
s.humanize = require('./humanize');
s.ltrim = require('./ltrim');
s.rtrim = require('./rtrim');
s.truncate = require('./truncate');
s.prune = require('./prune');
s.words = require('./words');
s.pad = require('./pad');
s.lpad = require('./lpad');
s.rpad = require('./rpad');
s.lrpad = require('./lrpad');
s.sprintf = require('./sprintf');
s.vsprintf = require('./vsprintf');
s.toNumber = require('./toNumber');
s.numberFormat = require('./numberFormat');
s.strRight = require('./strRight');
s.strRightBack = require('./strRightBack');
s.strLeft = require('./strLeft');
s.strLeftBack = require('./strLeftBack');
s.toSentence = require('./toSentence');
s.toSentenceSerial = require('./toSentenceSerial');
s.slugify = require('./slugify');
s.surround = require('./surround');
s.quote = require('./quote');
s.unquote = require('./unquote');
s.repeat = require('./repeat');
s.naturalCmp = require('./naturalCmp');
s.levenshtein = require('./levenshtein');
s.toBoolean = require('./toBoolean');
s.exports = require('./exports');
s.escapeRegExp = require('./helper/escapeRegExp');

// Aliases
s.strip = s.trim;
s.lstrip = s.ltrim;
s.rstrip = s.rtrim;
s.center = s.lrpad;
s.rjust = s.lpad;
s.ljust = s.rpad;
s.contains = s.include;
s.q = s.quote;
s.toBool = s.toBoolean;
s.camelcase = s.camelize;


// Implement chaining
s.prototype = {
    value: function value() {
        return this._wrapped;
    }
};

function fn2method(key, fn) {
    if (typeof fn !== "function") return;
    s.prototype[key] = function () {
        var args = [this._wrapped].concat(Array.prototype.slice.call(arguments));
        var res = fn.apply(null, args);
        // if the result is non-string stop the chain and return the value
        return typeof res === 'string' ? new s(res) : res;
    };
}

// Copy functions to instance methods for chaining
for (var key in s) fn2method(key, s[key]);

fn2method("tap", function tap(string, fn) {
    return fn(string);
});

function prototype2method(methodName) {
    fn2method(methodName, function (context) {
        var args = Array.prototype.slice.call(arguments, 1);
        return String.prototype[methodName].apply(context, args);
    });
}

var prototypeMethods = [
    "toUpperCase",
    "toLowerCase",
    "split",
    "replace",
    "slice",
    "substring",
    "substr",
    "concat"
];

for (var key in prototypeMethods) prototype2method(prototypeMethods[key]);


export var s;


var makeString = require('./makeString');

export function adjacent(str, direction) {
    str = makeString(str);
    if (str.length === 0) {
        return '';
    }
    return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + direction);
};


var escapeRegExp = require('./escapeRegExp');

export function defaultToWhiteSpace(characters) {
    if (characters == null)
        return '\\s';
    else if (characters.source)
        return characters.source;
    else
        return '[' + escapeRegExp(characters) + ']';
};


/* We're explicitly defining the list of entities we want to escape.
 nbsp is an HTML entity, but we don't want to escape all space characters in a string, hence its omission in this map.

 */
var escapeChars = {
    '¢': 'cent',
    '£': 'pound',
    '¥': 'yen',
    '€': 'euro',
    '©': 'copy',
    '®': 'reg',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    "'": '#39'
};

export var escapeChars;


var makeString = require('./makeString');

export function escapeRegExp(str) {
    return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};


/*
 We're explicitly defining the list of entities that might see in escape HTML strings
 */
var htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
};

export var htmlEntities;


/**
 * Ensure some object is a coerced to a string
 **/
export function makeString(object) {
    if (object == null) return '';
    return '' + object;
};


export function strRepeat(str, qty) {
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
        if (qty & 1) result += str;
        qty >>= 1, str += str;
    }
    return result;
};


export function toPositive(number) {
    return number < 0 ? 0 : (+number || 0);
};


var capitalize = require('./capitalize');
var underscored = require('./underscored');
var trim = require('./trim');

export function humanize(str) {
    return capitalize(trim(underscored(str).replace(/_id$/, '').replace(/_/g, ' ')));
};


var makeString = require('./helper/makeString');

export function include(str, needle) {
    if (needle === '') return true;
    return makeString(str).indexOf(needle) !== -1;
};


var splice = require('./splice');

export function insert(str, i, substr) {
    return splice(str, i, 0, substr);
};


var makeString = require('./helper/makeString');

export function isBlank(str) {
    return (/^\s*$/).test(makeString(str));
};


var makeString = require('./helper/makeString');
var slice = [].slice;

export function join() {
    var args = slice.call(arguments),
        separator = args.shift();

    return args.join(makeString(separator));
};


var makeString = require('./helper/makeString');

/**
 * Based on the implementation here: https://github.com/hiddentao/fast-levenshtein
 */
export function levenshtein(str1, str2) {
    'use strict';
    str1 = makeString(str1);
    str2 = makeString(str2);

    // Short cut cases
    if (str1 === str2) return 0;
    if (!str1 || !str2) return Math.max(str1.length, str2.length);

    // two rows
    var prevRow = new Array(str2.length + 1);

    // initialise previous row
    for (var i = 0; i < prevRow.length; ++i) {
        prevRow[i] = i;
    }

    // calculate current row distance from previous row
    for (i = 0; i < str1.length; ++i) {
        var nextCol = i + 1;

        for (var j = 0; j < str2.length; ++j) {
            var curCol = nextCol;

            // substution
            nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
            // insertion
            var tmp = curCol + 1;
            if (nextCol > tmp) {
                nextCol = tmp;
            }
            // deletion
            tmp = prevRow[j + 1] + 1;
            if (nextCol > tmp) {
                nextCol = tmp;
            }

            // copy current col value into previous (in preparation for next iteration)
            prevRow[j] = curCol;
        }

        // copy last col value into previous (in preparation for next iteration)
        prevRow[j] = nextCol;
    }

    return nextCol;
};


export function lines(str) {
    if (str == null) return [];
    return String(str).split(/\r?\n/);
};


var pad = require('./pad');

export function lpad(str, length, padStr) {
    return pad(str, length, padStr);
};


var pad = require('./pad');

export function lrpad(str, length, padStr) {
    return pad(str, length, padStr, 'both');
};


var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimLeft = String.prototype.trimLeft;

export function ltrim(str, characters) {
    str = makeString(str);
    if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
    characters = defaultToWhiteSpace(characters);
    return str.replace(new RegExp('^' + characters + '+'), '');
};


export function naturalCmp(str1, str2) {
    if (str1 == str2) return 0;
    if (!str1) return -1;
    if (!str2) return 1;

    var cmpRegex = /(\.\d+|\d+|\D+)/g,
        tokens1 = String(str1).match(cmpRegex),
        tokens2 = String(str2).match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

    for (var i = 0; i < count; i++) {
        var a = tokens1[i],
            b = tokens2[i];

        if (a !== b) {
            var num1 = +a;
            var num2 = +b;
            if (num1 === num1 && num2 === num2) {
                return num1 > num2 ? 1 : -1;
            }
            return a < b ? -1 : 1;
        }
    }

    if (tokens1.length != tokens2.length)
        return tokens1.length - tokens2.length;

    return str1 < str2 ? -1 : 1;
};


export function numberFormat(number, dec, dsep, tsep) {
    if (isNaN(number) || number == null) return '';

    number = number.toFixed(~~dec);
    tsep = typeof tsep == 'string' ? tsep : ',';

    var parts = number.split('.'),
        fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

    return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};


var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

export function pad(str, length, padStr, type) {
    str = makeString(str);
    length = ~~length;

    var padlen = 0;

    if (!padStr)
        padStr = ' ';
    else if (padStr.length > 1)
        padStr = padStr.charAt(0);

    switch (type) {
        case 'right':
            padlen = length - str.length;
            return str + strRepeat(padStr, padlen);
        case 'both':
            padlen = length - str.length;
            return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
        default: // 'left'
            padlen = length - str.length;
            return strRepeat(padStr, padlen) + str;
    }
};


var adjacent = require('./helper/adjacent');

export function succ(str) {
    return adjacent(str, -1);
};


/**
 * _s.prune: a more elegant version of truncate
 * prune extra chars, never leaving a half-chopped word.
 * @author github.com/rwz
 */
var makeString = require('./helper/makeString');
var rtrim = require('./rtrim');

export function prune(str, length, pruneStr) {
    str = makeString(str);
    length = ~~length;
    pruneStr = pruneStr != null ? String(pruneStr) : '...';

    if (str.length <= length) return str;

    var tmpl = function (c) {
            return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
        },
        template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

    if (template.slice(template.length - 2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
    else
        template = rtrim(template.slice(0, template.length - 1));

    return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
};


var surround = require('./surround');

export function quote(str, quoteChar) {
    return surround(str, quoteChar || '"');
};


var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

export function repeat(str, qty, separator) {
    str = makeString(str);

    qty = ~~qty;

    // using faster implementation if separator is not needed;
    if (separator == null) return strRepeat(str, qty);

    // this one is about 300x slower in Google Chrome
    for (var repeat = []; qty > 0; repeat[--qty] = str) {
    }
    return repeat.join(separator);
};


var makeString = require('./helper/makeString');

export function replaceAll(str, find, replace, ignorecase) {
    var flags = (ignorecase === true) ? 'gi' : 'g';
    var reg = new RegExp(find, flags);

    return makeString(str).replace(reg, replace);
};


var chars = require('./chars');

export function reverse(str) {
    return chars(str).reverse().join('');
};


var pad = require('./pad');

export function rpad(str, length, padStr) {
    return pad(str, length, padStr, 'right');
};


var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimRight = String.prototype.trimRight;

export function rtrim(str, characters) {
    str = makeString(str);
    if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
    characters = defaultToWhiteSpace(characters);
    return str.replace(new RegExp(characters + '+$'), '');
};


var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var trim = require('./trim');
var dasherize = require('./dasherize');

export function slugify(str) {
    var from = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșšŝťțŭùúüűûñÿýçżźž",
        to = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssttuuuuuunyyczzz",
        regex = new RegExp(defaultToWhiteSpace(from), 'g');

    str = makeString(str).toLowerCase().replace(regex, function (c) {
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
    });

    return trim(dasherize(str.replace(/[^\w\s-]/g, '-')), '-');
};


var chars = require('./chars');

export function splice(str, i, howmany, substr) {
    var arr = chars(str);
    arr.splice(~~i, ~~howmany, substr);
    return arr.join('');
};


// sprintf() for JavaScript 0.7-beta1
// http://www.diveintojavascript.com/projects/javascript-sprintf
//
// Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
// All rights reserved.
var strRepeat:any = require('./helper/strRepeat');
var toString = Object.prototype.toString;
var sprintf = (function () {
    function get_type(variable) {
        return toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat:any = strRepeat;

    var str_format:any = function () {
        if (!str_format.cache.hasOwnProperty(arguments[0])) {
            str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
        }
        return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function (parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i]);
            if (node_type === 'string') {
                output.push(parse_tree[i]);
            }
            else if (node_type === 'array') {
                match = parse_tree[i]; // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor];
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
                        }
                        arg = arg[match[2][k]];
                    }
                } else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]];
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++];
                }

                if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
                    throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
                }
                switch (match[8]) {
                    case 'b':
                        arg = arg.toString(2);
                        break;
                    case 'c':
                        arg = String.fromCharCode(arg);
                        break;
                    case 'd':
                        arg = parseInt(arg, 10);
                        break;
                    case 'e':
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                        break;
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                        break;
                    case 'o':
                        arg = arg.toString(8);
                        break;
                    case 's':
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
                        break;
                    case 'u':
                        arg = Math.abs(arg);
                        break;
                    case 'x':
                        arg = arg.toString(16);
                        break;
                    case 'X':
                        arg = arg.toString(16).toUpperCase();
                        break;
                }
                arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
                pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
                pad_length = match[6] - String(arg).length;
                pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                output.push(match[5] ? arg + pad : pad + arg);
            }
        }
        return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function (fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
        while (_fmt) {
            if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                parse_tree.push(match[0]);
            }
            else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                parse_tree.push('%');
            }
            else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1;
                    var field_list = [], replacement_field = match[2], field_match = [];
                    if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1]);
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            }
                            else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            }
                            else {
                                throw new Error('[_.sprintf] huh?');
                            }
                        }
                    }
                    else {
                        throw new Error('[_.sprintf] huh?');
                    }
                    match[2] = field_list;
                }
                else {
                    arg_names |= 2;
                }
                if (arg_names === 3) {
                    throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
                }
                parse_tree.push(match);
            }
            else {
                throw new Error('[_.sprintf] huh?');
            }
            _fmt = _fmt.substring(match[0].length);
        }
        return parse_tree;
    };

    return str_format;
})();

export var sprintf;


var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

export function startsWith(str, starts, position) {
    str = makeString(str);
    starts = '' + starts;
    position = position == null ? 0 : Math.min(toPositive(position), str.length);
    return str.lastIndexOf(starts, position) === position;
};


var makeString = require('./helper/makeString');

export function strLeft(str, sep) {
    str = makeString(str);
    sep = makeString(sep);
    var pos = !sep ? -1 : str.indexOf(sep);
    return ~pos ? str.slice(0, pos) : str;
};


var makeString = require('./helper/makeString');

export function strLeftBack(str, sep) {
    str = makeString(str);
    sep = makeString(sep);
    var pos = str.lastIndexOf(sep);
    return ~pos ? str.slice(0, pos) : str;
};


var makeString = require('./helper/makeString');

export function strRight(str, sep) {
    str = makeString(str);
    sep = makeString(sep);
    var pos = !sep ? -1 : str.indexOf(sep);
    return ~pos ? str.slice(pos + sep.length, str.length) : str;
};


var makeString = require('./helper/makeString');

export function strRightBack(str, sep) {
    str = makeString(str);
    sep = makeString(sep);
    var pos = !sep ? -1 : str.lastIndexOf(sep);
    return ~pos ? str.slice(pos + sep.length, str.length) : str;
};


var makeString = require('./helper/makeString');

export function stripTags(str) {
    return makeString(str).replace(/<\/?[^>]+>/g, '');
};


var adjacent = require('./helper/adjacent');

export function succ(str) {
    return adjacent(str, 1);
};


export function surround(str, wrapper) {
    return [wrapper, str, wrapper].join('');
};


var makeString = require('./helper/makeString');

export function swapCase(str) {
    return makeString(str).replace(/\S/g, function (c) {
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    });
};


var makeString = require('./helper/makeString');

export function titleize(str) {
    return makeString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function (c) {
        return c.toUpperCase();
    });
};


var trim = require('./trim');

function boolMatch(s, matchers) {
    var i, matcher, down = s.toLowerCase();
    matchers = [].concat(matchers);
    for (i = 0; i < matchers.length; i += 1) {
        matcher = matchers[i];
        if (!matcher) continue;
        if (matcher.test && matcher.test(s)) return true;
        if (matcher.toLowerCase() === down) return true;
    }
}

export function toBoolean(str, trueValues, falseValues) {
    if (typeof str === "number") str = "" + str;
    if (typeof str !== "string") return !!str;
    str = trim(str);
    if (boolMatch(str, trueValues || ["true", "1"])) return true;
    if (boolMatch(str, falseValues || ["false", "0"])) return false;
};


var trim = require('./trim');

export function toNumber(num, precision) {
    if (num == null) return 0;
    var factor = Math.pow(10, isFinite(precision) ? precision : 0);
    return Math.round(num * factor) / factor;
};


var rtrim = require('./rtrim');

export function toSentence(array, separator, lastSeparator, serial) {
    separator = separator || ', ';
    lastSeparator = lastSeparator || ' and ';
    var a = array.slice(),
        lastMember = a.pop();

    if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

    return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
};


var toSentence = require('./toSentence');

export function toSentenceSerial(array, sep, lastSep) {
    return toSentence(array, sep, lastSep, true);
};


var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrim = String.prototype.trim;

export function trim(str, characters) {
    str = makeString(str);
    if (!characters && nativeTrim) return nativeTrim.call(str);
    characters = defaultToWhiteSpace(characters);
    return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};


var makeString = require('./helper/makeString');

export function truncate(str, length, truncateStr) {
    str = makeString(str);
    truncateStr = truncateStr || '...';
    length = ~~length;
    return str.length > length ? str.slice(0, length) + truncateStr : str;
};


var trim = require('./trim');

export function underscored(str) {
    return trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};


var makeString = require('./helper/makeString');
var htmlEntities = require('./helper/htmlEntities');

export function unescapeHTML(str) {
    return makeString(str).replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
};


export function unquote(str, quoteChar) {
    quoteChar = quoteChar || '"';
    if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
        return str.slice(1, str.length - 1);
    else return str;
};


var sprintf = require('./sprintf');

export function vsprintf(fmt, argv) {
    argv.unshift(fmt);
    return sprintf.apply(null, argv);
};


var isBlank = require('./isBlank');
var trim = require('./trim');

export function words(str, delimiter) {
    if (isBlank(str)) return [];
    return trim(str, delimiter).split(delimiter || /\s+/);
};
