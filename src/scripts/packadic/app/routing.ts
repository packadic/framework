import * as _ from 'lodash';

import {App,AppState} from './app';
import {BaseComponent,componentOptions} from './addons';
import {defined,kindOf,MetaStore} from './../lib';

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
export function route(name:string, path:string, viewPath:string){
    App.router.on(path, {
        name: name,
        component: view(viewPath)
    })
}

export class View extends BaseComponent {

}
