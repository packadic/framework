var util = require('util'),
    path = require('path');
var fs = require('fs-extra');

var _       = require('lodash'),
    exec    = require('child_process').execSync,
    grunt   = require('grunt'),
    globule = require('globule');
var docs = {};
//docs    = require('./src/lib/grunt/docs'),
//inspect = require('./src/lib/grunt').inspect;


//var lib = require('./src/lib/grunt');
/*

 <script src="bower_components/lodash/lodash.js"></script>
 <script src="bower_components/jquery/dist/jquery.js"></script>
 <script src="bower_components/jquery-migrate/jquery-migrate.js"></script>
 <script src="bower_components/eventemitter2/lib/eventemitter2.js"></script>
 <script src="bower_components/underscore.string/dist/underscore.string.js"></script>
 <script src="bower_components/async/dist/async.js"></script>
 <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>

 */
module.exports = function (_grunt) {
    grunt = _grunt;
    var target = grunt.option('target') || 'dev';
    var vendorScripts = [
        'lodash/lodash.js', 'eventemitter2/lib/eventemitter2.js', 'async/dist/async.js', 'underscore.string/dist/underscore.string.js', 'jade/runtime.js',
        'jquery/dist/jquery.js', 'jquery-migrate/jquery-migrate.js', 'jquery-ui/ui/widget.js', 'jquery-slimscroll/jquery.slimscroll.js',
        'bootstrap/dist/js/bootstrap.js', 'bootstrap-material-design/dist/js/material.js'
    ];
    grunt.log.subhead('Packadic Builder for Packadic ' + require('./bower.json').version);
    //inspect(docs);
    var config = {
        /**/
        //      Targeting
        /**/
        target : {name: '', dest: ''},
        targets: {
            demo: {name: 'demo', dest: 'demo'},
            dist: {name: 'dist', dest: 'dist'},
            dev : {name: 'dev', dest: '.dev'}
        },

        /**/
        //      Basics & pre-processing
        /**/
        clean: {
            all              : {src: '<%= target.dest %>'},
            docs             : {src: '<%= target.dest %>/docs'},
            assets           : {src: '<%= target.dest %>/assets'},
            styles           : {src: '<%= target.dest %>/assets/styles'},
            scripts          : {src: '<%= target.dest %>/assets/scripts'},
            scripts_no_vendor: {src: ['<%= target.dest %>/assets/scripts/**/*.js', '!<%= target.dest %>/assets/scripts/vendor.min.js']},
            images           : {src: '<%= target.dest %>/assets/images'},
            bower            : {src: '<%= target.dest %>/assets/bower_components'},
            views            : {src: '<%= target.dest %>/**/*.html'}
        },
        copy : {
            images: {src: ['**'], cwd: 'src/images', expand: true, dest: '<%= target.dest %>/assets/images/'},
            bower : {src: ['**/*.{js,css,woff*,ttf}'], cwd: 'bower_components', expand: true, dest: '<%= target.dest %>/assets/bower_components/'},
            scss  : {src: ['**/*.scss'], cwd: 'src/styles', expand: true, dest: '<%= target.dest %>/assets/styles/scss/'},
            js    : {src: ['**/*.js'], cwd: 'src/js', expand: true, dest: '<%= target.dest %>/assets/scripts/'}
        },
        jade : {
            options  : {
                pretty: true, data: function () {
                    return _.merge({}, {
                        _inspect: util.inspect
                    });
                }.call()
            },
            test_page: {files: [{expand: true, cwd: 'src/views', src: ['test.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!layouts/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            views    : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!{document,typedoc}.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!layouts/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            templates: {
                options: {client: true, pretty: false, amd: true, namespace: false},
                files  : [{expand: true, cwd: 'src/templates', src: ['**/*.jade', '!**/_*.jade'], ext: '.js', dest: '<%= target.dest %>/assets/scripts/templates'}]
            }
        },

        sass: {
            options: {sourceMap: false, outputStyle: 'expanded'}, // '<%= target.name === "demo" ? "expanded" : "compressed" %>'},
            styles : {
                files: {
                    '<%= target.dest %>/assets/styles/stylesheet.css'          : 'src/styles/stylesheet.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-default.css': 'src/styles/themes/theme-default.scss'
                }
            }
        },


        /**/
        //      Scripting
        /**/
        uglify    : {
            vendor     : {
                files: {
                    '<%= target.dest %>/assets/scripts/vendor.min.js': (function () {
                        var scripts = [];
                        for (var k in vendorScripts) {
                            scripts.push('bower_components/' + vendorScripts[k]);
                        }
                        return scripts;
                    }.call())
                }
            },
            ts_packadic: {
                files: {
                    '<%= target.dest %>/assets/scripts/packadic.min.js': '<%= target.dest %>/assets/scripts/packadic.js'
                }
            }
        },
        subgrunt  : {typescript: {'src/clones/grunt-typescript': ['build']}},
        browserify: {
            options : {builtins: [], detectGlobals: true, debug: true, transform: [], plugin: ['tsify']},
            packadic: {
                options: {standalone: 'packadic'},
                files  : {'<%= target.dest %>/assets/scripts/pack.js': 'src/ts/packadic_browserify/packadic.ts'}
            }
        },
        ts        : {
            options : {
                compiler: 'node_modules/typescript/bin/tsc'
            },
            packadic: {
                options: {
                    target   : 'ES5',
                    out      : 'packadic.js',
                    outDir   : 'out',
                    emitError: true
                },
                src    : ['src/ts/packadic/**/*.ts'],
                out    : '<%= target.dest %>/assets/scripts/packadic.js'
            }
        },

        /**/
        //      Documentation
        /**/
        sassdoc: {styles: {src: 'src/styles', options: {dest: '<%= target.dest %>/docs/scss'}}},
        typedoc: {
            ts: {
                src: ['src/ts/**/*.ts'], options: {
                    out          : '<%= target.dest %>/docs/ts', name: 'Packadic API Documentation', target: 'es5', mode: 'file',
                    hideGenerator: '', experimentalDecorators: '', readme: 'README.md', includeDeclarations: ''
                }
            },
        },

        /**/
        //      Serving, watching, deving
        /**/
        availabletasks: {
            tasks: {
                options: {
                    filter: 'include', tasks: ['styles', 'scripts', 'images', 'bower', 'views', 'demo', 'dist', 'serve', 'watch', 'lib', 'docs'],
                    groups: {
                        'Build'      : ['demo', 'dist', 'docs'],
                        'Partials'   : ['styles', 'scripts', 'images', 'bower', 'views'],
                        'Development': ['serve', 'watch', 'lib']
                    }
                }
            }
        },
        connect       : {
            demo: {options: {port: 8000, livereload: false, base: 'demo'}},
            dev : {options: {port: 8000, livereload: false, base: ['.dev', './']}}
        }, // , keepalive: true
        concurrent    : {
            options: {logConcurrentOutput: true},
            watch  : ['default_watch']
        },
        default_watch : {
            options       : {livereload: true},
            //tasks       : {files: ['src/tasks/**/*.ts', '!src/tasks/**/*.d.ts'], tasks: ['typescript:tasks']},
            //templates   : {files: ['src/templates/**/*.jade'], tasks: ['jade:templates']},
            //newerViews      : {files: ['src/views/**/*.jade', '!src/views/partials/**/*.jade', '!src/views/metalshark/**/*.jade', '!src/views/**/_*.jade'], tasks: ['newer:jade:demo']},
            //views           : {files: ['src/views/partials/**/*.jade', 'src/views/**/_*.jade', 'src/views/metalshark/**/*.jade', 'src/views/layouts/**/*.jade', 'docs/**/*.md'], tasks: ['jade:demo']},

            //grunt_typescript: {files: ['src/clones/grunt-typescript/src/**/*.ts'], tasks: ['subgrunt:typescript']},
            //js          : {files: ['src/js/**/*.js'], tasks: ['copy:js']},
            styles          : {files: ['src/styles/**/*.{scss,sass}'], tasks: ['styles']},
            ts            : {files: ['src/ts/**/*.ts'], tasks: ['ts:packadic', 'uglify:ts_packadic']},
            jade_test_page: {files: ['src/views/test.jade'], tasks: ['jade:test_page']},
            bower         : {files: ['bower.json'], tasks: ['bower']},
            //shebangify  : {files: ['lib/bin/docgen.js'], tasks: ['shebangify']},
            livereload    : {
                options: {livereload: 35729},
                files  : ['<%= target.dest %>/**/*', '!<%= target.dest %>/assets/bower_components/**/*']
            }
        }
    };

    target = config.target = config.targets[target];
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.task.renameTask('watch', 'default_watch');
    grunt.loadTasks('tasks');
    grunt.initConfig(config);

    [
        // default
        ['tasks', 'Shows all available tasks', ['availabletasks:tasks']],
        ['default', 'Show all available tasks', ['tasks']],
        // copy
        ['images', 'Copy images', ['clean:images', 'copy:images']],
        ['bower', 'Copy bower components', ['clean:bower', 'copy:bower']],
        // compile
        ['styles', 'Compile all SCSS stylesheets', ['clean:styles', 'sass:styles']],
        ['scripts', 'Concat & uglify vendor scripts and compile typescript files',
            ['clean:scripts', 'uglify:vendor', 'jade:templates', 'ts:packadic', 'uglify:ts_packadic', 'copy:js']
        ],
        ['views', 'Compile the jade view', ['clean:views', 'jade:' + target.name]],
        // build
        ['docs', 'Generate the docs', ['clean:docs', 'typedoc:ts']],
        ['demo', 'Build the theme', ['clean:all', 'bower', 'images', 'styles', 'scripts', 'views', 'docs']],
        ['dist', 'Build the distribution version (optimized)', ['clean:all', 'bower', 'styles', 'scripts', 'images']],
        ['dev', 'Build a dev thingy', ['clean:all', 'bower', 'styles', 'scripts', 'images', 'jade:test_page','jade:views']],
        // dev
        ['lib', 'Compile typescript files in lib for node.', ['typescript:lib']],
        ['watch', 'Watch for file changes and fire tasks.', ['concurrent:watch']],
        ['serve', 'Create a local server. Builds & hosts the demo and watches for changes. Use serve:fast to skip demo build task.', function (opt) {
            if ( typeof opt === 'string' && opt === 'fast' ) {
                grunt.log.warn('Skipping demo build task');
                grunt.task.run(['connect:' + target.name, 'watch'])
            } else {
                grunt.task.run([target.name, 'connect:' + target.name, 'watch'])
            }
        }],
        ['shebangify', 'Shebang bang bang', function () {
            shebangFile = path.join(__dirname, 'lib/bin/docgen.js');
            var data = fs.readFileSync(shebangFile, 'utf-8');
            var exp = /^#!\/usr\/bin\/env\snode$/m;
            if ( ! exp.test(data) ) {
                fs.writeFileSync(shebangFile, "#!/usr/bin/env node\n\n" + data);
            }
        }],
        ['junk', '', function () {
            globule.find('src/tscripts/**/*.{js,js.map}').forEach(function (file) {
                fs.removeSync(file);
                grunt.log.ok('Removed: ' + file);
            });
        }]
    ].forEach(function (simpleTask) {
        grunt.registerTask(simpleTask[0], simpleTask[1], simpleTask[2]);
    }.bind(this));
};
