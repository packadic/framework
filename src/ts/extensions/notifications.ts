module packadic.extensions {

    var defaultConfig:any = {
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
                    $(containerSelector).addClass('list-group');

                    this['$closeButton'].append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>');
                    this['$closeButton'].addClass('close');

                    this['$bar'].addClass("list-group-item").css('padding', '0px');

                    switch (this.options.type) {
                        case 'alert':
                        case 'notification':
                            this['$bar'].addClass("list-group-item-info");
                            break;
                        case 'warning':
                            this['$bar'].addClass("list-group-item-warning");
                            break;
                        case 'error':
                            this['$bar'].addClass("list-group-item-danger");
                            break;
                        case 'information':
                            this['$bar'].addClass("list-group-item-info");
                            break;
                        case 'success':
                            this['$bar'].addClass("list-group-item-success");
                            break;
                    }

                    this['$message'].css({
                        fontSize: '13px',
                        lineHeight: '16px',
                        textAlign: 'center',
                        padding: '8px 10px 9px',
                        width: 'auto',
                        position: 'relative'
                    });
                },
                callback: {
                    onShow: function () {
                    },
                    onClose: function () {
                    }
                }
            }
        },
        layouts: {
            topRight: {
                name: 'topRight',
                options: {/* overrides options */},
                container: {
                    object: '<ul id="noty_topRight_layout_container" />',
                    selector: 'ul#noty_topRight_layout_container',
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
                        console.log('noty topright packadic', layout.isHeaderFixed(), style);

                        $(this).css(style);

                        if (window.innerWidth < 600) {
                            $(this).css({
                                right: 5
                            });
                        }
                    }
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
            }
        }
    };

    var $window:JQuery = $(<any> window),
        $document:JQuery = $(<any> document),
        $body:JQuery = $('body');

    @extension('notifications', defaultConfig)
    export class NotificationsExtensions extends Extension {
        public init(){
            this.app.debug.log('NotificationsExtensions init');

            $.extend($.noty.themes, this.config('notifications.themes'));
            $.extend($.noty.layouts, this.config('notifications.layouts'));

            this.app.on('booted', () => {
                debug.log('NotificationsExtensions received event emitted from app: booted');
            })
        }

        public boot() {
            debug.log('NotificationsExtensions debug');
        }
    }

}
