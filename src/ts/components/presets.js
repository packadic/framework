var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
var packadic;
(function (packadic) {
    var components;
    (function (components) {
        var defaultConfig = {
            'default': {
                layout: ['header-fixed', 'footer-fixed'],
                theme: 'default'
            },
            'condensed-dark': {
                layout: ['header-fixed', 'footer-fixed', 'page-edged', 'condensed-sidebar'],
                theme: 'dark-sidebar'
            }
        };
        var $body = $('body');
        var PresetsComponent = (function (_super) {
            __extends(PresetsComponent, _super);
            function PresetsComponent() {
                _super.apply(this, arguments);
            }
            PresetsComponent.prototype.init = function () {
                this.app.debug.log('PresetsComponent init');
                this.app.on('booted', function () {
                    packadic.debug.log('PresetsComponent received event emitted from app: booted');
                });
            };
            PresetsComponent.prototype.boot = function () {
                var self = this;
                this._initLayoutApiActions();
            };
            PresetsComponent.prototype._initLayoutApiActions = function () {
                var _this = this;
                var self = this;
                var apiActions = {
                    'preset': function (presetName) {
                        console.log('preset', presetName, _this, self);
                        self.set(presetName);
                    }
                };
                self.layout.setApiActions(apiActions);
            };
            Object.defineProperty(PresetsComponent.prototype, "layout", {
                get: function () {
                    return this.components.get('layout');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PresetsComponent.prototype, "quick_sidebar", {
                get: function () {
                    return this.components.get('quick_sidebar');
                },
                enumerable: true,
                configurable: true
            });
            PresetsComponent.prototype.set = function (name) {
                var _this = this;
                var presetsConfig = this.config('presets.' + name);
                Object.keys(presetsConfig).forEach(function (presetType) {
                    _this.applyPresetType(presetType, presetsConfig[presetType]);
                });
            };
            PresetsComponent.prototype.applyPresetType = function (name, config) {
                var _this = this;
                var self = this;
                switch (name) {
                    case 'theme':
                        this.layout.setTheme(config);
                        this.app.emit('layout:preset:theme', config);
                        break;
                    case 'layout':
                        this.layout.reset();
                        if (packadic.kindOf(config) === 'string') {
                            config = [config];
                        }
                        config.forEach(function (actionName) {
                            self.layout.api(actionName);
                        });
                        this.app.emit('layout:preset:layout', config);
                        break;
                }
                this.app.on('resize', function () { console.log('apply preset refresh', _this); _this.quick_sidebar.refresh(); });
            };
            PresetsComponent.dependencies = ['layout', 'quick_sidebar'];
            return PresetsComponent;
        })(components.Component);
        components.PresetsComponent = PresetsComponent;
        components.Components.register('presets', PresetsComponent, defaultConfig);
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=presets.js.map