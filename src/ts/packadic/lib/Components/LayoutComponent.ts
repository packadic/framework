module packadic.components {

    var defaultConfig:any = {
        selectors: {
            'search': '.sidebar-search',
            'header': '.page-header',
            'header-inner': '<%= selectors.header %> .page-header-inner',

            'container': '.page-container',
            'sidebar-wrapper': '.page-sidebar-wrapper',
            'sidebar': '.page-sidebar',
            'sidebar-menu': '.page-sidebar-menu',
            'content-wrapper': '.page-content-wrapper',
            'content': '.page-content',

            'content-head': '<%= selectors.content %> .page-head',
            'content-breadcrumbs': '<%= selectors.content %> .page-breadcrumbs',
            'content-inner': '<%= selectors.content %> .page-content-inner',

            'footer': '.page-footer',
            'footer-inner': '.page-footer-inner',
        },
        breakpoints: {
            'screen-lg-med': "1260px",
            'screen-lg-min': "1200px",
            'screen-md-max': "1199px",
            'screen-md-min': "992px",
            'screen-sm-max': "991px",
            'screen-sm-min': "768px",
            'screen-xs-max': "767px",
            'screen-xs-min': "480px"
        },
        sidebar: {
            autoScroll: true,
            keepExpanded: true,
            slideSpeed: 200,
            togglerSelector: '.sidebar-toggler',
            openCloseDuration: 600,
            openedWidth: 235,
            closedWidth: 54,
            resolveActive: true
        },
        preferences: {
            sidebar: {
                hidden: false,
                closed: false,
                reversed: false,
                fixed: true,
                compact: false,
            },
            header: {
                fixed: true
            },
            footer: {
                fixed: true
            },
            page: {
                boxed: false
            }
        },
    };

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


    function assignElements($e:Function) {
        $header = $e('header');
        $headerInner = $e('header-inner');
        $container = $e('container');
        $content = $e('content');
        $sidebar = $e('sidebar');
        $sidebarMenu = $e('sidebar-menu');
        $footer = $e('footer');
        $search = $e('search');
    }

    export class LayoutComponent extends Component {

        public openCloseInProgress:boolean = false;
        public closing:boolean = false;

        public init() {
            this.app.debug.log('LayoutComponent init');
            this.app.on('booted', () => {
                debug.log('layout received event emitted from app: booted');
                this.removePageLoader();
            })
        }

        public boot() {
            var self:LayoutComponent = this;
            debug.log('LayoutComponent debug');
            assignElements(this.el.bind(this));

            self._initHeader();
            self._initFixed();
            self._initSubmenus();
            self._initToggleButton();
            self._initGoTop();
            //self._initPreferences();
            self._initResizeEvent();

            // self._initLogo();
            self.sidebarResolveActive();
            self.app.on('resize', function () {
                self._initFixed();
            });
            self.fixBreadcrumb();
        }


        public removePageLoader() {
            $body.removeClass('page-loading');
        }

        public createLoader(name, el):Loader {
            return new Loader(name, el);
        }

        public el(selectorName:string):JQuery {
            var selector:string = this.config.get('layout.selectors.' + selectorName);
            return $(selector);
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
                    this.app.emit('resize');
                }, 50);
            });
        }

        protected _initHeader() {
            var self:LayoutComponent = this;
        }

        public fixBreadcrumb() {
            var $i:JQuery = $('.page-breadcrumb').find('> li').last().find('i');
            if ($i.size() > 0) {
                $i.remove();
            }
        }

        protected _initGoTop() {
            var self:LayoutComponent = this;
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

        protected _initFixed() {
            plugins.destroySlimScroll($sidebarMenu);
            //$sidebarMenu.parent().find('.slimScrollDiv, .slimScrollBar, .slimScrollRail').remove();
            if (!this.isFixed()) {
                return;
            }
            if (getViewPort().width >= this.getBreakpoint('md')) {
                $sidebarMenu.attr("data-height", this.calculateViewportHeight());
                plugins.makeSlimScroll($sidebarMenu);
                $('.page-content').css('min-height', this.calculateViewportHeight() + 'px');
            }
        }

        protected _initSubmenus() {
            var self:LayoutComponent = this;
            $sidebar.on('click', 'li > a', function (e) {
                var $this = $(this);
                if (getViewPort().width >= self.getBreakpoint('md') && $this.parents('.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
                    return;
                }

                if ($this.next().hasClass('sub-menu') === false) {
                    if (getViewPort().width < self.getBreakpoint('md') && $sidebarMenu.hasClass("in")) { // close the menu on mobile view while laoding a page
                        $('.page-header .responsive-toggler').click();
                    }
                    return;
                }

                if ($this.next().hasClass('sub-menu always-open')) {
                    return;
                }

                var $parent = $this.parent().parent();
                var $subMenu = $this.next();

                if (self.config('layout.sidebar.keepExpand') !== true) {
                    $parent.children('li.open').children('a').children('.arrow').removeClass('open');
                    $parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(self.config('layout.sidebar.slideSpeed'));
                    $parent.children('li.open').removeClass('open');
                }


                var slideOffeset = -200;

                if ($subMenu.is(":visible")) {
                    $this.find('.arrow').removeClass("open");
                    $this.parent().removeClass("open");
                    $subMenu.slideUp(self.config('layout.sidebar.slideSpeed'), function () {
                        if (self.config('layout.sidebar.autoScroll') === true && self.isClosed() === false) {
                            if ($body.hasClass('page-sidebar-fixed')) {
                                $sidebar.slimScroll(<any> {
                                    'scrollTo': ($this.position()).top
                                });
                            } else {
                                self.scrollTo($this, slideOffeset);
                            }
                        }
                    });
                } else {
                    $this.find('.arrow').addClass("open");
                    $this.parent().addClass("open");
                    $subMenu.slideDown(self.config('layout.sidebar.slideSpeed'), function () {
                        if (self.config('layout.sidebar.autoScroll') === true && self.isClosed() === false) {
                            if (self.isFixed()) {
                                $sidebar.slimScroll(<any> {
                                    'scrollTo': ($this.position()).top
                                });
                            } else {
                                self.scrollTo($this, slideOffeset);
                            }
                        }
                    });
                }

                e.preventDefault();
            });
            $document.on('click', '.page-header-fixed-mobile .responsive-toggler', function () {
                self.scrollTop();
            });
        }

        protected _initToggleButton() {
            var self:LayoutComponent = this;
            $body.on('click', self.config('layout.sidebar.togglerSelector'), function (e) {
                if (self.isClosed()) {
                    self.openSidebar();
                } else {
                    self.closeSidebar();
                }
            });

            self._initFixedHovered();
        }

        protected _initFixedHovered() {
            var self:LayoutComponent = this;
            if (self.isFixed()) {
                $sidebarMenu.on('mouseenter', function () {
                    if (self.isClosed()) {
                        $sidebar.removeClass('page-sidebar-menu-closed');
                    }
                }).on('mouseleave', function () {
                    if (self.isClosed()) {
                        $sidebar.addClass('page-sidebar-menu-closed');
                    }
                });
            }
        }


        /****************************/
        // Sidebar interaction
        /****************************/

        protected setSidebarClosed(closed:boolean = true) {
            $body.ensureClass("page-sidebar-closed", closed);
            $sidebarMenu.ensureClass("page-sidebar-menu-closed", closed);
            if (this.isClosed() && this.isFixed()) {
                $sidebarMenu.trigger("mouseleave");
            }
            $window.trigger('resize');
        }

        public closeSubmenus() {
            var self:LayoutComponent = this;
            $sidebarMenu.find('ul.sub-menu').each(function () {
                var $ul:JQuery = $(this);
                if ($ul.is(":visible")) {
                    $('.arrow', $ul).removeClass("open");
                    $ul.parent().removeClass("open");
                    $ul.slideUp(self.config('layout.sidebar.slideSpeed'));
                }
            });
            this.app.emit('sidebar:close-submenus');
        }

        public closeSidebar(callback?:any):JQueryPromise<any> {
            var self:LayoutComponent = this;
            var $main = $('main');

            if (self.openCloseInProgress || self.isClosed()) {
                return;
            }
            self.openCloseInProgress = true;
            self.closing = true;
            var defer:any = $.Deferred();

            this.app.emit('sidebar:close');
            self.closeSubmenus();

            var $title = $sidebarMenu.find('li a span.title, li a span.arrow');


            async.parallel([
                function (cb:any) {
                    $content.animate({
                        'margin-left': self.config('layout.sidebar.closedWidth')
                    }, self.config('layout.sidebar.openCloseDuration'), function () {
                        cb();
                    })
                },
                function (cb:any) {
                    $sidebar.animate({
                        width: self.config('layout.sidebar.closedWidth')
                    }, self.config('layout.sidebar.openCloseDuration'), function () {
                        cb();
                    })
                },
                function (cb:any) {
                    var closed = 0;
                    $title.animate({
                        opacity: 0
                    }, self.config('layout.sidebar.openCloseDuration') / 3, function () {
                        closed++;
                        if (closed == $title.length) {
                            $title.css('display', 'none');
                            cb();
                        }
                    })
                }
            ], function (err, results) {

                self.setSidebarClosed(true);
                $sidebar.removeAttr('style');
                $content.removeAttr('style');
                $title.removeAttr('style');

                self.closing = false;
                self.openCloseInProgress = false;

                if (_.isFunction(callback)) {
                    callback();
                }
                defer.resolve();
                self.app.emit('sidebar:closed');
            });
            return defer.promise();
        }

        public openSidebar(callback?:any):JQueryPromise<any> {
            var self:LayoutComponent = this;
            if (self.openCloseInProgress || !self.isClosed()) {
                return;
            }

            self.openCloseInProgress = true;
            var defer:any = $.Deferred();
            var $title:JQuery = $sidebarMenu.find('li a span.title, li a span.arrow');

            self.setSidebarClosed(false);

            this.app.emit('sidebar:open');
            async.parallel([
                function (cb:any) {
                    $content.css('margin-left', self.config('layout.sidebar.closedWidth'))
                        .animate({
                        'margin-left': self.config('layout.sidebar.openedWidth')
                    }, self.config('layout.sidebar.openCloseDuration'), function () {
                        cb();
                    })
                },
                function (cb:any) {
                    $sidebar.css('width', self.config('layout.sidebar.closedWidth'))
                        .animate({
                        width: self.config('layout.sidebar.openedWidth')
                    }, self.config('layout.sidebar.openCloseDuration'), function () {
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
                        }, self.config('layout.sidebar.openCloseDuration ')/ 2, function () {
                            opened++;
                            if (opened == $title.length) {
                                $title.css('display', 'none');
                                cb();
                            }
                        })
                    }, self.config('layout.sidebar.openCloseDuration') / 2)
                }
            ], function (err, results) {
                $content.removeAttr('style');
                $sidebar.removeAttr('style');
                $title.removeAttr('style');

                self.openCloseInProgress = false;

                if (_.isFunction(callback)) {
                    callback();
                }
                defer.resolve();

                self.app.emit('sidebar:opened');
            });
            return defer.promise();
        }

        public hideSidebar() {
            if (this.config('layout.preferences.sidebar.hidden')) {
                return;
            }

            if (!$body.hasClass('page-sidebar-closed')) {
                $body.addClass('page-sidebar-closed');
            }
            if (!$body.hasClass('page-sidebar-hide')) {
                $body.addClass('page-sidebar-hide');
            }
            $('header.top .sidebar-toggler').hide();
            this.app.emit('sidebar:hide');
        }

        public showSidebar() {
            //this.options.hidden = false;
            $body.removeClass('page-sidebar-closed')
                .removeClass('page-sidebar-hide');
            $('header.top .sidebar-toggler').show();
            this.app.emit('sidebar:show');
        }

        protected sidebarResolveActive() {
            var self:LayoutComponent = this;
            if (this.config('layout.sidebar.resolveActive') !== true) return;
            var currentPath = util.str.trim(location.pathname.toLowerCase(), '/');
            var md = this.getBreakpoint('md');
            if (getViewPort().width < md) {
                return; // not gonna do this for small devices
            }
            $sidebarMenu.find('a').each(function () {
                var href:string = this.getAttribute('href');
                if (!_.isString(href)) {
                    return;
                }

                href = util.str.trim(href)
                    .replace(location['origin'], '')
                    .replace(/\.\.\//g, '');

                if (location['hostname'] !== 'localhost') {
                    href = self.config('docgen.baseUrl') + href;
                }

                var path = util.str.trim(href, '/');
                debug.log(path, currentPath, href);

                if (path == currentPath) { //util.strEndsWith(path, currentPath)
                    debug.log('Resolved active sidebar link', this);
                    var $el = $(this);
                    $el.parent('li').not('.active').addClass('active');
                    var $parentsLi = $el.parents('li').addClass('open');
                    $parentsLi.find('.arrow').addClass('open');
                    $parentsLi.has('ul').children('ul').show();
                }
            })

        }


        public setSidebarFixed(fixed:boolean) {
            $body.ensureClass("page-sidebar-fixed", fixed);

            $sidebarMenu.ensureClass("page-sidebar-menu-fixed", fixed);
            $sidebarMenu.ensureClass("page-sidebar-menu-default", !fixed);
            if (!fixed) {
                $sidebarMenu.unbind('mouseenter').unbind('mouseleave');
            } else {
                this._initFixedHovered();
            }
            this._initFixed();
            this.app.emit('sidebar:' + fixed ? 'fix' : 'unfix');
        }

        public setSidebarCompact(compact:boolean) {
            $sidebarMenu.ensureClass("page-sidebar-menu-compact", compact);
            this.app.emit('sidebar:' + compact ? 'compact' : 'decompact');
        }

        public setSidebarHover(hover:boolean) {
            $sidebarMenu.ensureClass("page-sidebar-menu-hover-submenu", hover && !this.isFixed());
            this.app.emit('sidebar:' + hover ? 'hover' : 'dehover');
        }

        public setSidebarReversed(reversed:boolean) {
            $body.ensureClass("page-sidebar-reversed", reversed);
            this.app.emit('sidebar:' + reversed ? 'set-right' : 'set-left');
        }

        /****************************/
        // Layout interaction
        /****************************/


        public setHeaderFixed(fixed:boolean) {
            if (fixed === true) {
                $body.addClass("page-header-fixed");
                $header.removeClass("navbar-static-top").addClass("navbar-fixed-top");
            } else {
                $body.removeClass("page-header-fixed");
                $header.removeClass("navbar-fixed-top").addClass("navbar-static-top");
            }
        }

        public setFooterFixed(fixed:boolean) {
            if (fixed === true) {
                $body.addClass("page-footer-fixed");
            } else {
                $body.removeClass("page-footer-fixed");
            }
        }

        public setBoxed(boxed:boolean) {
            if (boxed === true) {
                $body.addClass("page-boxed");
                $headerInner.addClass("container");
                var cont = $('body > .clearfix').after('<div class="container"></div>');
                $container.appendTo('body > .container');
                if (this.config.get('layout.preferences.footer.fixed')) {
                    $footer.html('<div class="container">' + $footer.html() + '</div>');
                } else {
                    $footer.appendTo('body > .container');
                }
                this.app.emit('resize');
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

        public scrollTo(el?:any, offset?:number) {
            var $el:JQuery = typeof(el) === 'string' ? $(el) : el;
            var pos = ($el && $el.size() > 0) ? $el.offset().top : 0;

            if ($el) {

                if ($body.hasClass('page-header-fixed')) {
                    pos = pos - $header.height();
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
            return parseInt(this.config.get('layout.breakpoints.screen-' + which + '-min').replace('px', ''));
        }

        public calculateViewportHeight() {
            var self:LayoutComponent = this;
            var sidebarHeight = getViewPort().height - $('.page-header').outerHeight() - 30;
            if ($body.hasClass("page-footer-fixed")) {
                sidebarHeight = sidebarHeight - $footer.outerHeight();
            }

            return sidebarHeight;
        }

        public isClosed():boolean {
            return $body.hasClass('page-sidebar-closed')
        }

        public isHidden():boolean {
            return $body.hasClass('page-sidebar-hide');
        }

        public isFixed():boolean {
            return $('.page-sidebar-fixed').size() !== 0;
        }

    }


    export class Loader {
        private name:string;
        private $el:JQuery;
        private $loader:JQuery;
        private $parent:JQuery;
        private started:boolean;

        constructor(name:string, el:any) {
            this.name = name;
            this.$el = typeof(el) === 'string' ? $(el) : el;
        }

        public stop() {
            if (!this.started) {
                return;
            }
            this.$el.removeClass(this.name + '-loader-content');
            this.$parent.removeClass(this.name + '-loading');
            this.$loader.remove();
            this.started = false;
        }

        public start() {
            if (this.started) {
                return;
            }
            this.$el.addClass(this.name + '-loader-content');
            this.$parent = this.$el.parent().addClass(this.name + '-loading');
            var $loaderInner = $('<div>').addClass('loader loader-' + this.name);
            this.$loader = $('<div>').addClass(this.name + '-loader');
            this.$loader.append($loaderInner).prependTo(this.$parent);
        }
    }


    Components.register('layout', LayoutComponent, defaultConfig);
}
