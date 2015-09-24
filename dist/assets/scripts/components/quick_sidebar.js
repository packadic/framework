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
            transitionTime: 500
        };
        var $body = $('body');
        var QuickSidebarTabs = (function () {
            function QuickSidebarTabs(qs) {
                this.switching = false;
                this.switchingTimeout = false;
                var self = this;
                this.qs = qs;
                this.active = this.getFirst();
                this.previous = this.getLast();
                var style = {
                    width: this.$tabs.parent().width(),
                    height: this.$tabs.innerHeight() - 1,
                    float: 'left'
                };
                this.$content.each(function () {
                    var tab = $('<div>')
                        .addClass('qs-tab')
                        .text($(this).attr('data-name'))
                        .attr('data-target', '#' + $(this).attr('id'));
                    tab.appendTo(self.$tabs);
                });
                this.$wrapper.jcarousel({
                    list: '.qs-tabs',
                    items: '.qs-tab',
                    wrap: 'both'
                });
                $body.onClick('.quick-sidebar .qs-tab', function (e) {
                    self.openTab($(this).attr('data-target'));
                });
            }
            QuickSidebarTabs.prototype.find = function (find) {
                return this.qs.find(find);
            };
            Object.defineProperty(QuickSidebarTabs.prototype, "$wrapper", {
                get: function () {
                    return this.find('.qs-tabs-wrapper');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuickSidebarTabs.prototype, "$tabs", {
                get: function () {
                    return this.find('.qs-tabs');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuickSidebarTabs.prototype, "$content", {
                get: function () {
                    return this.find('.qs-content');
                },
                enumerable: true,
                configurable: true
            });
            QuickSidebarTabs.prototype.handleTabsMiddleResizing = function () {
                packadic.debug.log('xs breakpoint:', this.qs.layout.getBreakpoint('sm'), 'viewport width', packadic.getViewPort().width);
                var $middle = this.find('.qs-header .middle');
                var $header = this.find('.qs-header');
                if (packadic.getViewPort().width >= this.qs.layout.getBreakpoint('sm') && packadic.getViewPort().width <= this.qs.layout.getBreakpoint('md')) {
                    var width = $header.children().first().outerWidth();
                    width += $header.children().last().outerWidth();
                    width = $header.width() - width;
                    packadic.debug.log('width: ', width);
                    if (this.$wrapper.closest('.qs-header').length == 0) {
                        this.$wrapper.appendTo($middle);
                    }
                    $middle.css('width', width);
                }
                else {
                    if (this.$wrapper.closest('.qs-header').length > 0) {
                        this.find('.qs-header').after(this.$wrapper);
                    }
                    $middle.attr('style', '');
                }
                return this;
            };
            QuickSidebarTabs.prototype.refresh = function () {
                this.handleTabsMiddleResizing()
                    .destroyContentScroll()
                    .initContentScroll();
            };
            QuickSidebarTabs.prototype.getContentScrollHeight = function () {
                return this.qs.$e.outerHeight()
                    - this.find('.qs-header').outerHeight()
                    - this.find('.qs-tabs-wrapper').outerHeight()
                    - this.find('.qs-seperator').outerHeight();
            };
            QuickSidebarTabs.prototype.initContentScroll = function ($content) {
                $content = packadic.defined($content) ? $($content) : this.getTabContent(this.getActive());
                this.destroyContentScroll($content);
                packadic.plugins.makeSlimScroll($content, {
                    height: this.getContentScrollHeight(),
                    wheelStep: packadic.isTouchDevice() ? 60 : 20
                });
                if (this.qs.mouseOverContent) {
                    this.$content.trigger("mouseleave").trigger('mouseenter');
                }
                else {
                    this.$content.trigger("mouseleave");
                }
                return this;
            };
            QuickSidebarTabs.prototype.destroyContentScroll = function ($content) {
                $content = packadic.defined($content) ? $($content) : this.getTabContent(this.getActive());
                packadic.plugins.destroySlimScroll($content);
                this.find('.slimScrollBar, .slimScrollRail').remove();
                return this;
            };
            QuickSidebarTabs.prototype.closeTabs = function () {
                this.find('.qs-tab.active').removeClass('active');
                var $activeTabContent = this.find('.qs-content.active').removeClass('active');
                if ($activeTabContent.length) {
                    packadic.plugins.destroySlimScroll($activeTabContent);
                    this.find('.slimScrollBar, .slimScrollRail').remove();
                }
                return this;
            };
            QuickSidebarTabs.prototype.openTab = function (id) {
                var _this = this;
                id = packadic.defined(id) ? packadic.util.str.lstrip(id, '#') : this.getFirst();
                var $tab = this.getTabNav(id);
                var $tabContent = this.getTabContent(id);
                if (this.switching) {
                    if (this.switchingTimeout = false) {
                        setTimeout(function () {
                            _this.openTab(id);
                            _this.switching = false;
                        }, this.qs.config('quick_sidebar.transitionTime'));
                        this.switchingTimeout = true;
                    }
                    return;
                }
                this.closeTabs();
                $tab.ensureClass('active', true);
                $tabContent.ensureClass('active', true);
                this.$wrapper.jcarousel('scroll', $tab);
                if (id !== this.active) {
                    this.previous = this.active;
                    this.active = id;
                }
                this.switching = true;
                setTimeout(function () {
                    _this.initContentScroll($tabContent);
                    _this.switching = false;
                }, this.qs.config('quick_sidebar.transitionTime'));
                return this;
            };
            QuickSidebarTabs.prototype.openPreviousTab = function () {
                this.openTab(this.getPrevious());
                return this;
            };
            QuickSidebarTabs.prototype.openNextTab = function () {
                this.openTab(this.getNext());
                return this;
            };
            QuickSidebarTabs.prototype.getActive = function () {
                return this.active;
            };
            QuickSidebarTabs.prototype.getPrevious = function () {
                var previous = this.getTabContent(this.getActive()).parent().prev('.qs-content:not(.active)').attr('id');
                if (!previous && this.hasTab(this.previous)) {
                    previous = this.previous;
                }
                else if (!previous) {
                    previous = this.getLast();
                }
                return previous;
            };
            QuickSidebarTabs.prototype.getNext = function () {
                var next = this.getTabContent(this.getActive()).parent().next('.qs-content:not(.active)').attr('id');
                if (!this.hasTab(next)) {
                    next = this.getFirst();
                }
                return next;
            };
            QuickSidebarTabs.prototype.getFirst = function () {
                return this.find('.qs-content').first().attr('id');
            };
            QuickSidebarTabs.prototype.getLast = function () {
                return this.find('.qs-content').last().attr('id');
            };
            QuickSidebarTabs.prototype.hasTab = function (id) {
                return this.find('.qs-content#' + id).length > 0;
            };
            QuickSidebarTabs.prototype.getTabNav = function (id) {
                return this.find('.qs-tabs .qs-tab[data-target="#' + id + '"]').first();
            };
            QuickSidebarTabs.prototype.getTabContent = function (id) {
                return this.find('.qs-content#' + id).first();
            };
            return QuickSidebarTabs;
        })();
        components.QuickSidebarTabs = QuickSidebarTabs;
        var QuickSidebarComponent = (function (_super) {
            __extends(QuickSidebarComponent, _super);
            function QuickSidebarComponent() {
                _super.apply(this, arguments);
                this.mouseOverContent = false;
            }
            QuickSidebarComponent.prototype.init = function () {
                this.app.debug.log('QuickSidebarComponent init');
                this.app.on('booted', function () {
                    packadic.debug.log('QuickSidebarComponent received event emitted from app: booted');
                });
            };
            QuickSidebarComponent.prototype.boot = function () {
                packadic.debug.log('QuickSidebarComponent debug');
                if (!this.exists()) {
                    return;
                }
                var ttOpts = _.merge(this.config('vendor.bootstrap.tooltip'), {
                    placement: 'left',
                    offset: '30px -40px',
                    trigger: 'hover focus',
                    selector: false
                });
                if (!packadic.isTouchDevice()) {
                    this.$e.find('.qs-header .btn[data-quick-sidebar]').tooltip(ttOpts);
                }
                this.tabs = new QuickSidebarTabs(this);
                this._initBindings();
                this._initResizeHandler();
                this._initLayoutApiActions();
                if (!this.isClosed()) {
                    this.openNextTab();
                }
            };
            Object.defineProperty(QuickSidebarComponent.prototype, "layout", {
                get: function () {
                    return this.components.get('layout');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuickSidebarComponent.prototype, "$e", {
                get: function () {
                    return $('.quick-sidebar');
                },
                enumerable: true,
                configurable: true
            });
            QuickSidebarComponent.prototype.find = function (find) {
                return this.$e.find(find);
            };
            QuickSidebarComponent.prototype._initLayoutApiActions = function () {
                var self = this;
                var apiActions = {
                    'qs-toggle': function (target) {
                        (self.isClosed() && self.show().openTab(target)) || self.hide();
                    },
                    'qs-open': function (target) {
                        self.openTab(target);
                    },
                    'qs-close': function () {
                        self.hide();
                    },
                    'qs-togglepin': function () {
                        !self.isPinned() && self.pin() || self.unpin();
                    },
                    'qs-pin': function () {
                        self.pin();
                    },
                    'qs-unpin': function () {
                        self.unpin();
                    },
                    'qs-next': function () {
                        self.openNextTab();
                    },
                    'qs-prev': function () {
                        self.openPreviousTab();
                    }
                };
                self.layout.setApiActions(apiActions);
            };
            QuickSidebarComponent.prototype._initBindings = function () {
                var _this = this;
                var self = this;
                $body.onClick('.quick-sidebar .qs-header button', function (e) {
                    var $this = $(this);
                    $this.blur();
                });
                $(document).onClick('.qs-shown', function (e) {
                    if ($(e.target).closest('.quick-sidebar').length > 0) {
                        return;
                    }
                    if (self.isPinned()) {
                        return;
                    }
                    self.hide();
                });
                $body.on('mouseenter', '.quick-sidebar .qs-content', function (e) {
                    _this.mouseOverContent = true;
                }).on('mouseleave', '.quick-sidebar .qs-content', function (e) {
                    _this.mouseOverContent = false;
                });
            };
            QuickSidebarComponent.prototype._initResizeHandler = function () {
                var self = this;
                var resizeHandler = function () {
                    if (self.isClosed()) {
                        return;
                    }
                    self.refresh();
                };
                this.app
                    .on('resize', resizeHandler)
                    .on('layout:footer:fixed', resizeHandler)
                    .on('layout:header:fixed', resizeHandler)
                    .on('layout:page:fixed', resizeHandler)
                    .on('layout:page:boxed', resizeHandler);
            };
            QuickSidebarComponent.prototype.refresh = function () {
                if (this.isClosed()) {
                    return;
                }
                this.tabs.refresh();
                this._emit('refresh');
                return this;
            };
            QuickSidebarComponent.prototype._emit = function (name) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this.app.emit('qs:' + name, [this].concat(args));
            };
            QuickSidebarComponent.prototype.show = function () {
                if (!this.exists()) {
                    return this;
                }
                $('body').ensureClass("qs-shown", true);
                this._emit('show');
                return this;
            };
            QuickSidebarComponent.prototype.hide = function () {
                if (!this.exists()) {
                    return;
                }
                if (this.isPinned()) {
                    this.unpin();
                }
                $body.ensureClass("qs-shown", false);
                this._emit('hide');
                return this;
            };
            QuickSidebarComponent.prototype.isClosed = function () {
                return !$body.hasClass("qs-shown");
            };
            QuickSidebarComponent.prototype.openTab = function (id) {
                this.tabs.openTab(id);
                this._emit('open');
                return this;
            };
            QuickSidebarComponent.prototype.openNextTab = function () {
                this.tabs.openNextTab();
                this._emit('next');
                return this;
            };
            QuickSidebarComponent.prototype.openPreviousTab = function () {
                this.tabs.openPreviousTab();
                this._emit('prev');
                return this;
            };
            QuickSidebarComponent.prototype.pin = function () {
                $body.ensureClass('qs-pinned', true);
                this._emit('pin');
                return this;
            };
            QuickSidebarComponent.prototype.unpin = function () {
                $body.removeClass('qs-pinned');
                this._emit('unpin');
                return this;
            };
            QuickSidebarComponent.prototype.isPinned = function () {
                return $body.hasClass('qs-pinned');
            };
            QuickSidebarComponent.prototype.exists = function () {
                return this.$e.length > 0;
            };
            QuickSidebarComponent.dependencies = ['layout'];
            return QuickSidebarComponent;
        })(components.Component);
        components.QuickSidebarComponent = QuickSidebarComponent;
        components.Components.register('quick_sidebar', QuickSidebarComponent, defaultConfig);
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
