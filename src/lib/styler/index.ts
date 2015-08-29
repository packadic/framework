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

import {log, _dd, stringify} from './base';
import {Compiler,ICompilerResult} from './compiler';
import {Parser} from './parser';
import {Server} from './server';

var _rootPath:string = path.join(__dirname, '..', '..', '..');
var paths:any = {};
function setPathsRoot(rootPath?:string) {
    rootPath = rootPath || _rootPath;
    paths = {
        root: rootPath,
        src: path.join(rootPath, 'src'),
        demo: path.join(rootPath, 'demo'),
        styles: path.join(rootPath, 'src', 'styles')
    };
}
setPathsRoot();

export interface StylerTmpDirResponse {
    path:string;
    dir:tmp.ISyncTMP;
    clean:Function;
}

export class Styler {
    public config:any = {
        port: 3000,
        variableFiles: ['_variables.scss', '_theme-variables.scss', '_bootstrap-variables.scss'],
        destDir: 'demo/assets/styles'
    };

    private _compiler:Compiler;
    private _parser:Parser;
    private _server:Server;

    constructor() {
        this._compiler = new Compiler(this);
        this._parser = new Parser(this);
        this._server = new Server(this);
    }

    public createStyles(files:string[], destDir?:string):any {
        destDir = destDir || this.config.destDir;
        var self:Styler = this;
        var response = {
            files: []
        };
        var dir = this.createTmpDir();
        this.setPathsRoot(dir.path);
        var compileResults:ICompilerResult[] = this.compiler.styles(files);

        compileResults.forEach(function(res:ICompilerResult){
            var relPath:string = path.join(res.dirName, res.name);
            var destPath:string = path.join(_rootPath, destDir, relPath);
            fse.copySync(res.out, destPath);
            response.files.push(_.merge(res, { relPath: relPath }));
            log('Moved ', res.out, destPath);
        });

        this.setPathsRoot(_rootPath);
        dir.clean();
        return response;
    }



    public createTmpDir():StylerTmpDirResponse {
        var self:Styler = this;
        tmp.setGracefulCleanup();
        var dir:tmp.ISyncTMP = tmp.dirSync();
        var copyToTemp = function (copyPath:string) {
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
                log('cleaned dir ' + dir.name);
            }
        };
    }


    public get compiler():Compiler {
        return this._compiler;
    }

    public get parser():Parser {
        return this._parser;
    }

    public get server():Server {
        return this._server;
    }

    public setPathsRoot(rootPath?:string) {
        setPathsRoot(rootPath);
    }

    public rootPath(relPath?:string):string {
        return typeof relPath === 'string' ? path.join(paths.root, relPath) : paths.root;
    }

    public stylePath(relPath?:string):string {
        return typeof relPath === 'string' ? path.join(paths.styles, relPath) : paths.styles;
    }

    public demoPath(relPath?:string):string {
        return typeof relPath === 'string' ? path.join(paths.demo, relPath) : paths.demo;
    }

    public srcPath(relPath?:string):string {
        return typeof relPath === 'string' ? path.join(paths.src, relPath) : paths.src;
    }

    public getDefaultRootPath():string {
        return _rootPath;
    }

}

