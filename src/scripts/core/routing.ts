import 'angular-ui-router-extras';

/*export function configureStates(module:ng.IModule) {
    var StatesConfig = ['$stateProvider', '$urlRouterProvider', function ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '', controller: 'MainController', template: ts.main(), views: {
                    header : {template: ts.header()},
                    content: {template: ts.content()},
                    sidebar: {template: ts.sidebar()},
                    footer : {template: ts.footer()}
                }
            })
            .state('app.home', {
                parent: 'app',
                url: '/home', controller: 'HomeController'
            });

        $urlRouterProvider.otherwise('');
    }];

    return StatesConfig;
}

export function configureLazyLoadFuture(module:ng.IModule, futureRoutes) {

    module.requires.push('ct.ui.router.extras.future');

    var RouterConfig = ['$stateProvider', '$futureStateProvider', function ($stateProvider, $futureStateProvider) {

        $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', function ($q, $ocLazyLoad:oc.ILazyLoad, futureState) {
            var def = $q.defer();


            //console.log('routing', module, futureState);
            System.import(futureState.src).then(loaded => {
                var newModule = loaded;
                if (!loaded.name) {
                    var key   = Object.keys(loaded);
                    newModule = loaded[key[0]];
                }
                console.log('routing then', 'newModule', newModule, 'loaded', loaded, $ocLazyLoad);

                $ocLazyLoad.load(newModule).then(function () {
                    console.log('$ocLazyLoad.load(newModule).then', 'newModule', newModule, 'loaded', loaded, 'def', def, 'args', arguments);
                    def.resolve();
                }, function (err) {
                    //throw err;
                });
            });

            return def.promise;
        }]);
    }];

    return RouterConfig;
}


export function configureRouter(module:ng.IModule) {
    return ['$urlRouterProvider', '$locationProvider', '$compileProvider', '$logProvider', '$httpProvider', '$ocLazyLoadProvider', '$stateProvider',
        function ($urlRouterProvider:angular.ui.IUrlRouterProvider,
                  $locationProvider:angular.ILocationProvider,
                  $compileProvider:angular.ICompileProvider,
                  $logProvider:angular.ILogProvider,
                  $httpProvider:angular.IHttpProvider,
                  $ocLazyLoadProvider:oc.ILazyLoadProvider,
                  $stateProvider:angular.ui.IStateProvider) {

            $locationProvider.html5Mode(true);
            $httpProvider.useApplyAsync(true);
            //$urlRouterProvider.otherwise('/home');

            if (window['prod']) {
                $logProvider.debugEnabled(false);
                // http://ng-perf.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/
                $compileProvider.debugInfoEnabled(false);
            }

            $ocLazyLoadProvider.config({
                debug: true,
                //modules: [
                //    <oc.IModuleConfig> {name:'app.theme', files:'./modules/theme/theme'}
                //]
            })
        }]
}
*/
