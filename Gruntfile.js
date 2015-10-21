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
    vendorScripts.forEach(function (file) {
        if ( _s.startsWith(file, '#') ) {
            scripts.push(file.replace('#', 'src/js/'));
        } else {
            scripts.push('bower_components/' + file);
        }
    });

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

function makeWrapper(returnText) {
    return [
        "!function(root, factory) {\n\t if (typeof define === 'function' && define.amd) {\n\t\t define(['jquery'], factory);\n\t } else if (typeof exports === 'object') {\n\t\t module.exports = factory(require('jquery'));\n\t } else {\n\t\t factory(root.jQuery);\n\t }\n}(this, function($) {\n",
        "\n" + returnText + ";\n\n});"
    ];
}

module.exports = function (_grunt) {
    grunt = _grunt;

    var target = grunt.option('target') || 'dev';
    var configFile = grunt.option('config') || path.join(__dirname, 'config.yml');

    var notyScripts = getNotyScripts();
    var vendorScripts = getVendorScripts([
        'lodash/lodash.js', 'eventemitter2/lib/eventemitter2.js', 'async/dist/async.js', 'underscore.string/dist/underscore.string.js', 'jade/runtime.js',
        'jquery/dist/jquery.js', 'jquery-migrate/jquery-migrate.js', 'jquery-ui/ui/widget.js', 'jquery-slimscroll/jquery.slimscroll.js', 'jcarousel/dist/jquery.jcarousel.js',
        'tether/dist/js/tether.js', 'bootstrap/dist/js/bootstrap.js', 'bootstrap-material-design/dist/js/material.js'
    ])

    grunt.log.subhead('Packadic Builder for Packadic ' + require('./bower.json').version);

    //_out(vendorScripts);

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
            images         : {cwd: 'src/images', src: ['**'], dest: '<%= target.dest %>/assets/images/', expand: true},
            bower          : {cwd: 'bower_components', src: ['**/*.{js,css,woff*,ttf,swf}'], dest: '<%= target.dest %>/assets/bower_components/', expand: true},
            js             : {cwd: 'src/js', src: ['**/*.js'], dest: '<%= target.dest %>/assets/scripts/', expand: true},
            angular_bundles: {cwd: 'node_modules/angular2/bundles', src: ['**/*.{js,js.map}'], dest: '<%= target.dest %>/assets/angular2', expand: true},
            jspm           : {cwd: '', src: ['jspm_packages/**/*', 'system.config.js'], dest: '<%= target.dest %>/assets/', expand: true},
        },
        jade : {
            options  : {
                pretty: true, data: function () {
                    return _.merge({}, {
                        _          : _,
                        _s         : _s,
                        _inspect   : util.inspect,
                        _target    : target,
                        material   : require('./src/grunt/material-colors'),
                        getRandomId: function (length) {
                            if ( ! _.isNumber(length) ) {
                                length = 15;
                            }
                            var text = "";
                            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                            for (var i = 0; i < length; i ++) {
                                text += possible.charAt(Math.floor(Math.random() * possible.length));
                            }
                            return text;
                        },
                        sources    : {
                            md: function (name) {
                                var file = name + (_s.endsWith(name, '.md') ? '' : '.md');
                                return fs.readFileSync(path.join(__dirname, 'src', 'md', file));
                            }
                        }
                    });
                }.call()
            },
            views    : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!{document,typedoc}.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!layouts/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            demo     : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade'], ext: '.html', dest: '<%= target.dest %>'}]},
            templates: {
                options: {client: true, amd: false, namespace: 'JST'},
                files  : [{expand: true, cwd: 'src/templates', src: ['**/*.jade', '!**/_*.jade'], ext: '.js', dest: '<%= target.dest %>/assets/scripts/templates'}]
            },
            angular  : {files: [{expand: true, cwd: 'src/angular', src: ['**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>/app'}]}
        },

        sass: {
            options: {sourceMap: false, outputStyle: '<%= target.name === "dev" ? "expanded" : "compressed" %>'},
            styles : {
                files: {
                    '<%= target.dest %>/assets/styles/stylesheet.css'               : 'src/styles/stylesheet.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-default.css'     : 'src/styles/themes/theme-default.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-dark-sidebar.css': 'src/styles/themes/theme-dark-sidebar.scss',
                    '<%= target.dest %>/assets/styles/themes/theme-codex.css'       : 'src/styles/themes/theme-codex.scss'
                }
            }
        },

        /**/
        //      Scripting
        /**/
        concat  : {
            vendor: {src: vendorScripts, dest: '<%= target.dest %>/assets/scripts/vendor.js'},
            noty  : {src: notyScripts, dest: '<%= target.dest %>/assets/scripts/noty.js'}
        },
        umd     : {
            noty    : {src: '<%= target.dest %>/assets/scripts/noty.js', dest: '<%= target.dest %>/assets/scripts/noty.js', objectToExport: 'window.noty'},
            packadic: {src: '<%= target.dest %>/assets/scripts/packadic.js', dest: '<%= target.dest %>/assets/scripts/packadic.js', objectToExport: 'packadic'}
        },
        uglify  : {
            vendor   : {
                files: {
                    '<%= target.dest %>/assets/scripts/vendor.min.js': vendorScripts.concat([
                        '<%= target.dest %>/assets/scripts/noty.js' // make sure to WRAP noty and concat it first mofo
                    ])
                }
            },
            packadic : {
                files: {
                    '<%= target.dest %>/assets/scripts/packadic.min.js': [
                        '<%= target.dest %>/assets/scripts/packadic.js',
                        '<%= target.dest %>/assets/scripts/addons.js'
                    ]
                }
            },
            templates: {files: {'<%= target.dest %>/assets/scripts/templates.min.js': ['<%= target.dest %>/assets/scripts/templates/**/*.js']}}
        },
        ts      : {
            options : {compiler: 'node_modules/typescript/bin/tsc', target: 'ES5', emitError: true, sourceMap: target === 'dev', experimentalDecorators: true},
            packadic: {
                options: {declaration: true, sourceMap: target === 'dev'},
                src    : ['src/ts/packadic/@init.ts', 'src/ts/packadic/{util,lib}/**/*.ts', 'src/ts/packadic/~bootstrap.ts'],
                out    : 'src/ts/packadic.js'
            },
            angular : {
                options: {module: 'commonjs', outDir: '<%= target.dest %>/app'},
                src    : ['src/angular/**/*.ts'],
                outDir : '<%= target.dest %>/app'
            }
        },
        packadic: {
            dir : 'src/ts/addons',
            dest: '<%= target.dest %>/assets/scripts/addons.js',
            //wrap: false
        },

        /**/
        //      Documentation
        /**/
        sassdoc: {styles: {src: ['src/styles', 'bower_components/bourbon/app/assets/stylesheets'], options: {dest: '<%= target.dest %>/docs/scss'}}},
        typedoc: {
            options : {target: 'es5', mode: 'file', hideGenerator: '', experimentalDecorators: '', includeDeclarations: ''},
            packadic: {
                options: {out: '<%= target.dest %>/docs/packadic', name: 'Packadic API Documentation', readme: 'docs/packadic.md', ignoreCompilerErrors: '', excludeExternals: ''},
                src    : ['src/ts/**/*.ts', '!src/ts/packadic.d.ts', '!src/ts/plugins/**/*.ts']
            }
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

            js    : {files: ['src/js/**/*.js'], tasks: ['copy:js']},
            styles: {files: ['src/styles/**/*.{scss,sass}'], tasks: ['styles']},

            views     : {files: ['src/views/partials/**/*.jade', 'src/views/**/_*.jade', 'src/views/metalshark/**/*.jade', 'src/views/layouts/**/*.jade', 'docs/**/*.md'], tasks: ['jade:views']},
            newerViews: {files: ['src/views/**/*.jade', '!src/views/partials/**/*.jade', '!src/views/metalshark/**/*.jade', '!src/views/**/_*.jade'], tasks: ['newer:jade:views']},

            ts    : {files: ['src/ts/packadic/**/*.ts'], tasks: ['ts:packadic', 'copy_ts_scripts', 'umd:packadic']},
            addons: {files: ['src/ts/addons/**/*.{ts,jade}'], tasks: ['packadic']},

            noty : {files: ['src/js/noty/**/*.js'], tasks: ['concat:noty', 'wrap:noty']},
            bower: {files: ['bower.json'], tasks: ['bower']},
            jspm: {files: ['jspm_packages/**/*', 'system.config.js'], tasks: ['copy:jspm']},

            angularts  : {files: ['src/angular/**/*.ts'], tasks: ['ts:angular']},
            angularjade: {files: ['src/angular/**/*.jade'], tasks: ['jade:angular']},
            livereload : {
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
                'clean:scripts',
                'concat:vendor', 'concat:noty', 'umd:noty', 'uglify:vendor',
                'jade:templates', 'uglify:templates',
                'ts:packadic', 'copy_ts_scripts', 'umd:packadic',
                'packadic',
                'uglify:packadic',
                'copy:js'
            ]
        ],
        ['views', 'Compile the jade view', ['clean:views', 'jade:' + target.name]],
        // build
        ['docs', 'Generate the docs', ['clean:docs', 'typedoc:ts']],
        ['demo', 'Build the theme', ['clean:all', 'bower', 'copy:jspm', 'images', 'styles', 'scripts', 'views', 'docs']],
        ['dist', 'Build the distribution version (optimized)', ['clean:all', 'bower', 'copy:jspm', 'images', 'styles', 'scripts']],
        ['dev', 'Build a dev thingy', ['clean:all', 'bower', 'copy:jspm', 'styles', 'scripts', 'images', 'jade:views']],
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
