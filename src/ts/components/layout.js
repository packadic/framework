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
            selectors: {
                'search': '.sidebar-search',
                'header': '.page-header',
                'header-inner': '<%= layout.selectors.header %> .page-header-inner',
                'container': '.page-container',
                'sidebar-wrapper': '.page-sidebar-wrapper',
                'sidebar': '.page-sidebar',
                'sidebar-menu': '.page-sidebar-menu',
                'content-wrapper': '.page-content-wrapper',
                'content': '.page-content',
                'content-head': '<%= layout.selectors.content %> .page-head',
                'content-breadcrumbs': '<%= layout.selectors.content %> .page-breadcrumbs',
                'content-inner': '<%= layout.selectors.content %> .page-content-inner',
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
            breakpoints4: {
                xs: 0,
                sm: 544,
                md: 768,
                lg: 992,
                xl: 1200
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
                    condensed: false,
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
        var $window = $(window), $document = $(document), $body = $('body');
        var Elements = (function () {
            function Elements(layout) {
                this.l = layout;
            }
            Object.defineProperty(Elements.prototype, "header", {
                get: function () {
                    return this.l.el('header');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "headerInner", {
                get: function () {
                    return this.l.el('header-inner');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "container", {
                get: function () {
                    return this.l.el('container');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "content", {
                get: function () {
                    return this.l.el('content');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "sidebar", {
                get: function () {
                    return this.l.el('sidebar');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "sidebarMenu", {
                get: function () {
                    return this.l.el('sidebar-menu');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "footer", {
                get: function () {
                    return this.l.el('footer');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Elements.prototype, "footerInner", {
                get: function () {
                    return this.l.el('footer-inner');
                },
                enumerable: true,
                configurable: true
            });
            return Elements;
        })();
        var el;
        var LayoutComponent = (function (_super) {
            __extends(LayoutComponent, _super);
            function LayoutComponent() {
                _super.apply(this, arguments);
                this.openCloseInProgress = false;
                this.closing = false;
            }
            LayoutComponent.prototype.init = function () {
                var _this = this;
                this.app.debug.log('LayoutComponent init');
                this.app.on('booted', function () {
                    packadic.debug.log('layout received event emitted from app: booted');
                    _this.removePageLoader();
                });
            };
            LayoutComponent.prototype.boot = function () {
                packadic.debug.log('LayoutComponent debug');
                el = new Elements(this);
                this._initLayoutApiActions();
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
            };
            LayoutComponent.prototype._initLayoutApiActions = function () {
                var _this = this;
                var self = this;
                this._apiCallbacks = {};
                var apiActions = {
                    'theme': function (themeName) {
                        _this.setTheme(themeName);
                    },
                    'page-boxed': function () {
                        _this.setBoxed(!_this.isBoxed());
                    },
                    'page-edged': function () {
                        _this.setEdged(!_this.isEdged());
                    },
                    'header-fixed': function () {
                        _this.setHeaderFixed(!_this.isHeaderFixed());
                    },
                    'footer-fixed': function () {
                        _this.setFooterFixed(!_this.isFooterFixed());
                    },
                    'toggle-sidebar': function () {
                        _this.isSidebarClosed() ? _this.openSidebar() : _this.closeSidebar();
                    },
                    'sidebar-fixed': function () {
                        _this.setSidebarFixed(!_this.isSidebarFixed());
                    },
                    'close-submenus': function () {
                        _this.closeSubmenus();
                    },
                    'close-sidebar': function () {
                        _this.closeSidebar();
                    },
                    'open-sidebar': function () {
                        _this.openSidebar();
                    },
                    'hide-sidebar': function () {
                        _this.hideSidebar();
                    },
                    'show-sidebar': function () {
                        _this.showSidebar();
                    },
                    'condensed-sidebar': function () {
                        _this.setSidebarCondensed(!_this.isSidebarCondensed());
                    },
                    'hover-sidebar': function () {
                        _this.setSidebarHover(!_this.isSidebarHover());
                    },
                    'reversed-sidebar': function () {
                        _this.setSidebarReversed(!_this.isSidebarReversed());
                    },
                };
                this.setApiActions(apiActions);
                $body.onClick('[data-layout-api]', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var action = $(this).attr('data-layout-api');
                    var args = $(this).attr('data-layout-api-args');
                    console.log('data-layout-api', this, action, args);
                    self.api(action, args);
                });
            };
            LayoutComponent.prototype.setApiAction = function (actionName, callbackFn) {
                this._apiCallbacks[actionName] = callbackFn;
            };
            LayoutComponent.prototype.setApiActions = function (apiActions) {
                var _this = this;
                $.each(apiActions, function (actionName, actionFn) {
                    _this.setApiAction(actionName, actionFn);
                });
            };
            LayoutComponent.prototype.api = function (action) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var self = this;
                if (!this._apiCallbacks[action]) {
                    throw new Error('Layout api action ' + action + ' does not exist');
                }
                this._apiCallbacks[action](args);
            };
            LayoutComponent.prototype.removePageLoader = function () {
                $body.removeClass('page-loading');
            };
            LayoutComponent.prototype.createLoader = function (name, el) {
                return new Loader(name, el);
            };
            LayoutComponent.prototype.el = function (selectorName) {
                var selector = this.config.get('layout.selectors.' + selectorName);
                return $(selector);
            };
            LayoutComponent.prototype._initResizeEvent = function () {
                var _this = this;
                var resize;
                $(window).resize(function () {
                    if (resize) {
                        clearTimeout(resize);
                    }
                    resize = setTimeout(function () {
                        _this.app.emit('resize');
                    }, 50);
                });
            };
            LayoutComponent.prototype._initSidebarResizeListener = function () {
                var _this = this;
                var resizing = false;
                this.app.on('resize', function () {
                    if (resizing) {
                        return;
                    }
                    resizing = true;
                    setTimeout(function () {
                        _this._initFixed();
                        resizing = false;
                    }, _this.config('layout.sidebar.slideSpeed'));
                });
            };
            LayoutComponent.prototype._initEdgedHeightResizeListener = function () {
                var _this = this;
                var listener = function () {
                    if (_this.isEdged() && packadic.getViewPort().width >= _this.getBreakpoint('md')) {
                        packadic.debug.log('edged height resize', 'viewport height', packadic.getViewPort().height, 'calculated', _this.calculateViewportHeight());
                        el.sidebarMenu.css('min-height', _this.calculateViewportHeight());
                        el.content.css('min-height', _this.calculateViewportHeight());
                    }
                    else {
                        el.sidebarMenu.removeAttr('style');
                        el.content.removeAttr('style');
                    }
                };
                this.app.on('resize', listener);
                this.app.on('sidebar:closed', listener);
                this.app.on('sidebar:opened', listener);
                listener();
            };
            LayoutComponent.prototype._initHeader = function () {
                var self = this;
            };
            LayoutComponent.prototype.fixBreadcrumb = function () {
                var $i = $('.page-breadcrumb').find('> li').last().find('i');
                if ($i.size() > 0) {
                    $i.remove();
                }
            };
            LayoutComponent.prototype._initGoTop = function () {
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
            LayoutComponent.prototype._initFixed = function () {
                packadic.plugins.destroySlimScroll(el.sidebarMenu);
                if (!this.isSidebarFixed()) {
                    return;
                }
                if (packadic.getViewPort().width >= this.getBreakpoint('md')) {
                    el.sidebarMenu.attr("data-height", this.calculateViewportHeight());
                    packadic.plugins.makeSlimScroll(el.sidebarMenu, {
                        position: this.isSidebarReversed() ? 'left' : 'right',
                        allowPageScroll: false
                    });
                }
            };
            LayoutComponent.prototype._initSidebarSubmenus = function () {
                var self = this;
                el.sidebar.onClick('li > a', function (e) {
                    var $this = $(this);
                    if (packadic.getViewPort().width >= self.getBreakpoint('md') && $this.parents('.page-sidebar-menu-hover-submenu').size() === 1) {
                        return;
                    }
                    if ($this.next().hasClass('sub-menu') === false) {
                        if (packadic.getViewPort().width < self.getBreakpoint('md') && el.sidebarMenu.hasClass("in")) {
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
                    var visible = $subMenu.is(":visible");
                    $this.find('.arrow').ensureClass("open", !visible);
                    $this.parent().ensureClass("open", !visible);
                    packadic.debug.log('sidebarsubmenu', visible, $this, $subMenu);
                    $subMenu[visible ? 'slideUp' : 'slideDown'](self.config('layout.sidebar.slideSpeed'), function () {
                        if (self.config('layout.sidebar.autoScroll') === true && self.isSidebarClosed() === false) {
                            if (self.isSidebarFixed()) {
                                el.sidebarMenu.slimScroll({ scrollTo: $this.position().top });
                            }
                            else {
                                self.scrollTo($this, slideOffeset);
                            }
                        }
                    });
                    e.preventDefault();
                });
                $document.onClick('.page-header-fixed-mobile .responsive-toggler', function () {
                    self.scrollTop();
                });
            };
            LayoutComponent.prototype._initToggleButton = function () {
                return;
                var self = this;
                $body.onClick(self.config('layout.sidebar.togglerSelector'), function (e) {
                    if (self.isSidebarClosed()) {
                        self.openSidebar();
                    }
                    else {
                        self.closeSidebar();
                    }
                });
                self._initFixedHovered();
            };
            LayoutComponent.prototype._initFixedHovered = function () {
                var self = this;
                if (self.isSidebarFixed()) {
                    el.sidebarMenu.on('mouseenter', function () {
                        if (self.isSidebarClosed()) {
                            el.sidebar.removeClass('page-sidebar-menu-closed');
                        }
                    }).on('mouseleave', function () {
                        if (self.isSidebarClosed()) {
                            el.sidebar.addClass('page-sidebar-menu-closed');
                        }
                    });
                }
            };
            LayoutComponent.prototype.setSidebarClosed = function (closed) {
                if (closed === void 0) { closed = true; }
                $body.ensureClass("page-sidebar-closed", closed);
                el.sidebarMenu.ensureClass("page-sidebar-menu-closed", closed);
                if (this.isSidebarClosed() && this.isSidebarFixed()) {
                    el.sidebarMenu.trigger("mouseleave");
                }
            };
            LayoutComponent.prototype.closeSubmenus = function () {
                el.sidebarMenu.children('li.open').children('a').children('.arrow').removeClass('open');
                el.sidebarMenu.children('li.open').children('.sub-menu:not(.always-open)').slideUp(this.config('layout.sidebar.slideSpeed'));
                el.sidebarMenu.children('li.open').removeClass('open');
                this.app.emit('sidebar:close-submenus');
            };
            LayoutComponent.prototype.closeSidebar = function (callback) {
                var self = this;
                var $main = $('main');
                if (self.openCloseInProgress || self.isSidebarClosed()) {
                    return;
                }
                self.openCloseInProgress = true;
                self.closing = true;
                var defer = $.Deferred();
                this.app.emit('sidebar:close');
                self.closeSubmenus();
                var $title = el.sidebarMenu.find('li a span.title, li a span.arrow');
                async.parallel([
                    function (cb) {
                        el.content.animate({
                            'margin-left': self.config('layout.sidebar.closedWidth')
                        }, self.config('layout.sidebar.openCloseDuration'), function () {
                            cb();
                        });
                    },
                    function (cb) {
                        el.sidebar.animate({
                            width: self.config('layout.sidebar.closedWidth')
                        }, self.config('layout.sidebar.openCloseDuration'), function () {
                            cb();
                        });
                    },
                    function (cb) {
                        var closed = 0;
                        $title.animate({
                            opacity: 0
                        }, self.config('layout.sidebar.openCloseDuration') / 3, function () {
                            closed++;
                            if (closed == $title.length) {
                                $title.css('display', 'none');
                                cb();
                            }
                        });
                    }
                ], function (err, results) {
                    self.setSidebarClosed(true);
                    el.sidebar.removeAttr('style');
                    el.content.removeAttr('style');
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
            };
            LayoutComponent.prototype.openSidebar = function (callback) {
                var self = this;
                if (self.openCloseInProgress || !self.isSidebarClosed()) {
                    return;
                }
                self.openCloseInProgress = true;
                var defer = $.Deferred();
                var $title = el.sidebarMenu.find('li a span.title, li a span.arrow');
                self.setSidebarClosed(false);
                this.app.emit('sidebar:open');
                async.parallel([
                    function (cb) {
                        el.content.css('margin-left', self.config('layout.sidebar.closedWidth'))
                            .animate({
                            'margin-left': self.config('layout.sidebar.openedWidth')
                        }, self.config('layout.sidebar.openCloseDuration'), function () {
                            cb();
                        });
                    },
                    function (cb) {
                        el.sidebar.css('width', self.config('layout.sidebar.closedWidth'))
                            .animate({
                            width: self.config('layout.sidebar.openedWidth')
                        }, self.config('layout.sidebar.openCloseDuration'), function () {
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
                            }, self.config('layout.sidebar.openCloseDuration ') / 2, function () {
                                opened++;
                                if (opened == $title.length) {
                                    $title.css('display', 'none');
                                    cb();
                                }
                            });
                        }, self.config('layout.sidebar.openCloseDuration') / 2);
                    }
                ], function (err, results) {
                    el.content.removeAttr('style');
                    el.sidebar.removeAttr('style');
                    $title.removeAttr('style');
                    self.openCloseInProgress = false;
                    if (_.isFunction(callback)) {
                        callback();
                    }
                    defer.resolve();
                    self.app.emit('sidebar:opened');
                });
                return defer.promise();
            };
            LayoutComponent.prototype.hideSidebar = function () {
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
            };
            LayoutComponent.prototype.showSidebar = function () {
                $body.removeClass('page-sidebar-closed')
                    .removeClass('page-sidebar-hide');
                $('header.top .sidebar-toggler').show();
                this.app.emit('sidebar:show');
            };
            LayoutComponent.prototype.sidebarResolveActive = function () {
                var self = this;
                if (this.config('layout.sidebar.resolveActive') !== true)
                    return;
                var currentPath = packadic.util.str.trim(location.pathname.toLowerCase(), '/');
                var md = this.getBreakpoint('md');
                if (packadic.getViewPort().width < md) {
                    return;
                }
                el.sidebarMenu.find('a').each(function () {
                    var href = $(this).attr('href');
                    if (!_.isString(href)) {
                        return;
                    }
                    href = packadic.util.str.trim(href)
                        .replace(location['origin'], '')
                        .replace(/\.\.\//g, '');
                    if (location['hostname'] !== 'localhost') {
                        href = self.config('docgen.baseUrl') + href;
                    }
                    var path = packadic.util.str.trim(href, '/');
                    if (path == currentPath) {
                        var $el = $(this);
                        $el.parent('li').not('.active').addClass('active');
                        var $parentsLi = $el.parents('li').addClass('open');
                        $parentsLi.find('.arrow').addClass('open');
                        $parentsLi.has('ul').children('ul').show();
                    }
                });
            };
            LayoutComponent.prototype.setSidebarFixed = function (fixed) {
                $body.ensureClass("page-sidebar-fixed", fixed);
                if (!fixed) {
                    el.sidebarMenu.unbind('mouseenter').unbind('mouseleave');
                }
                else {
                    this._initFixedHovered();
                }
                this._initFixed();
                this.app.emit('sidebar:' + fixed ? 'fix' : 'unfix');
            };
            LayoutComponent.prototype.setSidebarCondensed = function (condensed) {
                $body.ensureClass("page-sidebar-condensed", condensed);
                this.app.emit('sidebar:' + condensed ? 'condensed' : 'decondensed');
            };
            LayoutComponent.prototype.setSidebarHover = function (hover) {
                el.sidebarMenu.ensureClass("page-sidebar-menu-hover-submenu", hover && !this.isSidebarFixed());
                this.app.emit('sidebar:' + hover ? 'hover' : 'dehover');
            };
            LayoutComponent.prototype.setSidebarReversed = function (reversed) {
                $body.ensureClass("page-sidebar-reversed", reversed);
                this.app.emit('sidebar:' + reversed ? 'set-right' : 'set-left');
            };
            LayoutComponent.prototype.setHeaderFixed = function (fixed) {
                if (fixed === true) {
                    $body.addClass("page-header-fixed");
                    el.header.removeClass("navbar-static-top").addClass("navbar-fixed-top");
                }
                else {
                    $body.removeClass("page-header-fixed");
                    el.header.removeClass("navbar-fixed-top").addClass("navbar-static-top");
                }
                this.app.emit('header:set-fixed', fixed);
            };
            LayoutComponent.prototype.setFooterFixed = function (fixed) {
                if (fixed === true) {
                    $body.addClass("page-footer-fixed");
                }
                else {
                    $body.removeClass("page-footer-fixed");
                }
                this.app.emit('footer:set-fixed', fixed);
            };
            LayoutComponent.prototype.setBoxed = function (boxed) {
                $body.ensureClass('page-boxed', boxed);
                el.headerInner.ensureClass("container", boxed);
                if (boxed === true) {
                    var cont = $('body > .clearfix').after('<div class="container"></div>');
                    el.container.appendTo('body > .clearfix + .container');
                    if (this.isFooterFixed()) {
                        el.footerInner.wrap($('<div>').addClass('container'));
                    }
                    else {
                        el.footer.appendTo('body > .clearfix + .container');
                    }
                }
                else {
                    var cont = $('body > .clearfix + .container').children().unwrap();
                    if (this.isFooterFixed()) {
                        el.footerInner.unwrap();
                    }
                }
                this.app.emit('resize');
                this.app.emit('set-boxed', boxed);
            };
            LayoutComponent.prototype.setEdged = function (edged) {
                if (edged && this.isBoxed()) {
                    this.setBoxed(false);
                }
                $body.ensureClass('page-edged', edged);
                this.app.emit('resize');
            };
            LayoutComponent.prototype.setTheme = function (name) {
                var $ts = $('#theme-style');
                if ($ts.length === 0) {
                    $ts = packadic.cre('link')
                        .attr('href', '#')
                        .attr('rel', 'stylesheet')
                        .attr('type', 'text/css');
                    $('head').append($ts);
                }
                $ts.attr('href', $ts.attr('href').replace(/(.*?\/styles\/themes\/theme)\-.*?\.css/, '$1-' + name + '.css'));
                return this;
            };
            LayoutComponent.prototype.reset = function () {
                $body.
                    removeClass("page-boxed").
                    removeClass("page-footer-fixed").
                    removeClass("page-sidebar-fixed").
                    removeClass("page-header-fixed").
                    removeClass("page-sidebar-reversed");
                el.header.removeClass('navbar-fixed-top');
                el.headerInner.removeClass("container");
                if (el.container.parent(".container").size() === 1) {
                    el.container.insertAfter('body > .clearfix');
                }
                if ($('.page-footer > .container').size() === 1) {
                    el.footer.html($('.page-footer > .container').html());
                }
                else if (el.footer.parent(".container").size() === 1) {
                    el.footer.insertAfter(el.container);
                    $('.scroll-to-top').insertAfter(el.footer);
                }
                $('body > .container').remove();
            };
            LayoutComponent.prototype.scrollTo = function (ele, offset) {
                var $el = typeof (ele) === 'string' ? $(ele) : ele;
                var pos = ($el && $el.size() > 0) ? $el.offset().top : 0;
                if ($el) {
                    if ($body.hasClass('page-header-fixed')) {
                        pos = pos - el.header.height();
                    }
                    pos = pos + (offset ? offset : -1 * $el.height());
                }
                $('html,body').animate({
                    scrollTop: pos
                }, 'slow');
            };
            LayoutComponent.prototype.scrollTop = function () {
                this.scrollTo();
            };
            LayoutComponent.prototype.getBreakpoint = function (which) {
                return parseInt(this.config.get('layout.breakpoints4.' + which));
            };
            LayoutComponent.prototype.calculateViewportHeight = function () {
                var sidebarHeight = packadic.getViewPort().height - el.header.outerHeight();
                if (this.isFooterFixed()) {
                    sidebarHeight = sidebarHeight - el.footer.outerHeight();
                }
                return sidebarHeight;
            };
            LayoutComponent.prototype.isHeaderFixed = function () {
                return $body.hasClass('page-header-fixed');
            };
            LayoutComponent.prototype.isFooterFixed = function () {
                return $body.hasClass('page-footer-fixed');
            };
            LayoutComponent.prototype.isBoxed = function () {
                return $body.hasClass('page-boxed');
            };
            LayoutComponent.prototype.isEdged = function () {
                return $body.hasClass('page-edged');
            };
            LayoutComponent.prototype.isSidebarClosed = function () {
                return $body.hasClass('page-sidebar-closed');
            };
            LayoutComponent.prototype.isSidebarHidden = function () {
                return $body.hasClass('page-sidebar-hide');
            };
            LayoutComponent.prototype.isSidebarFixed = function () {
                return $('.page-sidebar-fixed').size() !== 0;
            };
            LayoutComponent.prototype.isSidebarCondensed = function () {
                return $body.hasClass('page-sidebar-condensed');
            };
            LayoutComponent.prototype.isSidebarHover = function () {
                return el.sidebarMenu.hasClass('page-sidebar-menu-hover-submenu');
            };
            LayoutComponent.prototype.isSidebarReversed = function () {
                return $body.hasClass('page-sidebar-reversed');
            };
            return LayoutComponent;
        })(components.Component);
        components.LayoutComponent = LayoutComponent;
        var Loader = (function () {
            function Loader(name, el) {
                this.name = name;
                this.$el = typeof (el) === 'string' ? $(el) : el;
            }
            Loader.prototype.stop = function () {
                if (!this.started) {
                    return;
                }
                this.$el.removeClass(this.name + '-loader-content');
                this.$parent.removeClass(this.name + '-loading');
                this.$loader.remove();
                this.started = false;
            };
            Loader.prototype.start = function () {
                if (this.started) {
                    return;
                }
                this.$el.addClass(this.name + '-loader-content');
                this.$parent = this.$el.parent().addClass(this.name + '-loading');
                var $loaderInner = $('<div>').addClass('loader loader-' + this.name);
                this.$loader = $('<div>').addClass(this.name + '-loader');
                this.$loader.append($loaderInner).prependTo(this.$parent);
            };
            return Loader;
        })();
        components.Loader = Loader;
        components.Components.register('layout', LayoutComponent, defaultConfig);
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=layout.js.map