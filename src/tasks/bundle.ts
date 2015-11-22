///<reference path='../types.d.ts'/>
import * as jspm from 'jspm';
import * as _ from 'lodash';
import * as fs from 'fs-extra';
import * as util from 'util';

function log(...args:any[]) {
    args.forEach((arg) => console.log(util.inspect(arg, {colors: true})));
}

export = function (grunt:IGrunt) {
    /**
     * @lends grunt.task.IMultiTask
     */
    function bundleTask() {
        var taskDone:grunt.task.AsyncResultCatcher = this.async();
        this.requiresConfig('bundle');
        this.requires('ts:packadic', 'copy:script_views')
        var options:any = this.options({
            inject          : false,
            minify          : false,
            mangle          : false,
            lowResSourceMaps: false,
            sourceMaps      : true
        });
        var data:any    = _.merge({
            action    : 'bundle', // bundle|unbundle|bundleSFX
            outFile   : null, //'_packadic.js',
            expression: 'packadic',
            configFile: 'system.config.js',
            tmpdir    : '.packadic'
        }, this.data);


        fs.copy(<string>grunt.config.get('ts.packadic.outDir'), data.tmpdir, (err:any) => {
            if (err) grunt.fail.fatal(err);

            var Builder = require('systemjs-builder');
            var builder = new Builder('.', data.configFile);

            builder.config({
                defaultJSExtensions: true,
                "paths"            : {
                    "packadic": data.tmpdir + "/index",
                    "github:*": "jspm_packages/github/*",
                    "npm:*"   : "jspm_packages/npm/*"
                },
                "transpiler"       : 'typescript',
                packages           : {
                    packadic: {
                        main: "index"
                    }
                }
            });
            builder.bundle(data.expression, data.outFile, options).then(function () {
                    grunt.log.ok('Bundle build complete for ' + data.expression + '. File written to: ' + data.outFile);
                    if (fs.existsSync(data.tmpdir)) {
                        fs.removeSync(data.tmpdir);
                    }
                    taskDone()
                })
                .catch(function (err) {
                    log('Build error');
                    log(err);
                    grunt.fail.fatal(err);
                    taskDone(false)
                });
        });

        //promise
        //    .then((...args:any[]) => grunt.log.ok('bundle successfull on ' + this.target + '. completed action ' + data.action) && taskDone())
        //    .catch((e) => grunt.fail.warn(e) &&  taskDone(false));
    }

    grunt.registerMultiTask('bundle', 'bundle packadic', bundleTask);
}
