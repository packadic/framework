import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {App,Router} from './../packadic/index';


export var app:App = new App({
    data: {
        sidebar: { items: [] }
    }
});
app.$on('INITIALISING', function(){
    console.warn('INITIALISING');
    app.$http.get('/data/main.json', function(data:any, status:number, request:XMLHttpRequest){
        console.warn('$http get', arguments);
        app.$set('sidebar.items', data.menus.sidebar);
    })
});

window['App'] = App;
window['app'] = app;

app.init({ debug: true });
app.start();
