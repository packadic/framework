/// <reference path='./../types.d.ts' />
var util = require('util');
var _ = require('lodash');
var BaseStylerModule = (function () {
    function BaseStylerModule(styler) {
        this.styler = styler;
    }
    return BaseStylerModule;
})();
exports.BaseStylerModule = BaseStylerModule;
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var args = _.toArray(arguments);
    process.stdout.write(util.inspect(args.length === 1 ? args[0] : args, { colors: true }));
    process.stdout.write('\n');
}
exports.log = log;
function _dd() {
    log.apply(this, arguments);
    process.exit();
}
exports._dd = _dd;
// no circular error stringify
function stringify(o) {
    var cache = [];
    var str = JSON.stringify(o, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // Enable garbage collection
    return str;
}
exports.stringify = stringify;
//# sourceMappingURL=base.js.map