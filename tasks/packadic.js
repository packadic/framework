var util    = require('util'),
    inspect = util.inspect,
    path    = require('path');
var fs = require('fs-extra');

var _       = require('lodash'),
    _s      = require('underscore.string'),
    exec    = require('child_process').execSync,
    grunt   = require('grunt'),
    tmp     = require('tmp'),
    globule = require('globule'),
    jsyaml  = require('js-yaml');

function _out() {
    function ins(val) {
        process.stdout.write(inspect(val, {hidden: true, colors: true, depth: 7}) + '\n');
    }

    [].concat(_.toArray(arguments)).forEach(function (arg) {
        ins(arg);
    })
}

module.exports = function (_grunt) {
    grunt = _grunt;
    var name = 'packadic';

    function _loadTasks(dir){
        var dirPath = path.join(__dirname, '..', 'node_modules', dir, 'tasks');
        grunt.loadTasks(dirPath);
    }

    _loadTasks('grunt-contrib-concat');
    _loadTasks('grunt-contrib-jade');
    _loadTasks('grunt-contrib-uglify');
    _loadTasks('grunt-ts');
    _loadTasks('grunt-sass');
    _loadTasks('grunt-umd');


    grunt.registerTask(name, 'Packadic extensions build task.', function () {
        var taskDone = this.async();

        this.requiresConfig(name);
        this.requiresConfig(name + '.dest');

        var o = config();
        compile(o);

        return taskDone();
    });

    function config() {
        grunt.config(name, _.merge({
            compiler   : {
                declaration           : '<%= packadic.declaration %>',
                compiler              : path.join(__dirname, '..', 'node_modules/typescript/bin/tsc'),
                target                : 'ES5',
                emitError             : true,
                sourceMap             : '<%= packadic.sourceMap %>',
                experimentalDecorators: true
            },
            dir        : 'src/ts/addons',           // the packadic addons folder
            files      : ['**/*.ts'],
            dest       : null,                      // dest file path
            uglify     : true,                      // uglify code, creates a seperate .min.js file
            sourceMap  : false,                     // generate source map
            declaration: true,                      // export declaration
            def        : '<%= packadic.dir %>.d.ts',// export location for declaration
            wrap       : true,                      // wrap in umd loader
            wrapExtends: true                       // if false, it will define packadic, otherwise extend packadic
        }, grunt.config(name)));
        return grunt.config(name);
    }

    function compile(o) {
        var dir = tmp.dirSync();

        o.files.push('!**/*.d.ts');

        o.files.forEach(function (file, k) {
            if ( _s.startsWith(o.files[k], '!') ) {
                o.files[k].replace('!', '');
                o.files[k] = '!' + path.join(o.dir, o.files[k].replace('!', ''));
            } else {
                o.files[k] = path.join(o.dir, o.files[k]);
            }
        });

        var taskName = name + Math.round(Math.random() * 100000);

        // Reads the temporary generated file, changes the reference paths and writes it to the def destination
        grunt.registerTask(taskName + ':def', function () {
            var done = this.async();
            var defFile = fs.readFileSync(path.join(dir.name, 'ts.d.ts'), 'utf8');
            var exp = /reference\spath\=\"(.*?)\"/g;
            var match,
                results = [];
            do {
                match = exp.exec(defFile);
                if ( match ) results.push(match);
            } while (match);

            results.forEach(function (fp) {
                var res = path.resolve(dir.name, fp[1]);
                var fileDirPath = path.join(process.cwd(), path.dirname(o.def));
                var rel = path.relative(fileDirPath, res);
                defFile = defFile.replace(fp[1], rel);
            });

            fs.writeFile(o.def, defFile, function () {
                grunt.log.ok('Definition file generated: ' + o.def);
                done();
            });
        });


        // TYPESCRIPT
        grunt.config('ts.' + taskName, {
            options: o.compiler,
            src    : o.files,
            out    : path.join(dir.name, 'ts.js')
        });
        grunt.task.run(['ts:' + taskName, taskName + ':def']);


        // JADE
        grunt.config('jade.' + taskName, {
            options: {
                client     : true, amd: false, namespace: 'JST',
                processName: function (filename) {
                    var ext = path.extname(filename);
                    return path.basename(filename, ext);
                }
            },
            files  : [{expand: true, cwd: o.dir, src: ['**/*.jade', '!**/_*.jade'], ext: '.js', dest: path.join(dir.name, 'jade')}]
        });
        grunt.task.run('jade:' + taskName);


        // CONCAT
        grunt.config('concat.' + taskName, {
            src : [path.join(dir.name, 'jade/**/*.js'), path.join(dir.name, 'ts.js')],
            dest: o.dest
        });
        grunt.task.run('concat:' + taskName);


        // UMD WRAP
        if ( o.wrap ) {
            grunt.config('umd.' + taskName, {
                src : o.dest, dest: o.dest, objectToExport: 'packadic'
            });
            if( o.wrapExtends ) {
                grunt.config('umd.' + taskName + '.deps', {'default': ['packadic']});
            }
            grunt.task.run('umd:' + taskName);
        }


        // UGLIFY
        if ( o.uglify ) {
            var dest = o.dest.replace('.js', '.min.js');
            grunt.config('uglify.' + taskName, {
                src : o.dest,
                dest: dest
            });
            grunt.task.run('uglify:' + taskName);
            grunt.log.ok('File minified: ' + o.dest);
        }



        fs.emptyDirSync(dir.name);
        dir.removeCallback();
    }

};
