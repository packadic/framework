import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {
    App,Vue,app,
    Directive,ParamWatcher,BaseDirective
} from './../packadic/index';

import './directives';


window['app'] = app;
app.on('*', function(){
    console.log('event', this, arguments);
});

// register
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
});


app.init({ debug: true });
app.mergeData({
    showPageL: true
});
app.start();
