import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';
import * as angular from 'angular';
import * as _ from 'lodash';
import 'angular-ui-router';
import 'angular-bootstrap';
import 'angular-ui-router-extras';
import 'ocLazyLoad';
import * as async from 'async';
import {IConfigProperty,ConfigObject,createPromise} from './lib';
import {settings, registerJQueryExtensions, AngularModule, bootstrap} from './core';


import {app, SidebarItemsService} from './main';
import pageMainTpl from './main/main.jade!'
import pageHomeTpl from './main/home.jade!'

app.module.factory('settings', () => settings);
app.run(() => {
    registerJQueryExtensions();
});

// ui router and lazy loading config
app.module.requires.push('ct.ui.router.extras.future');
app.config(['$urlRouterProvider', '$locationProvider', '$compileProvider', '$logProvider', '$httpProvider', '$ocLazyLoadProvider', '$stateProvider', '$futureStateProvider',
    function ($urlRouterProvider:angular.ui.IUrlRouterProvider,
              $locationProvider:angular.ILocationProvider,
              $compileProvider:angular.ICompileProvider,
              $logProvider:angular.ILogProvider,
              $httpProvider:angular.IHttpProvider,
              $ocLazyLoadProvider:oc.ILazyLoadProvider,
              $stateProvider:angular.ui.IStateProvider,
              $futureStateProvider:angular.ui.IFutureStateProvider) {


        //
        // main routes
        $locationProvider.html5Mode(true);
        $httpProvider.useApplyAsync(true);
        $stateProvider
            .state('root', {url: '/', controller: 'RootController', views: {root: {template: pageMainTpl({})}}})
            .state('home', {url: 'home', parent: 'root', controller: 'HomeController', views: {main: {template: pageHomeTpl() }}});
            //.state('books', {url: 'books', parent: 'root', controller: 'BooksController', views: {main: {template: pageMainTpl({})}}});

        $urlRouterProvider.otherwise('home');



        //
        // Create a new future state 'load', which will be used for lazy loading
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

                $ocLazyLoad.load(newModule).then(() => {
                    console.log('$ocLazyLoad.load(newModule).then', 'newModule', newModule, 'loaded', loaded, 'def', def, 'args', arguments);
                    def.resolve();
                }, (err) => {
                    throw err;
                });
            });

            return def.promise;
        }]);
    }]);

app.config(['$futureStateProvider',
    function (
        $futureStateProvider:angular.ui.IFutureStateProvider
    ) {
        System.import('data/routes.json!').then((result) => {
            result.forEach(function (r) {
                console.log('routing futureRoutes each $futureStateProvider', $futureStateProvider, 'r:', r);
                $futureStateProvider.futureState(r);
            });

        }).catch((err) => console.error(err));
    }]);
