var util    = require('util'),
    inspect = util.inspect,
    path    = require('path');
var fs = require('fs-extra');

var _       = require('lodash'),
    _s      = require('underscore.string'),
    exec    = require('child_process').execSync,
    grunt   = require('grunt'),
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

module.exports = function (grunt) {

    var name = 'packadic';

    function runAddons(options){
        var o = options.addons;

        o.files.push('!**/*.d.ts');

        o.files.forEach(function (file, k) {
            if(_s.startsWith(o.files[k], '!')){
                o.files[k].replace('!', '');
                o.files[k] = '!' + path.join(o.dir, o.files[k].replace('!', ''));
            } else {
                o.files[k] = path.join(o.dir, o.files[k]);
            }
        });

        grunt.config('ts.' + name, {
            options: o.compiler,
            src    : o.files,
            out    : o.out
        });

        grunt.task.run('ts:' + name);
    }

    grunt.registerTask(name, 'Packadic build task', function () {
        var taskDone = this.async();
        var target = grunt.config.get('target');
        var dest = grunt.config.get('target.dest');

        grunt.requires('packadic.addons');

        grunt.config(name, _.merge({
            addons: {
                compiler: {declaration: true, compiler: 'node_modules/typescript/bin/tsc', target: 'ES5', emitError: true, sourceMap: target === 'dev', experimentalDecorators: true},
                dir     : 'src/ts/addons',
                files   : ['**/*.ts'],
                out     : 'src/ts/addons.js'
            }
        }, grunt.config(name)));
        var o = grunt.config(name);

        runAddons(o);

        return taskDone();

    })
};
