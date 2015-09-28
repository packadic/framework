var fs = require('fs'),
    globule = require('globule'),
    path = require('path'),
    xml2js = require('xml2js');

module.exports = function(grunt){

    // fuction to perform custom task
    concatAnim = function () {


    };

    grunt.registerTask('animate_css', '', function(){
        var taskDone = this.async();
        var target = grunt.config.get('target');
        var dest = grunt.config.get('target.dest');

        var options = this.options({
            bowerPath    : 'bower_components'
        });

        var categories = grunt.config('cfg.animate_css'),
            category, files, file,
            targets = [ path.join(options.bowerPath, 'animate.css', 'source', '_base.css') ],
            count = 0;

        for ( category in categories ) {
            if ( categories.hasOwnProperty(category) ) {
                files = categories[category];
                for (file in files) {
                    if ( files.hasOwnProperty(file) )  {
                        var enabled = files[file] || false;
                        if(target.name !== 'dist') enabled = true;
                        if(enabled) {
                            targets.push(path.join(options.bowerPath, 'animate.css', 'source', category, file + '.css'));
                            count += 1;
                        }
                    }
                }
            }
        }

        if (!count) {
            grunt.log.writeln('No animations activated.');
        } else {
            grunt.log.writeln(count + (count > 1 ? ' animations' : ' animation') + ' activated.');
        }

        grunt.config('concat.animate_css', {
            src : targets,
            dest: '<%= target.dest %>/assets/styles/animate.css'
        });
        grunt.task.run('concat:animate_css');

        return taskDone();
    });
};
