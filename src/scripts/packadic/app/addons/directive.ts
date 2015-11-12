import * as _ from 'lodash';
import {App,Vue,AppState,app} from './../index';
import {defined,kindOf,MetaStore} from './../../lib';

MetaStore.template('directive', {
    params: [],
    paramWatchers: {},
    deep: false,
    twoWay: false,
    acceptStatement: false,

    bind: () => {},
    update: () => {},
    unbind: () => {},
});

export function Directive(id:string, elementDirective:boolean=false):ClassDecorator {

    return (target:any) => {

        console.log('Directive', target.prototype);
        var options:any = MetaStore.for(target.prototype, 'directive').store.get();
        // copy static options
        Object.keys(target).forEach(function (key) {
            options[key] = target[key]
        });


        if(elementDirective) {
            Vue.elementDirective(id, options);
        } else {
            Vue.directive(id, options);
        }
        console.log('Directive', options);
        return target;
    }
}

export function ParamWatcher(id?:string):MethodDecorator {
    console.log('ParamWatcher');
    return (target:any, key:any) => {
        id = id || key;

        MetaStore.for(target, 'directive').store.set('paramWatchers.' + id,  target[key]);
        console.log('ParamWatcher', target);
        return target;
    }
}

export class BaseDirective {
    el:HTMLElement;
    vm:vuejs.Vue;
    expression:string;
    arg:any;
    raw:string;
    name:string;


    constructor() {
        // remove all members, they are only needed at compile time.
        var myPrototype = (<Function>Directive).prototype;
        $.each(myPrototype, (propertyName, value)=> {
            delete myPrototype[propertyName];
        });
    }

    get $el():JQuery {
        return $(this.el);
    }

    // methods: http://vuejs.org/api/instance-methods.html
    $set(exp:string, val:any):void {
    }
    $delete(key:string):void {}

    set(value:any):void {}
    on(event:string, handler:Function):void {}

    bind():void {
    }

    unbind():void {
    }

    update(newValue:any, oldValue:any):void {
    }
}
