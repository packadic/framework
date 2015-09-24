System.register(['angular2/angular2', 'angular2/router', 'angular2/http', './components/home/home', './components/about/about', './services/NameList'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var angular2_1, router_1, http_1, home_1, about_1, NameList_1;
    var App;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (NameList_1_1) {
                NameList_1 = NameList_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                }
                App = __decorate([
                    angular2_1.Component({
                        selector: '.page-content-inner',
                        viewBindings: [NameList_1.NamesList]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: home_1.Home, as: 'home' },
                        { path: '/about', component: about_1.About, as: 'about' }
                    ]),
                    angular2_1.View({
                        templateUrl: './angular2-app/app.html',
                        styleUrls: ['./angular2-app/app.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    })
                ], App);
                return App;
            })();
            console.log(router_1.ROUTER_BINDINGS, http_1.HTTP_BINDINGS, router_1.APP_BASE_HREF);
            angular2_1.bootstrap(App, [
                router_1.ROUTER_BINDINGS,
                angular2_1.bind(router_1.APP_BASE_HREF).toValue('/angular2-app')
            ]);
        }
    }
});
//# sourceMappingURL=app.js.map