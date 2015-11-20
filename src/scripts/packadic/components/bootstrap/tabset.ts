import * as _ from 'lodash';
import {defined,EventListener} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent, Prop
} from './../../app';

@Component('tabs')
export class TabsetComponent extends BaseComponent {
    public static template:string = `
    <div>
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item"
                v-for="r in renderData"

                @click.prevent="handleTabListClick($index, r)"
                :disabled="disabled === true"
            >
                <a href="#" v-bind:class="{ 'active': ($index === activeIndex) }" class="nav-link">{{r.header}}</a>
            </li>
        </ul>
        <div class="tab-content" v-el="tabContent">
            <slot></slot>
        </div>
    </div>
    `;

    @Prop({type:String,'default': ()=>'fadein'}) effect:string;

    renderData:any[] = [];
    activeIndex:number = 0;

    handleTabListClick(index, el) {
        if (!el.disabled) this.activeIndex = index
    }
}

