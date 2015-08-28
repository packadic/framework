var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../types.d.ts" />
var $ = require('jquery');
var plugins = require('app/plugins');
var async = require('async');
var SidebarPlugin = (function (_super) {
    __extends(SidebarPlugin, _super);
    function SidebarPlugin() {
        _super.apply(this, arguments);
        this.openCloseInProgress = false;
        this.closing = false;
    }
    SidebarPlugin.prototype._calculateViewportHeight = function () {
        return this.packadic.layout.calculateViewportHeight();
    };
    SidebarPlugin.prototype._create = function () {
        console.log('Creating new sidevar');
        console.log(this.$element.data());
        var self = this;
        self.$parent = self.$element.parent();
        self._initFixed();
        self._initMain();
        self._initToggleButton();
        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
        self.$document.on('click', '.page-header-fixed-mobile .responsive-toggler', function () {
            self.packadic.scrollTop();
        });
    };
    SidebarPlugin.prototype._initFixed = function () {
        this.packadic.destroySlimScroll(this.$element);
        this.$element.parent().find('.slimScrollDiv, .slimScrollBar, .slimScrollRail').remove();
        if (!this.isFixed()) {
            return;
        }
        if (this.packadic.getViewPort().width >= this.packadic.getBreakpoint('md')) {
            this.$element.attr("data-height", this._calculateViewportHeight());
            this.packadic.makeSlimScroll(this.$element);
            $('.page-content').css('min-height', this._calculateViewportHeight() + 'px');
        }
    };
    SidebarPlugin.prototype._initMain = function () {
        var self = this;
        self._on('click', 'li > a', function (e) {
            var $this = $(this);
            if (self.packadic.getViewPort().width >= self.packadic.getBreakpoint('md') && $this.parents('.page-sidebar-menu-hover-submenu').size() === 1) {
                return;
            }
            if ($this.next().hasClass('sub-menu') === false) {
                if (self.packadic.getViewPort().width < self.packadic.getBreakpoint('md') && self.$element.hasClass("in")) {
                    $('.page-header .responsive-toggler').click();
                }
                return;
            }
            if ($this.next().hasClass('sub-menu always-open')) {
                return;
            }
            var $parent = $this.parent().parent();
            var $this = $this;
            var $sub = $this.next();
            if (self.options.keepExpand !== true) {
                $parent.children('li.open').children('a').children('.arrow').removeClass('open');
                $parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(self.options.slideSpeed);
                $parent.children('li.open').removeClass('open');
            }
            var slideOffeset = -200;
            if ($sub.is(":visible")) {
                $this.find('.arrow').removeClass("open");
                $this.parent().removeClass("open");
                $sub.slideUp(self.options.slideSpeed, function () {
                    if (self.options.autoScroll === true && self.isClosed() === false) {
                        if (self.$body.hasClass('page-sidebar-fixed')) {
                            self.$parent.slimScroll({
                                'scrollTo': ($this.position()).top
                            });
                        }
                        else {
                            self.packadic.scrollTo($this, slideOffeset);
                        }
                    }
                });
            }
            else {
                $this.find('.arrow').addClass("open");
                $this.parent().addClass("open");
                $sub.slideDown(self.options.slideSpeed, function () {
                    if (self.options.autoScroll === true && self.isClosed() === false) {
                        if (self.isFixed()) {
                            self.$parent.slimScroll({
                                'scrollTo': ($this.position()).top
                            });
                        }
                        else {
                            self.packadic.scrollTo($this, slideOffeset);
                        }
                    }
                });
            }
            e.preventDefault();
        });
    };
    SidebarPlugin.prototype._initToggleButton = function () {
        var self = this;
        self.$body.on('click', self.options.togglerSelector, function (e) {
            if (self.isClosed()) {
                self.open();
            }
            else {
                self.close();
            }
        });
        self._initFixedHovered();
    };
    SidebarPlugin.prototype._initFixedHovered = function () {
        var self = this;
        if (self.isFixed()) {
            self._on('mouseenter', function () {
                if (this.isClosed()) {
                    this.$parent.removeClass('page-sidebar-menu-closed');
                }
            })._on('mouseleave', function () {
                if (this.isClosed()) {
                    this.$parent.addClass('page-sidebar-menu-closed');
                }
            });
        }
    };
    SidebarPlugin.prototype._setClosed = function (closed) {
        if (closed === void 0) { closed = true; }
        this.$body.ensureClass("page-sidebar-closed", closed);
        this.$element.ensureClass("page-sidebar-menu-closed", closed);
        if (this.isClosed() && this.isFixed()) {
            this._trigger("mouseleave");
        }
        this.$window.trigger('resize');
    };
    SidebarPlugin.prototype.closeSubmenus = function () {
        var self = this;
        self.$element.find('ul.sub-menu').each(function () {
            var $ul = $(this);
            if ($ul.is(":visible")) {
                $('.arrow', $ul).removeClass("open");
                $ul.parent().removeClass("open");
                $ul.slideUp(self.options.slideSpeed);
            }
        });
    };
    SidebarPlugin.prototype.close = function (callback) {
        var self = this;
        var $main = $('main');
        if (self.openCloseInProgress || self.isClosed()) {
            return;
        }
        self.openCloseInProgress = true;
        self.closing = true;
        var defer = $.Deferred();
        self.closeSubmenus();
        //self.$body.addClass('sidebar-nav-closing');
        var $title = self.$element.find('li a span.title, li a span.arrow');
        var $content = self.packadic.el('content');
        async.parallel([
            function (cb) {
                $content.animate({
                    'margin-left': self.options.closedWidth
                }, self.options.openCloseDuration, function () {
                    console.log('closed $main');
                    cb();
                });
            },
            function (cb) {
                self.$parent.animate({
                    width: self.options.closedWidth
                }, self.options.openCloseDuration, function () {
                    console.log('closed $sidbenav');
                    cb();
                });
            },
            function (cb) {
                var closed = 0;
                $title.animate({
                    opacity: 0
                }, self.options.openCloseDuration / 3, function () {
                    closed++;
                    if (closed == $title.length) {
                        $title.css('display', 'none');
                        cb();
                    }
                });
            }
        ], function (err, results) {
            self._setClosed(true);
            self.$parent.removeAttr('style');
            $content.removeAttr('style');
            $title.removeAttr('style');
            self.closing = false;
            self.openCloseInProgress = false;
            if (_.isFunction(callback)) {
                callback();
            }
            defer.resolve();
        });
        return defer.promise();
    };
    SidebarPlugin.prototype.open = function (callback) {
        var self = this;
        if (self.openCloseInProgress || !self.isClosed()) {
            return;
        }
        self.openCloseInProgress = true;
        var defer = $.Deferred();
        var $title = self.$element.find('li a span.title, li a span.arrow');
        var $content = self.packadic.el('content');
        self._setClosed(false);
        //$body.removeClass("sidebar-nav-closed");
        //self.element.removeClass("sidebar-nav-menu-closed");
        async.parallel([
            function (cb) {
                $content.css('margin-left', self.options.closedWidth)
                    .animate({
                    'margin-left': self.options.openedWidth
                }, self.options.openCloseDuration, function () {
                    cb();
                });
            },
            function (cb) {
                self.$parent.css('width', self.options.closedWidth)
                    .animate({
                    width: self.options.openedWidth
                }, self.options.openCloseDuration, function () {
                    cb();
                });
            },
            function (cb) {
                var opened = 0;
                $title.css({
                    opacity: 0,
                    display: 'none'
                });
                setTimeout(function () {
                    $title.css('display', 'initial');
                    $title.animate({
                        opacity: 1
                    }, self.options.openCloseDuration / 2, function () {
                        opened++;
                        if (opened == $title.length) {
                            $title.css('display', 'none');
                            cb();
                        }
                    });
                }, self.options.openCloseDuration / 2);
            }
        ], function (err, results) {
            $content.removeAttr('style');
            self.$parent.removeAttr('style');
            $title.removeAttr('style');
            self.openCloseInProgress = false;
            if (_.isFunction(callback)) {
                callback();
            }
            defer.resolve();
        });
        return defer.promise();
    };
    /*

    public hide() {
        if (this.options.hidden) {
            return;
        }
        this.options.hidden = true;
        if (!$body.hasClass('sidebar-nav-closed')) {
            $body.addClass('sidebar-nav-closed');
        }
        if (!$body.hasClass('sidebar-nav-hide')) {
            $body.addClass('sidebar-nav-hide');
        }
        $('header.top .sidebar-toggler').hide();
    }

    public show() {
        this.options.hidden = false;
        $body.removeClass('sidebar-nav-closed')
            .removeClass('sidebar-nav-hide');
        $('header.top .sidebar-toggler').show();
    }
     */
    SidebarPlugin.prototype.hide = function () { };
    SidebarPlugin.prototype.show = function () { };
    SidebarPlugin.prototype.isClosed = function () {
        return this.$body.hasClass('page-sidebar-closed');
    };
    SidebarPlugin.prototype.isHidden = function () { };
    SidebarPlugin.prototype.isFixed = function () {
        return $('.page-sidebar-fixed').size() !== 0;
    };
    SidebarPlugin.defaults = {
        autoScroll: true,
        keepExpanded: true,
        slideSpeed: 200,
        togglerSelector: '.sidebar-toggler',
        openCloseDuration: 600,
        openedWidth: 235,
        closedWidth: 54,
    };
    return SidebarPlugin;
})(plugins.BasePlugin);
plugins.register('sidebar', SidebarPlugin);
module.exports = SidebarPlugin;
//# sourceMappingURL=sidebar.js.map