var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var path = require('path');
var fs = require('fs');
var sass = require('node-sass');
var fse = require('fs-extra');
var base_1 = require('./base');
var Compiler = (function (_super) {
    __extends(Compiler, _super);
    function Compiler() {
        _super.apply(this, arguments);
    }
    Compiler.prototype.compile = function (filePath, destPath) {
        var res = sass.renderSync({
            file: filePath,
            outFile: destPath,
            sourceMap: false,
            outputStyle: 'expanded'
        });
        fse.mkdirpSync(path.dirname(destPath));
        fs.writeFileSync(destPath, res.css);
        base_1.log('compiled ' + destPath);
        return destPath;
    };
    /**
     * Relative filepath to src/styles
     * @param filePath
     * @returns {{src: string, out: any, name: string, dirName: string, baseName: string, stamp: string}}
     */
    Compiler.prototype.style = function (filePath) {
        var stamp = Date.now().toString();
        var baseName = path.basename(filePath, path.extname(filePath));
        var fileName = baseName + '.' + stamp + '.css';
        var destDir = this.styler.demoPath(path.join('assets', 'styles', path.dirname(filePath)));
        var destPath = path.join(destDir, fileName);
        var srcPath = this.styler.stylePath(filePath);
        return {
            src: srcPath,
            out: this.compile(srcPath, destPath),
            name: fileName,
            dirName: path.dirname(filePath),
            baseName: baseName,
            stamp: stamp
        };
    };
    /**
     * Relative filepaths to src/styles
     * @param filePaths
     * @returns {ICompilerResult[]}
     */
    Compiler.prototype.styles = function (filePaths) {
        var self = this;
        var destPaths = [];
        filePaths.forEach(function (filePath) {
            destPaths.push(self.style(filePath));
        });
        return destPaths;
    };
    return Compiler;
})(base_1.BaseStylerModule);
exports.Compiler = Compiler;
//# sourceMappingURL=compiler.js.map