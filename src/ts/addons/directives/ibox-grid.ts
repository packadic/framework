

module packadic.directives {

    @directive('ibox-grid')
    export class IBoxGridDirective extends Directive {

        isLiteral:boolean = true;
        selector:string = '.ibox-grid-column';
        $el:JQuery = $();
        $columns:JQuery = $();


        bind() {
            var self:IBoxGridDirective = this;
            this.$el = $(this.el);
            this.$columns = this.$el.children(this.selector);
            if(this.expression){
                this.selector = this.expression;
            }

            this.$el.ensureClass('ibox-grid', true);
            this.makeSortable();


            debug.log('IBoxGridDirective directive bind', this);
        }

        unbind() {
            this.$el.ensureClass('ibox-grid', false);
            this.$columns.sortable('destroy');
        }

        update(value:any) {
            var self:IBoxGridDirective = this;
            var o:any = this['options'];

            debug.log('IBoxGridDirective update', this, value);
        }

        makeSortable(){
            this.$columns.sortable({
                connectWith: this.selector,
                placeholder: 'ibox-grid-placeholder',
                items: '.ibox',
                cursor: 'move',
                revert: true,
                opacity: 0.9,
                delay: 200,
                handle: 'header',
                forcePlaceholderSize: true,
                forceHelperSize: true
            }).disableSelection();
            debug.log('ibox-grid', this.$columns, this.$columns.sortable('instance'))
        }
    }


}
