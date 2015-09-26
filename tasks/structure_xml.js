var fs = require('fs'),
    globule = require('globule'),
    path = require('path'),
    xml2js = require('xml2js');

module.exports = function(grunt){
    grunt.registerTask('structure_xml', '', function(){
        var taskDone = this.async();
        var target = grunt.config.get('target');
        var dest = grunt.config.get('target.dest');
        var options = this.options({
            src    : 'src/structure.xml',
            dest   : dest + '/structure.json',
            options: {}
        });

        var fileXml = fs.readFileSync(options.src);
        var parser = new xml2js.Parser(options.options);
        parser.parseString(fileXml, function(err, result){
            if(err) grunt.fail.fatal(err);
            fs.writeFileSync(options.dest, result);
            taskDone();
        });
    });
};
