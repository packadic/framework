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

import {Styler} from './index';

export class BaseStylerModule {
    protected styler:Styler;

    constructor(styler:Styler){
        this.styler = styler;
    }

}


export function log(...args:any[]) {
    var args = _.toArray(arguments);
    process.stdout.write(util.inspect(args.length === 1 ? args[0] : args, {colors: true}));
    process.stdout.write('\n');
}

export function _dd(...args:any[]) {
    log.apply(this, arguments);
    process.exit();
}

// no circular error stringify
export function stringify(o:any) {
    var cache = [];
    var str:string = JSON.stringify(o, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // Enable garbage collection
    return str;
}
