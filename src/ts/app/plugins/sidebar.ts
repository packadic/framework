/// <reference path="../../types.d.ts" />
import $ = require('jquery');
import plugins = require('app/plugins');
import async = require('async');

class SidebarPlugin extends plugins.BasePlugin {
    public static defaults:any = {
        autoScroll: true,
        keepExpanded: true,
        slideSpeed: 200,

        togglerSelector: '.sidebar-toggler',
        openCloseDuration: 600,
        openedWidth: 235,
        closedWidth: 54,
    };
    protected $parent:JQuery;
    public openCloseInProgress:boolean = false;
    public closing:boolean = false;

    protected _calculateViewportHeight(){
        return this.packadic.layout.calculateViewportHeight();
    }
    public _create() {
        console.log('Creating new sidevar');
        console.log(this.$element.data());

        var self:SidebarPlugin = this;
        self.$parent = self.$element.parent();

        self._initFixed();
        self._initMain();
        self._initToggleButton();

        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
        self.$document.on('click', '.page-header-fixed-mobile .responsive-toggler', function () {
            self.packadic.scrollTop();
        });
    }
    protected _initFixed(){
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
    }
    protected _initMain(){
        var self:SidebarPlugin = this;
        self._on('click', 'li > a', function (e) {
            var $this = $(this);
            if (self.packadic.getViewPort().width >= self.packadic.getBreakpoint('md') && $this.parents('.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
                return;
            }

            if ($this.next().hasClass('sub-menu') === false) {
                if (self.packadic.getViewPort().width < self.packadic.getBreakpoint('md') && self.$element.hasClass("in")) { // close the menu on mobile view while laoding a page
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
                        } else {
                            self.packadic.scrollTo($this, slideOffeset);
                        }
                    }
                });
            } else {
                $this.find('.arrow').addClass("open");
                $this.parent().addClass("open");
                $sub.slideDown(self.options.slideSpeed, function () {
                    if (self.options.autoScroll === true && self.isClosed() === false) {
                        if (self.isFixed()) {
                            self.$parent.slimScroll({
                                'scrollTo': ($this.position()).top
                            });
                        } else {
                            self.packadic.scrollTo($this, slideOffeset);
                        }
                    }
                });
            }

            e.preventDefault();
        });
    }
    protected _initToggleButton() {
        var self:SidebarPlugin = this;
        self.$body.on('click', self.options.togglerSelector, function (e) {
            if (self.isClosed()) {
                self.open();
            } else {
                self.close();
            }
        });
        self._initFixedHovered();
    }


    protected _initFixedHovered() {
        var self:SidebarPlugin = this;
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
    }

    protected _setClosed(closed:boolean=true){
        this.$body.ensureClass("page-sidebar-closed", closed);
        this.$element.ensureClass("page-sidebar-menu-closed", closed);
        if (this.isClosed() && this.isFixed()) {
            this._trigger("mouseleave");
        }
        this.$window.trigger('resize');
    }

    public closeSubmenus(){
        var self:SidebarPlugin = this;
        self.$element.find('ul.sub-menu').each(function () {
            var $ul:JQuery = $(this);
            if ($ul.is(":visible")) {
                $('.arrow', $ul).removeClass("open");
                $ul.parent().removeClass("open");
                $ul.slideUp(self.options.slideSpeed);
            }
        });
    }
    public close(callback?:any):JQueryPromise<any> {
        var self:SidebarPlugin = this;
        var $main = $('main');

        if (self.openCloseInProgress || self.isClosed()) {
            return;
        }
        self.openCloseInProgress = true;
        self.closing = true;
        var defer:any = $.Deferred();

        self.closeSubmenus();
        //self.$body.addClass('sidebar-nav-closing');

        var $title = self.$element.find('li a span.title, li a span.arrow');
        var $content = self.packadic.el('content');

        async.parallel([
            function (cb:any) {
                $content.animate({
                    'margin-left': self.options.closedWidth
                }, self.options.openCloseDuration, function () {
                    console.log('closed $main');
                    cb();
                })
            },
            function (cb:any) {
                self.$parent.animate({
                    width: self.options.closedWidth
                }, self.options.openCloseDuration, function () {
                    console.log('closed $sidbenav');
                    cb();
                })
            },
            function (cb:any) {
                var closed = 0;
                $title.animate({
                    opacity: 0
                }, self.options.openCloseDuration / 3, function () {
                    closed++;
                    if (closed == $title.length) {
                        $title.css('display', 'none');
                        cb();
                    }
                })
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
    }

    public open(callback?:any):JQueryPromise<any> {
        var self:SidebarPlugin = this;
        if (self.openCloseInProgress || !self.isClosed()) {
            return;
        }

        self.openCloseInProgress = true;
        var defer:any = $.Deferred();
        var $title:JQuery = self.$element.find('li a span.title, li a span.arrow');
        var $content = self.packadic.el('content');
        self._setClosed(false);
        //$body.removeClass("sidebar-nav-closed");
        //self.element.removeClass("sidebar-nav-menu-closed");

        async.parallel([
            function (cb:any) {
                $content.css('margin-left', self.options.closedWidth)
                    .animate({
                        'margin-left': self.options.openedWidth
                    }, self.options.openCloseDuration, function () {
                        cb();
                    })
            },
            function (cb:any) {
                self.$parent.css('width', self.options.closedWidth)
                    .animate({
                        width: self.options.openedWidth
                    }, self.options.openCloseDuration, function () {
                        cb();
                    })
            },
            function (cb:any) {
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
                    })
                }, self.options.openCloseDuration / 2)
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
    }

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

    public hide(){}
    public show(){}
    public isClosed(){
        return this.$body.hasClass('page-sidebar-closed')
    }
    public isHidden(){}
    public isFixed():boolean {
        return $('.page-sidebar-fixed').size() !== 0;
    }
}
export = SidebarPlugin;
plugins.register('sidebar', SidebarPlugin);
