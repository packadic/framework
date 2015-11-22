import * as _ from 'lodash';
import $ from 'jquery';
import { defined, objectSet, objectGet, getViewPort } from './../lib';
import {IObjectObserver,ObjectObserver,PathObserver,Observable,CompoundObserver,ICompoundObserver} from 'observe-js';
import {App} from "./app";

var layoutStyle:any = {};
$(function () {
    var class2key:any = {};
    function getKey(className:string) {
        return class2key[className];
    }

    function getPropString(prop:any):string {
        return Array.isArray(prop) ? prop.map(this.escape).join('.') : prop;
    }

    function add(key:string, className:string, def:boolean = true) {
        class2key[className] = key;
        objectSet(layoutStyle, getPropString(key), def);
        def === true && ! document.body.classList.contains(className) && document.body.classList.add(className);

        var pathObserver = new PathObserver(layoutStyle, getPropString(key), def);
        pathObserver.open(function(newValue:any, oldValue:any) {
            //console.log('path obs.open', arguments);
            var list:DOMTokenList = document.body.classList;
            if(newValue === true && !list.contains(className)){
                list.add(className);
            } else if(newValue === false && list.contains(className)){
                list.remove(className);
            }
        });

        return layoutStyle;
    }

    var bodyObserver:MutationObserver = new MutationObserver((mutations:any) => {
        mutations.forEach((mutation:MutationRecord) => {
            //console.log('mutation', mutation);
            var list:DOMTokenList = document.body.classList;
            var current:string[] = document.body.className.split(' ');
            var old:string[] = mutation.oldValue.split(' ');
            var added:boolean = current.length > old.length;
            var classes:string[] = _.difference(added ? current : old, added ? old : current);
            classes.forEach((className:string) => {
                if(!defined(getKey(className))) return;
                objectSet(layoutStyle, getPropString(getKey(className)), added);
            });
            if(defined(App.vm)) App.vm._digest();
        })
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'], attributeOldValue: true });

    layoutStyle._add = add;
    layoutStyle._add('footer.fixed', 'page-footer-fixed')
        ._add('header.fixed', 'page-header-fixed')
        ._add('page.edged', 'page-edged')
        ._add('page.boxed', 'page-boxed');


});




export class Layout {
    public style:any = layoutStyle;

    public get settings():any {
        return JSON.parse(JSON.parse(window.getComputedStyle(document.body, '::before').getPropertyValue('content'))).style;
    }

    constructor(){

        var resize:number;
        $(window).resize(() => {
            if (resize) {
                clearTimeout(resize);
            }
            resize = setTimeout(() => {
                App.emit('layout:resize');
            }, 50);
        });
    }

    public getBreakpoint(which:string) {
        return parseInt(this.settings.breakpoints[which]);
    }

    public calculateViewportHeight() {
        var sidebarHeight = getViewPort().height - App.$e('header').outerHeight();
        if (this.style.footer.fixed) {
            sidebarHeight = sidebarHeight - App.$e('footer').outerHeight();
        }

        return sidebarHeight;
    }
    /**
     * Animated scroll to the given element
     * @param ele
     * @param offset
     */
    public scrollTo(ele?:any, offset?:number) {
        var $el:JQuery = typeof(ele) === 'string' ? $(ele) : ele;
        var pos = ($el && $el.size() > 0) ? $el.offset().top : 0;

        if ($el) {

            if (App.$e('body').hasClass('page-header-fixed')) {
                pos = pos - App.$e('header').height();
            }
            pos = pos + (offset ? offset : -1 * $el.height());
        }

        $('html,body').animate({
            scrollTop: pos
        }, 'slow');
    }

    public scrollTop() {
        this.scrollTo();
    }
}









