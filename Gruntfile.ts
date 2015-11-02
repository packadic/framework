///<reference path='src/typings/tsd/tsd.d.ts'/>
import * as fs from 'fs-extra';
import * as path from 'path'
import * as _ from 'lodash';
import * as util from 'util';
import * as _s from 'underscore.string';
import {material} from './src/scripts/lib/utils';

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
        },

        copy: {
            images      : {files: [{cwd: 'src/images', src: ['**'], dest: '<%= target.dest %>/assets/images/', expand: true}]},
            data        : {options: {mtimeUpdate: true}, files: [{cwd: 'src/data', src: ['**/*.*'], dest: '<%= target.dest %>/data/', expand: true}]},
            systemConfig: {files: [{cwd: '', src: ['system.config.js'], dest: '<%= target.dest %>/assets', expand: true}]},
            jspm        : {files: [{cwd: '', src: ['jspm_packages/**/*', 'system.config.js'], dest: '<%= target.dest %>/', expand: true}]},
            ts_app      : {options: {mtimeUpdate: true}, files: [{cwd: '<%= target.dest %>/.tmp', src: ['**/*.*'], dest: '<%= target.dest %>/assets/scripts', expand: true}]},
            ts          : {options: {mtimeUpdate: true}, files: [{cwd: 'src', src: ['{scripts,typings}/**/*.{ts,d.ts}'], dest: '<%= target.dest %>/assets/', expand: true}]},
            jade        : {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts', src: ['**/*.jade'], dest: '<%= target.dest %>/assets/scripts', expand: true}]},
            htaccess    : {src: 'src/.htaccess', dest: '<%= target.dest %>/.htaccess'}
        },

        jade: {
            options: {
                pretty: true, data: (() => {
                    return _.merge({}, {
                        _       : _,            // pass lodash to jade, always usefull at some point
                        _s      : _s,
                        _inspect: util.inspect,
                        material: material,
                        _target : '<%= target %>',       // current grunt target data
                        baseHref: '/'           // base href
                    });
                })()
            },
            index  : {src: 'src/index.jade', dest: '<%= target.dest %>/index.html'},
            views  : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!**/_*.jade', '!**/metalshark/**/*.jade', '!**/partials/**/*.jade', '!**/layouts/**/*.jade'], ext: '.html', dest: '<%= target.dest %>/'}]},
            scripts: {files: [{expand: true, cwd: 'src/scripts', src: ['**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>/assets/scripts/'}]}
            //views : {files: [{expand: true, cwd: 'src/views', src: ['**/*.jade', '!metalshark/**/*.jade', '!partials/**/*.jade', '!layouts/**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.dest %>/'}]}
        },

        sass: {
            options: {sourceMap: ifTarget('dev', true), outputStyle: ifTarget('dev', 'expanded', 'compressed')},
            styles : {files: [{expand: true, cwd: 'src/styles', src: ['**/*.{sass,scss}'], ext: '.css', dest: '<%= target.dest %>/assets/styles'}]},
        },

        ts: {
            options: {
                compiler              : 'node_modules/typescript/bin/tsc',
                target                : 'ES5',
                module                : 'commonjs',
                sourceMap             : ifTarget('dev', true),
                experimentalDecorators: true,
                emitDecoratorMetadata : true,
                removeComments        : ifTarget('dev', true),
                noImplicitAny         : false
            },
            app    : {
                options: {declaration: false}, src: ['src/scripts/**/*.{ts,d.ts}'], outDir: '<%= target.dest %>/.tmp'
            }
        },

        systemjs: {
            options: {
                baseURL: "./<%= target.dest %>", configFile: "./<%= target.dest %>/system.config.js",
                sfx    : true, minify: true, build: {mangle: false}
            },
            app    : {files: [{"src": "./<%= target.dest %>/app/init.js", "dest": "./<%= target.dest %>/app/init.js"}]}
        },

        injector: {
            options: {
                starttag  : '<!-- injector:{{ext}}-->', // removed space as jade does that aswell.
                endtag    : '<!-- endinjector-->',
                ignorePath: ['<%= target.dest %>/']
            },
            index  : {
                files: {
                    './<%= target.dest %>/index.html': ['<%= target.dest %>/jspm_packages/system.src.js', '<%= target.dest %>/system.config.js']
                        .concat(['<%= target.dest %>/assets/styles/stylesheet.css', '<%= target.dest %>/assets/styles/themes/theme-default.css'])
                }
            },
            js     : {}
        },

        bytesize: {app: {src: ['<%= targets.dist.dest %>/app/init.js']}},

        connect: {dev: {options: {port: 8000, livereload: false, base: 'dev'}}},

        watch: {
            options     : {livereload: true},
            data        : {files: 'src/data/**/*.*', tasks: ['newer:copy:data']},
            jade_index  : {files: 'src/index.jade', tasks: ['jade:index', 'injector:index']},
            jade_views  : {files: ['src/views/**/*.jade', '!src/views/**/_*.jade'], tasks: ['newer:jade:views']},
            jade_scripts: {files: ['src/scripts/**/*.jade', '!src/scripts/**/_*.jade'], tasks: ['newer:jade:scripts', 'newer:copy:jade']},
            //ts_app:{files: '<%= target.dest %>/.tmp/**/*.*', tasks: ['newer:copy:ts_app']}
            ts_copy     : {files: 'src/{scripts,typings}/**/*.{ts,d.ts}', tasks: ['clean:ts', 'copy:ts']}
        }
    };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    config.ts['app_watch']       = _.clone(config.ts.app);
    config.ts['app_watch'].watch = 'src/scripts';

    grunt.initConfig(config);

    [
        ['default', 'Default task', ['build']],
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
