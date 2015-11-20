
import {App,AppState,BaseComponent,componentOptions} from './../../app';
import {defined,kindOf,MetaStore} from './../../lib';
import {route} from './routing';
import {IBreadcrumbLink} from "./page";

export function view(viewPath:string){
    return (resolve) => {
        System.import(viewPath).then((module:any) => {
            var mod:any;
            if(defined(module.default)){
                mod = module.default;
            } else {
                mod = module;
            }

            if(defined(mod.COMPONENT)){
                mod = componentOptions(mod);
            }
            resolve(mod);
        });
    }
}
export abstract class View extends BaseComponent {
    static VIEW:boolean = true;

    static breadcrumb(title:string, type:string, typeValue:string, target?:string){
        var breadcrumb:IBreadcrumbLink = <IBreadcrumbLink> route.link(type, typeValue, target);
        breadcrumb.title = title;
        return breadcrumb;
    }
}
