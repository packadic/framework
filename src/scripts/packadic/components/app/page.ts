import * as _ from 'lodash';
import {defined} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent, Prop, EventHook,
    Directive,ParamWatcher,BaseDirective,
    Transition,ITransition,BaseJqueryTransition, log,
} from './../../app';
import {BaseJqueryTransition} from "../../app/addons/transition";

export interface IBreadcrumbItem {}


@Component('page-breadcrumb')
export class PageBreadcrumbItemComponent extends BaseComponent {

    static template:string = `
    <li>

        <a v-if="isType('href')" href="{{href}}">{{title}}</a>

        <a v-if="isType('route')" v-link="{ 'name': route }">{{title}}</a>

        <a v-if="isType('path')" v-link="{ 'path': path }">{{title}}</a>

        <i class="fa fa-arrow-right" v-if="arrow"></i>
    </li>`;


    @Prop({type: Object, required: false}) item:IBreadcrumbItem;
    @Prop({type: String, required: false, 'default': ()=>''}) title:string;
    @Prop({type: String, required: false, 'default': ()=>'javascript:;'}) href:string;
    @Prop({type: String, required: false, 'default': ()=>'href'}) type:string;
    @Prop({type: String, required: false, 'default': ()=>''}) route:string;
    @Prop({type: String, required: false, 'default': ()=>''}) path:string;
    @Prop({type: Boolean, required: false, 'default': ()=> true}) arrow:string;


    isType(...args:string[]) {
        return args.indexOf(this.type) !== -1;
    }

    @LifecycleHook('beforeCompile') beforeCompile():void {
        if (defined(this.item))
            Object.keys(this.item).forEach((key:string) => {
                this[key] = this.item[key];
            });
    }
}

@Component('page-breadcrumbs')
export class PageBreadcrumbsComponent extends BaseComponent {
    static template = `
    <ul class="page-breadcrumb breadcrumb" v-el:page-breadcrumbs>
        <slot>
            <item v-for="item in items"
            :item="item"
            :index="$index"
            ></item>
        </slot>
    </ul>
    `;

    @Prop({type: Array, required: false}) items:IBreadcrumbItem[];
    @Prop({type: Boolean, required: false, 'default': () => true }) autofix:boolean;


    isLast(index:number):boolean {
        return this.items.length === index - 1;
    }

    @LifecycleHook('beforeCompile') beforeCompile(){
        if(this.autofix && defined(this.items)){
            this.items[this.items.length - 1]['arrow'] = false;
        }
    }

    @LifecycleHook('ready') ready(){
        if(this.autofix && !defined(this.items)){
            var lia = this.$els['pageBreadcrumbs'].querySelectorAll('li');
            if(!lia.length > 0) return;
            var i:HTMLElement[] = lia.item(lia.length - 1).getElementsByTagName('i');
            if(!i.length > 0) return;
            i[0].remove();
        }
    }

}

@Component('page')
export class PageComponent extends BaseComponent {
    static template:string = `
    <div class="page-head" v-if="title">
        <div class="page-title">
            <h1>{{title}} <small v-if="subtitle">{{subtitle}}</small></h1>
        </div>
    </div>
    <slot name="breadcrumb"></slot>
    <div v-if="seperator" class="page-content-seperator"></div>
    <div class="page-content-inner">
        <slot></slot>
    </div>
    `;

    @Prop({type: String, required: false }) title:string;
    @Prop({type: String, required: false }) subtitle:string;
    @Prop({type: Boolean, required: false, 'default': () => true }) seperator:string;
}
