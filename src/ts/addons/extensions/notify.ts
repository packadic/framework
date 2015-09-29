

module packadic.extensions {

    function _layout(name:string, opts:any = {}) {
        return $.extend(true, {
            name: name,
            options: {},
            container: {
                object: '<ul class="noty_' + name + '_layout_container" />',
                selector: 'ul.noty_' + name + '_layout_container',
                style: $.noop
            },
            parent: {
                object: '<li />',
                selector: 'li',
                css: {}
            },
            css: {
                display: 'none',
                width: '310px'
            },
            addClass: ''
        }, opts);
    }

    var defaultConfig:any = {
        animations: {
            jquery_default: {
                open: {height: 'toggle'}, // jQuery animate function property object
                close: {height: 'toggle'}, // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            },
            css_default: {
                open: 'animated slideInLeft', // Animate.css class names
                close: 'animated slideOutDown', // Animate.css class names
            }
        },
        defaults: {
            layout: 'topRight',
            theme: 'packadicTheme', // or 'relax'
            type: 'alert',
            text: '', // can be html or string
            dismissQueue: true, // If you want to use queue feature set this true
            template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
            animation: '<%= notifications.animations.css_default %>',
            timeout: false, // delay for closing event. Set false for sticky notifications
            force: false, // adds notification to the beginning of queue when set to true
            modal: false,
            maxVisible: 5, // you can set max visible notification for dismissQueue true option,
            killer: false, // for close all notifications before show
            closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
            callback: {
                onShow: $.noop,
                afterShow: $.noop,
                onClose: $.noop,
                afterClose: $.noop,
                onCloseClick: $.noop
            },
            buttons: false // an array of buttons
        },
        themes: {
            packadicTheme: {
                name: 'packadicTheme',
                modal: {
                    css: {
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        zIndex: 10000,
                        opacity: 0.6,
                        display: 'none',
                        left: 0,
                        top: 0
                    }
                },
                style: function () {
                    var containerSelector = this.options.layout.container.selector;
                    $(containerSelector).addClass('noty_packadicTheme noty_container list-group');
                    this['$closeButton'].append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>');
                    this['$closeButton'].addClass('close noty_close');

                    this['$bar'].addClass("list-group-item noty_item noty_item_" + this.options.type).css('padding', '0px');
                },
                callback: {
                    onShow: $.noop,
                    onClose: $.noop
                }
            }
        },
        layouts: {
            topRight: _layout('topRight', {
                container: {
                    style: function () {
                        var style = {
                            top: 20,
                            right: 20,
                            position: 'fixed',
                            //width        : '310px',
                            'min-width': '200px',
                            height: 'auto',
                            margin: 0,
                            padding: 0,
                            listStyleType: 'none',
                            zIndex: 10000000
                        };

                        var app:Application = packadic.app;
                        var layout:LayoutExtension = <LayoutExtension> packadic.app.extensions.get('layout');

                        layout.isHeaderFixed() ? style.top = $(app.$$['header']).innerHeight() + 5 : null;
                        //console.log('noty topright packadic', layout.isHeaderFixed(), style);

                        $(this).css(style);

                        if (window.innerWidth < 600) {
                            $(this).css({
                                right: 5
                            });
                        }
                    }
                }
            }),
            footerRight: _layout('footerRight', {
                container: {
                    style: function () {
                        this.$item = $(this).find('.noty_item');
                        this.$bar = this.$item.find('.noty_bar');
                        this.$message = this.$bar.find('.noty_message');
                        this.$closeButton = this.$bar.find('.noty_close');
                        this.$buttons = this.$bar.find('.noty_buttons');
                        this.$text = this.$bar.find('.noty_text');

                        var app = packadic.app;
                        /** @type {Extensions} */
                        var extensions = app.extensions;
                        /** @type {LayoutExtension} */
                        var layout = extensions.get('layout');

                        var $footer = $(app.$$['footer']);
                        var pr = parseInt($footer.css('padding-right').replace('px', '')),
                            height = $footer.outerHeight();

                        var style = {
                            right: pr,
                            height: height
                        };

                        console.log('noty footeRRight', this);

                        this.$item.css({
                            ///float: 'right'
                        });

                        this.$bar.css({
                            height: height
                        });


                        this.$message.css({
                        });

                        $(this).css(style).appendTo($footer);


                    }
                }
            })
        }
    };


    var $window:JQuery = $(<any> window),
        $document:JQuery = $(<any> document),
        $body:JQuery = $('body');

    @extension('notify', defaultConfig)
    export class NotifyExtension extends Extension {
        public init() {

            this.app.debug.log('NotificationsExtensions init');

            $.extend($.noty.themes, this.config('notify.themes'));
            $.extend($.noty.layouts, this.config('notify.layouts'));

            this.app.on('booted', () => {
                debug.log('NotificationsExtensions received event emitted from app: booted');
            })
        }

        public boot() {
            debug.log('NotificationsExtensions debug');
        }

        public create(opts:any = {}):NotyObjectStatic {
            return $.notyRenderer.init($.extend(true, this.config('notify.defaults'), opts));
        }

        public footer(text:string, type:string = 'information', opts:any = {}):NotyObjectStatic {

            var footer = this.create($.extend(true, opts, {
                text: text,
                type: type,
                layout: 'footerRight',
                theme: 'packadicTheme'
            }));

            return footer;
        }
    }

}
