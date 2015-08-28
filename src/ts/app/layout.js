var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $ = require('jquery');
var BaseApp = require('./BaseApp');
var util = require('./../modules/utilities');
var $window = $(window), $document = $(document), $body = $('body'), $header = $.noop(), $container = $.noop(), $content = $.noop(), $sidebar = $.noop(), $sidebarMenu = $.noop(), $search = $.noop(), $footer = $.noop();
var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        _super.apply(this, arguments);
    }
    Layout.prototype.boot = function () {
        this.assignElements();
        //this.initFixedSidebar();
        //this.initSidebarMenu();
        //this.initSidebarToggler();
        //this.p.on('resize', this.initFixedSidebar.bind(this));
        //this.initSidebarMenuActiveLink();
        this.initHeader();
        this.initGoTop();
        this.p.plugins.load('sidebar', function () {
            $sidebarMenu.sidebar({});
        });
    };
    Layout.prototype.assignElements = function () {
        $header = this.$e('header');
        $container = this.$e('container');
        $content = this.$e('content');
        $sidebar = this.$e('sidebar');
        $sidebarMenu = this.$e('sidebar-menu');
        $footer = this.$e('footer');
        $search = this.$e('search');
    };
    Layout.prototype.$e = function (selectorName) {
        var selector = this.config('selectors.' + selectorName);
        return $(selector);
    };
    Layout.prototype.initSidebarMenuActiveLink = function () {
        var self = this;
        if (this.config.get('sidebar.resolveActive') !== true)
            return;
        var currentPath = util.trim(location.pathname.toLowerCase(), '/');
        var md = this.p.getBreakpoint('md');
        if (util.getViewPort().width < md) {
            return; // not gonna do this for small devices
        }
        $sidebarMenu.find('li > a').each(function () {
            var href = $(this).attr('href');
            if (!_.isString(href)) {
                return;
            }
            href = util.trim(href).replace(location['origin'], '');
            var path = util.trim(href, '/');
            if (path == currentPath) {
                console.log('found result', this);
                var $el = $(this);
                $el.parent('li').not('.active').addClass('active');
                var $parentsLi = $el.parents('li').addClass('open');
                $parentsLi.find('.arrow').addClass('open');
                $parentsLi.has('ul').children('ul').show();
                return false;
            }
        });
    };
    Layout.prototype.initSidebarMenu = function () {
        var self = this;
        $sidebar.on('click', 'li > a', function (e) {
            if (util.getViewPort().width >= self.p.getBreakpoint('md') && $(this).parents('.page-sidebar-menu-hover-submenu').size() === 1) {
                return;
            }
            if ($(this).next().hasClass('sub-menu') === false) {
                if (util.getViewPort().width < self.p.getBreakpoint('md') && $sidebar.hasClass("in")) {
                    $('.page-header .responsive-toggler').click();
                }
                return;
            }
            if ($(this).next().hasClass('sub-menu always-open')) {
                return;
            }
            var parent = $(this).parent().parent();
            var the = $(this);
            var menu = $sidebarMenu;
            var sub = $(this).next();
            var autoScroll = menu.data("auto-scroll");
            var slideSpeed = parseInt(menu.data("slide-speed"));
            var keepExpand = menu.data("keep-expanded");
            if (keepExpand !== true) {
                parent.children('li.open').children('a').children('.arrow').removeClass('open');
                parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(slideSpeed);
                parent.children('li.open').removeClass('open');
            }
            var slideOffeset = -200;
            if (sub.is(":visible")) {
                $(this).find('.arrow').removeClass("open");
                $(this).parent().removeClass("open");
                sub.slideUp(slideSpeed, function () {
                    if (autoScroll === true && $body.hasClass('page-sidebar-closed') === false) {
                        if ($body.hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({
                                'scrollTo': (the.position()).top
                            });
                        }
                        else {
                            self.scrollTo(the, slideOffeset);
                        }
                    }
                });
            }
            else {
                $(this).find('.arrow').addClass("open");
                $(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
                    if (autoScroll === true && $body.hasClass('page-sidebar-closed') === false) {
                        if ($body.hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({
                                'scrollTo': (the.position()).top
                            });
                        }
                        else {
                            self.scrollTo(the, slideOffeset);
                        }
                    }
                });
            }
            e.preventDefault();
        });
        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
        $(document).on('click', '.page-header-fixed-mobile .responsive-toggler', function () {
            self.scrollTop();
        });
    };
    Layout.prototype.calculateViewportHeight = function () {
        var self = this;
        var sidebarHeight = util.getViewPort().height - $('.page-header').outerHeight() - 30;
        if ($body.hasClass("page-footer-fixed")) {
            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
        }
        return sidebarHeight;
    };
    Layout.prototype.initFixedSidebar = function () {
        var self = this;
        this.p.destroySlimScroll($sidebarMenu);
        $sidebarMenu.parent().find('.slimScrollDiv, .slimScrollBar, .slimScrollRail').remove();
        if ($('.page-sidebar-fixed').size() === 0) {
            return;
        }
        if (util.getViewPort().width >= this.p.getBreakpoint('md')) {
            $sidebarMenu.attr("data-height", this.calculateViewportHeight());
            self.p.makeSlimScroll($sidebarMenu);
            $('.page-content').css('min-height', this.calculateViewportHeight() + 'px');
        }
    };
    Layout.prototype.initFixedSidebarHoverEffect = function () {
        var self = this;
        if ($body.hasClass('page-sidebar-fixed')) {
            $sidebar.on('mouseenter', function () {
                if ($body.hasClass('page-sidebar-closed')) {
                    $(this).find('.page-sidebar-menu').removeClass('page-sidebar-menu-closed');
                }
            }).on('mouseleave', function () {
                if ($body.hasClass('page-sidebar-closed')) {
                    $(this).find('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
                }
            });
        }
    };
    Layout.prototype.initSidebarToggler = function () {
        var self = this;
        if ($.cookie && $.cookie('sidebar_closed') === '1' && util.getViewPort().width >= this.p.getBreakpoint('md')) {
            $body.addClass('page-sidebar-closed');
            $sidebarMenu.addClass('page-sidebar-menu-closed');
        }
        $body.on('click', '.sidebar-toggler', function (e) {
            $sidebar.find(".sidebar-search").removeClass("open");
            if ($body.hasClass("page-sidebar-closed")) {
                $body.removeClass("page-sidebar-closed");
                $sidebarMenu.removeClass("page-sidebar-menu-closed");
                if ($.cookie) {
                    $.cookie('sidebar_closed', '0');
                }
            }
            else {
                $body.addClass("page-sidebar-closed");
                $sidebarMenu.addClass("page-sidebar-menu-closed");
                if ($body.hasClass("page-sidebar-fixed")) {
                    $sidebarMenu.trigger("mouseleave");
                }
                if ($.cookie) {
                    $.cookie('sidebar_closed', '1');
                }
            }
            $window.trigger('resize');
        });
        self.initFixedSidebarHoverEffect();
        // handle the search bar close
        $document.on('click', '.sidebar-search .remove', function (e) {
            e.preventDefault();
            $search.removeClass("open");
        });
        // handle the search query submit on enter press
        $('.page-sidebar .sidebar-search').on('keypress', 'input.form-control', function (e) {
            if (e.which == 13) {
                $search.submit();
                return false; //<---- Add this line
            }
        });
        // handle the search submit(for sidebar search and responsive mode of the header search)
        $('.sidebar-search .submit').on('click', function (e) {
            e.preventDefault();
            if ($body.hasClass("page-sidebar-closed")) {
                if ($search.hasClass('open') === false) {
                    if ($('.page-sidebar-fixed').size() === 1) {
                        $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
                    }
                    $search.addClass("open");
                }
                else {
                    $search.submit();
                }
            }
            else {
                $search.submit();
            }
        });
        // handle close on body click
        if ($search.size() !== 0) {
            $('.sidebar-search .input-group').on('click', function (e) {
                e.stopPropagation();
            });
            $body.on('click', function () {
                if ($search.hasClass('open')) {
                    $search.removeClass("open");
                }
            });
        }
    };
    Layout.prototype.initHeader = function () {
        var self = this;
        // handle search box expand/collapse
        $header.on('click', '.search-form', function (e) {
            $(this).addClass("open");
            $(this).find('.form-control').focus();
            $('.page-header .search-form .form-control').on('blur', function (e) {
                $(this).closest('.search-form').removeClass("open");
                $(this).unbind("blur");
            });
        });
        // handle hor menu search form on enter press
        $header.on('keypress', '.hor-menu .search-form .form-control', function (e) {
            if (e.which == 13) {
                $(this).closest('.search-form').submit();
                return false;
            }
        });
        // handle header search button click
        $header.on('mousedown', '.search-form.open .submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.search-form').submit();
        });
    };
    Layout.prototype.initGoTop = function () {
        var self = this;
        var offset = 300;
        var duration = 500;
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            $window.bind("touchend touchcancel touchleave", function (e) {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                }
                else {
                    $('.scroll-to-top').fadeOut(duration);
                }
            });
        }
        else {
            $window.scroll(function () {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                }
                else {
                    $('.scroll-to-top').fadeOut(duration);
                }
            });
        }
        $('.scroll-to-top').click(function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    };
    Layout.prototype.scrollTo = function (el, offset) {
        this.p.scrollTo.apply(this.p, arguments);
    };
    Layout.prototype.scrollTop = function () {
        this.scrollTo();
    };
    return Layout;
})(BaseApp);
exports.Layout = Layout;
//# sourceMappingURL=layout.js.map