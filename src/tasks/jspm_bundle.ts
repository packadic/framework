///<reference path='../types.d.ts'/>
import * as jspm from 'jspm';
import * as _ from 'lodash';

export = function (grunt:IGrunt){
    /**
     * @lends grunt.task.IMultiTask
     */
    function jspmBundleTask(){
        var taskDone:grunt.task.AsyncResultCatcher = this.async();
        this.requiresConfig('jspm_bundle');
        var options:any = this.options({
            inject: false,
            minify: false,
            mangle: false,
            lowResSourceMaps: false,
            sourceMaps: true
        });

        var data:any = _.merge({
            action: 'bundle', // bundle|unbundle|bundleSFX
            fileName: null,
            moduleName: null,
            expression: null
        }, this.data);

        var promise:Promise<any>;
        if(data.action === 'bundle'){
            promise = jspm.bundle(data.expression, data.fileName, options);
        } else if(data.action === 'unbundle') {
            promise = jspm.unbundle();
        } else if(data.action === 'bundleSFX') {
            promise = jspm.bundleSFX(data.moduleName, data.fileName, options);
        } else {
            grunt.fail.fatal('Task did not define a valid action. allowed: bundle, unbundle or bundleSFX');
        }

        promise.then((...args:any[]) => {
            //process.stdout.write(require('util').inspect(args, { colors: true, showHidden: true }));
            grunt.log.ok('jspm_bundle successfull on ' + this.target + '. completed action ' + data.action);
            taskDone();
        }).catch((e) => {
            grunt.fail.warn(e);
            taskDone(false);
        });
    }
    grunt.registerMultiTask('jspm_bundle', 'Create JSPM bundles', jspmBundleTask);
}
