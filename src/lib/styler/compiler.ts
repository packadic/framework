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

import {BaseStylerModule, log, _dd, stringify} from './base';

export interface ICompilerResult {
    src?:string;
    out?:string;
    baseName?:string;
    dirName?:string;
    name?:string;
    stamp?:string;
}

export class Compiler extends BaseStylerModule {
    public compile(filePath:string, destPath:string):string {
        var res:sass.Result = sass.renderSync({
            file: filePath,
            outFile: destPath,
            sourceMap: false,
            outputStyle: 'expanded'
        });
        fse.mkdirpSync(path.dirname(destPath));
        fs.writeFileSync(destPath, res.css);
        log('compiled ' + destPath);
        return destPath;
    }


    /**
     * Relative filepath to src/styles
     * @param filePath
     * @returns {{src: string, out: any, name: string, dirName: string, baseName: string, stamp: string}}
     */
    public style(filePath:string):ICompilerResult {
        var stamp:string = Date.now().toString();
        var baseName:string = path.basename(filePath, path.extname(filePath));
        var fileName:string = baseName + '.' + stamp + '.css';
        var destDir:string = this.styler.demoPath(path.join('assets', 'styles', path.dirname(filePath)));
        var destPath:string = path.join(destDir, fileName);
        var srcPath:string = this.styler.stylePath(filePath);
        return {
            src: srcPath,
            out: this.compile(srcPath, destPath),
            name: fileName,
            dirName: path.dirname(filePath),
            baseName: baseName,
            stamp: stamp
        }
    }

    /**
     * Relative filepaths to src/styles
     * @param filePaths
     * @returns {ICompilerResult[]}
     */
    public styles(filePaths:string[]):ICompilerResult[]  {
        var self:Compiler = this;
        var destPaths:ICompilerResult[] = [];
        filePaths.forEach(function(filePath:string){
            destPaths.push(self.style(filePath));
        });
        return destPaths;
    }


}

