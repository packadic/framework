import { objectSet, objectGet } from './../lib';
import {IObjectObserver,ObjectObserver,PathObserver,Observable,CompoundObserver,ICompoundObserver} from 'observe-js';
//var obs:MutationObserver = new MutationObserver((mutations:any) => {
//    mutations.forEach((mutation:MutationRecord) => {
//        console.log('mutation', mutation);
//    })
//});
//obs.observe(document.body, { attributes: true });
function makeLayoutSettings() {
    var layout:any    = {};
    var key2class:any = {};
    var class2key:any = {};
    var obs:ICompoundObserver = new CompoundObserver();

    function getPropString(prop:any):string {
        return Array.isArray(prop) ? prop.map(this.escape).join('.') : prop;
    }

    function add(key:string, className:string, def:boolean = true) {
        objectSet(layout, getPropString(key), def);
        key2class[key]       = className;
        class2key[className] = key;
        return layout;
    }

    function getClass(key:string) {
        return key2class[key];
    }

    function getKey(className:string) {
        return class2key[className];
    }

    function start(layout:any) {


        obs.open((newValue:any, oldValue:any) => {
            console.log('newValue', newValue);
        });
    }

    layout._add = add;
    layout._start = start;

    return layout;
}

export var layout = makeLayoutSettings();
layout._add('footer.fixed', 'page-footer-fixed')
    ._add('header.fixed', 'page-header-fixed')
    ._add('page.edged', 'page-edged')
    ._add('page.boxed', 'page-boxed')
    ._start(layout);


