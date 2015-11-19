import * as _ from 'lodash';
import {defined,EventListener} from './../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent
} from './../app';

@Component('dropdown')
export class DropdownComponent extends BaseComponent {
    public static template:string = `
    <div class="btn-group">
        <slot></slot>
    </div>
    `;

    toggleDropdown(e) {
        e.preventDefault()
        this.$el.classList.toggle('open')
    }

    @LifecycleHook('ready') ready() {
        var el = this.$el;
        var toggle:any = el.querySelector('[data-toggle="dropdown"]');
        toggle.addEventListener('click', this.toggleDropdown);
        this['_closeEvent'] = EventListener.listen(window, 'click', (e)=> {
            if (!el.contains(e.target)) el.classList.remove('open')
        })
    }

    @LifecycleHook('beforeDestroy') beforeDestroy() {
        if (this['_closeEvent']) this['_closeEvent'].remove()
    }
}
