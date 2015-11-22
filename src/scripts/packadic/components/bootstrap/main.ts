namespace packadic {
    function normalizeParams(params:any, removePrefix?:string) {
        params = _.cloneDeep(params);
        if (removePrefix) {
            var prefix = new RegExp('^' + removePrefix + '([A-Z].*)');

            Object.keys(params).forEach((key:string) => {
                if (!prefix.test(key)) return;
                var newKey:string = key.replace(prefix, '$1').toLowerCase();
                params[newKey]    = params[key];
                delete params[key];
            })
        }
        return params;
    }

    @Directive('tooltip')
    export class TooltipDirective extends BaseDirective {
        static params:any[] = ['t-trigger', 't-animation', 'title', 't-placement', 't-container'];

        initPlugin(config:any = {}) {
            $(() => $(this.el).tooltip(_.merge({container: 'body'}, normalizeParams(this.params, 't'), config)));
        }

        bind() {
            this.initPlugin();
        }

        update(value:any) {
            this.initPlugin(value);
        }
    }

    @Directive('popover')
    export class PopoverDirective extends BaseDirective {
        static params:any[] = ['p-trigger', 'p-animation', 'title', 'p-placement', 'p-content', 't-container'];

        initPlugin(config:any = {}) {
            $(() => $(this.el).popover(_.merge({container: 'body', trigger: 'click focus'}, normalizeParams(this.params, 'p'), config)))
        }

        bind() {
            this.initPlugin();
        }

        update(value:any) {
            this.initPlugin(value);
        }
    }
}
