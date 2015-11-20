import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {App, view, route} from './../packadic/index';


window['App'] = App;
window['_l'] = _;

App.config.merge('router.options', {hashbang: false, history: false });
App.init();
App.router.map({ '/foo': { component: view('demo/views/foo') }});
route('home', '/', 'demo/views/home');
route('bar', '/bar', 'demo/views/bar');

App.start({
    data: {
        sidebar: {items: []}
    }
}).then(() => {

    console.warn('INITIALISING');
    App.vm.$http.get('/data/main.json', function (data:any, status:number, request:XMLHttpRequest) {
        console.warn('$http get', arguments);
        App.vm.$set('sidebar.items', data.menus.sidebar);
    })
});
