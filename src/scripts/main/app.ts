
import {AngularModule} from '../core';

export var app = AngularModule.create('app', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap']) //, 'oc.lazyLoad']) //['ui.router']);

app.filter('rawHtml', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);
