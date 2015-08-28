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

export class Parser extends BaseStylerModule {

    public parseVariableFiles(filePaths) {
        var self:Parser = this;
        var data:any = {assoc: {}, detailed: {}, tree: {}};

        filePaths.forEach(function (filePath) {
            if (typeof data.tree[filePath] === 'undefined') {
                data.tree[filePath] = {}
            }
            log(data.tree);
            self.parseStyleVars(filePath, function (parsed) {
                parsed.file = filePath;
                data.detailed[parsed.name] = parsed;
                data.assoc[parsed.name] = parsed.value;
                data.tree[filePath][parsed.name] = parsed;
            });
            log(data.tree);
        });
        log(data.tree);

        return data;
    }

    protected readStyle(filePath:string) {
        return fs.readFileSync(this.styler.stylePath(filePath))
    }

    protected parseVarValue(name:string, val:string):any {
        var parsed:any = {'name': name, 'default': false, 'type': 'text', 'value': null};

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
    }

    protected parseStyleVars(filePath, eachCb?:any) {
        var scssContent:string = fs.readFileSync(this.styler.stylePath(filePath)).toString();
        var exp = /\$([\w-]*?):[\s\t]*(.*?);/g;
        var matches;
        while (matches = exp.exec(scssContent)) {
            if (matches.length !== 3) {
                continue;
            }
            var parsed:any = this.parseVarValue(matches[1], matches[2]);
            if (typeof eachCb === 'function') {
                eachCb(parsed);
            }
        }
    }
}

