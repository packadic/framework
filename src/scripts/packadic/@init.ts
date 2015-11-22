namespace packadic {

    export declare var Vue:typeof vuejs.Vue,
        VueResource:any,
        VueRouter:any,
        _:_.LoDashStatic,
        _s:UnderscoreStringStatic;

    ['Vue', 'VueRouter', 'VueResource', '_', '_s'].forEach((name:string) => {
        packadic[name] = function(){ return window[name]; }.call(this)
    });

    Vue.use(VueRouter);
    Vue.use(VueResource);
    Vue.config.async = true;
    Vue.config.debug = true;

    export var templates:{[name:string]:string} = {};
}
//export = packadic;
