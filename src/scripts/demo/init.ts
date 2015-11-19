import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {App } from './../packadic/index';

function sbitem(title:string, icon:string|boolean = 'fa fa-github', type:string = 'href', children:any[] = []) {
    return {title: title, icon: icon, hasChildren: children.length > 0, children: children, href: '#', type: type}
}




function sbchilds(children:any[]=[]){
    var args=['Second', false];
    if(children.length > 0){
        args = args.concat(['folder', children]);
    }
    return [ sbitem('First', false), sbitem.apply(sbitem, args), sbitem('Third', false) ];
}

export var app:App = new App({
    data: {
        sidebarItems: [
            sbitem('Home'),
            sbitem('Projects', 'fa fa-folder', 'folder', sbchilds()),
            sbitem('Names', 'fa fa-folder', 'folder', sbchilds(sbchilds())),
            sbitem('Lists', 'fa fa-folder', 'folder', sbchilds()),
            sbitem('Contact')
        ]
    }
});

window['App'] = App;
window['app'] = app;

app.init({ debug: true });
app.start();
