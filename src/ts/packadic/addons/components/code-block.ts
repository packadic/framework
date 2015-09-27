module packadic.addons.components {


    @createComponent('code-block')
    export class CodeBlock extends Component {
        static template:string = getTemplate('code-block')({});
        static replace:boolean = true;

        @prop({type: String, required: false, 'default': '', twoWay: true})language:string;
        @prop({type: String, required: false, 'default': '', twoWay: true})title:string;
        @prop({type: String, required: false, 'default': '', twoWay: true})description:string;
        @prop({type: Boolean, required: false, 'default': true, twoWay: true})showTop:boolean;
        @prop({type: String, required: false, 'default': 'prism'})theme:string;
        @prop({type: Number, required: false, 'default': 30})toManyLines:number;
        @prop({type: Number, required: false, 'default': 10})lineChangeStep:number;
        @prop({type: Boolean, required: false, 'default': true})fixCodeIndent:boolean;

        show:boolean = false;

        minimized:boolean = false;

        lines:number = 0;

        original:string = '';

        code:string = '';

        actionBtnClass:string = 'btn btn-sm blue-grey-light';

        client:ZeroClipboard;

        isrdy:boolean = false;


        get actions():any[] {
            return [
                {title: 'Copy to clipboard', icon: 'fa-copy', onClick: this.onCopyClick},
                {title: 'Show more lines', icon: 'fa-plus', onClick: this.onIncreaseLinesClick},
                {title: 'Show less lines', icon: 'fa-minus', onClick: this.onDecreaseLinesClick},
                {title: 'Minimize/maximize', icon: 'fa-plus', onClick: this.onMinimizeToggleClick}
            ];
        }

        maximize(){
            this.minimized = false;
            this.initScrollContent();
        }

        minimize(){
            this.minimized = true;
            this.destroyScrollContent();
        }

        onMinimizeToggleClick(e) {
            if (this.$get('minimized')) {
                this.$set('minimized', false);
                this.initScrollContent();
            } else {
                this.$set('minimized', true);
                this.destroyScrollContent();
            }
        }

        onDecreaseLinesClick(e) {
            if (this.$get('toManyLines') + 5 >= this.$get('lineChangeStep')) {
                this.$set('toManyLines', <number> this.$get('toManyLines') - <number> this.$get('lineChangeStep'));
                this.initScrollContent();
            }
        }

        onIncreaseLinesClick(e) {
            this.$set('toManyLines', <number> this.$get('toManyLines') + <number> this.$get('lineChangeStep'));
            this.initScrollContent();
        }

        onCopyClick(e) {
            console.log('onCopyClick', e.target.tagName, e);
        }

        @lifecycleHook('created')
        created():void {
            this.initClipboard();
        }

        @lifecycleHook('ready')
        ready():void {
            if (this.isrdy) {
                return;
            }
            app.loadCSS('prism/themes/' + this.theme, true);
            app.loadJS('prism/prism', true).then(()=> {
                // Load Prism highlighter
                var defer:any = util.promise.create();
                async.parallel([
                    (d:any) => {
                        app.loadJS('prism/components/prism-' + this.language, true).then(d);
                    },
                    (d:any) => {
                        app.loadJS('prism/plugins/line-numbers/prism-line-numbers', true).then(d);
                    },
                    (d:any) => {
                        app.loadCSS('prism/plugins/line-numbers/prism-line-numbers', true).then(d);
                    },
                    (d:any) => {
                        app.loadJS('prism/plugins/remove-initial-line-feed/prism-remove-initial-line-feed', true).then(d);
                    }

                ], function (err:any) {
                    defer.resolve();
                });
                return defer.promise;
            }).then(() => {
                // Set/transform our code into something beatifull like the guy who codes this.
                var $code:JQuery = $(this.$$.code);
                var code:string = $code.text();
                this.setCodeContent(code, this.fixCodeIndent);
            }).then(() => {
                // Lets make it shine
                this.show = true;
                this.isrdy = true;
            });
        }

        setCodeContent(code:string, fixIndent:boolean=false){
            var $pre:JQuery = $(this.$$.pre);
            var $code:JQuery = $(this.$$.code);
            $code.ensureClass('language-' + this.language);

            this.original = code;
            this.code = fixIndent ? util.codeIndentFix(util.codeIndentFix(code)) : code;
            this.lines = this.code.split('\n').length;

            $code.html('').append(this.code);
            Prism.highlightElement($code.get(0));
            this.initScrollContent();
        }


        @lifecycleHook('attached')
        attached():void {
            console.log('attached');
            $(this.$el).find('a.btn');
        }

        @lifecycleHook('detached')
        detached():void {
            console.log('detached');
        }

        @lifecycleHook('beforeDestroy')
        beforeDestroy():void {
            this.show = false;
        }

        initClipboard():void {
            if (defined(this.client)) {
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

        public getHeightBetweenLines(one:number, two:number):number {
            var $lineRows = $(this.$el).find('.line-numbers-rows')
            var $first = $lineRows.children('span').first();
            var $last = $first.nextAll().slice(one, two).last();
            console.log($lineRows, $first, $last);
            return $last.position().top - $first.position().top;
        }

        initScrollContent() {
            if (this.lines <= this.toManyLines) {
                return;
            }
            this.destroyScrollContent();
            var $el = $(this.$el).find('code.code-block-code');
            plugins.makeSlimScroll($el.parent(), {
                height: this.getHeightBetweenLines(0, this.toManyLines),
                allowPageScroll: true
            });
        }

        destroyScrollContent() {
            var $el = $(this.$el).find('code.code-block-code');
            plugins.destroySlimScroll($el);
            $(this.$el).find('.slimScrollBar, .slimScrollRail').remove();
        }
    }
}
