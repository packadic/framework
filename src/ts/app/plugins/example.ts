/// <reference path="../../types.d.ts" />
import $ = require('jquery');
import plugins = require('app/plugins');

class ExamplePlugin extends plugins.BasePlugin {
    public _create() {
        console.log('Creating new ');
    }

    public echo(){
        console.log('ECHOING', arguments);
    }
}
export = ExamplePlugin;
plugins.register('example', ExamplePlugin);
