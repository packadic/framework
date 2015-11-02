import * as angular from 'angular';

export function bootstrap(appName:string = 'app', strictDi: boolean = false, deferred:boolean = false) {
    if (deferred) window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
    angular.element(document).ready(function () {
        return angular.bootstrap(document, [appName], {
            strictDi: strictDi
        });
    });
}
