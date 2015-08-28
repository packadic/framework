var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plugins = require('app/plugins');
var ExamplePlugin = (function (_super) {
    __extends(ExamplePlugin, _super);
    function ExamplePlugin() {
        _super.apply(this, arguments);
    }
    ExamplePlugin.prototype._create = function () {
        console.log('Creating new ');
    };
    ExamplePlugin.prototype.echo = function () {
        console.log('ECHOING', arguments);
    };
    return ExamplePlugin;
})(plugins.BasePlugin);
plugins.register('example', ExamplePlugin);
module.exports = ExamplePlugin;
//# sourceMappingURL=example.js.map