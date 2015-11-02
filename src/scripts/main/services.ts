import * as angular from 'angular';
import * as async from 'async';
import $ from 'jquery';
import {IConfigProperty, str, getViewPort,createPromise} from '../lib';
import {app} from './app';

@app.Service('lazySystem')
export class LazySystem {
    constructor(@app.Inject('$state') public $state:ng.ui.IState, @app.Inject('$ocLazyLoad') public $ocLazyLoad:oc.ILazyLoad) {
        console.log('LazySystem constructor', this);
    }

    public load(src:any, key?:any):any {
        var defer:any       = createPromise();
        var self:LazySystem = this;
        System.import(src).then(function (loadedFile) {
            //console.log('lazysys', '1last');
            self.$ocLazyLoad.load(loadedFile[key || 'default']).then((result:any) => {
                //console.log('lazysys', 'last');
                defer.resolve(loadedFile);
            });
        });
        return defer.promise;
    }
}

@app.Service('sidebarItems')
export class SidebarItemsService {
    items:Array<SidebarItem> = [];

    constructor() {
        this.add('Home', {data: 'home', icon: 'fa fa-home'})
            .add('Books', {data: 'books', icon: 'fa fa-book'})
            .add('Git', {data: 'https://github.com', type: SidebarItemType.HREF, icon: 'fa fa-github'})
    }

    all():any[] {
        return this.items
    };

    add(title:string, data:ISidebarItemOptions|any = {}):SidebarItemsService {
        data.title = title;
        this.items.push(new SidebarItem(data));
        return this;
    }

    get length():number {
        return this.items.length;
    }

}

export enum SidebarItemType {
    HREF,
    ROUTER
}

export interface ISidebarItemOptions {
    title:string;
    type:SidebarItemType;
    data:any;
    icon:string;
    children:Array<SidebarItem>;
}

export class SidebarItem {
    title:string                = '';
    type:SidebarItemType        = SidebarItemType.ROUTER;
    data:any;
    icon:string;
    children:Array<SidebarItem> = [];

    constructor(options:ISidebarItemOptions = <ISidebarItemOptions> {}) {
        Object.keys(options).forEach((key:string) => {
            this[key] = options[key];
        });
    }

    hasChildren():boolean {
        return this.children && this.children.length > 0;
    }

    getAllTypes():any {
        var types:string[] = [];
        Object.keys(SidebarItemType).forEach((key:any) => {
            if(typeof key === 'string'){
                types.push(key.toLowerCase());
            }
        });
        return types;
    }

    getTypeName():string {
        return SidebarItemType[this.type].toLowerCase();
    }

    isItemType(type:any):boolean {
        if (typeof type === typeof SidebarItemType) {
            return this.type === type;
        }
        return this.type === SidebarItemType[typeof type === 'string' ? type.toUpperCase() : parseInt(<any> type)];
    }
}



@app.Service('theme')
export class ThemeFactory {

    public openCloseInProgress:boolean = false;
    public closing:boolean = false;

    constructor(@app.Inject('$rootScope') public $rootScope:any,
                @app.Inject('settings') public settings:IConfigProperty) {

    }

    get $body():ng.IAugmentedJQuery {
        return angular.element(document.body);
    }


    public boot() {
        console.log('LayoutComponent debug');
        this._initHeader();
        this._initFixed();
        this._initSidebarSubmenus();
        this._initToggleButton();
        this._initGoTop();

        this.sidebarResolveActive();
        this.fixBreadcrumb();

        this._initResizeEvent();
        this._initSidebarResizeListener();
        this._initEdgedHeightResizeListener();
    }


    public get $header() {
        return $('page-header');
    }

    public get $headerInner() {
        return $('page-header-inner');
    }

    public get $container() {
        return $('page-container');
    }

    public get $content() {
        return $('page-content');
    }

    public get $sidebar() {
        return $('page-sidebar');
    }

    public get $sidebarMenu() {
        return $('page-sidebar-menu');
    }

    public get $footer() {
        return $('page-footer');
    }

    public get $footerInner() {
        return $('page-footer-inner');
    }


    /****************************/
    // Initialisation
    /****************************/

    protected _initResizeEvent() {
        var resize:number;
        $(window).resize(() => {
            if (resize) {
                clearTimeout(resize);
            }
            resize = setTimeout(() => {
                this.$rootScope.$broadcast('resize');
            }, 50);
        });
    }

    protected _initSidebarResizeListener() {
        var resizing:boolean = false;
        this.$rootScope.$on('resize', () => {
            if (resizing) {
                return;
            }
            resizing = true;
            setTimeout(() => {
                this._initFixed();
                resizing = false;
            }, this.settings('layout.sidebar.slideSpeed'));
        });
    }

    protected _initEdgedHeightResizeListener() {
        var listener = () => {
            if (this.isEdged() && getViewPort().width >= this.getBreakpoint('md')) {
                console.log('edged height resize', 'viewport height', getViewPort().height, 'calculated', this.calculateViewportHeight());
                this.$sidebarMenu.css('min-height', this.calculateViewportHeight());
                this.$content.css('min-height', this.calculateViewportHeight());
            } else {
                this.$sidebarMenu.removeAttr('style');
                this.$content.removeAttr('style');
            }
        };
        this.$rootScope.$on('resize', listener);
        this.$rootScope.$on('sidebar:closed', listener);
        this.$rootScope.$on('sidebar:opened', listener);
        listener();
    }

    protected _initHeader() {
        var self:ThemeFactory = this;
    }

    public fixBreadcrumb() {
        var $i:JQuery = $('.page-breadcrumb').find('> li').last().find('i');
        if ($i.size() > 0) {
            $i.remove();
        }
    }

    protected _initGoTop() {
        var self:ThemeFactory = this;
        var offset = 300;
        var duration = 500;

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) { // ios supported
            angular.element(window).bind("touchend touchcancel touchleave", function (e) {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                } else {
                    $('.scroll-to-top').fadeOut(duration);
                }
            });
        } else { // general
            angular.element(window).scroll(function () {
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

    protected _initFixed() {

        //destroySlimScroll(this.$sidebarMenu);

        if (!this.isSidebarFixed()) {
            return;
        }
        if (getViewPort().width >= this.getBreakpoint('md')) {
            this.$sidebarMenu.attr("data-height", this.calculateViewportHeight());
            //makeSlimScroll(this.$sidebarMenu, {
            //    position: this.isSidebarReversed() ? 'left' : 'right', // position of the scroll bar
            //    allowPageScroll: false
            //});
            //this.$content.css('min-height', this.calculateViewportHeight() + 'px');
        }
    }

    protected _initSidebarSubmenus() {
        var self:ThemeFactory = this;
        this.$sidebar.onClick('li > a', function (e) {
            var $this = $(this);
            if (getViewPort().width >= self.getBreakpoint('md') && $this.parents('.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
                return;
            }

            if ($this.next().hasClass('sub-menu') === false) {
                if (getViewPort().width < self.getBreakpoint('md') && self.$sidebarMenu.hasClass("in")) { // close the menu on mobile view while laoding a page
                    $('.page-header .responsive-toggler').click();
                }
                return;
            }

            if ($this.next().hasClass('sub-menu always-open')) {
                return;
            }

            var $parent = $this.parent().parent();

            var $subMenu = $this.next();

            if (self.settings('layout.sidebar.keepExpand') !== true) {
                $parent.children('li.open').children('a').children('.arrow').removeClass('open');
                $parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(self.settings('layout.sidebar.slideSpeed'));
                $parent.children('li.open').removeClass('open');
            }


            var slideOffeset = -200;
            var visible:boolean = $subMenu.is(":visible");
            $this.find('.arrow').ensureClass("open", !visible);
            $this.parent().ensureClass("open", !visible);
            console.log('sidebarsubmenu', visible, $this, $subMenu);
            $subMenu[visible ? 'slideUp' : 'slideDown'](self.settings('layout.sidebar.slideSpeed'), function () {
                if (self.settings('layout.sidebar.autoScroll') === true && self.isSidebarClosed() === false) {
                    if (self.isSidebarFixed()) {
                        self.$sidebarMenu.slimScroll({scrollTo: $this.position().top});
                    } else {
                        self.scrollTo($this, slideOffeset);
                    }
                }
            });
            e.preventDefault();
        });
        $(document).onClick('.page-header-fixed-mobile .responsive-toggler', function () {
            self.scrollTop();
        });
    }

    protected _initToggleButton() {
        return;
        var self:ThemeFactory = this;
        this.$body.onClick(self.settings('layout.sidebar.togglerSelector'), function (e) {
            if (self.isSidebarClosed()) {
                self.openSidebar();
            } else {
                self.closeSidebar();
            }
        });

        self._initFixedHovered();
    }

    protected _initFixedHovered() {
        var self:ThemeFactory = this;
        if (self.isSidebarFixed()) {
            this.$sidebarMenu.on('mouseenter', function () {
                if (self.isSidebarClosed()) {
                    this.$sidebar.removeClass('page-sidebar-menu-closed');
                }
            }).on('mouseleave', function () {
                if (self.isSidebarClosed()) {
                    this.$sidebar.addClass('page-sidebar-menu-closed');
                }
            });
        }
    }


    /****************************/
    // Sidebar interaction
    /****************************/

    protected setSidebarClosed(closed:boolean = true) {
        this.$body.ensureClass("page-sidebar-closed", closed);
        this.$sidebarMenu.ensureClass("page-sidebar-menu-closed", closed);
        if (this.isSidebarClosed() && this.isSidebarFixed()) {
            this.$sidebarMenu.trigger("mouseleave");
        }
    }

    public closeSubmenus() {

        this.$sidebarMenu.children('li.open').children('a').children('.arrow').removeClass('open');
        this.$sidebarMenu.children('li.open').children('.sub-menu:not(.always-open)').slideUp(this.settings('layout.sidebar.slideSpeed'));
        this.$sidebarMenu.children('li.open').removeClass('open');
        /*
         el.sidebarMenu.find('ul.sub-menu').each(() => {
         var $ul:JQuery = $(this);
         if ($ul.is(":visible")) {
         $('.arrow', $ul).removeClass("open");
         $ul.parent().removeClass("open");
         $ul.slideUp(this.settings('layout.sidebar.slideSpeed'));
         }
         });*/
        this.$rootScope.$broadcast('layout:sidebar:close-submenus');
    }

    public closeSidebar(callback?:any):JQueryPromise<any> {
        var self:ThemeFactory = this;
        var $main = $('main');

        if (self.openCloseInProgress || self.isSidebarClosed()) {
            return;
        }
        self.openCloseInProgress = true;
        self.closing = true;
        var defer:any = $.Deferred();

        this.$rootScope.$broadcast('layout:sidebar:close');
        self.closeSubmenus();

        var $title = self.$sidebarMenu.find('li a span.title, li a span.arrow');


        async.parallel([
            function (cb:any) {
                self.$content.animate({
                    'margin-left': self.settings('layout.sidebar.closedWidth')
                }, self.settings('layout.sidebar.openCloseDuration'), function () {
                    cb();
                })
            },
            function (cb:any) {
                self.$sidebar.animate({
                    width: self.settings('layout.sidebar.closedWidth')
                }, self.settings('layout.sidebar.openCloseDuration'), function () {
                    cb();
                })
            },
            function (cb:any) {
                var closed = 0;
                $title.animate({
                    opacity: 0
                }, self.settings('layout.sidebar.openCloseDuration') / 3, function () {
                    closed++;
                    if (closed == $title.length) {
                        $title.css('display', 'none');
                        cb();
                    }
                })
            }
        ], function (err:any, results:any) {

            self.setSidebarClosed(true);
            self.$sidebar.removeAttr('style');
            self.$content.removeAttr('style');
            $title.removeAttr('style');

            self.closing = false;
            self.openCloseInProgress = false;

            if (_.isFunction(callback)) {
                callback();
            }
            defer.resolve();
            self.$rootScope.$broadcast('layout:sidebar:closed');
            self.$rootScope.$broadcast('resize');
        });
        return defer.promise();
    }

    public openSidebar(callback?:any):JQueryPromise<any> {
        var self:ThemeFactory = this;
        if (self.openCloseInProgress || !self.isSidebarClosed()) {
            return;
        }

        self.openCloseInProgress = true;
        var defer:any = $.Deferred();
        var $title:JQuery = self.$sidebarMenu.find('li a span.title, li a span.arrow');

        self.setSidebarClosed(false);

        this.$rootScope.$broadcast('layout:sidebar:open');
        async.parallel([
            function (cb:any) {
                self.$content.css('margin-left', self.settings('layout.sidebar.closedWidth'))
                    .animate({
                        'margin-left': self.settings('layout.sidebar.openedWidth')
                    }, self.settings('layout.sidebar.openCloseDuration'), function () {
                        cb();
                    })
            },
            function (cb:any) {
                self.$sidebar.css('width', self.settings('layout.sidebar.closedWidth'))
                    .animate({
                        width: self.settings('layout.sidebar.openedWidth')
                    }, self.settings('layout.sidebar.openCloseDuration'), function () {
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
                    }, self.settings('layout.sidebar.openCloseDuration ') / 2, function () {
                        opened++;
                        if (opened == $title.length) {
                            $title.css('display', 'none');
                            cb();
                        }
                    })
                }, self.settings('layout.sidebar.openCloseDuration') / 2)
            }
        ], function (err:any, results:any) {
            self.$content.removeAttr('style');
            self.$sidebar.removeAttr('style');
            $title.removeAttr('style');

            self.openCloseInProgress = false;

            if (_.isFunction(callback)) {
                callback();
            }
            defer.resolve();

            self.$rootScope.$broadcast('layout:sidebar:opened');
            self.$rootScope.$broadcast('resize');
        });
        return defer.promise();

    }



    /**
     * Animated scroll to the given element
     * @param ele
     * @param offset
     */
    public scrollTo(ele?:any, offset?:number) {
        var $el:JQuery = typeof(ele) === 'string' ? $(ele) : ele;
        var pos        = ($el && $el.size() > 0) ? $el.offset().top : 0;

        if ($el) {

            if (this.$body.hasClass('page-header-fixed')) {
                //pos = pos - el.header.height();
            }
            pos = pos + (offset ? offset : -1 * $el.height());
        }

        $('html,body').animate({
            scrollTop: pos
        }, 'slow');
    }

    public scrollTop() {
        this.scrollTo();
    }


    /****************************/
    // Helpers
    /****************************/

    public getBreakpoint(which:string) {
        //return parseInt(this.settings.get('layout.breakpoints.screen-' + which + '-min').replace('px', ''));
        return parseInt(this.settings.get('layout.breakpoints4.' + which)); // bs4.0.0-alpha
    }

    public calculateViewportHeight() {
        var sidebarHeight = getViewPort().height - this.$header.outerHeight();
        if (this.isFooterFixed()) {
            sidebarHeight = sidebarHeight - this.$footer.outerHeight();
        }

        return sidebarHeight;
    }

    public hideSidebar() {
        if (this.settings('layout.preferences.sidebar.hidden')) {
            return;
        }

        if (!this.$body.hasClass('page-sidebar-closed')) {
            this.$body.addClass('page-sidebar-closed');
        }
        if (!this.$body.hasClass('page-sidebar-hide')) {
            this.$body.addClass('page-sidebar-hide');
        }
        $('header.top .sidebar-toggler').hide();
        this.$rootScope.$broadcast('layout:sidebar:hide');
    }

    public showSidebar() {
        //this.options.hidden = false;
        this.$body.removeClass('page-sidebar-closed')
            .removeClass('page-sidebar-hide');
        $('header.top .sidebar-toggler').show();
        this.$rootScope.$broadcast('layout:sidebar:show');
    }

    protected sidebarResolveActive() {
        var self:ThemeFactory = this;
        if (this.settings('layout.sidebar.resolveActive') !== true) return;
        var currentPath = str.trim(location.pathname.toLowerCase(), '/');
        var md          = this.getBreakpoint('md');
        if (getViewPort().width < md) {
            return; // not gonna do this for small devices
        }
        self.$sidebarMenu.find('a').each(function () {
            var href:string = $(this).attr('href');
            if (!_.isString(href)) {
                return;
            }

            href = str.trim(href)
                .replace(location['origin'], '')
                .replace(/\.\.\//g, '');

            if (location['hostname'] !== 'localhost') {
                //href = self.settings('baseUrl') + href;
            }

            var path = str.trim(href, '/');
            //debug.log(path, currentPath, href);

            if (path == currentPath) { //util.strEndsWith(path, currentPath)
                //debug.log('Resolved active sidebar link', this);
                var $el = $(this);
                $el.parent('li').not('.active').addClass('active');
                var $parentsLi = $el.parents('li').addClass('open');
                $parentsLi.find('.arrow').addClass('open');
                $parentsLi.has('ul').children('ul').show();
            }
        })

    }


    public setSidebarFixed(fixed:boolean) {
        this.$body.ensureClass("page-sidebar-fixed", fixed);
        if (!fixed) {
            this.$sidebarMenu.unbind('mouseenter').unbind('mouseleave');
        } else {
            this._initFixedHovered();
        }
        this._initFixed();
        this.$rootScope.$broadcast('layout:sidebar:fixed', fixed);
    }

    public setSidebarCondensed(condensed:boolean) {
        this.$body.ensureClass("page-sidebar-condensed", condensed);
        this.$rootScope.$broadcast('layout:sidebar:condensed', condensed);
    }

    public setSidebarHover(hover:boolean) {
        //this.$sidebarMenu.ensureClass("page-sidebar-menu-hover-submenu", hover && !this.isSidebarFixed());
        this.$rootScope.$broadcast('layout:sidebar:hover', hover);
    }

    public setSidebarReversed(reversed:boolean) {
        this.$body.ensureClass("page-sidebar-reversed", reversed);
        this.$rootScope.$broadcast('layout:sidebar:reversed', reversed);
    }

    /****************************/
    // Layout interaction
    /****************************/
    public setHeaderFixed(fixed:boolean) {
        if (fixed === true) {
            this.$body.addClass("page-header-fixed");
            //this.$header.removeClass("navbar-static-top").addClass("navbar-fixed-top");
        } else {
            this.$body.removeClass("page-header-fixed");
            //this.$header.removeClass("navbar-fixed-top").addClass("navbar-static-top");
        }
        this.$rootScope.$broadcast('layout:header:fixed', fixed);
    }

    public setFooterFixed(fixed:boolean) {
        if (fixed === true) {
            this.$body.addClass("page-footer-fixed");
        } else {
            this.$body.removeClass("page-footer-fixed");
        }
        this.$rootScope.$broadcast('layout:footer:fixed', fixed);
    }

    public setBoxed(boxed:boolean) {
        this.$body.ensureClass('page-boxed', boxed);
        this.$headerInner.ensureClass("container", boxed);

        if (boxed === true) {

            var cont = $('body > .clearfix').after('<div class="container"></div>');

            // this.$container = .page-container
            this.$container.appendTo('body > .clearfix + .container');
            if (this.isFooterFixed()) {
                this.$footerInner.wrap($('<div>').addClass('container'));
                //this.$footer.html('<div class="container">' + this.$footer.html() + '</div>');
            } else {
                this.$footer.appendTo('body > .clearfix + .container');
            }
        } else {
            var cont = $('body > .clearfix + .container').children().unwrap();
            if (this.isFooterFixed()) {
                this.$footerInner.unwrap();
            }
            //cont.remove();
        }
        this.$rootScope.$broadcast('layout:page:boxed', boxed);
    }

    public setEdged(edged:boolean) {

        if (edged && this.isBoxed()) {
            this.setBoxed(false);
        }

        this.$body.ensureClass('page-edged', edged);

        this.$rootScope.$broadcast('layout:page:edged');
    }


    public isHeaderFixed():boolean {
        return this.$body.hasClass('page-header-fixed');
    }

    public isFooterFixed():boolean {
        return this.$body.hasClass('page-footer-fixed');
    }

    public isBoxed():boolean {
        return this.$body.hasClass('page-boxed');
    }

    public isEdged():boolean {
        return this.$body.hasClass('page-edged');
    }

    public isSidebarClosed():boolean {
        return this.$body.hasClass('page-sidebar-closed')
    }

    public isSidebarHidden():boolean {
        return this.$body.hasClass('page-sidebar-hide');
    }

    public isSidebarFixed():boolean {
        return this.$body.find('.page-sidebar-fixed').length > 0;
    }

    public isSidebarCondensed():boolean {
        return this.$body.hasClass('page-sidebar-condensed');
    }

    public isSidebarHover():boolean {
        return this.$sidebarMenu.hasClass('page-sidebar-menu-hover-submenu');
    }

    public isSidebarReversed():boolean {
        return this.$body.hasClass('page-sidebar-reversed');
    }
}
