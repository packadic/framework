module packadic {
    export module components {
        @component('modal')
        export class BSModalComponent extends Component {

            static template:string = getTemplate('modal')({});
            static replace:boolean = true;

            @prop({type: Boolean, twoWay: true, 'default': false})show:boolean;
            header:boolean = true;
            footer:boolean = true;
            close:boolean = true;

            @lifecycleHook('ready')
            ready():void {
                console.log('modal ready', this);
                $(this.$el)
                    .modal({show: false})
                    .on('shown.bs.modal', () => this.show = true)
                    .on('hidden.bs.modal', () => this.show = false);

                this.$watch('show', (newVal:any, oldVal:any) => {
                    $(this.$el).modal(newVal === true ? 'show' : 'hide')
                });
            }
        }
    }
}
