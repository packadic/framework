/// <reference path="./../ts/types.d.ts" />
/// <reference path="./../ts/packadic.d.ts" />
/// <reference path="./typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from 'angular2/router';
import {CodeBlock} from "./components/code-block/code-block";
import {Home} from "./components/home/home";

console.log(ROUTER_DIRECTIVES, ROUTER_BINDINGS);
// Annotation section
@Component({
    selector: 'app'
})
@RouteConfig([
    { path: '/', component: Home, as: 'home' },
    { path: '/code-block', component: CodeBlock, as: 'code-block' }
])
@View({
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES]
})
// Component controller
class App {
    name:string;
    pageTitle:string;
    pageSubTitle:string;

    constructor() {
        this.name = 'Alice';
        this.pageTitle = 'Angular 2';
        this.pageSubTitle = 'Test application';

        var app:packadic.Application = packadic.Application.instance;
        app.DEBUG = true;
        app
            .init({
            hello: 'test'
        })
            .boot()
            .then(function (app) {
            //$('#testPluginContainer').testPlugin({});
            //$('#testWidgetContainer').testWidget({});
        });
    }
}
bootstrap(App, [ROUTER_BINDINGS]);
