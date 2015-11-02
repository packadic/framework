import * as angular from 'angular';
import * as _ from 'lodash';

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

export interface IClassAnnotationDecorator {
    (target:any): void;
    (t:any, key:string, index:number): void;
}

export interface IServiceAnnotation {
    (moduleName:string, serviceName:string): IClassAnnotationDecorator;
}
export interface IControllerAnnotation {
    (moduleName:string, ctrlName:string): IClassAnnotationDecorator;
}
export interface IDirectiveAnnotation {
    (moduleName:string, directiveName:string): IClassAnnotationDecorator;
}
export interface IClassFactoryAnnotation {
    (moduleName:string, className:string): IClassAnnotationDecorator;
}

export class AngularModule {

    public static create(name:string, requires:string[] = [], configFn?:Function) {
        return new AngularModule(name, requires, configFn);
    }
    get name():any {
        return this._module.name;
    }
    get module():ng.IModule {
        return this._module;
    }

    //set name(value:any) {        return this._module.name;    }
    private _module:ng.IModule;

    constructor(name:string, requires:string[] = [], configFn?:Function) {
        this._module = angular.module(name, requires, configFn);
    }

    private _register(mode:string, name:string, val:any) {
        this._module[mode](name, val);
    }

    private _instantiate(name:string, mode:string):IClassAnnotationDecorator {
        return (target:any):void => {
            this._module[mode](name, target);
        };
    }


    public attachInjects(target:any, ...args:any[]):any {
        (target.$inject || []).forEach((item:string, index:number) => {
            target.prototype[(item.charAt(0) === '$' ? '$' : '$$') + item] = args[index];
        });
        return target;
    }

    public Inject(...args:string[]):IClassAnnotationDecorator {
        return (target:any, key?:string, index?:number):void => {
            if (angular.isNumber(index)) {
                target.$inject        = target.$inject || [];
                target.$inject[index] = args[0];
            } else {
                target.$inject = args;
            }
        };
    }

    public Service(serviceName:string):IClassAnnotationDecorator {
        return this._instantiate(serviceName, 'service');
    }

    public Controller(ctrlName:string):IClassAnnotationDecorator {
        return this._instantiate(ctrlName, 'controller');
    }

    public Directive(directiveName:string):IClassAnnotationDecorator {
        return (target:any):void => {
            let config:angular.IDirective;
            const ctrlName:string = angular.isString(target.controller) ? target.controller.split(' ').shift() : null;
            /* istanbul ignore else */
            if (ctrlName) {
                this.Controller(ctrlName)(target);
            }
            config = directiveProperties.reduce((config:angular.IDirective, property:string) => {
                return angular.isDefined(target[property]) ? angular.extend(config, {[property]: target[property]}) : config;
            }, {
                controller: target,
                scope     : Boolean(target.templateUrl)
            });
            console.log('Directive', directiveName, ctrlName, target, config);
            this._module.directive(directiveName, () => (config));
        };
    }

    public ClassFactory(className:string):IClassAnnotationDecorator {
        return (target:any):void => {
            var self:any = this;

            function factory(...args:any[]):any {
                return self.attachInjects(target, ...args);
            }

            if (target.$inject && target.$inject.length > 0) {
                factory.$inject = target.$inject.slice(0);
            }
            this._module.factory(className, factory);
        };
    }

    public Provider(className:string):IClassAnnotationDecorator {
        return this._instantiate(className, 'provider');
    }

    public filter(name:any, val:any):ng.IModule{
        return this.module.filter(name, val);
    }

    public config(inlineAnnotatedFunction: any[]):ng.IModule{
        return this._module.config(inlineAnnotatedFunction);
    }

    public run(arg:any):ng.IModule {
        return this.module.run(arg);
    }
}
