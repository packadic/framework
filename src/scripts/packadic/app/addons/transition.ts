import * as _ from 'lodash';
import {App,Vue,AppState} from './../../index';
import {defined,kindOf,MetaStore} from './../../lib';

export function Transition(id:string, css:boolean = true):ClassDecorator {

    return (target:any) => {
        console.groupCollapsed('Transition: ' + id);
        console.log(id, target.prototype);

        var options:any = {css: css};

        // copy static options
        Object.keys(target).forEach(function (key) {
            options[key] = target[key]
        });

        // copy prototype options
        Object.getOwnPropertyNames(target.prototype).forEach(function (key) {
            if (key === 'constructor') return;
            var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
            if (typeof descriptor.value === 'function') {
                options[key] = descriptor.value
            }
        });

        Vue.transition(id, options);
        console.log('options', options);
        console.groupEnd();
        return target;
    }

}


export interface ITransition {
    css?:boolean;
    enter ?: (el:HTMLElement, done:Function) => void;
    enterCancelled ?: (el:HTMLElement) => void ;
    leave ?: (el:HTMLElement, done:Function) => void;
    leaveCancelled ?: (el:HTMLElement) => void;
    stagger ?: (index:number) => number;
    enterStagger ?: (index:number) =>number;
    leaveStagger ?: (index:number) =>number;
}
