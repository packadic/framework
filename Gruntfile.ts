///<reference path='src/scripts/types.d.ts'/>
import * as fs from 'fs-extra';
import * as globule from 'globule';
import * as path from 'path'
import * as _ from 'lodash';
import * as util from 'util';
import * as _s from 'underscore.string';

require('ts-node').register();

function log(...args:any[]) {
    args.forEach((arg:any) => {
        process.stdout.write(util.inspect(arg, <util.InspectOptions> {colors: true, showHidden: true}));
    })
}

function modifyGrunt(grunt) {

    var propStringTmplRe = /^<%=\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*%>$/i;
    function process(raw:any) {
        return grunt.util.recurse(raw, function (value:any) {
            if (typeof value === 'function') {
                var called = value.apply();
                if(typeof called === 'object' || typeof called === 'array'){
                    value = process(called);
                } else {
                    value = called;
                }
            }

            // If the value is not a string, return it.
            if (typeof value !== 'string') {
                return value;
            }
            // If possible, access the specified property via config.get, in case it
            // doesn't refer to a string, but instead refers to an object or array.
            var matches = value.match(propStringTmplRe);
            var result;
            if (matches) {
                result = grunt.config.get(matches[1]);
                // If the result retrieved from the config data wasn't null or undefined,
                // return it.
                if (result != null) {
                    return result;
                }
            }
            // Process the string as a template.
            return grunt.template.process(value, {data: grunt.config.data});
        });
    }

    grunt.config.process = process;
}

export = function (grunt) {

    modifyGrunt(grunt);
    var watchTS = grunt.option('watcher') == 'ts';

    var targets = {
        dist: {name: 'dist', dest: 'dist', scripts: 'dist/js', styles: 'dist/css' },
        dev : {name: 'dev', dest: 'dev', scripts: 'dev/assets/scripts', styles: 'dev/assets/styles' },
    };

    function setTarget(name:string) {
        grunt.config.set('target', targets[name]);
    }

    function ifTarget(name:string, then:any, els:any = false):any {
        return () => grunt.config.get("target").name === name ? then : els;
    }

    function tsp(...filePath:any[]) {
        return path.join.apply(path, ['src', 'scripts'].concat(filePath));
    }

    function tspp(...filePath:any[]) {
        return tsp.apply(tsp, ['packadic'].concat(filePath));
    }


    var config = {
        pkg: fs.readJSONSync('package.json'),

        target : targets[grunt.option('target') || 'dev'],
        targets: targets,

        clean: {
            all          : {src: '<%= target.dest %>'},
            views        : {src: '<%= target.dest %>/**/*.html'},
            basedir      : {src: '{dev,dist,src}/**/.baseDir.*'},
            ts_app_tmp   : {src: '<%= target.dest %>/.tmp'},
            ts           : {src: '<%= target.scripts %>/**/*.{ts,d.ts}'},
            nosrc        : {src: 'src/scripts/**/*.{js,js.map}'},
            ts_html_views: {src: 'src/scripts/packadic/views/**/*.html.ts'}
        },

        copy: {
            data          : {files: [{cwd: 'src/data', src: ['**'], dest: '<%= target.dest %>/data/', expand: true}]},
            scss          : {files: [{cwd: 'src/styles', src: ['**'], dest: '<%= target.dest %>/scss/', expand: true}]},
            typings       : {files: [{cwd: 'src/scripts', src: ['types.d.ts', 'typings/**'], dest: '<%= target.scripts %>/', expand: true}]},
            images        : {files: [{cwd: 'src/images', src: ['**'], dest: '<%= target.dest %>/assets/images/', expand: true}]},
            systemConfig  : {files: [{cwd: '', src: ['system.config.js'], dest: '<%= target.dest %>/assets', expand: true}]},
            jspm          : {files: [{cwd: '', src: ['jspm_packages/**/*', 'system.config.js'], dest: '<%= target.dest %>/', expand: true}]},
            script_views  : {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts', src: ['**/*.{jade,html}'], dest: '<%= target.scripts %>', expand: true}]},
            ts_demo       : {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts/demo', src: ['**/*.ts'], dest: '<%= target.scripts %>/demo', expand: true}]},
            htaccess      : {src: 'src/.htaccess', dest: '<%= target.dest %>/.htaccess'},
            packadic_ts_js: {options: {mtimeUpdate: true}, files: [{cwd: 'src/scripts/packadic', src: ['**/*.{ts,js,js.map}'], dest: '<%= target.scripts %>/packadic', expand: true}]},
        },

        jade: {
            options: {
                pretty: true, data: { _inspect: util.inspect, _target: '<%= target %>', baseHref: '/'}

            },
            index  : {src: 'src/index.jade', dest: '<%= target.dest %>/index.html'},
            scripts: {files: [{expand: true, cwd: 'src/scripts', src: ['**/*.jade', '!**/_*.jade'], ext: '.html', dest: '<%= target.scripts %>/'}]}
        },

        sass: {
            options: {sourceMap: ifTarget('dev', true), outputStyle: 'expanded'}, // willl use uglify for dist //ifTarget('dev', 'expanded', 'compressed')},
            styles : {files: [{expand: true, cwd: 'src/styles', src: ['**/*.{sass,scss}', '!bootstrap/**/*.{sass,scss}'], ext: '.css', dest: '<%= target.styles %>/'}]},
            styles_min : { /* will be inserted after */ },
        },

        ts: {
            options : {
                compiler              : 'node_modules/typescript/bin/tsc',
                target                : 'ES5',
                module                : 'commonjs',
                sourceMap             : false,
                inlineSources         : ifTarget('dev', true),
                inlineSourceMap       : ifTarget('dev', true),
                experimentalDecorators: true,
                emitDecoratorMetadata : true,
                removeComments        : ifTarget('dev', true),
                noImplicitAny         : false,
                failOnTypeErrors      : false,
                htmlModuleTemplate    : '<%= filename %>',
                htmlVarTemplate       : '<%= filename %>',
                htmlOutputTemplate    : "namespace packadic { templates['<%= modulename %>'] = '<%= content %>'; }"
            },
            //packadic: {options: {declaration: true}, outDir: '<%= target.scripts %>/packadic',src    : [tsp('packadic', 'types.d.ts'), tsp('packadic', '**/*.ts')] //, tsp('packadic', 'util/*.ts'), tsp('packadic', 'app/*.ts'), tsp('packadic', '~bootstrap.ts')]},
            packadic: {
                options: {declaration: true},
                out    : '<%= target.scripts %>/packadic.js',
                html   : [tspp('views/**/*.html')],
                watch  : watchTS ? tspp() : undefined,
                src    : [
                    tsp('types.d.ts'),
                    tspp('@init.ts'),
                    tspp('views/**/*.html.ts'),
                    tspp('lib/*.ts'),
                    tspp('app/layout.ts'),
                    tspp('app/**/*.ts'),
                    tspp('components/**/*.ts'),
                    tspp('~bootstrap.ts')
                ]
            },
            demo    : {
                outDir: '<%= target.scripts %>/demo',
                src   : ['src/types.d.ts', tsp('demo', '**', '*.ts')]
            }
        },


        umd: {
            packadic: {
                options: {
                    src: '<%= target.scripts %>/packadic.js',
                    //template: 'path/to/template.hbs', // optional, a template from templates subdir
                    // can be specified by name (e.g. 'umd'); if missing, the templates/umd.hbs
                    // file will be used from [libumd](https://github.com/bebraw/libumd)
                    objectToExport: 'packadic', // optional, internal object that will be exported
                    //amdModuleId: 'packadic', // optional, if missing the AMD module will be anonymous
                    //globalAlias: 'alias', // optional, changes the name of the global variable
                    //deps: { // optional, `default` is used as a fallback for rest!
                    //    'default': ['foo', 'bar'],
                    //    amd: ['foobar', 'barbar'],
                    //    cjs: ['foo', 'barbar'],
                    //    global: ['foobar', {depName: 'param'}]
                    //}
                }
            }
        },

        uglify: {
            scripts: { files: {'<%= target.scripts %>/packadic.min.js': '<%= target.scripts %>/packadic.js'} }
        },

        injector: { // removed space as jade does that aswell.
            options: {starttag: '<!-- injector:{{ext}}-->', endtag: '<!-- endinjector-->', ignorePath: ['<%= target.dest %>/']},
            index  : {
                files: {
                    './<%= target.dest %>/index.html': ['<%= target.dest %>/jspm_packages/system.src.js', '<%= target.dest %>/system.config.js'].concat([
                        '<%= target.styles %>/stylesheet.css',
                        '<%= target.styles %>/themes/theme-dark-sidebar.css'
                    ])
                }
            }
        },

        bytesize: {packadic: {src: [
            '<%= target.scripts %>/packadic.min.js',
            '<%= target.styles %>/stylesheet.min.css',
            '<%= target.styles %>/themes/theme-default.min.css'
        ]}},

        connect: {dev: {options: {port: 8000, livereload: false, base: 'dev'}}},

        watch: {
            options     : {livereload: true},
            jade_index  : {files: ['src/index.jade', 'src/views/layouts/default.jade'], tasks: ['jade:index', 'injector:index']},
            script_views: {files: ['src/scripts/**/*.{jade,html}'], tasks: ['copy:script_views']},
            sass        : {files: ['src/styles/**/*.{sass,scss}'], tasks: ['sass:styles']},
            scriptsc    : {files: 'src/scripts/packadic/**/*.ts', tasks: ['copy:packadic_ts_js']},
            demoscripts : {files: 'src/scripts/demo/**/*.ts', tasks: ['copy:ts_demo']},
            data        : {files: 'src/data/**/*.*', tasks: ['copy:data']},
        }
    };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    config.sass.styles_min = _.merge(config.sass.styles, { options: { outputStyle: 'compressed' } });
    config.sass.styles_min['files'][0].ext = '.min.css';

    grunt.initConfig(config);

    [
        ['default', 'Default task', ['build']],
        ['scripts', 'Build scripts', [
            'ts:packadic',
            'copy:script_views',
            'copy:packadic_ts_js',
            'clean:ts_html_views',
            'clean:nosrc',
            'clean:basedir'
        ]],
        ['demo', 'Build dev demo', [
            'clean:all',
            'scripts',
            'copy:ts_demo',
            'jspm',
            'sass:styles',
            'jade:index',
            'injector:index'
        ]],

        ['build', 'Build dev', [
            'demo',
            'jade:scripts',
            'copy:data'
        ]],

        ['dist', 'Build dist', [
            'target:dist',
            'clean:all',
            'ts:packadic', 'copy:typings', 'uglify:scripts',
            'sass:styles', 'sass:styles_min', 'copy:scss',
            'jade:index', 'injector:index',
            'bytesize:packadic'
        ]],

        ['serve', 'Dont use this', ['connect:dev', 'watch']],

        ['config', 'Show config', (target?:string) => log(grunt.config.get(target))],
        ['target', 'Set target trough task', (targ) => setTarget(targ)],
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

}
