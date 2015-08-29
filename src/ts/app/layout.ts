/// <reference path="../types.d.ts" />
import Packadic = require('./../Packadic');
import $ = require('jquery');
import BaseApp = require('./BaseApp');
import util  = require('./../modules/utilities');
import {DeferredInterface} from './../modules/promise';
import {ConfigObject,IConfig,IConfigProperty} from './../modules/configuration';
import storage  = require('./../modules/storage');
import SidebarPlugin = require("./plugins/sidebar");

import {debug} from './../modules/debug';
var log:any = debug.log;



var $window:JQuery = $(<any> window),
    $document:JQuery = $(<any> document),
    $body:JQuery = $('body'),
    $header:JQuery = $.noop(),
    $headerInner:JQuery = $.noop(),
    $container:JQuery = $.noop(),
    $content:JQuery = $.noop(),
    $sidebar:JQuery = $.noop(),
    $sidebarMenu:JQuery = $.noop(),
    $search:JQuery = $.noop(),
    $footer:JQuery = $.noop();

export class Layout extends BaseApp {
    protected _preferences:Preferences;


    public boot() {
        var self:Layout = this;
        this.assignElements();
        this.initHeader();
        this.initGoTop();
        this.initPreferences();
        this.p.plugins.load('sidebar', function () {
            $sidebarMenu.sidebar({});
            if(self.p.DEBUG){
                window['sidebar'] = <any> $sidebarMenu.sidebar('instance');
            }
        });
    }

    public get preferences():Preferences {
        return this._preferences;
    }

    protected get sidebar() {
        var defer:DeferredInterface<any> = this.p.promise();
        this.p.plugins.load('sidebar', function () {
            defer.resolve($sidebarMenu.sidebar('instance'));
        });
        return defer.promise;
    }

    protected assignElements() {
        $header = this.$e('header');
        $headerInner = this.$e('header-inner');
        $container = this.$e('container');
        $content = this.$e('content');
        $sidebar = this.$e('sidebar');
        $sidebarMenu = this.$e('sidebar-menu');
        $footer = this.$e('footer');
        $search = this.$e('search');
    }

    protected $e(selectorName:string):JQuery {
        var selector:string = this.config('app.selectors.' + selectorName);
        return $(selector);
    }


    public calculateViewportHeight() {
        var self:Layout = this;
        var sidebarHeight = util.getViewPort().height - $('.page-header').outerHeight() - 30;
        if ($body.hasClass("page-footer-fixed")) {
            sidebarHeight = sidebarHeight - $footer.outerHeight();
        }

        return sidebarHeight;
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


    initPreferences() {
        var self:Layout = this;
        var prefs:Preferences = this._preferences = new Preferences(this);

        prefs.bind('header.fixed', 'set', this._setHeader);
        prefs.bind('footer.fixed', 'set', this._setFooterFixed);
        prefs.bind('page.boxed', 'set', this._setBoxed);

        prefs.bind('sidebar.hidden', 'set', () => this.sidebar.then(function (sidebar:SidebarPlugin) {
            prefs.get('sidebar.hidden') ? sidebar.hide() : sidebar.show();
        }));
        prefs.bind('sidebar.closed', 'set', () => this.sidebar.then(function (sidebar:SidebarPlugin) {
            prefs.get('sidebar.closed') ? sidebar.close() : sidebar.open();
        }));
        prefs.bind('sidebar.fixed', 'set', () => this.sidebar.then(function (sidebar:SidebarPlugin) {
            sidebar.setFixed(prefs.get('sidebar.fixed'))
        }));
        prefs.bind('sidebar.compact', 'set', () => this.sidebar.then(function (sidebar:SidebarPlugin) {
            sidebar.setCompact(prefs.get('sidebar.compact'))
        }));
        prefs.bind('sidebar.hover', 'set', () => this.sidebar.then(function (sidebar:SidebarPlugin) {
            sidebar.setHover(prefs.get('sidebar.hover'))
        }));
        prefs.bind('sidebar.reversed', 'set', () => this.sidebar.then(function (sidebar:SidebarPlugin) {
            sidebar.setReversed(prefs.get('sidebar.reversed'))
        }));
    }

    public _setHeader(val:any) {
        if (val === true) {
            $body.addClass("page-header-fixed");
            $header.removeClass("navbar-static-top").addClass("navbar-fixed-top");
        } else {
            $body.removeClass("page-header-fixed");
            $header.removeClass("navbar-fixed-top").addClass("navbar-static-top");
        }
    }

    public _setFooterFixed(val:any) {
        if (val === true) {
            $body.addClass("page-footer-fixed");
        } else {
            $body.removeClass("page-footer-fixed");
        }
    }

    public _setBoxed(val:any) {
        if (val === true) {
            $body.addClass("page-boxed");
            $headerInner.addClass("container");
            var cont = $('body > .clearfix').after('<div class="container"></div>');
            $container.appendTo('body > .container');
            if (this.preferences.get('footer.fixed')) {
                $footer.html('<div class="container">' + $footer.html() + '</div>');
            } else {
                $footer.appendTo('body > .container');
            }
            this.p.emit('resize');
        }
    }

    public reset() {
        $body.
            removeClass("page-boxed").
            removeClass("page-footer-fixed").
            removeClass("page-sidebar-fixed").
            removeClass("page-header-fixed").
            removeClass("page-sidebar-reversed");

        $header.removeClass('navbar-fixed-top');
        $headerInner.removeClass("container");

        if ($container.parent(".container").size() === 1) {
            $container.insertAfter('body > .clearfix');
        }

        if ($('.page-footer > .container').size() === 1) {
            $footer.html($('.page-footer > .container').html());
        } else if ($footer.parent(".container").size() === 1) {
            $footer.insertAfter($container);
            $('.scroll-to-top').insertAfter($footer);
        }

        $('body > .container').remove();

    }

}


export class Preferences {

    protected layout:Layout;
    protected p:Packadic;

    constructor(layout:Layout) {
        this.layout = layout;
        this.p = layout.p;

        this.bindings = new ConfigObject();
        this.defaultPreferences = util.dotize(this.config('app.preferences'));
        this.preferencesKeys = Object.keys(this.defaultPreferences);
    }

    protected get config():IConfigProperty {
        return this.p.config;
    }

    protected bindings:IConfig;
    protected preferencesKeys:string[];
    protected defaultPreferences:any;

    public save(key:string, val?:any):Preferences {
        val = util.def(val, this.config('app.preferences.' + key));
        storage.set('packadic.preference.' + key, val);
        this.set(key, val);
        return this;
    }

    public set(key:string, val?:any):Preferences {
        this.config.set('app.preferences.' + key, val);
        this.callBindings(key);
        return this;
    }

    public get(key:string) {
        return storage.get('packadic.preference.' + key, {
            def: this.config('app.preferences.' + key)
        });
    }

    public has(key:string):boolean {
        return this.preferencesKeys.indexOf(key) !== -1;
    }

    public all():any {
        var self:Preferences = this;
        var all:any = {};
        this.preferencesKeys.forEach(function (key) {
            all[key] = self.get(key);
        });
        return all;
    }


    public bind(key:string, name:string, callback:any):Preferences {
        this.bindings.set(key + '.' + name, callback);
        return this;
    }

    public hasBindings(key:string):boolean {
        return typeof this.bindings.get(key) === 'object' && Object.keys(this.bindings.get(key)).length > 0;
    }

    public bound(key:string, name:string):boolean {
        return typeof this.bindings.get(key + '.' + name) === 'function';
    }

    public unbind(key:string, name:string):Preferences {
        this.bindings.unset(key + '.' + name);
        return this;
    }

    public callBindings(key:string):Preferences {
        var self:Preferences = this;
        if (this.hasBindings(key)) {
            var val:any = self.get(key);
            Object.keys(this.bindings.get(key)).forEach(function (name:any) {
                var binding:any = self.bindings.get(key + '.' + name);
                binding.call(self, val);
            })
        }
        return this;
    }

    public getBindings() {
        return this.bindings.get();
    }
}
