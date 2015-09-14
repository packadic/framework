/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
module packadic.plugins {

    export class PackadicMenuWidget extends Widget {

        public version:string = '1.0.0';
        public widgetEventPrefix:string = 'pmenu.';

        public options:any = {
        };


        constructor() {
            super();
        }

        _create():any {
            console.log('PackadicMenuWidget create');
        }
    }

    Widget.register('pmenu', PackadicMenuWidget);
}
