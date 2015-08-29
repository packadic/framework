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
import material = require('./../../ts/modules/material');
import {BaseStylerModule, log, _dd, stringify} from './base';


export interface StylerParsedValue {
    name?:string;
    'default'?:boolean;
    type?:string;
    value?:any;
    original?:any;
    overides?:boolean;
    overidden?:boolean;
    other?:StylerParsedValue;
}

export class Parser extends BaseStylerModule {

    protected createParsedValue(name:string, val:string):StylerParsedValue {
        return <StylerParsedValue> {
            'name': name,
            'default': false,
            'type': 'text',
            'value': null,
            'original': val,
            'overides': false,
            'overidden': false,
            'other': null
        };
    }


    protected parseVarValue(name:string, val:string):any {
        var parsed:StylerParsedValue = this.createParsedValue(name, val);
        var matExp:RegExp = /material-color\([\'\"](.*?)[\'\"](?:\,[\s|]*|)(?:[\'\"](.*?)[\'\"]|)\)/;
        var colorExp:RegExp = /^(\#[\w\d]*?)$/;

        if (_s.contains(val, '!default')) {
            parsed.default = true;
            val = _s.trim(val.replace('!default', ''));
        }

        if (_s.contains(val, 'material-color') && matExp.test(val)) {
            parsed.type = 'material-color';
            var matches:any = val.match(matExp);
            if (matches.length === 3) {
                val = material.color(matches[1], matches[2])
            } else if (matches.length === 2) {
                val = material.color(matches[1])
            }
            val = val.toString().toUpperCase();
        }

        if (_s.startsWith(val, '#') && colorExp.test(val)) {
            parsed.type = 'color';
            var matches:any = val.match(colorExp);
            if (matches.length == 2) {
                val = matches[matches.length - 1].toString().toUpperCase();
            }
        }

        parsed.value = val;

        return parsed;
    }

    public parseVariableFiles(filePaths) {
        var self:Parser = this;
        var data:any = {assoc: {}, detailed: {}, tree: {}};

        filePaths.forEach(function (filePath) {
            if (typeof data.tree[filePath] === 'undefined') {
                data.tree[filePath] = {}
            }
            self.parseStyleVars(filePath, function (parsed) {
                parsed.file = filePath;
                var save:boolean = false;
                if (typeof data.detailed[parsed.name] !== 'undefined') {
                    if (parsed.default) {
                        data.detailed[parsed.name].overides = true;
                        data.detailed[parsed.name].other = parsed.file;

                        parsed.overidden = true;
                        parsed.other = data.detailed[parsed.name].file;

                    } else {
                        save = true;

                        parsed.overides = true;
                        parsed.other = data.detailed[parsed.name].file;

                        data.detailed[parsed.name].overidden = true;
                        data.detailed[parsed.name].other = parsed.file;
                    }
                } else {
                    save = true;
                }

                if (save) {
                    data.detailed[parsed.name] = parsed;
                    data.assoc[parsed.name] = parsed.value;
                }
                data.tree[filePath][parsed.name] = parsed;
            });
        });

        return data;
    }

    protected readStyle(filePath:string) {
        return fs.readFileSync(this.styler.stylePath(filePath))
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

