#!/usr/bin/env node
var //chalk = require('chalk'),
    path = require('path'),
    util = require('util'),
    fs = require('fs-extra'),
    xml2json = require('xml2json')
    //jsyaml = require('js-yaml')
    ;

var rawXml = fs.readFileSync('src/structure.xml', 'utf-8');
var struct = xml2json.toJson(rawXml);
fs.writeFileSync('src/structure.json', struct);

console.log(util.inspect({a:'b'}, { colors: true }));
