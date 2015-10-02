module packadic.components {

    @component('color-selector')
    export class ColorSelectorComponent extends Component {

        static template:string = getTemplate('color-selector')({});
        static replace:boolean = true;


        @prop({type: Boolean, required: false, 'default': false})show:boolean;
        @prop({type: String, required: true, 'default': ''})target:string;
        @prop({type: String, required: false, 'default': 'background-color'})property:string;

        info:string = '';

        @prop({type: Object, required: false})colors:{[name:string]:any[]};


        @lifecycleHook('created')
        created():void {
            if (!this.colors) {

                var colors:{[name:string]:any[]} = {};
                Object.keys(util.material.colors).forEach((name:string) => {
                    var current:any[] = [];
                    Object.keys(util.material.colors[name]).forEach((variant:string) => {
                        current.push({name: name + '-' + variant, value: util.material.color(name, variant)})
                    });
                    colors[name] = current;
                });
                this.colors = colors;
            }
        }

        @lifecycleHook('ready')
        ready():void {
            debug.log('ColorSelectorComponent ready ', this);
            $(this.$el)
                .find('a[data-toggle="dropdown"]')
                .parent()
                .on('shown.bs.dropdown', this.onShown);
            //.on('show.bs.dropdown', this.onShow)
            //.on('hide.bs.dropdown', this.onHide)
            //.on('hidden.bs.dropdown', this.onHidden)

        }

        onHover(color:any, e:any) {
            this.info = (this.property === 'color' ? '.color-' : '.bg-color-') + color.name + ' = ' + color.value;
        }

        onClick(color:any, e:any) {
            debug.log('ColorSelectorComponent onClick ', color, e, this);
            this.getTarget().css(this.property, color.value);
        }


        onShown(e:JQueryEventObject) {
            var $menu:JQuery = $(e.target).children('.dropdown-menu');
            var rightSide:number = $menu.offset().left + $menu.outerWidth();
            if (rightSide > getViewPort().width) {
                $menu.addClass('dropdown-menu-right');
            }
            console.log('onShown', $menu, rightSide, getViewPort(), this);
        }

        getTarget():JQuery {
            var selector:string = this.$parent.$eval(this.target);
            return $(selector);
        }
    }


}
