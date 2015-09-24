/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
module packadic.components {


    var defaultConfig:any = {
        'default': {
            layout: ['header-fixed', 'footer-fixed'],
            theme: 'default'
        },
        'condensed-dark': {
            layout: ['header-fixed', 'footer-fixed', 'page-edged', 'condensed-sidebar'],
            theme: 'dark-sidebar'
        }
    };

    var $body:JQuery = $('body');


    export class PresetsComponent extends Component {

        public static dependencies:string[] = ['layout', 'quick_sidebar'];


        public init() {
            this.app.debug.log('PresetsComponent init');
            this.app.on('booted', () => {
                debug.log('PresetsComponent received event emitted from app: booted');
            });
        }

        public boot() {
            var self:PresetsComponent = this;
            this._initLayoutApiActions();
        }

        protected _initLayoutApiActions() {
            var self:PresetsComponent = this;
            var apiActions:any = {
                'preset': (presetName:string) => {
                    console.log('preset', presetName, this, self);
                    self.set(presetName);
                }
            };
            self.layout.setApiActions(apiActions);
        }

        protected get layout():LayoutComponent {
            return <LayoutComponent> this.components.get('layout'); // this.app['layout'];
        }

        protected get quick_sidebar():QuickSidebarComponent {
            return <QuickSidebarComponent> this.components.get('quick_sidebar'); //this.app['quick_sidebar'];
        }

        public set(name:string) {
            var presetsConfig:any = this.config('presets.' + name);
            Object.keys(presetsConfig).forEach((presetType:string) => {
                this.applyPresetType(presetType, presetsConfig[presetType]);
            });
        }

        protected applyPresetType(name:string, config?:any) {
            this.layout.reset();
            switch (name) {
                case 'theme':
                    this.layout.setTheme(config);
                    this.app.emit('layout:preset:theme', config);
                    break;
                case 'layout':
                    console.log('apply preset type', name, config, this, self);
                    if(kindOf(config) === 'string'){
                        config = [config];
                    }
                    config.forEach((actionName:string) => {
                        console.log('apply preset type', name, config, this, self);
                        this.layout.api(actionName);
                    });
                    this.app.emit('layout:preset:layout', config);
                    break;
            }
            this.app.on('resize', () => { console.log('apply preset refresh', this); this.quick_sidebar.refresh() });
        }


    }

    Components.register('presets', PresetsComponent, defaultConfig);

}
