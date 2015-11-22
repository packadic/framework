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

interface NpmPaginationData {
    [name:string]:any;
    prelink?:string;
    current?:number;
    previous?:number;
    next?:number;
    first?:number;
    last?:number;
    range:number[];
    fromResult?:number;
    toResult?:number;
    totalResult?:number;
    pageCount?:number;
}
interface NpmPagination {
    [name:string]:any;
    render();
    getPaginationData():NpmPaginationData;
    set(option, value);
    preparePreLink(prelink)
}
interface NpmPaginationFactory {
    create(...args:any[]):NpmPagination;
    SearchPaginator(...args:any[]):NpmPagination;
}
declare module 'pagination' {
    var v:NpmPaginationFactory;
    export default v;
}

declare module "systemjs-builder" {
    export class Builder {
        constructor(...args:any[]);
        config(...args:any[]);
        bundle(...args:any[]):Promise<any>;
        loadConfig(...args:any[]):Promise<any>;
        //config(...args:any[]);
        //config(...args:any[]);
        //config(...args:any[]);
        //config(...args:any[]);
    }
    export default Builder;
}
