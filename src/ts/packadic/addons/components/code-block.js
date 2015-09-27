/// <reference path="./../../types.d.ts" />
/// <reference path="./../../packadic.d.ts" />
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
    var addons;
    (function (addons) {
        var components;
        (function (components) {
            var CodeBlock = (function (_super) {
                __extends(CodeBlock, _super);
                function CodeBlock() {
                    _super.apply(this, arguments);
                    this.language = '';
                    this.title = '';
                    this.description = '';
                    this.showTop = true;
                    this.theme = 'prism';
                    this.toManyLines = 30;
                    this.lineChangeStep = 10;
                    this.show = false;
                    this.minimized = false;
                    this.lines = 0;
                    this.original = '';
                    this.code = '';
                    this.actionBtnClass = 'btn btn-sm blue-grey-light';
                    this.isReady = false;
                }
                Object.defineProperty(CodeBlock.prototype, "actions", {
                    get: function () {
                        return [
                            { title: 'Copy to clipboard', icon: 'fa-copy', onClick: this.onCopyClick },
                            { title: 'Show more lines', icon: 'fa-plus', onClick: this.onIncreaseLinesClick },
                            { title: 'Show less lines', icon: 'fa-minus', onClick: this.onDecreaseLinesClick },
                            { title: 'Minimize/maximize', icon: 'fa-plus', onClick: this.onMinimizeToggleClick }
                        ];
                    },
                    enumerable: true,
                    configurable: true
                });
                CodeBlock.prototype.onMinimizeToggleClick = function (e) {
                    if (this.$get('minimized')) {
                        this.$set('minimized', false);
                        this.initScrollContent();
                    }
                    else {
                        this.$set('minimized', true);
                        this.destroyScrollContent();
                    }
                };
                CodeBlock.prototype.onDecreaseLinesClick = function (e) {
                    if (this.$get('toManyLines') + 5 >= this.$get('lineChangeStep')) {
                        this.$set('toManyLines', this.$get('toManyLines') - this.$get('lineChangeStep'));
                        this.initScrollContent();
                    }
                };
                CodeBlock.prototype.onIncreaseLinesClick = function (e) {
                    this.$set('toManyLines', this.$get('toManyLines') + this.$get('lineChangeStep'));
                    this.initScrollContent();
                };
                CodeBlock.prototype.onCopyClick = function (e) {
                    console.log('onCopyClick', e.target.tagName, e);
                };
                CodeBlock.prototype.created = function () {
                    this.initClipboard();
                };
                CodeBlock.prototype.ready = function () {
                    var _this = this;
                    if (this.isReady) {
                        return;
                    }
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
                        _this.initScrollContent();
                    }).then(function () {
                        _this.show = true;
                        _this.isReady = true;
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
                CodeBlock.prototype.getHeightBetweenLines = function (one, two) {
                    var $lineRows = $(this.$el).find('.line-numbers-rows');
                    var $first = $lineRows.children('span').first();
                    var $last = $first.nextAll().slice(one, two).last();
                    console.log($lineRows, $first, $last);
                    return $last.position().top - $first.position().top;
                };
                CodeBlock.prototype.initScrollContent = function () {
                    if (this.lines <= this.toManyLines) {
                        return;
                    }
                    this.destroyScrollContent();
                    var $el = $(this.$el).find('code.code-block-code');
                    addons.plugins.makeSlimScroll($el.parent(), {
                        height: this.getHeightBetweenLines(0, this.toManyLines),
                        allowPageScroll: true
                    });
                };
                CodeBlock.prototype.destroyScrollContent = function () {
                    var $el = $(this.$el).find('code.code-block-code');
                    addons.plugins.destroySlimScroll($el);
                    $(this.$el).find('.slimScrollBar, .slimScrollRail').remove();
                };
                CodeBlock.template = packadic.getTemplate('code-block')({});
                CodeBlock.replace = true;
                Object.defineProperty(CodeBlock.prototype, "created",
                    __decorate([
                        packadic.vue.lifecycleHook('created')
                    ], CodeBlock.prototype, "created", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "created")));
                Object.defineProperty(CodeBlock.prototype, "ready",
                    __decorate([
                        packadic.vue.lifecycleHook('ready')
                    ], CodeBlock.prototype, "ready", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "ready")));
                Object.defineProperty(CodeBlock.prototype, "attached",
                    __decorate([
                        components.lifecycleHook('attached')
                    ], CodeBlock.prototype, "attached", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "attached")));
                Object.defineProperty(CodeBlock.prototype, "detached",
                    __decorate([
                        components.lifecycleHook('detached')
                    ], CodeBlock.prototype, "detached", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "detached")));
                Object.defineProperty(CodeBlock.prototype, "beforeDestroy",
                    __decorate([
                        components.lifecycleHook('beforeDestroy')
                    ], CodeBlock.prototype, "beforeDestroy", Object.getOwnPropertyDescriptor(CodeBlock.prototype, "beforeDestroy")));
                CodeBlock = __decorate([
                    components.createComponent('code-block')
                ], CodeBlock);
                return CodeBlock;
            })(components.Component);
            components.CodeBlock = CodeBlock;
        })(components = addons.components || (addons.components = {}));
    })(addons = packadic.addons || (packadic.addons = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=code-block.js.map