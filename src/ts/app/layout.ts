/// <reference path="../types.d.ts" />
import Packadic = require('./../Packadic');
import $ = require('jquery');
import BaseApp = require('./BaseApp');
import util  = require('./../modules/utilities');

var $window:JQuery = $(<any> window),
    $document:JQuery = $(<any> document),
    $body:JQuery = $('body'),
    $header:JQuery = $.noop(),
    $container:JQuery = $.noop(),
    $content:JQuery = $.noop(),
    $sidebar:JQuery = $.noop(),
    $sidebarMenu:JQuery = $.noop(),
    $search:JQuery = $.noop(),
    $footer:JQuery = $.noop();

export class Layout extends BaseApp {

    public boot(){
        this.assignElements();
        //this.initFixedSidebar();
        //this.initSidebarMenu();
        //this.initSidebarToggler();
        //this.p.on('resize', this.initFixedSidebar.bind(this));
        //this.initSidebarMenuActiveLink();
        this.initHeader();
        this.initGoTop();
        this.p.plugins.load('sidebar', function(){
            $sidebarMenu.sidebar({

            });
        });
    }

    protected assignElements (){
        $header = this.$e('header');
        $container = this.$e('container');
        $content = this.$e('content');
        $sidebar = this.$e('sidebar');
        $sidebarMenu = this.$e('sidebar-menu');
        $footer = this.$e('footer');
        $search = this.$e('search');
    }

    protected $e(selectorName:string):JQuery{
        var selector:string = this.config('selectors.' + selectorName);
        return $(selector);
    }

    initSidebarMenuActiveLink() {

        var self:Layout = this;
        if (this.config.get('sidebar.resolveActive') !== true) return;
        var currentPath = util.trim(location.pathname.toLowerCase(), '/');
        var md = this.p.getBreakpoint('md');
        if (util.getViewPort().width < md) {
            return; // not gonna do this for small devices
        }

        $sidebarMenu.find('li > a').each(function () {
            var href:string = $(this).attr('href');
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
        })
    }

    initSidebarMenu() {
        var self:Layout = this;
        $sidebar.on('click', 'li > a', function (e) {

            if (util.getViewPort().width >= self.p.getBreakpoint('md') && $(this).parents('.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
                return;
            }

            if ($(this).next().hasClass('sub-menu') === false) {
                if (util.getViewPort().width < self.p.getBreakpoint('md') && $sidebar.hasClass("in")) { // close the menu on mobile view while laoding a page
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
                        } else {
                            self.scrollTo(the, slideOffeset);
                        }
                    }
                });
            } else {
                $(this).find('.arrow').addClass("open");
                $(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
                    if (autoScroll === true && $body.hasClass('page-sidebar-closed') === false) {
                        if ($body.hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({
                                'scrollTo': (the.position()).top
                            });
                        } else {
                            self.scrollTo(the, slideOffeset);
                        }
                    }
                });
            }

            e.preventDefault();
        });




        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
        $(<any> document).on('click', '.page-header-fixed-mobile .responsive-toggler', function () {
            self.scrollTop();
        });
    }

    public calculateViewportHeight() {
        var self:Layout = this;
        var sidebarHeight = util.getViewPort().height - $('.page-header').outerHeight() - 30;
        if ($body.hasClass("page-footer-fixed")) {
            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
        }

        return sidebarHeight;
    }

    initFixedSidebar() {
        var self:Layout = this;
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
    }

    initFixedSidebarHoverEffect() {
        var self:Layout = this;
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
    }

    initSidebarToggler() {
        var self:Layout = this;

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
            } else {
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
                } else {
                    $search.submit();
                }
            } else {
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
    }

    initHeader() {
        var self:Layout = this;
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
    }


    initGoTop() {
        var self:Layout = this;
        var offset = 300;
        var duration = 500;

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) { // ios supported
            $window.bind("touchend touchcancel touchleave", function (e) {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                } else {
                    $('.scroll-to-top').fadeOut(duration);
                }
            });
        } else { // general
            $window.scroll(function () {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                } else {
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

    }

    public scrollTo(el?:any, offset?:number) {
        this.p.scrollTo.apply(this.p, arguments);
    }

    public scrollTop() {
        this.scrollTo();
    }



}

