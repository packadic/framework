

module packadic.addons.directives {

    @createDirective('breadcrumbs')
    export class BreadcrumbsDirective extends Directive {

        deep:boolean = true;
        $el:JQuery;
        $items:JQuery;

        bind(){
            this.$el = $(this.el);
        }

        unbind(){

        }

        update(value:any){
            this.$items = this.$el.find('li');

            debug.log('breadcrumb directive', this.$items);

            return;
            util.openWindow(<any> {
                content: this._getInfoContent(value)
            });
        }

        _getInfoContent(value:any=''){
            return
                'name - '       + this.name + '<br>' +
                'raw - '        + this.raw + '<br>' +
                'expression - ' + this.expression + '<br>' +
                'argument - '   + this.arg + '<br>' +
                'vm name - '    + this.vm.name + '<br>' +
                'value - '      + value;
        }
    }


    @createDirective('breadcrumb', true)
    export class BreadcrumbElementDirective extends ElementDirective {

        deep:boolean = true;
        $el:JQuery;

        bind(){
            this.$el = $(this.el);
        }

        unbind(){

        }

        update(value:any){

        }
    }
}
