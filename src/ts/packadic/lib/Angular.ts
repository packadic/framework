module packadic.Angular {

    export var defaultModuleName = 'packadic';

    const directiveProperties:string[] = [
        'compile',
        'controller',
        'controllerAs',
        'bindToController',
        'link',
        'priority',
        'replace',
        'require',
        'restrict',
        'scope',
        'template',
        'templateUrl',
        'terminal',
        'transclude'
    ];

    /* tslint:disable:no-any */
    export interface IClassAnnotationDecorator {
        (target:any): void;
        (t:any, key:string, index:number): void;
    }

    function instantiate(moduleName:string, name:string, mode:string):IClassAnnotationDecorator {
        return (target:any):void => {
            angular.module(moduleName)[mode](name, target);
        };
    }

    export function attachInjects(target:any, ...args:any[]):any {
        (target.$inject || []).forEach((item:string, index:number) => {
            target.prototype[(item.charAt(0) === '$' ? '$' : '$$') + item] = args[index];
        });
        return target;
    }

    export interface IInjectAnnotation {
        (...args:any[]): IClassAnnotationDecorator;
    }

    export function inject(...args:string[]):IClassAnnotationDecorator {
        return (target:any, key?:string, index?:number):void => {
            if (angular.isNumber(index)) {
                target.$inject = target.$inject || [];
                target.$inject[index] = args[0];
            } else {
                target.$inject = args;
            }
        };
    }

    export interface IServiceAnnotation {
        (moduleName:string, serviceName:string): IClassAnnotationDecorator;
    }

    export function service(serviceName:string, moduleName:string=defaultModuleName):IClassAnnotationDecorator {
        return instantiate(moduleName, serviceName, 'service');
    }

    export interface IControllerAnnotation {
        (moduleName:string, ctrlName:string): IClassAnnotationDecorator;
    }

    export function controller(ctrlName:string, moduleName:string=defaultModuleName):IClassAnnotationDecorator {
        return instantiate(moduleName, ctrlName, 'controller');
    }

    export interface IDirectiveAnnotation {
        (moduleName:string, directiveName:string): IClassAnnotationDecorator;
    }

    export function directive(directiveName:string, moduleName:string=defaultModuleName):IClassAnnotationDecorator {
        return (target:any):void => {
            let config:angular.IDirective;
            const ctrlName:string = angular.isString(target.controller) ? target.controller.split(' ').shift() : null;
            /* istanbul ignore else */
            if (ctrlName) {
                controller(moduleName, ctrlName)(target);
            }
            config = directiveProperties.reduce((config:angular.IDirective,
                                                 property:string) => {
                return angular.isDefined(target[property]) ? angular.extend(config, {[property]: target[property]}) :
                    config;
                /* istanbul ignore next */
            }, {controller: target, scope: Boolean(target.templateUrl)});

            angular.module(moduleName).directive(directiveName, () => (config));
        };
    }


    export interface IClassFactoryAnnotation {
        (moduleName:string, className:string): IClassAnnotationDecorator;
    }

    export function classFactory(className:string, moduleName:string=defaultModuleName):IClassAnnotationDecorator {
        return (target:any):void => {
            function factory(...args:any[]):any {
                return attachInjects(target, ...args);
            }

            /* istanbul ignore else */
            if (target.$inject && target.$inject.length > 0) {
                factory.$inject = target.$inject.slice(0);
            }
            angular.module(moduleName).factory(className, factory);
        };
    }

    /* tslint:enable:no-any */


}
