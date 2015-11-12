import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {App,Vue,app} from './../packadic/index';
import {Directive,ParamWatcher,BaseDirective} from './../packadic/index';

app.on('*', function(){
    console.log('event', this, arguments);
});

app.init({ debug: true });




window['app'] = app;

// register
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
});

//console.log(Reflect.getMetadataKeys(MySecondComponent), MySecondComponent);


@Directive('test-directive')
export class TestDirective extends BaseDirective {
    static params:any[] = ['a'];

    @ParamWatcher('a')
    watchA(val:any, oldVal:any) {
        console.log('watch a')
    }
}

app.start();
