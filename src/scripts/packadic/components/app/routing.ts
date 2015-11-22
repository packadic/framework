namespace packadic {
    declare var alinkTemplate;

    export interface ILink {
        type?:string;
        href?:string;
        route?:string;
        path?:string;
        target?:string;
    }

    export interface IRoute {
        (name:string, path:string, viewPath:string): any;
        link?:(type:string, typeValue:string, target?:string)=>ILink;
    }
    export var route:IRoute = function route(name:string, path:string, viewPath:string, config:any = {}) {
        App.router.on(path, _.merge({
            name     : name,
            component: view(viewPath)
        }, config))
    };
    route.link              = (type:string, typeValue:string, target?:string):ILink => {
        var link:ILink  = {};
        link.type       = type;
        link[link.type] = typeValue;
        if (target) {
            link.target = target;
        }
        return <ILink> link;
    };


    @Component('alink')
    export class LinkComponent extends BaseComponent implements ILink {

        @Prop({type: Object, required: false}) link:ILink;

        @Prop({type: String, required: false}) type:string;

        @Prop({type: String, required: false, 'default': ()=>'javascript:;'}) href:string;
        @Prop({type: String, required: false, 'default': ()=>''}) route:string;
        @Prop({type: String, required: false, 'default': ()=>''}) path:string;
        @Prop({type: String, required: false, 'default': ()=>'self'}) target:string;

        get _type() {
            if (!defined(this.type)) {
                if (defined(this.path) && this.path.length > 0) {
                    return 'path';
                } else if (defined(this.route) && this.route.length > 0) {
                    return 'route';
                } else {
                    return 'href';
                }
            } else {
                return this.type;
            }
        }

        isType(...args:string[]) {
            return args.indexOf(this._type) !== -1;
        }

        get attrs() {
            var attrs:any = {
                target: '_' + this.target
            };

            if (this.isType('href')) {
                attrs.href = this.href;
            }

            return attrs;
        }

        get vlink() {
            var vlink:any = {};
            if (this.isType('route')) {
                vlink['name'] = this.route;
            } else if (this.isType('path')) {
                vlink['path'] = this.path;
            }
            return vlink;
        }

        @LifecycleHook('beforeCompile') beforeCompile():void {
            if (defined(this.link))
                Object.keys(this.link).forEach((key:string) => {
                    this[key] = this.link[key];
                });
        }
    }
}
