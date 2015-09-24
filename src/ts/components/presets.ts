/// <reference path="./../types.d.ts" />
/// <reference path="./../packadic.d.ts" />
module packadic.components {


    var defaultConfig:any = {
        'default': {
            layout: ['header-fixed', 'footer-fixed'],
            theme: 'default'
        },
        'condensed-dark': {
            layout: ['header-fixed', 'footer-fixed'],
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
            debug.log('PresetsComponent debug');
            $body.onClick('[data-preset]', function(e){
                var $this:JQuery = $(this);
                var preset:string = $this.attr('data-preset');
                var presetConfig:any = self.config('presets.' + preset);
            })
        }

        public get layout():LayoutComponent {
            return <LayoutComponent> this.components.get('layout'); // this.app['layout'];
        }

        public get quick_sidebar():QuickSidebarComponent{
            return <QuickSidebarComponent> this.components.get('quick_sidebar'); //this.app['quick_sidebar'];
        }

        public applyPreset(name:string){
            var presetsConfig:any = this.config('presets.' + name);
            Object.keys(presetsConfig).forEach((presetType:string) => {
                this.applyPresetType(presetType, presetsConfig[presetType]);
            });
        }

        public applyPresetType(name:string, config?:any){
            this.layout.reset();
            switch(name){
                case 'theme': this.layout.setTheme(config); break;
                case 'layout': this.layout.setTheme(config); break;
            }
        }

        public presetDarkCondensed(){
            this.layout.setTheme('dark-sidebar');
        }

    }

    Components.register('presets', PresetsComponent , defaultConfig);

}
