///<reference path='src/types.d.ts'/>
import * as fs from 'fs-extra';
import * as globule from 'globule';
import * as path from 'path'
import * as _ from 'lodash';
import * as util from 'util';
import * as _s from 'underscore.string';
//import * as c from './src/scripts/core/lib/utils';

require('ts-node').register();

//import * as Builder from 'systemjs';

function log(...args:any[]) {
    args.forEach((arg:any) => {
        process.stdout.write(util.inspect(arg, <util.InspectOptions> {colors: true, showHidden: true}));
    })

}
export = function (grunt) {

///    process.stdout.write(util.inspect(utils, { colors: true }));
    var targets = {
        dist: {name: 'dist', dest: 'dist'},
        dev : {name: 'dev', dest: 'dev'}
    };

    function setTarget(name:string) {
        grunt.config.set('target', targets[name]);
    }

    function ifTarget(name:string, then:any, els:any = false) {
        return () => grunt.config('target').name == name ? then : els;
    }

    function tsp(...filePath:any[]) {
        return path.join.apply(path, ['src', 'scripts'].concat(filePath));
    }


    var config = {
        pkg: fs.readJSONSync('package.json'),

        target : targets[grunt.option('target') || 'dev'],
        targets: targets,

        clean: {
            all       : {src: '<%= target.dest %>'},
            views     : {src: '<%= target.dest %>/**/*.html'},
            basedir   : {src: '{dev,dist,src}/**/.baseDir.*'},
            ts_app_tmp: {src: '<%= target.dest %>/.tmp'},
            ts        : {src: '<%= target.dest %>/assets/scripts/**/*.{ts,d.ts}'},
            nosrc     : {src: 'src/scripts/**/*.{js,js.map}'},
        },

        copy: {
            images        : {files: [{cwd: 'src/images', src: ['**'], dest: '<%= target.dest %>/assets/images/', expand: true}]},
            systemConfig  : {files: [{cwd: '', src: ['system.config.js'], dest: '<%= target.dest %>/assets', expand: true}]},
            jspm          : {files: [{cwd: '', src: ['jspm_packages/**/*', 'system.config.js'], dest: '<%= target.dest %>/', expand: true}]},
            ts_jade       : {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts', src: ['**/*.jade'], dest: '<%= target.dest %>/assets/scripts', expand: true}]},
            ts_demo       : {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts/demo', src: ['**/*.ts'], dest: '<%= target.dest %>/assets/scripts/demo', expand: true}]},
            htaccess      : {src: 'src/.htaccess', dest: '<%= target.dest %>/.htaccess'},
            packadic_ts_js: {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts/packadic', src: ['**/*.{ts,js,js.map}'], dest: '<%= target.dest %>/assets/scripts/packadic', expand: true}]},
        },

        jade: {
            options: {
                pretty: true, data: (() => {
                    return _.merge({}, {_: _, _s: _s, _inspect: util.inspect, _target: '<%= target %>', baseHref: '/'});
                })()
            },
            index  : {src: 'src/index.jade', dest: '<%= target.dest %>/index.html'},
            scripts: {files: [{expand: true, cwd: 'src/scripts', src: ['**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>/assets/scripts/'}]}
        },

        sass: {
            options: {sourceMap: ifTarget('dev', true), outputStyle: ifTarget('dev', 'expanded', 'compressed')},
            styles : {files: [{expand: true, cwd: 'src/styles', src: ['**/*.{sass,scss}'], ext: '.css', dest: '<%= target.dest %>/assets/styles'}]},
        },

        ts: {
            options : {
                compiler              : 'node_modules/typescript/bin/tsc',
                target                : 'ES5',
                module                : 'umd',
                sourceMap             : ifTarget('dev', true),
                experimentalDecorators: true,
                emitDecoratorMetadata : true,
                removeComments        : ifTarget('dev', true),
                noImplicitAny         : false
            },
            packadic: {
                options: {declaration: true}, outDir: '<%= target.dest %>/assets/scripts/packadic',
                src    : [tsp('packadic', 'types.d.ts'), tsp('packadic', '**/*.ts')] //, tsp('packadic', 'util/*.ts'), tsp('packadic', 'app/*.ts'), tsp('packadic', '~bootstrap.ts')]
            },
            demo    : {
                outDir: '<%= target.dest %>/assets/scripts/demo',
                src   : ['src/types.d.ts', tsp('demo', '**', '*.ts')]
            }
        },

        jspm_bundle: {
            demo: {
                options: {minify: true},
                action : 'bundle', expression: 'demo', fileName: '<%= target.dest %>/assets/scripts/demo.js',
            }
        },

        systemjs: {
            options: {
                baseURL: "./<%= target.dest %>", configFile: "./<%= target.dest %>/system.config.js",
                sfx    : true, minify: true, build: {mangle: false}
            },
            app    : {files: [{"src": "./<%= target.dest %>/app/init.js", "dest": "./<%= target.dest %>/app/init.js"}]}
        },

        injector: { // removed space as jade does that aswell.
            options: {starttag: '<!-- injector:{{ext}}-->', endtag: '<!-- endinjector-->', ignorePath: ['<%= target.dest %>/']},
            index  : {
                files: {
                    './<%= target.dest %>/index.html': ['<%= target.dest %>/jspm_packages/system.src.js', '<%= target.dest %>/system.config.js',
                        ]
                        .concat(['<%= target.dest %>/assets/styles/stylesheet.css', '<%= target.dest %>/assets/styles/themes/theme-dark-sidebar.css'])
                }
            }
        },

        bytesize: {app: {src: ['<%= targets.dist.dest %>/app/init.js']}},

        connect: {dev: {options: {port: 8000, livereload: false, base: 'dev'}}},

        watch: {
            options   : {livereload: true},
            jade_index: {files: ['src/index.jade', 'src/views/layouts/default.jade'], tasks: ['jade:index', 'injector:index']},
            jadescripts: {files: ['src/scripts/**/*.jade'], tasks: ['copy:ts_jade']},
            sass: {files: ['src/styles/**/*.{sass,scss}'], tasks: ['sass:styles']},
            //scripts   : {files: 'src/scripts/packadic/**/*.ts', tasks: ['scripts']},
            scriptsc   : {files: 'src/scripts/packadic/**/*.ts', tasks: ['copy:packadic_ts_js']},
            demoscripts   : {files: 'src/scripts/demo/**/*.ts', tasks: ['copy:ts_demo']},
            //ts_copy   : {files: 'src/{scripts,typings}/**/*.{ts,d.ts}', tasks: ['clean:ts', 'copy:ts']}
        }
    };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    //grunt.loadTasks('src/tasks');
    log(require('./src/tasks/jspm_bundle')(grunt)); //(grunt);

    config.ts['app_watch']       = _.clone(config.ts.packadic);
    config.ts['app_watch'].watch = 'src/scripts';


    grunt.initConfig(config);

    [
        ['default', 'Default task', ['build']],
        ['scripts', 'Build scripts', ['ts:packadic', 'copy:packadic_ts_js', 'copy:ts_demo', 'clean:nosrc', 'clean:basedir']],
        ['demo', 'Build dev demo', ['clean:all', 'copy:ts_jade', 'copy:ts_demo', 'jspm', 'sass:styles', 'jade:index', 'injector:index', 'scripts']],


        ['ts_app', 'Compile ts', ['ts:app', 'copy:ts_app', 'clean:ts_app_tmp', 'clean:basedir']],
        ['build', 'Build dev', ['clean:all', 'jade', 'sass:styles', 'copy:ts', 'copy:data', 'copy:jade', 'copy:htaccess', 'jspm', 'injector:index']],
        ['dist', 'Build dist', ['target:dist', 'clean:all', 'jade', 'jspm', 'sass:app', 'ts_app', 'injector:index', 'systemjs:app', 'bytesize:app']],
        ['serve', 'Dont use this', ['connect:dev', 'watch']],
        ['target', 'Set target trough task', function (targ) {
            setTarget(targ);
        }],
        ['jspm', 'Link or copy the jspm_packages folder to the target destination', () => {
            var target = grunt.config('target');
            grunt.log.ok('JSPM for target:' + JSON.stringify(target));
            var task = target.name === 'dev' ? 'link:jspm' : 'copy:jspm';
            !fs.existsSync(target.name) && fs.mkdirpSync(target.name);
            grunt.task.run(task);
        }],
        ['link', 'Create a symlink into the target from the project dir', function (opt) {
            var target = grunt.config('target');

            function makeLink(to) {
                var cwd = process.cwd();
                grunt.log.ok(cwd);
                process.chdir(target.dest);
                var relPath = path.relative(
                    process.cwd(),
                    path.join(cwd, to)
                );
                if (fs.existsSync(path.join(process.cwd(), to))) {
                    grunt.log.warn('skipping ' + to + ' - already exists')
                } else {
                    fs.symlinkSync(relPath, to);
                    grunt.log.ok('symlink created: ' + relPath + ' -> ' + path.join(target.dest, 'assets', to));
                }
                process.chdir(cwd);
            }

            if (opt === 'bower') {
                makeLink('bower_components');
            } else if (opt === 'jspm') {
                makeLink('jspm_packages');
                makeLink('system.config.js');
            }
        }],
    ].forEach(function (simpleTask) {
        grunt.registerTask(simpleTask[0], simpleTask[1], simpleTask[2]);
    }.bind(this));

    fs.existsSync('tmp') && fs.removeSync('tmp');


    //console.log(util.inspect(grunt.config.get('ts'), { colors: true }))
}
