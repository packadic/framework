var util = require('util'),
    path = require('path');
var fs = require('fs-extra');

var _        = require('lodash'),
    exec     = require('child_process').execSync,
    grunt    = require('grunt'),
    globule  = require('globule');


module.exports = function (_grunt) {
    grunt = _grunt;
    var target = grunt.option('target') || 'demo';
    var vendorScripts = ['lodash/lodash.js', 'requirejs/require.js'];
    grunt.log.subhead('Packadic Builder for Packadic ' + require('./bower.json').version);

    var config = {
        target        : {name: '', dest: ''},
        targets       : {
            demo: {name: 'demo', dest: 'demo'},
            dist: {name: 'dist', dest: 'dist'}
        },
        connect       : {demo: {options: {port: 8000, livereload: false, base: 'demo'}}}, // , keepalive: true
        clean         : {
            all              : {src: '<%= target.dest %>'},
            assets           : {src: '<%= target.dest %>/assets'},
            styles           : {src: '<%= target.dest %>/assets/styles'},
            scripts          : {src: '<%= target.dest %>/assets/scripts'},
            scripts_no_vendor: {src: ['<%= target.dest %>/assets/scripts/**/*.js', '!<%= target.dest %>/assets/scripts/vendor.min.js']},
            images           : {src: '<%= target.dest %>/assets/images'},
            bower            : {src: '<%= target.dest %>/assets/bower_components'},
            views            : {src: '<%= target.dest %>/**/*.html'}
        },
        copy          : {
            images: {src: ['**'], cwd: 'src/images', expand: true, dest: '<%= target.dest %>/assets/images/'},
            bower : {src: ['**'], cwd: 'bower_components', expand: true, dest: '<%= target.dest %>/assets/bower_components/'},
            scss  : {src: ['**/*.scss'], cwd: 'src/styles', expand: true, dest: '<%= target.dest %>/assets/styles/scss/'}
        },
        uglify        : {
            vendor: {
                files: {
                    '<%= target.dest %>/assets/scripts/vendor.min.js': (function () {
                        var scripts = [];
                        for (var k in vendorScripts) {
                            scripts.push('bower_components/' + vendorScripts[k]);
                        }
                        return scripts;
                    }.call())
                }
            }
        },
        jade          : {
            options  : {pretty: true},
            demo     : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            dist     : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            templates: {
                options: {client: true, pretty: false, amd: true, namespace: false},
                files  : [{expand: true, cwd: 'src/templates', src: ['**/*.jade', '!**/_*.jade'], ext: '.js', dest: '<%= target.dest %>/assets/scripts/templates'}]
            }
        },
        sass          : {
            options: {sourceMap: false, outputStyle: '<%= target.name === "demo" ? "expanded" : "compressed" %>'},
            styles : {
                files: {
                    '<%= target.dest %>/assets/styles/stylesheet.css'          : 'src/styles/stylesheet.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-default.css': 'src/styles/themes/theme-default.scss'
                }
            }
        },
        typescript    : {
            options   : {target: 'es5', rootDir: 'src', module: 'amd', sourceMap: false, declaration: false},
            lib       : {src: ['src/lib/**/*.ts', '!src/lib/**/*.d.ts'], dest: 'src', options: {module: 'commonjs', sourceMap: true}},
            watch_lib : {src: ['src/lib/**/*.ts', '!src/lib/**/*.d.ts'], dest: 'src', options: {module: 'commonjs', sourceMap: true, watch: {path: 'src/lib'}}},
            base      : {src: ['src/ts/*.ts', '!src/ts/**/*.d.ts'], dest: '<%= target.dest %>/assets/scripts', options: {rootDir: 'src/ts'}},
            watch_base: {src: ['src/ts/*.ts', '!src/ts/**/*.d.ts'], dest: '<%= target.dest %>/assets/scripts', options: {rootDir: 'src/ts', watch: {path: 'src/ts'}}},
            tasks     : {src: ['src/tasks/*.ts', '!src/tasks/**/*.d.ts'], dest: 'src/tasks'}
        },
        availabletasks: {
            tasks: {
                options: {
                    filter: 'include', tasks: ['styles', 'scripts', 'images', 'bower', 'views', 'demo', 'dist', 'serve', 'watch', 'lib'],
                    groups: {
                        'Build'      : ['demo', 'dist'],
                        'Partials'   : ['styles', 'scripts', 'images', 'bower', 'views'],
                        'Development': ['serve', 'watch', 'lib']

                    }
                }
            }
        },
        concurrent    : {
            options: {logConcurrentOutput: true},
            watch  : ['typescript:watch_lib', 'typescript:watch_base', 'default_watch', 'styler']
        },
        default_watch : {
            options   : {livereload: true},
            //ts        : {files: ['src/ts/**/*.ts', '!src/ts/**/*.d.ts'], tasks: ['clean:scripts_no_vendor', 'typescript:base']},
            tasks     : {files: ['src/tasks/**/*.ts', '!src/tasks/**/*.d.ts'], tasks: ['typescript:tasks']},
            templates : {files: ['src/templates/**/*.jade'], tasks: ['jade:templates']},
            newerViews: {files: ['src/views/**/*.jade', '!src/views/partials/**/*.jade', '!src/views/metalshark/**/*.jade', '!src/views/**/_*.jade'], tasks: ['newer:jade:demo']},
            views     : {files: ['src/views/partials/**/*.jade', 'src/views/**/_*.jade', 'src/views/metalshark/**/*.jade', 'src/views/layouts/**/*.jade'], tasks: ['jade:demo']},
            styles    : {files: ['src/styles/**/*.scss'], tasks: ['styles', 'copy:scss']},
            bower     : {files: ['bower.json'], tasks: ['bower']},
            livereload: {
                options: {livereload: 35729},
                files  : ['<%= target.dest %>/**/*', '!<%= target.dest %>/assets/bower_components/**/*']
            }
        }
    };

    target = config.target = config.targets[target];
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.task.renameTask('watch', 'default_watch');
    grunt.initConfig(config);
    grunt.loadTasks('src/tasks');

    // default
    grunt.registerTask('tasks', 'Show all available tasks', ['availabletasks:tasks']);
    grunt.registerTask('default', 'Show all available tasks', ['tasks']);

    // copy
    grunt.registerTask('images', 'Copy images', ['clean:images', 'copy:images']);
    grunt.registerTask('bower', 'Copy bower components', ['clean:bower', 'copy:bower']);

    // compile
    grunt.registerTask('styles', 'Compile all SCSS stylesheets', ['clean:styles', 'sass:styles']);
    grunt.registerTask('scripts', 'Concat & uglify vendor scripts and compile typescript files', ['clean:scripts', 'uglify:vendor', 'typescript:base']);
    grunt.registerTask('views', 'Compile the jade view', ['clean:views', 'jade:' + target.name]);

    // build
    grunt.registerTask('demo', 'Build the theme', ['clean:all', 'bower', 'images', 'styles', 'scripts', 'views']);
    grunt.registerTask('dist', 'Build the distribution version (optimized)', ['clean:all', 'bower', 'styles', 'scripts', 'images', 'views']);

    // dev
    grunt.registerTask('lib', 'Compile typescript files in lib for node.', ['typescript:lib']);
    grunt.registerTask('watch', 'Watch for file changes and fire tasks.', ['concurrent:watch']);

    grunt.registerTask('styler', 'DevTest.', function (tar) {
        var out = require('child_process').execSync('bash run styler');
        log(out);
    });

    grunt.registerTask('serve', 'Create a local server. Builds & hosts the demo and watches for changes. Use serve:fast to skip demo build task.', function (opt) {
        if ( typeof opt === 'string' && opt === 'fast' ) {
            grunt.log.warn('Skipping demo build task');
            grunt.task.run(['connect:demo', 'watch'])
        } else {
            grunt.task.run(['demo', 'connect:demo', 'watch'])
        }
    })

};
