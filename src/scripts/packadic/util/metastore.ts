import {defined} from './index';
import {IConfigProperty,ConfigObject} from './config';

export class MetaStore {

    protected static templates:any = {};

    public static template(type:string, defaultMetaStore:any) {
        if(!MetaStore.hasTemplate(type)){
            MetaStore.templates[type] = defaultMetaStore;
        }
    }

    static hasTemplate(type:string) {
        return defined(MetaStore.templates[type]);
    }


    public get store():IConfigProperty {
        return ConfigObject.makeProperty(this.target[this.options.key]);
    }

    protected target:any;
    protected type:any;

    protected options:any = {
        key: '_decoratorMetaStore'
    };

    constructor(target:any, type:string) {
        this.target = target;
        this.type   = type;
        this.ensureHasMetaStore();
    }

    public static for(target:any, type:string = 'default'):MetaStore {
        return new MetaStore(target, type);
    }

    public MetaStorePush(key:string, val:any):MetaStore {
        this.store.set(key, (this.store(key) || []).push(val));
        return this;
    }

    public cleanTarget():MetaStore  {
        delete this.target[this.options.key];
        return this;
    }

    protected ensureHasMetaStore() {
        if (!defined(this.target[this.options.key])) {
            this.target[this.options.key] = new ConfigObject();
            if(MetaStore.hasTemplate(this.type)){
                this.store.merge(MetaStore.templates[this.type]);
            }
        }
    }
}
