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

declare module 'vue-router' {
    var v:Object;
    export default v;
}
