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
            }
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
                    $code.attr('data-original', $code.text());
                    $code.attr('data-original-fixed', packadic.util.codeIndentFix(packadic.util.codeIndentFix($code.text())));
                    $code.html('').append($code.data('original-fixed'));
                    Prism.highlightElement($code.get(0));
                    $code.css({});
                });
            };
            CodeBlock.template = packadic.getTemplate('code-block')({});
            CodeBlock.replace = true;
            __decorate([
                packadic.vue.prop({ type: String, required: false, 'default': '' })
            ], CodeBlock.prototype, "language");
            __decorate([
                packadic.vue.prop({ type: String, required: false, 'default': 'prism' })
            ], CodeBlock.prototype, "theme");
            Object.defineProperty(CodeBlock.prototype, "ready",
                __decorate([
                    packadic.vue.lifecycleHook('ready')
                ], CodeBlock.prototype, "ready", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "ready")));
            CodeBlock = __decorate([
                packadic.vue.createComponent('code-block')
            ], CodeBlock);
            return CodeBlock;
        })(packadic.vue.VueComponent);
        components.CodeBlock = CodeBlock;
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=code-block.js.map