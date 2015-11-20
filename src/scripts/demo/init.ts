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
[
    ['users.index', '/users', 'demo/views/users/users'],
    ['users.roles', '/users/roles', 'demo/views/users/roles'],
    ['users.permissions', '/users/permissions', 'demo/views/users/permissions']
].forEach((r:any) => {
    route.apply(route, r);
});

App.start({
    data: {
        sidebar: {items: []},
        me: {}
    }
}).then(() => {

    App.dataRequest('main', (data:any) => App.vm.$set('sidebar.items', data.menus.sidebar));
    App.dataRequest('me', (data:any) => App.vm.$set('me', data));
});
