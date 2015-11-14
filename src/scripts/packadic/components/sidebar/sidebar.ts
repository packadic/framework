import * as _ from 'lodash';
import {defined} from './../../lib';
import {
    App,Vue,
    Component, BaseComponent, Prop, Handles,
    Directive,ParamWatcher,BaseDirective,
    Transition,ITransition, log
} from './../../app';

import sidebarTemplate from './sidebar.jade!';


function sbitem(title:string, icon:string = 'fa fa-github', type:string = 'href', children:any[] = []) {
    return {
        title      : title, icon: icon,
        hasChildren: children.length > 0, children: children,
        href       : '#', type: type
    }
}

export interface ISidebarItem {
    title?: string;
    icon?: string;
    children?: ISidebarItem[];
    href?:string;
    type?: string;
}

/* */
// C    sidebar
/* */
@Component('sidebar')
export class SidebarComponent extends BaseComponent {
    static template:string = `
    <div class="page-sidebar navbar-collapse collapse" v-el="sidebar">
        <ul class="page-sidebar-menu" v-el="menu">
        <slot></slot>
        </ul>
    </div>
    `;


    @Prop(Object, false) model:ISidebarItem;

    @Prop(Boolean, false, false) closed:boolean;
    @Prop(Boolean, false, false) hidden:boolean;
    @Prop(Boolean, false, false) condensed:boolean;

    ///.page-sidebar.navbar-collapse.collapse
    // ul.page-sidebar-menu(v-el="ul")


    // data
    items:any[] = [sbitem('Home'), sbitem('Installing'), sbitem('API Documentation'), sbitem('Methods')];

    hide() {
        this.$root.$get('layout.body.classes')
            .ensure('page-sidebar-hide')
            .ensure('page-sidebar-closed');
        this.hidden = true;
        this.closed = true;
        this.$emit('hide', this);
    }

    show() {
        this.$root.$get('layout.body.classes').ensure('page-sidebar-hide', false);
        this.hidden = false;
        this.$emit('show', this);
    }

    open() {
        this.$root.$get('layout.body.classes')
            .ensure('page-sidebar-hide', false)
            .ensure('page-sidebar-closed', false);
        this.hidden = false;
        this.closed = false;
        this.$emit('open', this);
    }

    close() {
        this.$root.$get('layout.body.classes').ensure('page-sidebar-closed', true);
        this.closed = true;
        this.$emit('close', this);
    }

    toggle() {
        this.closed ? this.open() : this.close();
    }
}

@Component('item', SidebarComponent)
export class SidebarItemComponent extends BaseComponent {
    static template:string = `
    <li v-for="item in items">
        <a href="#">
            <i v-if="item.icon" class="{{item.icon}}"></i>
            <span v-text="item.title" class="title"><slot></slot></span>
            <span v-if="item.hasChildren" class="arrow"></span>
        </a>
    </li>
    `;

    @Prop(Object, false) model:ISidebarItem;

    open:boolean = false;

    get hasChildren():boolean {
        return this.model.children && this.model.children.length
    }

    toggle() {
        this.hasChildren ? this.open = !this.open : null
    }

    changeType() {
        if (!this.hasChildren) {
            App.set(this.model, 'children', []);
            this.addChild();
            this.open = true
        }
    }

    addChild() {
        this.model.children.push({
            title: 'new stuff'
        })
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
