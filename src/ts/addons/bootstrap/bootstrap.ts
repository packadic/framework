module packadic {
    export module components {
        @component('popover')
        export class BSPopoverComponent extends Component {

            static template:string = getTemplate('popover')({});
            static replace:boolean = false;

            @prop({type: Boolean, twoWay: true, 'default': false})show:boolean;
            @prop({type: String, twoWay: true, 'default': false})title:string;
            arrow:boolean = true;
            container:string = 'body';
            delay:number = 0;
            animation:boolean = true;
            html:boolean = false;
            content:string = '';
            placement:string = 'right';
            trigger:string = 'manual';
            offsets:string = '0 0';

            @lifecycleHook('ready')
            ready():void {
                console.log('popover ready', this);

                $(this.$el)
                    .popover(<any> {
                    animation: this.animation,
                    title: this.title,
                    container: this.container,
                    delay: this.delay,
                    html: this.html,
                    content: this.content,
                    placement: this.placement,
                    trigger: this.trigger,
                    offsets: this.offsets,
                    template: this.$el.outerHTML
                })
                    .on('shown.bs.popover', () => this.show = true)
                    .on('hidden.bs.popover', () => this.show = false);

                this.$watch('show', (newVal:any, oldVal:any) => {
                    $(this.$el).popover(newVal === true ? 'show' : 'hide')
                });


            }
        }
    }

    export module directives {
        @directive('popover')
        export class BSPopoverDirective extends Directive {
            isLiteral:boolean = true;

            bind() {
                this.bindPopover();
            }
            update(){
                this.bindPopover();
            }
            unbind(){
                $(this.el).popover('destroy');
            }

            bindPopover(){
                var $this:JQuery = $(this.el);
                var split:string[] = this.expression.split('::');

                var opts:any = $.extend({
                    content: split.length > 0 ? split[1] : split[0],
                    title: split.length > 0 ? split[0] : '',
                    trigger: 'focus'
                }, $this.data());


                console.log('popoversp lit',this, split, opts);
                $(this.el).popover(opts);
            }
        }
    }
}
