var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
                layout: ['header-fixed', 'footer-fixed'],
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
                packadic.debug.log('PresetsComponent debug');
                $body.onClick('[data-preset]', function (e) {
                    var $this = $(this);
                    var preset = $this.attr('data-preset');
                    var presetConfig = self.config('presets.' + preset);
                });
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
            PresetsComponent.prototype.applyPreset = function (name) {
                var _this = this;
                var presetsConfig = this.config('presets.' + name);
                Object.keys(presetsConfig).forEach(function (presetType) {
                    _this.applyPresetType(presetType, presetsConfig[presetType]);
                });
            };
            PresetsComponent.prototype.applyPresetType = function (name, config) {
                this.layout.reset();
                switch (name) {
                    case 'theme':
                        this.layout.setTheme(config);
                        break;
                    case 'layout':
                        this.layout.setTheme(config);
                        break;
                }
            };
            PresetsComponent.prototype.presetDarkCondensed = function () {
                this.layout.setTheme('dark-sidebar');
            };
            PresetsComponent.dependencies = ['layout', 'quick_sidebar'];
            return PresetsComponent;
        })(components.Component);
        components.PresetsComponent = PresetsComponent;
        components.Components.register('presets', PresetsComponent, defaultConfig);
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=presets.js.map