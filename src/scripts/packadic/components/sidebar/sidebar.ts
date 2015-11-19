import * as _ from 'lodash';
import {defined} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent, Prop, EventHook,
    Directive,ParamWatcher,BaseDirective,
    Transition,ITransition,BaseJqueryTransition, log,
} from './../../app';
import {BaseJqueryTransition} from "../../app/addons/transition";


/* */
// C    sidebar
/* */
@Component('sidebar')
export class SidebarComponent extends BaseComponent {
    static replace:boolean = true;
    static template:string = `
    <div class="page-sidebar navbar-collapse collapse" v-el="sidebar">
        <ul class="page-sidebar-menu" v-bind:class="{ 'page-sidebar-menu-closed': closed }" v-el="menu">
        <slot>
            <item v-for="item in items"
            :item="item"
            :index="$index"
            ></item>
        </slot>
        </ul>
    </div>`;

    @Prop({type: Array, required: false}) items:ISidebarItem[];

    get bodyClass():DOMTokenList {
        return document.body.classList;
    }

    ensureBodyClass(name:string, shouldExist:boolean=true):SidebarComponent {
        if(shouldExist && !this.bodyClass.contains(name)){
            this.bodyClass.add(name);
        } else if(!shouldExist && this.bodyClass.contains(name)){
            this.bodyClass.remove(name);
        }
        this._digest();
        return this;
    }

    get closed():boolean {
        return this.bodyClass.contains('page-sidebar-closed');
    };

    set closed(value:boolean) {
        this.closeSubmenus();
        this.ensureBodyClass('page-sidebar-closed', value);
    };

    get hidden():boolean {
        return this.bodyClass.contains('page-sidebar-hide');
    };

    set hidden(value:boolean) {
        this.ensureBodyClass('page-sidebar-closed', value)
            .ensureBodyClass('page-sidebar-hide', value);
    };

    get condensed():boolean {
        return this.bodyClass.contains('page-sidebar-condensed');
    };

    set condensed(value:boolean) {
        this.ensureBodyClass('page-sidebar-condensed', value);
    };

    toggle() {
        if (this.closed) {
            this.closed = false;
        } else {
            this.closed = true;
        }
    }

    closeSubmenus() {
        this.$broadcast('closeSubmenus');
    }
}

export interface ISidebarItem {
    title?: string;
    icon?: string;
    children?: ISidebarItem[];
    href?:string;
    active?:boolean;
    type?: string; // href | folder | heading
}

@Component('item')
export class SidebarItemComponent extends BaseComponent {

    static replace:boolean = true;

    static template:string = `
    <li v-bind:class="{ 'open': isOpen && hasSubmenu, 'active': isActive, 'heading': isType('heading') }">

        <h3 v-if="isType('heading')">{{title}}</h3>

        <a v-if="isType('folder', 'href')" href="#" v-on:click="toggle()">
            <i v-if="icon" class="{{icon}}"></i>
            <span class="title">{{title}}</span>
            <span v-if="hasSubmenu" class="arrow" v-bind:class="{ 'open': isOpen && hasSubmenu }"></span>
        </a>

        <ul v-if="hasSubmenu && isType('folder', 'href')" v-show="isOpen" class="sub-menu" transition="sidebar-submenu">
            <slot> <item v-for="subitem in children" :item="subitem" :index="$index"></item> </slot>
        </ul>
    </li>`;


    @Prop({type: Object, required: false}) item:ISidebarItem;
    @Prop({type: String, required: false, 'default': ()=>''}) title:string;
    @Prop({type: String, required: false}) icon:string;
    @Prop({type: String, required: false, 'default': ()=>'#'}) href:string;
    @Prop({type: String, required: false, 'default': ()=>'href'}) type:string;
    @Prop({type: Boolean, required: false, 'default': ()=>false}) isActive:boolean;
    @Prop({type: Boolean, required: false, 'default': ()=>false}) hasChildren:boolean;

    children:any[] = [];
    isOpen:boolean = false;

    get hasSubmenu() {
        return (this.hasChildren === true || this.children.length > 0) && this.type === 'folder';
    }

    toggle() {
        this.isOpen ? this.close() : this.open(true);
    }

    isType(...args:string[]) {
        return args.indexOf(this.type) !== -1;
    }

    close() {
        this.isOpen = false;
    }

    open(closeOthers:boolean = false) {
        if (!this.hasSubmenu) return;
        if (closeOthers) this.$parent.$eval('closeSubmenus()');
        this.isOpen = true;
    }

    /**
     * the event propagation will follow many different “paths”. The propagation for each path will stop when a listener callback is fired along that path, unless the callback returns true.
     * http://vuejs.org/api/#vm-broadcast
     * @returns {boolean}
     */
    @EventHook('closeSubmenus') closeSubmenus():boolean {
        this.close();
        return true;
    }

    @LifecycleHook('beforeCompile') beforeCompile():void {
        //console.log('itemPropToOthers', _.cloneDeep(this));
        if (defined(this.item))
            Object.keys(this.item).forEach((key:string) => {
                this[key] = this.item[key];
            });
        //console.log('itemPropToOthers', _.cloneDeep(this));
    }

    @LifecycleHook('compiled') compiled():void {
        //console.log('COMPILED', _.cloneDeep(this))
    }
}

@Transition('sidebar-submenu', false)
export class SlideToggleTransition extends BaseJqueryTransition{
    enter(el:HTMLElement, done) {
        $(el).slideDown(400, 'linear', done);
    }
    leave(el:HTMLElement, done) {
        $(el).slideUp(250, 'linear', done);
    }
}



/* */
// D    sidebar
/* */
@Directive('sidebar')
export class SidebarDirective extends BaseDirective {
    static params:any[] = ['s-action', 's-on'];

    update(oldVal:any, newVal:any) {
        this.el['on' + this.params['sOn']] = () => {
            var action:any               = this.params['sAction'];
            var sidebar:SidebarComponent = this.vm.$root.$refs['sidebar'];
            if (typeof sidebar[action] === 'undefined') {
                log.warn('SidebarActionDirective could not do action ' + action);
                return;
            }
            sidebar[action].call();
            //sidebar.hide();
            //action = sidebar[action];
            // action(this);
        }
    }
}
