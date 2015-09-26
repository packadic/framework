#!/usr/bin/env node
var chalk = require('chalk'),
    path = require('path'),
    fs = require('fs-extra'),
    xml2js = require('xml2js');

console.log(chalk.red('as'));

function getStructureXml(){
    var filePath = path.join(__dirname, 'src', 'structure.xml');
    var fileXml = fs.readFileSync(filePath);
    var parser = new xml2js.Parser({

    });
    parser.parseString(fileXml, function(err, result){
        console.log(err, result.project.file)
    });
}

getStructureXml();
