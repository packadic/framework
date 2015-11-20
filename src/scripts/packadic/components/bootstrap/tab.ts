import * as _ from 'lodash';
import {defined,EventListener} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent, Prop
} from './../../app';
import {TabsetComponent} from "./tabset";

@Component('tab')
export class TabComponent extends BaseComponent {
    public static template:string = `
    <div role="tabpanel" class="tab-pane"
        v-bind:class="{hide:!show}"
        v-show="show"
        :transition="transition"
    >
        <slot></slot>
    </div>
    <style scoped>
      .tab-content > .tab-pane {
        display: block;
      }
      .tab-content > .tab-pane.hide {
        position: absolute;
      }
    </style>
    `;

    $parent:TabsetComponent;

    @Prop({type:String}) header:string;
    @Prop({type:Boolean,'default': ()=>false}) disabled:string;


    show:boolean = false;
    index:number = 0;

    get show():boolean {
        return (this.$parent.activeIndex == this.index);

    }


    get transition():string {
        return this.$parent.effect;
    }

    @LifecycleHook('created') created() {
        this.$parent.renderData.push({
            header: this.header,
            disabled: this.disabled
        })
    }

    @LifecycleHook('ready') ready() {
        for (var c in this.$parent.$children)
        {
            if (this.$parent.$children[c].$el == this.$el)
            {
                this.index= c;
                break;
            }
        }
    }
}
