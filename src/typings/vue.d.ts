// Type definitions for vuejs 0.11.0
// Project: https://github.com/yyx990803/vue
// Definitions by: odangosan <https://github.com/odangosan>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module vuejs {
    export interface VueResourceCallback {
        (data:{}, status:number, request:XMLHttpRequest): void;
    }
    export interface VueResourceOptions {
        url?:string;
        data?:string|{};
        method?:string;
        params?:{};
        headers?:{};
        success?:VueResourceCallback;
        error?:VueResourceCallback;
        beforeSend?:VueResourceCallback;
        emulateHTTP?:boolean;
        emulateJSON?:boolean;
        xhr?:{};
        jsonp?:string;
    }
    export interface VueResourceHttp {
        get(url:string, data?:{}, success?:VueResourceCallback, options?:{}):Promise;
        get(url:string, success?:VueResourceCallback, options?:{}):Promise;
        get(url:string, success?:VueResourceCallback):Promise;

        post(url:string, data?:{}, success?:VueResourceCallback, options?:{}):Promise;
        post(url:string, success?:VueResourceCallback, options?:{}):Promise;
        post(url:string, success?:VueResourceCallback):Promise;

        put(url:string, data?:{}, success?:VueResourceCallback, options?:{}):Promise;
        put(url:string, success?:VueResourceCallback, options?:{}):Promise;
        put(url:string, success?:VueResourceCallback):Promise;

        patch(url:string, data?:{}, success?:VueResourceCallback, options?:{}):Promise;
        patch(url:string, success?:VueResourceCallback, options?:{}):Promise;
        patch(url:string, success?:VueResourceCallback):Promise;

        'delete'(url:string, data?:{}, success?:VueResourceCallback, options?:{}):Promise;
        'delete'(url:string, success?:VueResourceCallback, options?:{}):Promise;
        'delete'(url:string, success?:VueResourceCallback):Promise;

        jsonp(url:string, data?:{}, success?:VueResourceCallback, options?:{}):Promise;
        jsonp(url:string, success?:VueResourceCallback, options?:{}):Promise;
        jsonp(url:string, success?:VueResourceCallback):Promise;
    }

    export interface VueRouter {
        app?:Vue;
        mode?:string;
        hashbang?:boolean;
        start(app:Vue|Object, el:string|Element);
        stop();
        map(routeMap:any);
        on(path:string, config:any);
        go(path:string);
        replace(path:string);
        redirect(redirectMap:any);
        alias(aliasMap:any);
        beforeEach(hook:any);
        afterEach(hook:any);
    }

    export class Vue {
        /**
         * The Vue Constructor
         * http://vuejs.org/api/index.html
         */
        constructor(options?:{});

        /**
         * Options
         * http://vuejs.org/api/options.html
         */
        /**
         * Data
         * http://vuejs.org/api/options.html#Data
         */
        data:{};
        methods:{};
        computed:{};
        paramAttributes:{}[];
        /**
         * DOM
         * http://vuejs.org/api/options.html#DOM
         */
        el:{};
        template:string;
        replace:boolean;
        /**
         * Lifecycle
         * http://vuejs.org/api/options.html#Lifecycle
         */
        created:VueCallback;
        beforeCompile:VueCallback;
        compiled:VueCallback;
        ready:VueCallback;
        attached:VueCallback;
        detached:VueCallback;
        beforeDestroy:VueCallback;
        destroyed:VueCallback;
        /**
         * Assets
         * http://vuejs.org/api/options.html#Assets
         */
        directives:{};
        filters:{};
        components:{};
        partials:{};
        transitions:{};
        /**
         * Others
         * http://vuejs.org/api/options.html#Others
         */
        inherit:boolean;
        events:{};
        watch:{};
        mixins:{}[];
        name:string;
        /**
         * Instance Properties
         * http://vuejs.org/api/instance-properties.html
         */
        $el:HTMLElement;
        $data:{};
        $options:{};
        $parent:Vue;
        $refs:any;
        $children:{[name:string]:Vue};
        $root:Vue;
        $:{};
        $$:{};

        /**
         * Instance Methods
         * http://vuejs.org/api/instance-methods.html
         */
        /**
         * Data
         */
        $watch(expression:string, callback:ValueCallback, deep?:boolean, immediate?:boolean):void;

        $get(expression:string):any;

        $set(keypath:string, value:any):void;

        $add(keypath:string, value:any):void;

        $delete(keypath:string):void;

        $eval(expression:string):any;

        $interpolate(templateString:string):string;

        $log(keypath?:string):void;

        /**
         * Events
         */
        $dispatch(event:string, ...args:any[]):Vue;

        $broadcast(event:string, ...args:any[]):Vue;

        $emit(event:string, ...args:any[]):Vue;

        $on(event:string, callback:Function):Vue;

        $once(event:string, callback:Function):Vue;

        $off(event?:string, callback?:Function):Vue;

        /**
         * DOM
         */
        $appendTo(element:any, callback?:Function):Vue;// element or selector
        $prependTo(element:any, callback?:Function):Vue;// element or selector
        $before(element:any, callback?:Function):Vue;// element or selector
        $after(element:any, callback?:Function):Vue;// element or selector
        $remove(callback?:Function):Vue;

        /**
         * Lifecycle
         */
        $mount(element?:any):Vue;// element or selector
        $destroy(remove?:boolean):void;

        $compile(element:HTMLElement):VueCallback;// returns a decompile function
        $addChild(options?:{}, constructor?:Function):Vue;

        /**
         * Global Api
         * http://vuejs.org/api/global-api.html
         */
        static config:VueConfig;

        static extend(options:{}):typeof Vue;

        static directive(id:string, definition?:{}):void;
        static directive(id:string, definition?:VueCallback):void;

        static elementDirective(id:string, definition?:{}):void;
        static elementDirective(id:string, definition?:VueCallback):void;

        static filter(id:string, definition?:FilterCallback):void;

        static component(id:string, definition:Vue):void;
        static component(id:string, definition?:{}):void;

        static transition(id:string, definition?:{}):void;

        static partial(id:string, definition?:string):void;
        static partial(id:string, definition?:HTMLElement):void;

        static nextTick(callback:VueCallback):void;

        static require(module:string):void;

        static use(plugin:{}, ...args:any[]):Vue;
        static use(plugin:VueCallback, ...args:any[]):Vue;

        static set(object:any, key:any, value:any):void;


        /**
         * exports members.
         */
        _init(options:{}):void;

        _cleanup():void;

        // static require(module:string) : void;

        /* VueResource */
        $http:VueResourceHttp;
    }

    class VueConfig {
        prefix:string;
        debug:boolean;
        silent:boolean;
        proto:boolean;
        interpolate:boolean;
        async:boolean;
        delimiters:string[];
    }

    interface ValueCallback {
        (newValue:{}, oldValue:{}): void;
    }

    interface VueCallback {
        (): void;
    }
    interface FilterCallback {
        (value:{}, begin?:{}, end?:{}): {};
    }
}


declare module "vue" {
    export var v:typeof vuejs.Vue;
    export default v;
}
