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
                this.previous = this.getFirst();
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
            QuickSidebarTabs.prototype.closeTabs = function () {
                this.find('.qs-content.active, .qs-tab.active').removeClass('active');
                return this;
            };
            QuickSidebarTabs.prototype.openTab = function (id) {
                var _this = this;
                id = id || this.getPrevious() || this.getFirst();
                var $tab = this.getTab(id);
                var $tabContent = this.getTabContent(id);
                if (this.switching) {
                    if (this.switchingTimeout = false) {
                        setTimeout(function () {
                            _this.openTab(id);
                            _this.switching = false;
                        }, this.qs.config('quickSidebar.transitionTime'));
                        this.switchingTimeout = true;
                    }
                    return;
                }
                this.closeTabs();
                $tab.ensureClass('active', true);
                $tabContent.ensureClass('active', true);
                var height = this.qs.getContentScrollHeight();
                this.$wrapper.jcarousel('scroll', $tab);
                this.switching = true;
                this.previous = this.active;
                this.active = id;
                setTimeout(function () {
                    packadic.plugins.makeSlimScroll($tabContent, { height: height, wheelStep: packadic.isTouchDevice() ? 60 : 20 });
                    if (_this.qs.mouseOverContent) {
                        $tabContent.trigger("mouseleave").trigger('mouseenter');
                    }
                    else {
                        $tabContent.trigger("mouseleave");
                    }
                    _this.switching = false;
                }, this.qs.config('quickSidebar.transitionTime'));
                return this;
            };
            QuickSidebarTabs.prototype.openPreviousTab = function () {
                this.openTab(this.getPrevious());
                return this;
            };
            QuickSidebarTabs.prototype.openNextTab = function () {
                this.getTab(this.getNext());
                return this;
            };
            QuickSidebarTabs.prototype.getActive = function () {
                return this.active;
            };
            QuickSidebarTabs.prototype.getPrevious = function () {
                var previous = this.getTab(this.getActive()).parent().prev('.qs-content:not(.active)').attr('id');
                if (!previous && this.hasTab(this.previous)) {
                    previous = this.previous;
                }
                else {
                    previous = this.getLast();
                }
                return previous;
            };
            QuickSidebarTabs.prototype.getNext = function () {
                var next = this.getTab(this.getActive()).parent().next('.qs-content:not(.active)').attr('id');
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
                return this.find('.qs-content #' + id).length > 0;
            };
            QuickSidebarTabs.prototype.getTab = function (id) {
                return this.find('.qs-tabs .qs-tab[data-target="#' + id + '"]');
            };
            QuickSidebarTabs.prototype.getTabContent = function (id) {
                return this.find('.qs-content #' + id);
            };
            return QuickSidebarTabs;
        })();
        components.QuickSidebarTabs = QuickSidebarTabs;
        var QuickSidebarComponent = (function (_super) {
            __extends(QuickSidebarComponent, _super);
            function QuickSidebarComponent() {
                _super.apply(this, arguments);
                this.switching = false;
                this.switchingTimeout = false;
                this.mouseOverContent = false;
            }
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
                    this.next();
                }
            };
            Object.defineProperty(QuickSidebarComponent.prototype, "layout", {
                get: function () {
                    return this.components.get('layout');
                },
                enumerable: true,
                configurable: true
            });
            QuickSidebarComponent.prototype.getContentScrollHeight = function () {
                return this.$e.outerHeight()
                    - this.$e.find('.qs-header').outerHeight()
                    - this.$e.find('.qs-tabs-wrapper').outerHeight()
                    - this.$e.find('.qs-seperator').outerHeight();
            };
            QuickSidebarComponent.prototype._initTabs = function () {
                var self = this;
                var $tabs = this.$e.find('.qs-tabs').first();
                var style = {
                    width: $tabs.parent().width(),
                    height: $tabs.innerHeight() - 1,
                    float: 'left'
                };
                this.$e.find('.qs-content').each(function () {
                    var tab = $('<div>')
                        .addClass('qs-tab')
                        .text($(this).attr('data-name'))
                        .attr('data-target', '#' + $(this).attr('id'));
                    tab.appendTo($tabs);
                });
                $tabs.parent().jcarousel({
                    list: '.qs-tabs',
                    items: '.qs-tab',
                    wrap: 'both'
                });
            };
            QuickSidebarComponent.prototype._initLayoutApiActions = function () {
                var _this = this;
                var self = this;
                var apiActions = {
                    'qs-toggle': function (target) {
                        (self.isClosed() && self.open(target)) || self.close();
                    },
                    'qs-open': function (target) {
                        console.log('qs-open', self, _this, target);
                        self.open(target);
                    },
                    'qs-close': function () {
                        self.close();
                    },
                    'qs-pin': function () {
                        self.pin();
                    },
                    'qs-unpin': function () {
                        self.unpin();
                    },
                    'qs-next': function () {
                        self.next();
                    },
                    'qs-prev': function () {
                        self.prev();
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
                    self.close();
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
                    self.refresh();
                };
                this.app
                    .on('resize', resizeHandler)
                    .on('footer:set-fixed', resizeHandler)
                    .on('header:set-fixed', resizeHandler);
            };
            QuickSidebarComponent.prototype.handleTabsMiddleResizing = function () {
                var layout = this.app['layout'];
                packadic.debug.log('xs breakpoint:', layout.getBreakpoint('sm'), 'viewport width', packadic.getViewPort().width);
                var $middle = this.$e.find('.qs-header .middle');
                var $tw = this.$e.find('.qs-tabs-wrapper');
                var $header = this.$e.find('.qs-header');
                if (packadic.getViewPort().width >= layout.getBreakpoint('sm') && packadic.getViewPort().width <= layout.getBreakpoint('md')) {
                    var width = $header.children().first().outerWidth();
                    width += $header.children().last().outerWidth();
                    width = $header.width() - width;
                    packadic.debug.log('width: ', width);
                    if ($tw.closest('.qs-header').length == 0) {
                        $tw.appendTo($middle);
                    }
                    $middle.css('width', width);
                }
                else {
                    var $tw = this.$e.find('.qs-tabs-wrapper');
                    if ($tw.closest('.qs-header').length > 0) {
                        this.$e.find('.qs-header').after($tw);
                    }
                    $middle.attr('style', '');
                }
            };
            QuickSidebarComponent.prototype.resetContent = function () {
                var active = this.getActive();
                if (active.length) {
                    packadic.plugins.destroySlimScroll(active.removeClass('active'));
                    this.$e.find('.slimScrollBar, .slimScrollRail').remove();
                }
                this.$e.find('.qs-content.active').removeClass('active');
            };
            QuickSidebarComponent.prototype.openTarget = function ($target) {
                var _this = this;
                if (this.switching) {
                    if (this.switchingTimeout = false) {
                        setTimeout(function () {
                            _this.openTarget($target);
                            _this.switching = false;
                        }, this.config('quickSidebar.transitionTime'));
                        this.switchingTimeout = true;
                    }
                    return;
                }
                var target = $target.attr('id');
                $target.ensureClass('active');
                var height = this.$e.outerHeight()
                    - this.$e.find('.qs-header').outerHeight()
                    - this.$e.find('.qs-tabs-wrapper').outerHeight()
                    - this.$e.find('.qs-seperator').outerHeight();
                this.$e.find('.qs-tabs .qs-tab').removeClass('active');
                var $tab = this.$e.find('.qs-tabs .qs-tab[data-target="#' + $target.attr('id') + '"]').addClass('active');
                var $tabsWrapper = this.$e.find('.qs-tabs-wrapper');
                $tabsWrapper.jcarousel('scroll', $tab);
                this.switching = true;
                this.previous = $target.attr('id');
                setTimeout(function () {
                    packadic.plugins.makeSlimScroll($target, { height: height, wheelStep: packadic.isTouchDevice() ? 60 : 20 });
                    if (_this.mouseOverContent) {
                        $target.trigger("mouseleave").trigger('mouseenter');
                    }
                    else {
                        $target.trigger("mouseleave");
                    }
                    _this.switching = false;
                }, this.config('quickSidebar.transitionTime'));
            };
            QuickSidebarComponent.prototype.open = function (target) {
                if (!this.exists()) {
                    return this;
                }
                if (!target || this.$e.find(target).length == 0) {
                    target = '#' + this.$e.find('.qs-content').first().attr('id');
                }
                this.handleTabsMiddleResizing();
                this.resetContent();
                $('body').ensureClass("qs-shown", true);
                this.openTarget(this.$e.find(target));
                return this;
            };
            QuickSidebarComponent.prototype.close = function () {
                if (!this.exists()) {
                    return;
                }
                if (this.isPinned()) {
                    this.unpin();
                }
                this.resetContent();
                $body.ensureClass("qs-shown", false);
                return this;
            };
            QuickSidebarComponent.prototype.next = function () {
                if (this.switching) {
                    return;
                }
                var $next = this.getActive().parent().next('.qs-content:not(.active)');
                if ($next.length == 0) {
                    $next = this.$e.find('.qs-content').first();
                }
                this.resetContent();
                this.openTarget($next);
                return this;
            };
            QuickSidebarComponent.prototype.prev = function () {
                if (this.switching) {
                    return;
                }
                this.resetContent();
                this.openTarget(this.getPrevious());
                return this;
            };
            QuickSidebarComponent.prototype.getPrevious = function () {
                var $prev;
                if (packadic.kindOf(this.previous) === 'string') {
                    $prev = this.$e.find('#' + this.previous);
                }
                else {
                    $prev = this.getActive().parent().prev('.qs-content:not(.active)');
                }
                if ($prev.length == 0) {
                    $prev = this.$e.find('.qs-content').last();
                }
                return $prev;
            };
            QuickSidebarComponent.prototype.refresh = function () {
                var self = this;
                console.log('qs refresh', arguments);
                self.handleTabsMiddleResizing();
                if (self.isClosed()) {
                    return;
                }
                var active = self.getActive();
                self.resetContent();
                self.openTarget(active);
                return this;
            };
            QuickSidebarComponent.prototype.pin = function () {
                $body.ensureClass('qs-pinned', true);
                return this;
            };
            QuickSidebarComponent.prototype.unpin = function () {
                $body.removeClass('qs-pinned');
                return this;
            };
            QuickSidebarComponent.prototype.isClosed = function () {
                return !$body.hasClass("qs-shown");
            };
            QuickSidebarComponent.prototype.exists = function () {
                return this.$e.length > 0;
            };
            QuickSidebarComponent.prototype.getActive = function () {
                return this.$e.find('.qs-content.active');
            };
            QuickSidebarComponent.prototype.isPinned = function () {
                return $body.hasClass('qs-pinned');
            };
            QuickSidebarComponent.dependencies = ['layout'];
            return QuickSidebarComponent;
        })(components.Component);
        components.QuickSidebarComponent = QuickSidebarComponent;
        components.Components.register('quick_sidebar', QuickSidebarComponent, defaultConfig);
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=quick_sidebar.js.map