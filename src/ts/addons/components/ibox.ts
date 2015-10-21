
module packadic.components {

    @component('ibox')
    export class IBoxComponent extends Component {
        static template:string = getTemplate('ibox')({});
        static replace:boolean = true;

        @prop({type: String, required: true, 'default': ''})id:string;

        @lifecycleHook('ready')
        ready():void{
            $(this.$el).attr('id', this.id);
        }
    }
}
