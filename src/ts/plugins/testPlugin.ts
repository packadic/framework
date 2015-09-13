/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
module packadic.plugins {
    export class TestPlugin extends Plugin {

        protected _create() {
            console.log('TestPlugin create');
        }
    }

    Plugin.register('testPlugin', TestPlugin);
}
