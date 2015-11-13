import * as _ from 'lodash';
import {
    App,Vue,app,
    Component, BaseComponent, Prop, Handles,

    Directive,ParamWatcher,BaseDirective

} from './../../packadic/index';
import sidebarTemplate from './sidebar.jade!';


function sbitem(title:string, icon:string = 'fa fa-github', type:string = 'href', children:any[] = []) {
    return {
        title      : title, icon: icon,
        hasChildren: children.length > 0, children: children,
        href       : '#', type: type
    }
}


/* */
// C    sidebar
/* */
@Component('sidebar', app)
export class SidebarComponent extends BaseComponent {
    static template:string = sidebarTemplate({});

    @Prop(Boolean, false, false) closed:boolean;
    @Prop(Boolean, false, false) hidden:boolean;
    @Prop(Boolean, false, false) condensed:boolean;

    // data
    items:any[] = [sbitem('Home'), sbitem('Installing'), sbitem('API Documentation'), sbitem('Methods')];

    hide() {
        this.$dispatch('hide', this);
    }

    show() {
        this.$dispatch('show', this);
    }

    open() {
        this.$dispatch('open', this);
    }

    close() {
        this.$dispatch('close', this);
    }

    addItem(name:string, link:string = '', iconClass:string = 'fa') {

    }

    @Handles('hide')
    onHide() {
        this.$root.$get('layout.body.classes')
            .ensure('page-sidebar-hide')
            .ensure('page-sidebar-closed');
    }

    @Handles('show')
    onShow() {
        this.$root.$get('layout.body.classes').ensure('page-sidebar-hide', false);
    }

    @Handles('open')
    onOpen() {
        this.$root.$get('layout.body.classes')
            .ensure('page-sidebar-hide', false)
            .ensure('page-sidebar-closed', false);

    }

    @Handles('close')
    onClose() {
        this.$root.$get('layout.body.classes').ensure('page-sidebar-closed', true);
    }
}


/* */
// D    sidebar-toggler
/* */
@Directive('sidebar-toggler')
export class SidebarTogglerDirective extends BaseDirective {

    bind(){
        var bc = this.vm.$root.$get('layout.body.classes');

            //bc.ensure('page-sidebar-closed', ! bc.has('page-sidebar-closed'));

    }
}
