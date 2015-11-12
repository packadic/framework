import * as _ from 'lodash';
import {
    App,Vue,app,
    Component, BaseComponent, Prop, Handles
} from './../packadic/index';
import sidebarTemplate from './templates/sidebar.jade!';

/* */
//      sidebar
/* */
@Component('sidebar', app)
export class SidebarComponent extends BaseComponent {
    static template:string = sidebarTemplate({});

    @Prop(String, false, 'default value') text:string;

    // data
    msg:string = '';
    messages:string[] = [];

    // data as function, will merge with other data and
    data:Function = () => {
        return {a: 'n'};
    };

    // methods
    notify(){
        this.$dispatch('child-msg', 'haaai');
    }

    @Handles('child-msg')
    onChildMsg(msg?:any){
        this.messages.push(msg);
    }
}
