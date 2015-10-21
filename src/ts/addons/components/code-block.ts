module packadic.components {

    import NotifyExtension = packadic.extensions.NotifyExtension;

    @component('code-block')
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
        @prop({type: Boolean, required: false, 'default': false})show:boolean;
        @prop({type: Boolean, required: false, 'default': false})minimized:boolean;
        @prop({type: Boolean, required: false, 'default': false})autoHideScrollbar:boolean;


        get showTopActions():boolean {
            return this.showTop;
        }

        get showContentActions():boolean {
            return ! this.showTop;
        }


        lines:number = 0;
        original:string = '';
        code:string = '';
        actionBtnClass:string = 'btn btn-sm blue-grey-light';
        client:ZeroClipboard;
        isrdy:boolean = false;



        get actions():any[] {
            return [
                {id: 'cb-copy', title: 'Copy to clipboard', icon: 'fa-copy', onClick: this.onCopyClick },
                {id: 'cb-open', title: 'Open in window', icon: 'fa-external-link', onClick: this.onOpenInWindowClick},
                {id: 'cb-more', title: 'Show more lines', icon: 'fa-plus', onClick: this.onIncreaseLinesClick},
                {id: 'cb-less', title: 'Show less lines', icon: 'fa-minus', onClick: this.onDecreaseLinesClick},
                {id: 'cb-minmax', title: 'Minimize/maximize', icon: "fa-chevron-up", onClick: this.onMinimizeToggleClick}
            ];
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
            this.$watch('minimized', (val:any, old:any) => {
                console.log('watch mini', val, old);
                var $i = $(this.$$.actions).find('#cb-minmax > i');
                $i.removeClass('fa-chevron-up fa-chevron-down');
                $i.addClass(val ? 'fa-chevron-down' : 'fa-chevron-up');
            });
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


        @lifecycleHook('beforeDestroy')
        beforeDestroy():void {
            this.show = false;
        }


        maximize() {
            this.minimized = false;
            this.initScrollContent();
        }

        minimize() {
            this.minimized = true;
            this.destroyScrollContent();
        }

        tryMaximize() {
            if (this.minimized) {
                this.maximize();
            }
        }

        get notify():NotifyExtension{
            return <NotifyExtension> packadic.app.extensions.get('notify')
        }

        hideButtonTooltip(srcElement:any){
            var $el = $(srcElement);
            if($el.is('i.fa')){
                $el = $el.parent('a.btn');
            }
            var tooltip:any = $el.data('bs.tooltip');
            if(tooltip){
                tooltip.hide();
            }
        }

        onCopyClick(e){
            this.hideButtonTooltip(e.srcElement);
            this.notify.create({
                text: 'Code has been copied to your clipboard',
                type: 'information'
            })
        }

        onOpenInWindowClick(e) {
            this.hideButtonTooltip(e.srcElement);
            var win:Window = util.openWindow({
                height: screen.height / 2,
                width: screen.width / 2
            });

            this.destroyScrollContent();
            var $body = $(this.$$.content).find('pre').clone();
            var $head = $('head').find('link').clone();
            win.document.body.innerHTML = cre().append($body).html();
            win.document.head.innerHTML = cre().append($head).html();
            win.document.body.style.margin = '0';
            win.document.body.getElementsByTagName('pre').item(0).style.margin = '0';
            win.document.body.getElementsByTagName('pre').item(0).style['padding-top'] = '0';
            this.initScrollContent();
        }


        onMinimizeToggleClick(e:any) {
            this.hideButtonTooltip(e.srcElement);
            this.destroyScrollContent();
            this.$data.minimized = ! this.$data.minimized;

            if (!this.$data.minimized) {
                this.initScrollContent();
            }
        }

        onDecreaseLinesClick(e) {
            this.hideButtonTooltip(e.srcElement);
            var targetLineCount:number = <number> this.$get('toManyLines') - <number> this.$get('lineChangeStep');
            if (targetLineCount > 0) {
                this.$set('toManyLines', targetLineCount);
                this.initScrollContent();
            }
        }

        onIncreaseLinesClick(e) {
            this.hideButtonTooltip(e.srcElement);
            this.$set('toManyLines', <number> this.$get('toManyLines') + <number> this.$get('lineChangeStep'));
            this.initScrollContent();
        }

        setCodeContent(code:string, fixIndent:boolean = false) {
            var $pre:JQuery = $(this.$$.pre);
            var $code:JQuery = $(this.$$.code);
            $code.ensureClass('language-' + this.language);

            this.original = code = code.trim();
            this.code = fixIndent ? util.codeIndentFix(util.codeIndentFix(code)) : code;
            this.lines = this.code.split('\n').length;

            $code.html('').append(this.code);
            Prism.highlightElement($code.get(0));
            this.initScrollContent();
        }

        initClipboard():void {
            if (defined(this.client)) {
                return;
            }
            getClipboard().then((Clipboard:typeof ZeroClipboard) => {
                this.client = new Clipboard($(this.$$.actions).find('a.btn#cb-copy'));
                this.client.on('ready', (event:any) => {
                    this.client.on('copy', (event:any) => {
                        var clipboard = event.clipboardData;
                        clipboard.setData('text/plain', this.code);
                        //console.log(event);
                    });

                    this.client.on('aftercopy', (event:any) => {
                        //debug.log('aftercopy', event.data);
                    });
                });
            });
        }

        getHeightBetweenLines(one:number, two:number):number {
            var isMinimized:boolean = this.$data.minimized;
            this.$data.minimized = false; // temporary disable minimize to get the right height
            var $lineRows = $(this.$$.content).find('.line-numbers-rows');
            var $first = $lineRows.children('span').first();
            var $last = $first.nextAll().slice(one, two).last();
            var height:number = $last.position().top - $first.position().top;
            this.$data.minimized = isMinimized;
            return height;
        }


        initScrollContent() {
            if (this.lines <= this.toManyLines) {
                return;
            }
            this.destroyScrollContent();
            var $pre = $(this.$$.pre);
            var height:number = this.getHeightBetweenLines(0, this.$get('toManyLines'));
            height = height < 20 ? 20 : height;

            var options:any = {
                setHeight: height,
                theme: 'minimal-dark',
                autoHideScrollbar: this.autoHideScrollbar === false,
                autoDraggerLength: false,
                axis:"yx" // vertical and horizontal scrollbar
            };
            debug.log('code-block mCustomScrollbar', options);
            $(this.$$.content).mCustomScrollbar(options);
            return;
            makeSlimScroll($pre, {
                height: height,
                allowPageScroll: true,
                size: '10px'
            });
        }

        destroyScrollContent() {
            $(this.$$.content).mCustomScrollbar("destroy");
        }
    }
}
