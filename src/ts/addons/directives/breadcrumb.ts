

module packadic.directives {

    @directive('breadcrumbs')
    export class BreadcrumbsDirective extends Directive {

        deep:boolean = true;
        hasOwnContent:boolean = false;
        $el:JQuery;

        get $items():JQuery {
            return this.$el.find('li');
        }

        get $links():JQuery {
            return this.$el.find('a');
        }


        bind() {
            var self:BreadcrumbsDirective = this;
            this.$el = $(this.el);
            if (this.$el.find('li, a').length > 0) {
                this.hasOwnContent = true;
            }
            this.setOptions();
            debug.log('breadcrumbs directive bind', this);
        }

        unbind() {

        }

        setOptions(opts:any = {}) {
            var defaults:any = {
                home: true,
                arrowIcon: 'fa fa-arrow-right',
                overrideOwnContent: false,
                items: []
            };
            this.$set('options', $.extend({}, defaults, opts));
        }

        update(value:any) {
            var self:BreadcrumbsDirective = this;
            this.vm.$log(value);

            if (util.arr.isObject(value)) {
                value = defined(value.breadcrumbs) ? value.breadcrumbs : value;
                this.setOptions(value);
            }

            var o:any = this['options'];
            if (this.hasOwnContent && o.overrideOwnContent === false) {
                return;
            }

            // reset html content
            this.$el.html('');

            // create home link
            if (o.home) {
                this.createItem('Home', '/').appendTo(this.$el);
            }

            // create links
            $.each(o.items, (k:any, link:any) => {
                this.createItem(link.title, link.href || false, o.items.length - 1 === parseInt(k)).appendTo(this.$el);
            });

        }

        createItem(name:string, href:string|boolean = false, last:boolean = false) {
            href = util.arr.isBoolean(href) ? 'javascript:;' : href;
            var $li = cre('li'),
                $a = cre('a').text(name).attr('href', <string> href),
                $i = cre('i').addClass(this['options']['arrowIcon']);

            $a.appendTo($li);
            !last && $i.appendTo($li);
            return $li;
        }

        _getInfoContent(value:any = '') {
            return
            'name - ' + this.name + '<br>' +
            'raw - ' + this.raw + '<br>' +
            'expression - ' + this.expression + '<br>' +
            'argument - ' + this.arg + '<br>' +
            'vm name - ' + this.vm.name + '<br>' +
            'value - ' + value;
        }
    }


}
