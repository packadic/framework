var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var path = require('path');
var fs = require('fs');
var express = require('express');
var fse = require('fs-extra');
var bodyParser = require('body-parser');
var base_1 = require('./base');
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
var Server = (function (_super) {
    __extends(Server, _super);
    function Server(styler) {
        _super.call(this, styler);
        this.app = express();
    }
    Server.prototype.createResponse = function (data, code, message) {
        if (code === void 0) { code = 200; }
        if (message === void 0) { message = "ok"; }
        return { code: code, message: message, data: data };
    };
    Server.prototype.start = function () {
        this.app.use(allowCrossDomain);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        this.app.get('/', this.appGet.bind(this));
        this.app.post('/', this.appPost.bind(this));
        this.app.listen(this.styler.config.port);
    };
    Server.prototype.appGet = function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', 'application/json');
        var files = this.styler.config.variableFiles;
        var vars = this.styler.parser.parseVariableFiles(files);
        var response = { vars: vars, files: files };
        res.json(this.createResponse(response));
    };
    Server.prototype.appPost = function (req, res) {
        res.set('Content-Type', 'application/json');
        var fileName = req.body.pk.fileName;
        var varName = req.body.name;
        var varVal = req.body.value;
        var origVars = this.styler.parser.parseVariableFiles([fileName]);
        var fileContent = fs.readFileSync(this.styler.stylePath(fileName), 'UTF-8');
        var exp = new RegExp('(\\$' + varName + ':[\\s\\t]*)(.*?);');
        var isDef = origVars.detailed[varName].default;
        var replaceStr = '$1' + varVal + (isDef ? ' !default' : '') + ';';
        var replacedContent = fileContent.replace(exp, replaceStr);
        var backupPath = this.styler.stylePath('.backup');
        var backupTime = Math.round(Date.now() / 1000);
        var filePath = path.join(backupPath, fileName + '.backup_' + backupTime);
        fse.mkdirpSync(path.dirname(filePath));
        fse.writeFileSync(filePath, fileContent);
        fse.writeFileSync(this.styler.stylePath(fileName), replacedContent);
        var result = this.styler.createStyles(['stylesheet.scss', 'themes/theme-default.scss']);
        res.send(base_1.stringify({ status: 'ok', result: result, req: req, exp: exp, replaceStr: replaceStr, varName: varName, varVal: varVal, orig: fileContent, replaced: replacedContent, isValDef: isDef }));
    };
    Server.prototype.apost = function () {
        var self = this;
        var dir = this.styler.createTmpDir();
        this.styler.setPathsRoot(dir.path);
        var compileResults = this.styler.compiler.styles(this.config.variableFiles);
        compileResults.forEach(function (res) {
            var relPath = path.join(res.dirName, res.name);
            var destPath = path.join(self.styler.getDefaultRootPath(), '', relPath);
            fse.copySync(res.out, destPath);
            //response.files.push(_.merge(res, { relPath: relPath }));
            base_1.log('Moved ', res.out, destPath);
        });
        this.styler.setPathsRoot(self.styler.getDefaultRootPath());
        dir.clean();
        return {};
    };
    return Server;
})(base_1.BaseStylerModule);
exports.Server = Server;
//# sourceMappingURL=server.js.map