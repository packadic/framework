var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var tmp = require('tmp');
var base_1 = require('./base');
var compiler_1 = require('./compiler');
var parser_1 = require('./parser');
var server_1 = require('./server');
var _rootPath = path.join(__dirname, '..', '..', '..');
var paths = {};
function setPathsRoot(rootPath) {
    rootPath = rootPath || _rootPath;
    paths = {
        root: rootPath,
        src: path.join(rootPath, 'src'),
        demo: path.join(rootPath, 'demo'),
        styles: path.join(rootPath, 'src', 'styles')
    };
}
setPathsRoot();
var Styler = (function () {
    function Styler() {
        this.config = {
            port: 3000,
            variableFiles: ['_variables.scss', '_theme-variables.scss', '_bootstrap-variables.scss'],
            destDir: 'demo/assets/styles'
        };
        this._compiler = new compiler_1.Compiler(this);
        this._parser = new parser_1.Parser(this);
        this._server = new server_1.Server(this);
    }
    Styler.prototype.createStyles = function (files, destDir) {
        destDir = destDir || this.config.destDir;
        var self = this;
        var response = {
            files: []
        };
        var dir = this.createTmpDir();
        this.setPathsRoot(dir.path);
        var compileResults = this.compiler.styles(files);
        compileResults.forEach(function (res) {
            var relPath = path.join(res.dirName, res.name);
            var destPath = path.join(_rootPath, destDir, relPath);
            fse.copySync(res.out, destPath);
            response.files.push(_.merge(res, { relPath: relPath }));
            base_1.log('Moved ', res.out, destPath);
        });
        this.setPathsRoot(_rootPath);
        dir.clean();
        return response;
    };
    Styler.prototype.createTmpDir = function () {
        var self = this;
        tmp.setGracefulCleanup();
        var dir = tmp.dirSync();
        var copyToTemp = function (copyPath) {
            fse.copySync(self.rootPath(copyPath), path.join(dir.name, copyPath));
        };
        copyToTemp('src/styles');
        copyToTemp('src/fonts');
        copyToTemp('src/images');
        copyToTemp('bower_components');
        return {
            path: dir.name, dir: dir, clean: function () {
                // delete
                fse['emptyDirSync'](dir.name);
                dir.removeCallback();
                base_1.log('cleaned dir ' + dir.name);
            }
        };
    };
    Object.defineProperty(Styler.prototype, "compiler", {
        get: function () {
            return this._compiler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Styler.prototype, "parser", {
        get: function () {
            return this._parser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Styler.prototype, "server", {
        get: function () {
            return this._server;
        },
        enumerable: true,
        configurable: true
    });
    Styler.prototype.setPathsRoot = function (rootPath) {
        setPathsRoot(rootPath);
    };
    Styler.prototype.rootPath = function (relPath) {
        return typeof relPath === 'string' ? path.join(paths.root, relPath) : paths.root;
    };
    Styler.prototype.stylePath = function (relPath) {
        return typeof relPath === 'string' ? path.join(paths.styles, relPath) : paths.styles;
    };
    Styler.prototype.demoPath = function (relPath) {
        return typeof relPath === 'string' ? path.join(paths.demo, relPath) : paths.demo;
    };
    Styler.prototype.srcPath = function (relPath) {
        return typeof relPath === 'string' ? path.join(paths.src, relPath) : paths.src;
    };
    Styler.prototype.getDefaultRootPath = function () {
        return _rootPath;
    };
    return Styler;
})();
exports.Styler = Styler;
//# sourceMappingURL=index.js.map