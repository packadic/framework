/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var packadic;
(function (packadic) {
    var components;
    (function (components) {
        var CodeBlock = (function (_super) {
            __extends(CodeBlock, _super);
            function CodeBlock() {
                _super.apply(this, arguments);
                this.lines = 0;
                this.original = '';
                this.code = '';
                this.actionBtnClass = 'btn btn-sm blue-grey-light';
                this.show = false;
            }
            Object.defineProperty(CodeBlock.prototype, "actions", {
                get: function () {
                    return [
                        { title: 'Copy to clipboard', icon: 'fa-copy', onClick: this.onCopyClick }
                    ];
                },
                enumerable: true,
                configurable: true
            });
            CodeBlock.prototype.onCopyClick = function (e) {
                console.log('onCopyClick', e.target.tagName, e);
            };
            CodeBlock.prototype.compiled = function () {
                console.log('compiled');
                this.initClipboard();
            };
            CodeBlock.prototype.initClipboard = function () {
                var _this = this;
                if (packadic.defined(this.client)) {
                    return;
                }
                packadic.getClipboard().then(function (Clipboard) {
                    _this.client = new Clipboard($(_this.$el).find('a.btn'));
                    _this.client.on('ready', function (event) {
                        _this.client.on('copy', function (event) {
                            var clipboard = event.clipboardData;
                            clipboard.setData('text/plain', _this.code);
                            console.log(event);
                        });
                        _this.client.on('aftercopy', function (event) {
                            packadic.debug.log('aftercopy', event.data);
                        });
                    });
                });
            };
            CodeBlock.prototype._init = function () {
                console.log('EventHook init code-block', this, arguments);
            };
            CodeBlock.prototype.ready = function () {
                var _this = this;
                packadic.app.loadCSS('prism/themes/' + this.theme, true);
                packadic.app.loadJS('prism/prism', true).then(function () {
                    var defer = packadic.util.promise.create();
                    async.parallel([
                        function (d) { packadic.app.loadJS('prism/components/prism-' + _this.language, true).then(d); },
                        function (d) { packadic.app.loadJS('prism/plugins/line-numbers/prism-line-numbers', true).then(d); },
                        function (d) { packadic.app.loadCSS('prism/plugins/line-numbers/prism-line-numbers', true).then(d); },
                        function (d) { packadic.app.loadJS('prism/plugins/remove-initial-line-feed/prism-remove-initial-line-feed', true).then(d); }
                    ], function (err) {
                        defer.resolve();
                    });
                    return defer.promise;
                }).then(function () {
                    var $pre = $(_this.$el).find('pre');
                    var $code = $(_this.$el).find('code');
                    $code.ensureClass('language-' + _this.language);
                    _this.original = $code.text();
                    _this.code = packadic.util.codeIndentFix(packadic.util.codeIndentFix(_this.original));
                    _this.lines = _this.code.split('\n').length;
                    $code.html('').append(_this.code);
                    Prism.highlightElement($code.get(0));
                }).then(function () {
                    _this.show = true;
                });
            };
            CodeBlock.prototype.attached = function () {
                console.log('attached');
                $(this.$el).find('a.btn');
            };
            CodeBlock.prototype.detached = function () {
                console.log('detached');
            };
            CodeBlock.prototype.beforeDestroy = function () {
                this.show = false;
            };
            CodeBlock.template = packadic.getTemplate('code-block')({});
            CodeBlock.replace = true;
            __decorate([
                packadic.vue.prop({ type: String, required: false, 'default': '' })
            ], CodeBlock.prototype, "language");
            __decorate([
                packadic.vue.prop({ type: String, required: false, 'default': '' })
            ], CodeBlock.prototype, "title");
            __decorate([
                packadic.vue.prop({ type: String, required: false, 'default': '' })
            ], CodeBlock.prototype, "description");
            __decorate([
                packadic.vue.prop({ type: Boolean, required: false, 'default': true })
            ], CodeBlock.prototype, "showTop");
            __decorate([
                packadic.vue.prop({ type: String, required: false, 'default': 'prism' })
            ], CodeBlock.prototype, "theme");
            Object.defineProperty(CodeBlock.prototype, "compiled",
                __decorate([
                    packadic.vue.lifecycleHook('compiled')
                ], CodeBlock.prototype, "compiled", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "compiled")));
            Object.defineProperty(CodeBlock.prototype, "_init",
                __decorate([
                    packadic.EventHook('init')
                ], CodeBlock.prototype, "_init", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "_init")));
            Object.defineProperty(CodeBlock.prototype, "ready",
                __decorate([
                    packadic.vue.lifecycleHook('ready')
                ], CodeBlock.prototype, "ready", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "ready")));
            Object.defineProperty(CodeBlock.prototype, "attached",
                __decorate([
                    packadic.vue.lifecycleHook('attached')
                ], CodeBlock.prototype, "attached", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "attached")));
            Object.defineProperty(CodeBlock.prototype, "detached",
                __decorate([
                    packadic.vue.lifecycleHook('detached')
                ], CodeBlock.prototype, "detached", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "detached")));
            Object.defineProperty(CodeBlock.prototype, "beforeDestroy",
                __decorate([
                    packadic.vue.lifecycleHook('beforeDestroy')
                ], CodeBlock.prototype, "beforeDestroy", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "beforeDestroy")));
            CodeBlock = __decorate([
                packadic.vue.createComponent('code-block')
            ], CodeBlock);
            return CodeBlock;
        })(packadic.vue.VueComponent);
        components.CodeBlock = CodeBlock;
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=code-block.js.map