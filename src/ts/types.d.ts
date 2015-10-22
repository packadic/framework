/// <reference path="./types/tsd.d.ts" />
/// <reference path="./packadic/definitions/underscore.string.d.ts" />
/// <reference path="./packadic/definitions/vue.d.ts" />
/// <reference path="./packadic/definitions/jquery.noty.d.ts" />
/*
 interface WebpackRequireEnsureCallback {
 (req: WebpackRequire): void
 }

 interface WebpackRequire {
 (id: string): any;
 (paths: string[], callback: (...modules: any[]) => void): void;
 ensure(ids: string[], callback: WebpackRequireEnsureCallback, chunkName?: string): void;
 }

 declare var require: WebpackRequire;
 */

interface Window {
    attachEvent(name:string, handler?:Function);
    packadic?:any;
    packadicConfig?:any;

}
declare var window:Window;

declare var Prism:any;

interface HighlightJS {
    highlight(name:string, value:string, ignore_illegals?:boolean, continuation?:boolean) : any;
    highlightAuto(value:string, languageSubset?:string[]) : any;
    fixMarkup(value:string) : string;
    highlightBlock(block:Node) : void;
    configure(options:any): void;
    initHighlighting(): void;
    initHighlightingOnLoad(): void;
    registerLanguage(name:string, language:(hljs?:any) => any): void;
    listLanguages(): string[];
    getLanguage(name:string): any;
}

interface AnnoJSOptions  {
    [s: string]: any;
    arrowPosition?: any
    autoFocusLastButton?: boolean;
    buttons?: any[]
    className?: string;
    content?: string
    overlayClassName?: string
    position?: any
    rightArrowClicksLastButton?: boolean
    target?: string

    annoElem: Function|any
    arrowPositionFn: Function|any
    buttonsElem: Function|any
    buttonsFn: Function|any
    chainIndex: Function|any
    chainSize: Function|any
    chainTo: Function|any
    contentElem: Function|any
    contentFn: Function|any
    deemphasiseTarget: Function|any
    emphasiseTarget: Function|any
    hide: Function|any
    hideAnno: Function|any
    hideOverlay: Function|any
    onHide: Function|any
    onShow: Function|any
    overlayClick: Function|any
    overlayElem: Function|any
    positionAnnoElem: Function|any
    positionFn: Function|any
    show: Function|any
    showOverlay: Function|any
    start: Function|any
    switchTo: Function|any
    switchToChainNext: Function|any
    switchToChainPrev: Function|any
    targetFn: Function|any
}

interface AnnoJS {

    annoElem() : JQuery
    arrowPositionFn() : any
    buttonsElem() : any
    buttonsFn() : any
    chainIndex(index:any) : any
    chainSize() : any
    chainTo(obj:any) : any
    contentElem() : JQuery
    contentFn() : any
    deemphasiseTarget() : any
    emphasiseTarget($target:any) : any
    hide() : any
    hideAnno() : any
    hideOverlay() : any
    onHide(anno:any, $target:JQuery, $annoElem:JQuery, returnFromOnShow:any) : any
    onShow(anno:any, $target:JQuery, $annoElem:JQuery) : any
    overlayClick(anno:any, evt:any) : any
    overlayElem() : any
    positionAnnoElem(annoEl:any) : any
    positionFn() : any
    show() : any
    showOverlay() : any
    start() : any
    switchTo(otherAnno) : any
    switchToChainNext() : any
    switchToChainPrev() : any
    targetFn() : any
}
interface AnnoJSConstructor {
    new (steps?: Array<AnnoJSOptions>|AnnoJSOptions): AnnoJS;
    (steps: Array<AnnoJSOptions>|AnnoJSOptions): AnnoJS;
    prototype:AnnoJS;
    setDefaults(opts?:any);
}
declare var Anno:AnnoJSConstructor;

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

