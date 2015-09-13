/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
module packadic.plugins {
    export class TestWidget extends Widget {

        public version:string = '1.0.0';
        public widgetEventPrefix:string = 'test.';

        public options:any = { 'test' : 'yes' };

        constructor() {
            super();
        }

        _create():any {
            console.log('TestWidget create');
        }

    }

    Widget.register('testWidget', TestWidget);
}
