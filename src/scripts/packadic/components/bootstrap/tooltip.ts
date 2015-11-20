import * as _ from 'lodash';
import {defined,EventListener} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent,Prop,
    Directive,BaseDirective
} from './../../app';
import PopoverMixin from './popoverMixin'

@Component('tooltip')
export class TooltipComponent extends BaseComponent {
    public static template:string = `
    <div>
      <span v-el:trigger>
        <slot>
        </slot>
      </span>
      <div class="tooltip"
        v-bind:class="{
        'top':    placement === 'top',
        'left':   placement === 'left',
        'right':  placement === 'right',
        'bottom': placement === 'bottom'
        }"
        v-el:popover
        v-show="show"
        :transition="effect"
        role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">
          {{{content}}}
        </div>
      </div>
      </div>
    `;

    public static mixins = [ PopoverMixin ];

    @Prop({type:String, 'default':()=>'hover'}) trigger:string;
    @Prop({type:String, 'default':()=>'fade'}) effect:string;

}


@Directive('tooltip')
export class TooltipDirective extends BaseDirective {
    static params:any[] = ['trigger', 'content', 'effect', 'title', 'placement'];

    bind() {
        //this.el.appendChild()
        //console.log(this.vm.$compile(`
        //<tooltip>
        //</tooltip>
        //`));
    }
    update(oldVal:any, newVal:any) {
        console.log('tooltip directive', this, arguments);

    }
}
