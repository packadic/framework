/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />

module packadic.components {


    @vue.createComponent('code-block')
    export class CodeBlock extends vue.VueComponent {
        static template:string = getTemplate('code-block')({});
        static replace:boolean = true;

        @vue.prop({type: String, required: false, 'default': ''})language:string;
        @vue.prop({type: String, required: false, 'default': ''})title:string;
        @vue.prop({type: String, required: false, 'default': ''})description:string;
        @vue.prop({type: Boolean, required: false, 'default': true})showTop:string;
        @vue.prop({type: String, required: false, 'default': 'prism'})theme:string;

        lines:number = 0;
        original:string = '';
        code:string = '';
        actionBtnClass:string = 'btn btn-sm blue-grey-light';
        show:boolean = false;

        client:ZeroClipboard;

        get actions():any[] {
            return [
                {title: 'Copy to clipboard', icon: 'fa-copy', onClick: this.onCopyClick }
                //{title: 'Test', icon: 'fa-cog', onClick: this.onTestClick}
            ];
        }

        onCopyClick(e){
            console.log('onCopyClick', e.target.tagName, e);
            //this.client.clip()
        }

        @vue.lifecycleHook('compiled')
        compiled():void {
            console.log('compiled');
            this.initClipboard();
        }

        initClipboard():void {
            if(defined(this.client)){
                return;
            }
            packadic.getClipboard().then((Clipboard:typeof ZeroClipboard) => {
                this.client = new Clipboard($(this.$el).find('a.btn')); // simple
                this.client.on('ready', (event:any) => {
                    this.client.on('copy', (event:any) => {
                        var clipboard = event.clipboardData;
                        clipboard.setData('text/plain', this.code);
                        console.log(event);
                    });

                    this.client.on('aftercopy', (event:any) => {
                        debug.log('aftercopy', event.data);
                    });
                });
            });
        }

        @EventHook('init')
        _init():void {
            console.log('EventHook init code-block', this, arguments);
        }

        @vue.lifecycleHook('ready')
        ready():void {
            app.loadCSS('prism/themes/' + this.theme, true);
            app.loadJS('prism/prism', true).then(()=> {
                var defer:any = util.promise.create();
                async.parallel([
                    (d:any) => { app.loadJS('prism/components/prism-' + this.language, true).then(d); },
                    (d:any) => { app.loadJS('prism/plugins/line-numbers/prism-line-numbers', true).then(d); },
                    (d:any) => { app.loadCSS('prism/plugins/line-numbers/prism-line-numbers', true).then(d); },
                    (d:any) => { app.loadJS('prism/plugins/remove-initial-line-feed/prism-remove-initial-line-feed', true).then(d); }

                ], function(err:any){
                    defer.resolve();
                });
                return defer.promise;
            }).then(() => {
                var $pre:JQuery = $(this.$el).find('pre');
                var $code:JQuery = $(this.$el).find('code');
                $code.ensureClass('language-' + this.language);
                this.original = $code.text();
                this.code = util.codeIndentFix(util.codeIndentFix(this.original));
                this.lines = this.code.split('\n').length;
                $code.html('').append(this.code);
                Prism.highlightElement($code.get(0));
            }).then(() => {
                this.show = true;
            });
        }

        @vue.lifecycleHook('attached')
        attached():void {
            console.log('attached');
            $(this.$el).find('a.btn');
        }

        @vue.lifecycleHook('detached')
        detached():void {
            console.log('detached');
        }

        @vue.lifecycleHook('beforeDestroy')
        beforeDestroy():void {
            this.show = false;

        }
    }
}
