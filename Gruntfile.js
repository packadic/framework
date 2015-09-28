var util    = require('util'),
    inspect = util.inspect,
    path    = require('path');
var fs = require('fs-extra');

var _       = require('lodash'),
    _s      = require('underscore.string'),
    exec    = require('child_process').execSync,
    grunt   = require('grunt'),
    globule = require('globule'),
    jsyaml  = require('js-yaml'),
    xml2js  = require('xml2js');

function _out() {
    function ins(val) {
        process.stdout.write(inspect(val, {hidden: true, colors: true, depth: 7}) + '\n');
    }

    [].concat(_.toArray(arguments)).forEach(function (arg) {
        ins(arg);
    })
}

var docs = {};

function getVendorScripts(vendorScripts) {
    var scripts = [];
    for (var k in vendorScripts) {
        scripts.push('bower_components/' + vendorScripts[k]);
    }
    return scripts;
}
function getNotyScripts() {
    var dir = path.join('bower_components', 'noty', 'js', 'noty');
    var srcDir = path.join('src', 'js', 'noty');
    var files = [path.join(dir, 'jquery.noty.js')];

    // layout definition files
    files.push(globule.find(path.join(dir, 'layouts') + '/**/*.js'));

    // we fetch theme & layout definition files we created ourself
    files.push(globule.find(path.join(srcDir, '*.js')));

    return files;
}

module.exports = function (_grunt) {
    grunt = _grunt;

    var target = grunt.option('target') || 'dev';
    var configFile = grunt.option('config') || path.join(__dirname, 'config.yml');
    var vendorScripts = getVendorScripts([
        //'reflect-metadata/Reflect.js', 'es6-module-loader/dist/es6-module-loader.js', 'system.js/dist/system.src.js', 'vue/dist/vue.js',
        'lodash/lodash.js', 'eventemitter2/lib/eventemitter2.js', 'async/dist/async.js', 'underscore.string/dist/underscore.string.js', 'jade/runtime.js',
        'jquery/dist/jquery.js', 'jquery-migrate/jquery-migrate.js', 'jquery-ui/ui/widget.js', 'jquery-slimscroll/jquery.slimscroll.js', 'jcarousel/dist/jquery.jcarousel.js',
        'tether/dist/js/tether.js', 'bootstrap/dist/js/bootstrap.js', 'bootstrap-material-design/dist/js/material.js'
    ]);
    var notyScripts = getNotyScripts();

    grunt.log.subhead('Packadic Builder for Packadic ' + require('./bower.json').version);

    var config = {
        cfg    : jsyaml.safeLoad(fs.readFileSync(configFile, 'utf8')),
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
        clean : {
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
        concat: {
            vendor: {
                src : vendorScripts,
                dest: '<%= target.dest %>/assets/scripts/vendor.js'
            },
            noty  : {
                src : notyScripts,
                dest: '<%= target.dest %>/assets/scripts/noty.js'
            }
        },
        copy  : {
            images        : {src: ['**'], cwd: 'src/images', expand: true, dest: '<%= target.dest %>/assets/images/'},
            bower         : {src: ['**/*.{js,css,woff*,ttf,swf}'], cwd: 'bower_components', expand: true, dest: '<%= target.dest %>/assets/bower_components/'},
            scss          : {src: ['**/*.scss'], cwd: 'src/styles', expand: true, dest: '<%= target.dest %>/assets/styles/scss/'},
            js            : {src: ['**/*.js'], cwd: 'src/js', expand: true, dest: '<%= target.dest %>/assets/scripts/'},
            ts_extensions: {src: ['**/*.ts'], cwd: 'src/ts/extensions', expand: true, dest: '<%= target.dest %>/assets/scripts/extensions'},
            angular2_app  : {src: ['**/*.{js,js.map,html,css}'], cwd: 'src/angular2', expand: true, dest: '<%= target.dest %>/angular2-app'},
            angular2_files: {src: ['**/*.{js,js.map,html}'], cwd: 'node_modules/angular2', expand: true, dest: '<%= target.dest %>/assets/angular2'}
        },
        jade  : {
            options  : {
                pretty: true, data: function () {
                    return _.merge({}, {
                        _       : _,
                        _s      : _s,
                        _inspect: util.inspect,
                        _target : target,
                        material: require('./src/grunt/material-colors'),
                        sources : {}
                    });
                }.call()
            },
            test_page: {files: [{expand: true, cwd: 'src/views', src: ['test.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!layouts/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            views    : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!{document,typedoc}.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!layouts/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            templates: {
                options: {client: true, amd: false, namespace: 'JST'},
                files  : [{expand: true, cwd: 'src/templates', src: ['**/*.jade', '!**/_*.jade'], ext: '.js', dest: '<%= target.dest %>/assets/scripts/templates'}]
            }
        },

        sass: {
            options: {sourceMap: false, outputStyle: 'expanded'}, // '<%= target.name === "demo" ? "expanded" : "compressed" %>'},
            styles : {
                files: {
                    '<%= target.dest %>/assets/styles/stylesheet.css'               : 'src/styles/stylesheet.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-default.css'     : 'src/styles/themes/theme-default.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-dark-sidebar.css': 'src/styles/themes/theme-dark-sidebar.scss'
                }
            }
        },
        wrap: {
            noty: {
                src    : '<%= target.dest %>/assets/scripts/noty.js',
                dest   : '<%= target.dest %>/assets/scripts/noty.js',
                options: {
                    wrapper: ["!function(root, factory) {\n\t if (typeof define === 'function' && define.amd) {\n\t\t define(['jquery'], factory);\n\t } else if (typeof exports === 'object') {\n\t\t module.exports = factory(require('jquery'));\n\t } else {\n\t\t factory(root.jQuery);\n\t }\n}(this, function($) {\n", "\nreturn window.noty;\n\n});"]
                }
            }
        },

        /**/
        //      Scripting
        /**/
        uglify    : {
            vendor     : {
                files: {
                    '<%= target.dest %>/assets/scripts/vendor.min.js': vendorScripts,
                    '<%= target.dest %>/assets/scripts/noty.min.js'  : '<%= target.dest %>/assets/scripts/noty.js' // make sure to WRAP it first mofo
                }
            },
            ts_packadic: {
                files: {
                    '<%= target.dest %>/assets/scripts/packadic.min.js': [
                        'src/ts/packadic.js',
                        'src/ts/{components,plugins}/*.js'
                    ]
                }
            },
            templates  : {files: {'<%= target.dest %>/assets/scripts/templates.min.js': ['<%= target.dest %>/assets/scripts/templates/**/*.js']}}
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
            options   : {compiler: 'node_modules/typescript/bin/tsc', target: 'ES5', emitError: true, sourceMap: target === 'dev', experimentalDecorators: true},
            packadic  : {
                options: {declaration: true, sourceMap: target === 'dev'},
                src    : ['src/ts/packadic/@init.ts', 'src/ts/packadic/{util,lib}/**/*.ts', 'src/ts/packadic/addons/**/*.ts', 'src/ts/packadic/~bootstrap.ts'],
                out    : 'src/ts/packadic.js'
            },
            extensions: {files: [{src: ['src/ts/extensions/**/*.ts']}], options: {declaration: false, sourceMap: target === 'dev'}}
        },

        /**/
        //      Documentation
        /**/
        sassdoc: {styles: {src: ['src/styles', 'bower_components/bourbon/app/assets/stylesheets'], options: {dest: '<%= target.dest %>/docs/scss'}}},
        typedoc: {
            options   : {target: 'es5', mode: 'file', hideGenerator: '', experimentalDecorators: '', includeDeclarations: ''},
            packadic  : {
                options: {
                    out                 : '<%= target.dest %>/docs/packadic', name: 'Packadic API Documentation', readme: 'docs/packadic.md',
                    ignoreCompilerErrors: '', excludeExternals: ''
                },
                src    : ['src/ts/**/*.ts', '!src/ts/packadic.d.ts', '!src/ts/plugins/**/*.ts']
            },
            extensions: {src: ['src/ts/components/**/*.ts', '!src/ts/packadic.d.ts'], options: {out: '<%= target.dest %>/docs/components', name: 'Packadic API Documentation', readme: 'docs/packadic.md'}},
            plugins   : {src: ['src/ts/plugins/**/*.ts', '!src/ts/packadic.d.ts'], options: {out: '<%= target.dest %>/docs/plugins', name: 'Packadic API Documentation', readme: 'docs/packadic.md'}}
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
            options: {livereload: true},

            templates: {files: ['src/templates/**/*.jade'], tasks: ['jade:templates', 'uglify:templates']},

            js           : {files: ['src/js/**/*.js'], tasks: ['copy:js']},
            styles       : {files: ['src/styles/**/*.{scss,sass}'], tasks: ['styles']},
            views        : {files: ['src/views/partials/**/*.jade', 'src/views/**/_*.jade', 'src/views/metalshark/**/*.jade', 'src/views/layouts/**/*.jade', 'docs/**/*.md'], tasks: ['jade:views']},
            newerViews   : {files: ['src/views/**/*.jade', '!src/views/partials/**/*.jade', '!src/views/metalshark/**/*.jade', '!src/views/**/_*.jade'], tasks: ['newer:jade:views']},
            ts_packadic  : {files: ['src/ts/packadic/**/*.ts'], tasks: ['ts:packadic', 'ts:extensions', 'uglify:ts_packadic', 'copy_ts_scripts']},
            ts_extensions: {files: ['src/ts/extensions/**/*.ts'], tasks: ['ts:extensions', 'copy:ts_extensions', 'copy_ts_scripts']},

            noty          : {files: ['src/js/noty/**/*.js'], tasks: ['concat:noty', 'wrap:noty']},
            jade_test_page: {files: ['src/views/test.jade'], tasks: ['jade:test_page']},
            bower         : {files: ['bower.json'], tasks: ['bower']},

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
        ['styles', 'Compile all SCSS stylesheets', ['clean:styles', 'sass:styles', 'animate_css']],
        ['scripts', 'Concat & uglify vendor scripts and compile typescript files',
            [
                'clean:scripts', 'concat:vendor', 'concat:noty', 'wrap:noty',
                'uglify:vendor', 'jade:templates', 'uglify:templates', 'ts:packadic', 'ts:extensions',
                'uglify:ts_packadic', 'copy_ts_scripts', 'copy:js'
            ]
        ],
        ['views', 'Compile the jade view', ['clean:views', 'jade:' + target.name]],
        // build
        ['docs', 'Generate the docs', ['clean:docs', 'typedoc:ts']],
        ['demo', 'Build the theme', ['clean:all', 'bower', 'images', 'styles', 'scripts', 'views', 'docs']],
        ['dist', 'Build the distribution version (optimized)', ['clean:all', 'bower', 'images', 'styles', 'scripts']],
        ['dev', 'Build a dev thingy', ['clean:all', 'bower', 'styles', 'scripts', 'images', 'jade:test_page', 'jade:views']],
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
        ['copy_ts_scripts', 'Copy declarations to other paths', function () {
            globule.find('src/ts/**/*.{js,js.map}').forEach(function (file) {
                fs.copySync(file, path.join(target.dest, 'assets/scripts', path.relative(path.join(__dirname, 'src/ts'), file)));
            })
        }],
        ['junk', '', function () {
            globule.find('src/ts/**/*.{js,js.map}').forEach(function (file) {
                fs.removeSync(file);
                grunt.log.ok('Removed: ' + file);
            });
        }]
    ].forEach(function (simpleTask) {
        grunt.registerTask(simpleTask[0], simpleTask[1], simpleTask[2]);
    }.bind(this));
};
