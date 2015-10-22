module packadic.extensions {


    var defaultConfig:any = {
        'default': {
            layout: ['header-fixed', 'footer-fixed'],
            theme: 'default'
        },
        'condensed-dark': {
            layout: ['header-fixed', 'footer-fixed', 'page-edged', 'sidebar-condensed'],
            theme: 'dark-sidebar'
        }
    };


    var $body:JQuery = $('body');

    export module timedTour {

        export class Progress {
            protected _el:JQuery;

            protected value:number;
            protected max:number;
            protected percent:number;

            protected timeoutRef:number;
            protected intervalRef:number;

            protected destroyed:boolean = false;

            constructor(value:number = 0, max:number = 100) {
                this.max = max;
                this._el = $('<progress>')
                    .addClass('progress progress-info')
                    .attr({max: this.max})
                    .css({margin: 0, height: '5px'})
                    .text('0%')
                    .data('Progress', this);
                this.setValue(value);
            }

            public static create(value:number = 0, max:number = 100):Progress {
                return new Progress(value, max);
            }

            public setValue(value:number):Progress {
                if (value > this.max) {
                    console.warn('cannot set value over max');
                    return;
                }
                this.value = value;
                this.percent = this.max / 100 * value;
                this._el.attr({value: value}).text(this.percent + '%');
                return this;
            }

            public getValue():number {
                return this.value;
            }

            get el():JQuery {
                return this._el;
            }

            public destroy():Progress {
                if (this.destroyed === true) {
                    return;
                }
                if (defined(this.timeoutRef)) {
                    clearTimeout(this.timeoutRef);
                }
                if (defined(this.intervalRef)) {
                    clearInterval(this.intervalRef);
                }
                this._el.remove();
                this.destroyed = true;
                return this;
            }

            public setTimeout(timeoutMs:number, onReady:Function):Progress {
                var self:Progress = this;
                var tickInterval:number = timeoutMs / 100;
                var tickIncrement:number = this.max / 100;
                this.timeoutRef = setTimeout(onReady.bind(this), timeoutMs);
                (function loop() {
                    self.intervalRef = setTimeout(() => {
                        if (self.value >= self.max) {
                            return clearInterval(self.intervalRef);
                        }
                        self.setValue(self.getValue() + tickIncrement);
                        loop();
                    }, tickInterval);
                })();


                return this;
            }
        }
    }


    export interface Anno extends AnnoJS {
        constructor(opts?:any);
    }

    export class Manno extends Anno {
        public timeout:number;

        constructor(arg?:any) {
            super(<AnnoJSOptions>{});
            var key, options, others, val;
            if (arg.__proto__ === Array.prototype) {
                options = arg.shift();
                others = arg;
            } else {
                options = arg;
            }
            for (key in options) {
                val = options[key];
                this[key] = val;
            }
            if ((others != null ? others.length : void 0) > 0) {
                this.chainTo(new Manno(others));
            }
        }

        _chainNext:any;

        chainTo(obj) {
            if (obj != null) {
                if (this._chainNext == null) {
                    this._chainNext = obj instanceof Manno ? obj : new Manno(obj);
                    this._chainNext._chainPrev = this;
                } else {
                    if (obj instanceof Manno !== true) {
                        console.warn('obj instanceof Manno !== true');
                    }
                    this._chainNext.chainTo(obj);
                }
            } else {
                console.error("Can't chainTo a null object.");
            }
            return this;
        }

        onShow(anno:any, $target:JQuery, $annoElem:JQuery):any {

            if (!defined(anno.timeout)) {
                console.warn('!defined(anno.timedTour)');
                return;
            }
            if (defined(this._onShow)) {
                this._onShow.call(this, anno, $target, $annoElem);
            }
            var progress = timedTour.Progress.create();
            ///setTimeout(()=> {
            progress
                .setTimeout(anno.timeout, () => {
                    progress.destroy();
                    anno.switchToChainNext();
                })
                .el
                .appendTo($annoElem.find('.anno-inner'));

            //}, 1400);
            $annoElem.css({'z-index': 9999});
            return progress;
        }

        onHide(anno:any, $target:JQuery, $annoElem:JQuery, returnFromOnShow:any):any {

            console.log(returnFromOnShow.getValue());
            console.log('onHide', arguments);
            returnFromOnShow.destroy();

            if (defined(this._onHide)) {
                this._onHide.call(this, anno, $target, $annoElem);
            }
        }

        _onShow:Function;
        _onHide:Function;
    }

    @extension('demo_tour', defaultConfig)
    export class DemoTour extends Extension {
        public static dependencies:string[] = ['layout', 'quick_sidebar'];
        protected tour:Manno;

        public start() {
            var self:DemoTour = this;
            var oldZ = $('#quick-sidebar').css('z-index');
            $('#quick-sidebar').css({'z-index': 9980});
            var tour:any = new Manno([
                this.timedStep(3000, '.page-header .quick-sidebar-toggler', 'left', 'The quick sidebar contains a demo of the layout API actions', {
                    _onShow: function (anno:any, $target:JQuery, $annoElem:JQuery, returnFromOnShow:any) {
                        setTimeout(() => self.layout.api('qs-show'), 1000);
                    }
                }),
                this.qsApiButton(4000, 'page-boxed', 'Switch boxed display', (action:string) =>  setTimeout(() => self.layout.api(action), 3000)),
                this.qsApiButton(4000, 'page-edged', 'Switch edged display', (action:string) => setTimeout(() => self.layout.api(action), 3000)),
                this.qsApiButton(4000, 'sidebar-close', 'Open/close the sidebar', (action:string) => setTimeout(() => self.layout.api('sidebar-open'), 3000)),
                this.qsApiButton(4000, 'sidebar-hide', 'Hide/show the sidebar', (action:string) => setTimeout(() => self.layout.api('sidebar-show'), 3000)),
                this.qsApiButton(4000, 'sidebar-condensed', 'Big/small sidebar', (action:string) => setTimeout(() => self.layout.api(action), 3000)),
                this.qsApiButton(4000, 'sidebar-reversed', 'Big/small sidebar',
                    (action:string) => {
                        self.layout.api('qs-hide');
                        setTimeout(() => {
                            self.layout.api('qs-show');
                            self.layout.api(action);
                        }, 3000);
                    }
                ),


                this.timedStep(4000, '#quick-sidebar', 'left', 'Change the theme', {
                    _onShow: function (anno:any, $target:JQuery, $annoElem:JQuery, returnFromOnShow:any) {
                        setTimeout(() => self.layout.api('theme', 'default'), 500);
                    }
                }),
                this.timedStep(9000, '#quick-sidebar', 'left', 'Change some stuff at random', {
                    _onShow: function (anno:any, $target:JQuery, $annoElem:JQuery, returnFromOnShow:any) {
                        var notify:NotifyExtension = <NotifyExtension> self.extensions.get('notify');
                        setTimeout(() => {
                            self.layout.api('page-edged');
                            self.layout.api('sidebar-hide');
                        }, 500);
                        setTimeout(() => {
                            notify.topRight('Showing some notifications');
                        }, 1500);
                        setTimeout(() => {
                            notify.footer('In the footerrr', 'error');
                        }, 2500);
                        setTimeout(() => {
                            self.layout.api('page-boxed');
                            self.layout.api('sidebar-open');
                            self.layout.api('sidebar-condensed');
                            self.layout.api('theme', 'dark-sidebar');
                        }, 5500);
                        setTimeout(() => {
                            self.layout.api('qs-show');
                        }, 7500);
                    }
                }),

                this.qsApiButton(4000, 'qs-next', 'Navigate the quick sidebar', (action:string) => setTimeout(() => self.layout.api(action), 2000)),
                this.qsApiButton(4000, 'qs-hide', 'Thats it for now!')
            ]);
            tour.start();
            console.log(tour);
        }

        protected qsApiButton(timeout:number, action:string, content:string, onShow?:Function, onHide?:Function) {
            var self:DemoTour = this;
            var bc:any;
            return this.timedStep(timeout, '#quick-sidebar', 'left', content, { //  a[data-layout-api="' + action + '"]
                _onShow: function (anno:Manno, $target:JQuery, $annoElem:JQuery) {

                    var $a = $target.find('a[data-layout-api="' + action + '"]');
                    bc = $a.css('border-color');
                    $a.css({'border-color': 'red'});

                    var offset:any = $a.offset();

                    $annoElem.css({
                        top: offset.top,
                        //left: offset.left - $annoElem.outerWidth()
                    });

                    setTimeout(() => self.layout.api(action), 1000);

                    defined(onShow) && onShow.call(this, action, anno, $target, $annoElem);
                },
                _onHide: function (anno:any, $target:JQuery, $annoElem:JQuery) {
                    $target.find('a[data-layout-api="' + action + '"]').css('border-color', bc);
                    defined(onHide) && onHide.call(this, action, anno, $target, $annoElem);
                }
            })
        }

        protected timedStep(timeout:number, target:string, position:string, content:string, options:any = {}):any {
            var step:any = this.step(target, position, content, $.extend(true, {
                timeout: timeout
            }, options));
            return step;
        }

        protected step(target:string, position:string, content:string, options:any = {}):AnnoJSOptions {
            options = $.extend(true, {
                target: target,
                position: position,
                content: content,
                showOverlay: ()=> {
                }, // overide to disable
            }, options);
            return <AnnoJSOptions> options;
        }


        /*protected loadAssets():util.promise.PromiseInterface<any> {
         var defer:util.promise.DeferredInterface<any> = util.promise.create();
         async.parallel([
         (d:any) => this.app.loadJS('jquery-scrollintoview/jquery.scrollintoview.min', true).then(d),
         (d:any) => this.app.loadJS('anno.js/anno', true).then(d),
         (d:any) => this.app.loadCSS('anno.js/anno', true).then(d)
         ], (res:any, err:any) => {
         DemoTour.assetsLoaded = true;
         defer.resolve();
         });
         return defer.promise;
         }*/

        public init() {
            this.app.debug.log('DemoTour init');
            this.app.on('booted', () => {
                debug.log('DemoTour received event emitted from app: booted');
            });
        }

        public boot() {
            var self:DemoTour = this;
            this._initLayoutApiActions();
        }

        protected _initLayoutApiActions() {
            var self:DemoTour = this;
            var apiActions:any = {
                'demo-tour-start': () => {
                    console.log('demo-tour-start', this, self);
                    this.start();
                }
            };
            self.layout.setApiActions(apiActions);
        }

        protected get layout():LayoutExtension {
            return <LayoutExtension> this.extensions.get('layout'); // this.app['layout'];
        }

        protected get quick_sidebar():QuickSidebarExtension {
            return <QuickSidebarExtension> this.extensions.get('quick_sidebar'); //this.app['quick_sidebar'];
        }


    }

    //Extensions.register('presets', DemoTour, defaultConfig);

}
