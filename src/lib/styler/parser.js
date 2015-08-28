var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fs = require('fs');
var _s = require('underscore.string');
var base_1 = require('./base');
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        _super.apply(this, arguments);
    }
    Parser.prototype.parseVariableFiles = function (filePaths) {
        var self = this;
        var data = {
            var2file: {},
            values: {},
            variables: {}
        };
        filePaths.forEach(function (filePath) {
            base_1.log(filePath);
            self.parseStyleVars(filePath, function (parsed) {
                data.var2file[parsed.name] = filePath;
                data.variables[parsed.name] = parsed;
                data.values[parsed.name] = parsed.value;
            });
        });
        return data;
    };
    Parser.prototype.readStyle = function (filePath) {
        return fs.readFileSync(this.styler.stylePath(filePath));
    };
    Parser.prototype.parseVarValue = function (name, val) {
        var parsed = { 'name': name, 'default': false, 'type': 'text', 'value': null };
        if (_s.contains(val, '!default')) {
            parsed.default = true;
            val = _s.trim(val.replace('!default', ''));
        }
        // check is color type
        if (_s.startsWith(val, '#')) {
            parsed.type = 'color';
            var exp = /^(\#[\w\d]*?)$/;
            var matches = val.match(exp);
            if (matches.length == 2) {
                val = matches[matches.length - 1].toString().toUpperCase();
            }
        }
        parsed.value = val;
        return parsed;
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