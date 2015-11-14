import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {
    App,
    Directive,ParamWatcher,BaseDirective
} from './../packadic/index';

export var app:App = App.instance;
window['App'] = App;
window['app'] = app;
app.on('*', function(){
    console.log('event', this, arguments);
});
app.init({ debug: true });
app.start();
