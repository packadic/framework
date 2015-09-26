/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />

module packadic.components {


    @vue.createComponent('code-block')
    export class CodeBlock extends vue.VueComponent {
        static template:string = getTemplate('code-block')({});
        static replace:boolean = true;

        @vue.prop({type: String, required: false, 'default': ''})language:string;
        @vue.prop({type: String, required: false, 'default': 'prism'})theme:string;

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
                $code.attr('data-original', $code.text());
                $code.attr('data-original-fixed', util.codeIndentFix(util.codeIndentFix($code.text())));
                $code.html('').append($code.data('original-fixed'));
                Prism.highlightElement($code.get(0));

                $code.css({ // fix, cannot be done in scss
                  //  overflow: 'initial'
                });
            });
            /*
             app.loadCSS('highlightjs/styles/' + this.theme, true);
             app.loadJS('highlightjs/highlight.pack.min', true).then(() => {
             var hljs:HighlightJS = <HighlightJS> window[this.hljs];
             var $code:JQuery = $(this.$el).find('.code-block-code');
             var code:string = $code.text();
             console.log('config tabs', code.split('\n'));
             var highlighted:any;
             console.log('code init', code, hljs.listLanguages().indexOf(this.language.toLowerCase()));
             if(hljs.listLanguages().indexOf(this.language) !== -1){
             highlighted = hljs.highlight(this.language.toLowerCase(), code);
             } else {
             highlighted = hljs.highlightAuto(code);
             }
             console.log('code rendered', highlighted);
             $code.html(highlighted.value).ensureClass('hljs');
             });
             */


            //var editorId = getRandomId();
            //var $editor:JQuery = $(this.$el).find('.code-block-editor').attr('id', editorId);
            //var editor:CodeMirror.EditorFromTextArea;
            //console.log('this.$options.mode', this.mode);
            //CMLoader.createEditor(editorId, {
            //    mode: this.mode
            //}).then(function (_editor:CodeMirror.EditorFromTextArea) {
            //    editor = _editor
            //
            //    console.log('ready CodeBlock', this, editor)
            //});
            // Create one instance of ACE, and use the VirtualRenderer API to attach a new renderer to the 'editor2' div,
            // then use the Editor, EditSession, & Document APIs to finish the task.

        }


        // the @lifecycleHook decorator supports the following hooks:
        // created, beforeCompile, compiled, ready, attached, detached, beforeDestroy, destroyed
        //@vue.lifecycleHook('compiled')
        //compiled():void { }

        // the @eventHook decorator registers the decorated method as event listener
        //@vue.eventHook('listen.to.event')
        //eventListenToEvent():boolean {}

    }
}
