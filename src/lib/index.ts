/// <reference path='./types.d.ts' />
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

import {Styler} from './styler/index';
import {log} from './styler/base';




export var VERSION:string = require('./../../bower.json').version;

export var styler:Styler = new Styler();

export function test(){
    styler.createStyles(['stylesheet.scss', 'themes/theme-default.scss']);
    var variables:any = styler.parser.parseVariableFiles(['_variables.scss', '_theme-variables.scss']);
  //  log(variables);
}
