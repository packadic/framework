var index_1 = require('./styler/index');
exports.VERSION = require('./../../bower.json').version;
exports.styler = new index_1.Styler();
function test() {
    exports.styler.createStyles(['stylesheet.scss', 'themes/theme-default.scss']);
    var variables = exports.styler.parser.parseVariableFiles(['_variables.scss', '_theme-variables.scss']);
    //  log(variables);
}
exports.test = test;
//# sourceMappingURL=index.js.map