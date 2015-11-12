import * as Vue from 'vue';
import * as _ from 'lodash';
import {defined} from './../util/index';
import {ConfigObject,IConfigProperty} from './config';


export {Vue};

export class App extends Vue {

    protected static _instance:App;
    public static get instance() {
        if (!defined(App._instance)) {
            App._instance = new App();
        }
        return App._instance;
    }

    public static defaults:Object = {
        debug     : false,
        app       : {vue: {mount: 'html'}},
        startScene: 'main'
    };
    protected _config:ConfigObject;
    public config:IConfigProperty;

    public get debugging() {
        return this.config('debug');
    }

    constructor() {
        super();
        if (defined(App._instance)) {
            throw new Error('Trying to create a new instance on App while its a singleton')
        }

        this._config = new ConfigObject(App.defaults);
        this.config  = ConfigObject.makeProperty(this._config);

    }

    public init(options:Object = {}):App {

        this.config.merge(options);
        return this;
    }

    public start():App {
        this.$mount(this.config('app.vue.mount'));
        return this;

    }
}

