/// <reference path='./../types.d.ts' />
import util = require('util');
import path = require('path');
import _ = require('lodash');
import fs = require('fs');
import express = require('express');
import sass = require('node-sass');
import _s = require('underscore.string');
import fse = require('fs-extra');
import tmp = require('tmp');
import globule = require('globule');
import bodyParser = require('body-parser');

import {Styler,StylerTmpDirResponse} from './index';
import {ICompilerResult} from './compiler';
import {BaseStylerModule, log, _dd, stringify } from './base';

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};


export class Server extends BaseStylerModule {
    protected app:express.Application;

    constructor(styler:Styler) {
        super(styler);
        this.app = express();
    }

    protected createResponse(data:any, code:number=200, message:string="ok"):StylerResponse{
        return { code: code, message: message, data: data }
    }

    public start(){
        this.app.use(allowCrossDomain);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        this.app.get('/', this.appGet.bind(this));
        this.app.post('/', this.appPost.bind(this));
        this.app.listen(this.styler.config.port);


    }


    public appGet(req:express.Request, res:express.Response) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', 'application/json');
        var files:string[] = this.styler.config.variableFiles;
        var vars:any = this.styler.parser.parseVariableFiles(files);
        var response:any = { vars: vars, files: files };
        res.json(this.createResponse(response));
    }


    public appPost(req:express.Request, res:express.Response) {
        res.set('Content-Type', 'application/json');

        var fileName:string = req.body.pk.fileName;
        var varName:string = req.body.name;
        var varVal:any = req.body.value;

        var origVars:any = this.styler.parser.parseVariableFiles([fileName]);
        var fileContent:string = fs.readFileSync(this.styler.stylePath(fileName), 'UTF-8');
        var exp:RegExp = new RegExp('(\\$' + varName + ':[\\s\\t]*)(.*?);');
        var isDef:boolean = origVars.detailed[varName].default;
        var replaceStr:string = '$1' + varVal + (isDef ? ' !default' : '') + ';';
        var replacedContent:string = fileContent.replace(exp, replaceStr);

        var backupPath:string = this.styler.stylePath('.backup');
        var backupTime:number = Math.round(Date.now() / 1000);
        var filePath:string = path.join(backupPath, fileName + '.backup_' + backupTime);
        fse.mkdirpSync(path.dirname(filePath));
        fse.writeFileSync(filePath, fileContent);
        fse.writeFileSync(this.styler.stylePath(fileName), replacedContent);

        var result:any = this.styler.createStyles(['stylesheet.scss', 'themes/theme-default.scss']);

        res.send(stringify({status: 'ok', result: result, req: req, exp:exp, replaceStr:replaceStr, varName: varName, varVal:varVal, orig: fileContent, replaced: replacedContent, isValDef: isDef }));
    }

    public apost(){
        var self:Server = this;
        var dir:StylerTmpDirResponse = this.styler.createTmpDir();
        this.styler.setPathsRoot(dir.path);
        var compileResults:ICompilerResult[] = this.styler.compiler.styles(this.config.variableFiles);

        compileResults.forEach(function(res:ICompilerResult){
            var relPath:string = path.join(res.dirName, res.name);
            var destPath:string = path.join(self.styler.getDefaultRootPath(), '', relPath);
            fse.copySync(res.out, destPath);
            //response.files.push(_.merge(res, { relPath: relPath }));
            log('Moved ', res.out, destPath);
        });

        this.styler.setPathsRoot(self.styler.getDefaultRootPath());
        dir.clean();
        return {};
    }
}

