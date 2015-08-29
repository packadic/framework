/// <reference path="../../types.d.ts" />
import $ = require('jquery');
import plugins = require('app/plugins');
import {debug} from './../../modules/debug';
var log:any = debug.log;

class ExamplePlugin extends plugins.BasePlugin {
    public _create() {
        debug.log('Creating new ');
    }

    public echo(){
        debug.log('ECHOING', arguments);
    }
}
export = ExamplePlugin;
plugins.register('example', ExamplePlugin);
