import * as _ from 'lodash';
import {defined,getViewPort} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent, Prop, EventHook,
    Directive,ParamWatcher,BaseDirective,
    Transition,ITransition,BaseJqueryTransition, log,
} from './../../app';
import {BaseJqueryTransition} from "../../app/addons/transition";
import {ILink,LinkComponent} from './routing';
import pageBreadcrumbTemplate from './../../views/page-breadcrumb.html!text'
import pageBreadcrumbsTemplate from './../../views/page-breadcrumbs.html!text'
import pageTemplate from './../../views/page.html!text'

export interface IBreadcrumbLink extends ILink {
    title?:string;
    arrow?:boolean;
}


@Component('page-breadcrumb')
export class PageBreadcrumbItemComponent extends BaseComponent {

    static template:string = pageBreadcrumbTemplate;


    @Prop({type: Object, required: false}) item:IBreadcrumbLink;

    @Prop({type: String, required: false, 'default': ()=>'href'}) type:string;
    @Prop({type: String, required: false, 'default': ()=>''}) route:string;
    @Prop({type: String, required: false, 'default': ()=>''}) path:string;
    @Prop({type: String, required: false, 'default': ()=>'javascript:;'}) href:string;

    @Prop({type: String, required: false, 'default': ()=>''}) title:string;
    @Prop({type: Boolean, required: false, 'default': ()=> true}) arrow:boolean;

    @LifecycleHook('beforeCompile') beforeCompile():void {
        if (defined(this.item))
            Object.keys(this.item).forEach((key:string) => {
                this[key] = this.item[key];
            });
    }

    get link() {
        var link:any    = {
            type: this.type
        };
        link[this.type] = this[this.type];
        return link;
    }
}

@Component('page-breadcrumbs')
export class PageBreadcrumbsComponent extends BaseComponent {
    static template = pageBreadcrumbsTemplate;

    @Prop({type: Array, required: false}) items:IBreadcrumbLink[];
    @Prop({type: Boolean, required: false, 'default': () => true}) autofix:boolean;


    isLast(index:number):boolean {
        return this.items.length === index - 1;
    }

    @LifecycleHook('beforeCompile') beforeCompile() {
        if (this.autofix && defined(this.items)) {
            this.items[this.items.length - 1]['arrow'] = false;
        }
    }

    @LifecycleHook('ready') ready() {
        if (this.autofix && !defined(this.items)) {
            var lia = this.$els['pageBreadcrumbs'].querySelectorAll('li');
            if (!lia.length > 0) return;
            var i:HTMLElement[] = lia.item(lia.length - 1).getElementsByTagName('i');
            if (!i.length > 0) return;
            i[0].remove();
        }
    }

}

@Component('page')
export class PageComponent extends BaseComponent {
    static template:string = pageTemplate;

    @Prop({type: String, required: false}) title:string;
    @Prop({type: String, required: false}) subtitle:string;
    @Prop({type: Boolean, required: false, 'default': () => true}) seperator:string;
}

@Directive('page-height-resizer')
export class PageContentSizerDirective extends BaseDirective {
    listener(){
        //console.log('v-page-height-resizer', this, getViewPort().width, App.layout.getBreakpoint('md'))
        if (getViewPort().width >= App.layout.getBreakpoint('md')) {
            $(this.el).css('min-height', App.layout.calculateViewportHeight());
        } else {
            $(this.el).removeAttr('style');
        }
    };

    bind() {

        $(()=> App.on('layout:resize', () => this.listener()) && this.listener());
    }

    unbind() {
        App.off('layout:resize', () => this.listener());
    }
}
