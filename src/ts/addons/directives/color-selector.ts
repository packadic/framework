module packadic.directives {

    @directive('color-selector')
    export class ColorSelectorDirective extends Directive {
        bind() {
            $(this.el).attr({
                'data-toggle': 'dropdown',
                'aria-expanded': 'false',
                'aria-haspopup': 'true'
            });
        }

        update(value:any) {

        }
    }


}
