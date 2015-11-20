/// <reference path="typings/tsd/tsd.d.ts" />
/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/zone.d.ts" />
/// <reference path="typings/eventemitter2.d.ts" />
/// <reference path="typings/underscore.string.d.ts" />
/// <reference path="typings/jspm.d.ts" />
/// <reference path="typings/vue.d.ts" />
/// <reference path="typings/observe-js.d.ts" />
declare module 'globule' {
    var asdf:any;
    export = asdf
}

interface BrowserNodeGlobal {
    Object: typeof Object;
    Array: typeof Array;
    Map: typeof Map;
    Set: typeof Set;
    Date: typeof Date;
    RegExp: typeof RegExp;
    JSON: typeof JSON;
    Math: typeof Math;
    assert(condition: any): void;
    Reflect: any;
    zone: Zone;
    getAngularTestability: Function;
    getAllAngularTestabilities: Function;
    setTimeout: Function;
    clearTimeout: Function;
    setInterval: Function;
    clearInterval: Function;
}

interface JQueryStatic {
    material?:any;
    cookie?:any;
}
interface JQuery {
    //slimScroll(...args:any[]): JQuery;
    size(...args:any[]): number;
    removeAttributes(...args:any[]):JQuery ;
    ensureClass(...args:any[]):JQuery ;
    testWidget(...args:any[]):JQuery ;
    testPlugin(...args:any[]):JQuery ;
    slimScroll(...args:any[]):JQuery ;
    onClick(...args:any[]):JQuery;
    jcarousel(...args:any[]):JQuery;
    prefixedData(prefix):any;
}

interface VueStrapModules {
    accordion: Object
    affix: Object
    alert: Object
    aside: Object
    carousel: Object
    checkboxBtn: Object
    checkboxGroup: Object
    datepicker: Object
    dropdown: Object
    modal: Object
    option: Object
    panel: Object
    popover: Object
    progressbar: Object
    radioBtn: Object
    radioGroup: Object
    select: Object
    slider: Object
    tab: Object
    tabset: Object
    tooltip: Object
    typeahead: Object
}

declare module 'vue-strap' {
    var v:VueStrapModules;
    export default v;
}
declare module 'vue-router' {
    var v:Object;
    export default v;
}
declare module 'vue-resource' {
    var v:Object;
    export default v;
}
declare module 'loglevel'{
    export = log;
}
declare module 'createjs'{
    export = createjs;
}
