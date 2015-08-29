var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fs = require('fs');
var _s = require('underscore.string');
var material = require('./../../ts/modules/material');
var base_1 = require('./base');
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        _super.apply(this, arguments);
    }
    Parser.prototype.createParsedValue = function (name, val) {
        return {
            'name': name,
            'default': false,
            'type': 'text',
            'value': null,
            'original': val,
            'overides': false,
            'overidden': false,
            'other': null
        };
    };
    Parser.prototype.parseVarValue = function (name, val) {
        var parsed = this.createParsedValue(name, val);
        var matExp = /material-color\([\'\"](.*?)[\'\"](?:\,[\s|]*|)(?:[\'\"](.*?)[\'\"]|)\)/;
        var colorExp = /^(\#[\w\d]*?)$/;
        if (_s.contains(val, '!default')) {
            parsed.default = true;
            val = _s.trim(val.replace('!default', ''));
        }
        if (_s.contains(val, 'material-color') && matExp.test(val)) {
            parsed.type = 'material-color';
            var matches = val.match(matExp);
            if (matches.length === 3) {
                val = material.color(matches[1], matches[2]);
            }
            else if (matches.length === 2) {
                val = material.color(matches[1]);
            }
            val = val.toString().toUpperCase();
        }
        if (_s.startsWith(val, '#') && colorExp.test(val)) {
            parsed.type = 'color';
            var matches = val.match(colorExp);
            if (matches.length == 2) {
                val = matches[matches.length - 1].toString().toUpperCase();
            }
        }
        parsed.value = val;
        return parsed;
    };
    Parser.prototype.parseVariableFiles = function (filePaths) {
        var self = this;
        var data = { assoc: {}, detailed: {}, tree: {} };
        filePaths.forEach(function (filePath) {
            if (typeof data.tree[filePath] === 'undefined') {
                data.tree[filePath] = {};
            }
            self.parseStyleVars(filePath, function (parsed) {
                parsed.file = filePath;
                var save = false;
                if (typeof data.detailed[parsed.name] !== 'undefined') {
                    if (parsed.default) {
                        data.detailed[parsed.name].overides = true;
                        data.detailed[parsed.name].other = parsed.file;
                        parsed.overidden = true;
                        parsed.other = data.detailed[parsed.name].file;
                    }
                    else {
                        save = true;
                        parsed.overides = true;
                        parsed.other = data.detailed[parsed.name].file;
                        data.detailed[parsed.name].overidden = true;
                        data.detailed[parsed.name].other = parsed.file;
                    }
                }
                else {
                    save = true;
                }
                if (save) {
                    data.detailed[parsed.name] = parsed;
                    data.assoc[parsed.name] = parsed.value;
                }
                data.tree[filePath][parsed.name] = parsed;
            });
        });
        return data;
    };
    Parser.prototype.readStyle = function (filePath) {
        return fs.readFileSync(this.styler.stylePath(filePath));
    };
    Parser.prototype.parseStyleVars = function (filePath, eachCb) {
        var scssContent = fs.readFileSync(this.styler.stylePath(filePath)).toString();
        var exp = /\$([\w-]*?):[\s\t]*(.*?);/g;
        var matches;
        while (matches = exp.exec(scssContent)) {
            if (matches.length !== 3) {
                continue;
            }
            var parsed = this.parseVarValue(matches[1], matches[2]);
            if (typeof eachCb === 'function') {
                eachCb(parsed);
            }
        }
    };
    return Parser;
})(base_1.BaseStylerModule);
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map