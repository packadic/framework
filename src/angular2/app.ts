/// <reference path="./types.d.ts" />
/// <reference path="./../ts/packadic.d.ts" />
import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS, APP_BASE_HREF} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {NamesList} from './services/NameList';


@Component({
    selector: '.page-content-inner',
    viewBindings: [NamesList]
})

@RouteConfig([
    {path: '/', component: Home, as: 'home'},
    {path: '/about', component: About, as: 'about'}
])
@View({
    templateUrl: './angular2-app/app.html',
    styleUrls: ['./angular2-app/app.css'],
    directives: [ROUTER_DIRECTIVES]
})
class App {
}
console.log(ROUTER_BINDINGS, HTTP_BINDINGS, APP_BASE_HREF);
bootstrap(App,
    [
        ROUTER_BINDINGS,
        bind(APP_BASE_HREF).toValue('/angular2-app')
    ]
);
