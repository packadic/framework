declare namespace packadic {
    var Vue: typeof vuejs.Vue, VueResource: any, VueRouter: any, _: _.LoDashStatic, _s: UnderscoreStringStatic;
    var templates: {
        [name: string]: string;
    };
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic {
}
declare namespace packadic.JSON {
    function stringify(obj: any): any;
    function parse(str: string, date2obj?: any): any;
    function clone(obj: any, date2obj?: any): any;
}
declare namespace packadic {
    interface OpenWindowOptions {
        width?: number;
        height?: number;
        url?: string;
        target?: string;
        features?: string;
        replace?: boolean;
        content?: string;
        cb?: Function;
    }
    var openWindowDefaults: OpenWindowOptions;
    function openWindow(opts?: OpenWindowOptions): Window;
    function cre(name?: string): JQuery;
    function getViewPort(): any;
    function isTouchDevice(): boolean;
    function codeIndentFix(str: string): string;
    function preCodeIndentFix(el: HTMLElement): string;
    function registerJQueryHelpers(): void;
    class BrowserPrettyConsole {
        protected matcher: RegExp;
        protected styles: {
            [key: string]: string;
        };
        printFn: Function;
        constructor(printFn?: Function);
        addMaterialStyle(name: string[] | string, variant?: any): BrowserPrettyConsole;
        addFontStyle(name: string, ff: string): BrowserPrettyConsole;
        addStyle(name: string, val: string | string[]): BrowserPrettyConsole;
        allStyles(): any;
        getStyle(name: string): any;
        hasStyle(name: string): boolean;
        addDefaults(): void;
        protected macros: any;
        createMacro(name: string, fn: Function): void;
        macro(...args: any[]): void;
        write(message: string, ...args: any[]): void;
    }
}
declare namespace packadic {
    interface IDelimitersCollection {
        [index: string]: IDelimiter;
    }
    interface IDelimiterLodash {
        evaluate: RegExp;
        interpolate: RegExp;
        escape: RegExp;
    }
    interface IDelimiter {
        opener?: string;
        closer?: string;
        lodash?: IDelimiterLodash;
    }
    interface IConfig {
        get(prop?: any): any;
        set(prop: string, value: any): IConfig;
        merge(obj: Object): IConfig;
        merge(prop: string, obj: Object): IConfig;
        raw(prop?: any): any;
        process(raw: any): any;
        unset(prop: any): any;
        has(prop: any): boolean;
        observer?: IConfigObserver;
        attachObserver(observer: any | IConfigObserver): IConfig;
    }
    interface IConfigProperty extends IConfig {
        (args?: any): any;
    }
    interface IConfigObserver {
        setInspectableObject(obj: any): any;
        inspect(cb: Function): any;
        path(expression: string, defaultValue: any, changeFn: Function, optReceiver: any): any;
    }
    class ConfigObserver implements IConfigObserver {
        protected obj: any;
        protected oo: observejs.IObjectObserver;
        protected pos: observejs.Observable[];
        protected ooCallbacks: Function[];
        protected debugOutput: boolean;
        constructor(obj?: any);
        setInspectableObject(obj: any): void;
        inspect(cb: Function): void;
        path(expression: string, defaultValue: any, changeFn: any, optReceiver: any): any;
    }
    class Config implements IConfig {
        protected data: Object;
        protected allDelimiters: IDelimitersCollection;
        protected static propStringTmplRe: RegExp;
        protected _observer: IConfigObserver;
        protected storageBag: IStorageBag;
        constructor(obj?: Object, storageBag?: string);
        unset(prop: any): any;
        has(prop: any): boolean;
        raw(prop?: any): any;
        get(prop?: any): any;
        set(prop: string, value: any): IConfig;
        merge(...args: any[]): IConfig;
        process(raw: any): any;
        private addDelimiters(name, opener, closer);
        private setDelimiters(name);
        private processTemplate(tmpl, options);
        observer: IConfigObserver;
        attachObserver(observer: IConfigObserver): IConfig;
        store(key: string): IConfig;
        load(key: string): IConfig;
        hasStorage(): boolean;
        setStorage(bag: IStorageBag): void;
        static makeProperty(config: IConfig): IConfigProperty;
        static makeObserver(config: IConfig): IConfigObserver;
        static getPropString(prop: any): string;
        static escape(str: string): string;
        toString(): any;
    }
    class ConfigObject extends Config {
    }
}
declare namespace packadic {
    var defaultEE2Options: EventEmitter2Configuration;
    abstract class EventEmitter extends EventEmitter2 {
        constructor(eventOptions?: {});
    }
    var EventListener: {
        listen(target: any, eventType: any, callback: any): {
            remove(): void;
        };
    };
    function makeEventEmitter(obj: any, options: any): any;
}
declare namespace packadic {
    var str: UnderscoreStringStatic;
    function round(value: any, places: any): number;
    function makeString(object: any): string;
    function defaultToWhiteSpace(characters: any): any;
    function kindOf(value: any): any;
    function def(val: any, def: any): any;
    function defined(obj?: any): boolean;
    function getRandomId(length?: number): string;
}
declare namespace packadic {
    var log: typeof loglevel;
    var out: BrowserPrettyConsole;
}
declare namespace packadic {
    var colors: any;
    function color(name: string, variant?: any, prefixHexSymbol?: boolean): any;
}
declare namespace packadic {
    class MetaStore {
        protected static templates: any;
        static template(type: string, defaultMetaStore: any): void;
        static hasTemplate(type: string): boolean;
        store: IConfigProperty;
        protected target: any;
        protected type: any;
        protected options: any;
        constructor(target: any, type: string);
        static for(target: any, type?: string): MetaStore;
        storePush(key: string, val: any): MetaStore;
        cleanTarget(): MetaStore;
        protected ensureHasMetaStore(): void;
    }
}
declare namespace packadic {
    function getParts(str: any): any;
    function objectGet(obj?: any, parts?: any, create?: any): any;
    function objectSet(obj: any, parts: any, value: any): any;
    function objectExists(obj: any, parts: any): boolean;
    function recurse(value: Object, fn: Function, fnContinue?: Function): any;
    function copyObject<T>(object: T): T;
    function dotize(obj: any, prefix?: any): any;
    function applyMixins(derivedCtor: any, baseCtors: any[]): void;
    class DependencySorter {
        protected items: any;
        protected dependencies: any;
        protected dependsOn: any;
        protected missing: any;
        protected circular: any;
        protected hits: any;
        protected sorted: any;
        constructor();
        add(items: {
            [name: string]: string | string[];
        }): void;
        addItem(name: string, deps?: string | string[]): void;
        setItem(name: string, deps: string[]): void;
        sort(): string[];
        protected satisfied(name: string): boolean;
        protected setSorted(item: any): void;
        protected exists(item: any): boolean;
        protected removeDependents(item: any): void;
        protected setCircular(item: any, item2: any): void;
        protected setMissing(item: any, item2: any): void;
        protected setFound(item: any, item2: any): void;
        protected isSorted(item: string): boolean;
        requiredBy(item: string): boolean;
        isDependent(item: string, item2: string): boolean;
        hasDependents(item: any): boolean;
        hasMissing(item: any): boolean;
        isMissing(dep: string): boolean;
        hasCircular(item: string): boolean;
        isCircular(dep: any): boolean;
        getDependents(item: any): string[];
        getMissing(str?: any): string[];
        getCircular(str?: any): any;
        getHits(str?: any): any;
    }
}
declare namespace packadic {
    interface ImmediateSuccessCB<T, TP> {
        (value: T): TP;
    }
    interface ImmediateErrorCB<TP> {
        (err: any): TP;
    }
    interface DeferredSuccessCB<T, TP> {
        (value: T): ThenableInterface<TP>;
    }
    interface DeferredErrorCB<TP> {
        (error: any): ThenableInterface<TP>;
    }
    interface ThenableInterface<T> {
        then<TP>(successCB?: DeferredSuccessCB<T, TP>, errorCB?: DeferredErrorCB<TP>): ThenableInterface<TP>;
        then<TP>(successCB?: DeferredSuccessCB<T, TP>, errorCB?: ImmediateErrorCB<TP>): ThenableInterface<TP>;
        then<TP>(successCB?: ImmediateSuccessCB<T, TP>, errorCB?: DeferredErrorCB<TP>): ThenableInterface<TP>;
        then<TP>(successCB?: ImmediateSuccessCB<T, TP>, errorCB?: ImmediateErrorCB<TP>): ThenableInterface<TP>;
    }
    interface PromiseInterface<T> extends ThenableInterface<T> {
        then<TP>(successCB?: DeferredSuccessCB<T, TP>, errorCB?: DeferredErrorCB<TP>): PromiseInterface<TP>;
        then<TP>(successCB?: DeferredSuccessCB<T, TP>, errorCB?: ImmediateErrorCB<TP>): PromiseInterface<TP>;
        then<TP>(successCB?: ImmediateSuccessCB<T, TP>, errorCB?: DeferredErrorCB<TP>): PromiseInterface<TP>;
        then<TP>(successCB?: ImmediateSuccessCB<T, TP>, errorCB?: ImmediateErrorCB<TP>): PromiseInterface<TP>;
        otherwise(errorCB?: DeferredErrorCB<T>): PromiseInterface<T>;
        otherwise(errorCB?: ImmediateErrorCB<T>): PromiseInterface<T>;
        always<TP>(errorCB?: DeferredErrorCB<TP>): PromiseInterface<TP>;
        always<TP>(errorCB?: ImmediateErrorCB<TP>): PromiseInterface<TP>;
    }
    interface DeferredInterface<T> {
        resolve(value?: ThenableInterface<T>): DeferredInterface<T>;
        resolve(value?: T): DeferredInterface<T>;
        reject(error?: any): DeferredInterface<T>;
        promise: PromiseInterface<T>;
    }
    function createPromise<T>(): DeferredInterface<T>;
    function when<T>(value?: ThenableInterface<T>): PromiseInterface<T>;
    function when<T>(value?: T): PromiseInterface<T>;
}
declare namespace packadic {
    var bags: {
        [name: string]: IStorageBag;
    };
    function hasBag(name: string): boolean;
    function createBag(name: string, provider: IStorageProvider): IStorageBag;
    function getBag(name: string): IStorageBag;
    interface IStorageProvider {
        length: number;
        onStoreEvent(callback: Function): any;
        clear(): void;
        getItem(key: string): any;
        key(index: number): string;
        removeItem(key: string): void;
        setItem(key: string, data: string): void;
        getSize(key: any): string;
    }
    interface IStorageBag {
        get(key: any, options?: any): any;
        set(key: any, val: any, options?: any): any;
        on(callback: any): any;
        del(key: any): any;
        clear(): any;
        getSize(key: any): any;
    }
    class StorageBag implements IStorageBag {
        provider: IStorageProvider;
        constructor(provider: IStorageProvider);
        on(callback: Function): void;
        set(key: any, val: any, options?: any): void;
        get(key: any, options?: any): any;
        del(key: any): void;
        clear(): void;
        getSize(key: any): string;
    }
    class LocalStorage implements IStorageProvider {
        length: number;
        getSize(key: any): string;
        onStoreEvent(callback: Function): void;
        clear(): void;
        getItem(key: string): any;
        key(index: number): string;
        removeItem(key: string): void;
        setItem(key: string, data: string): void;
    }
    class SessionStorage implements IStorageProvider {
        length: any;
        getSize(key: any): string;
        onStoreEvent(callback: Function): void;
        clear(): void;
        getItem(key: string): any;
        key(index: number): string;
        removeItem(key: string): void;
        setItem(key: string, data: string): void;
    }
    class CookieStorage implements IStorageProvider {
        length: number;
        getSize(key: any): string;
        cookieRegistry: any[];
        protected listenCookieChange(cookieName: any, callback: any): void;
        onStoreEvent(callback: Function): void;
        clear(): void;
        key(index: number): string;
        getItem(sKey: any): string;
        setItem(sKey: any, sValue: any, vEnd?: any, sPath?: any, sDomain?: any, bSecure?: any): void;
        removeItem(key: string, sPath?: any, sDomain?: any): boolean;
        hasItem(sKey: any): boolean;
        keys(): string[];
    }
}
declare namespace packadic {
    class SemVer {
        protected loose: any;
        protected raw: any;
        major: any;
        minor: any;
        patch: any;
        protected prerelease: any;
        protected build: any;
        protected version: any;
        constructor(version: any, loose?: any);
        format(): any;
        inspect(): any;
        toString(): string;
        compare(other: any): any;
        compareMain(other: any): any;
        comparePre(other: any): any;
        inc(release: any, identifier: any): any;
    }
    class Comparator {
        loose: any;
        semver: any;
        value: any;
        operator: any;
        constructor(comp?: any, loose?: any);
        parse(comp: any): void;
        inspect(): string;
        toString(): string;
        test(version: any): any;
    }
    class VersionRange {
        loose: any;
        raw: any;
        set: any;
        range: any;
        constructor(range: any, loose: any);
        inspect(): any;
        format(): any;
        toString(): string;
        parseRange(range: any): any;
        test(version: any): any;
    }
}
declare namespace packadic {
    class Layout {
        style: any;
        settings: any;
        constructor();
        getBreakpoint(which: string): number;
        calculateViewportHeight(): number;
        scrollTo(ele?: any, offset?: number): void;
        scrollTop(): void;
    }
}
declare namespace packadic {
    class BaseComponent {
        static COMPONENT: boolean;
        $: any;
        $$: any;
        $data: any;
        $children: Array<vuejs.Vue>;
        $el: HTMLElement;
        $els: {
            [name: string]: HTMLElement;
        };
        $options: any;
        $parent: vuejs.Vue | BaseComponent;
        $root: vuejs.Vue;
        $add(key: string, val: any): void;
        $addChild(options?: any, constructor?: () => void): void;
        $after(target: HTMLElement | string, cb: () => void): void;
        $appendTo(target: HTMLElement | string, cb?: () => void): void;
        $before(target: HTMLElement | string, cb?: () => void): void;
        $broadcast(event: string, ...args: Array<any>): void;
        $compile(el: HTMLElement): Function;
        $delete(key: string): void;
        $destroy(remove: boolean): void;
        $dispatch(event: string, ...args: Array<any>): void;
        $emit(event: string, ...args: Array<any>): void;
        $eval(text: string): void;
        $get(exp: string): void;
        $interpolate(text: string): void;
        $log(path?: string): void;
        $mount(el: HTMLElement | string): void;
        $nextTick(fn: () => void): void;
        $off(event: string, fn: (...args: Array<any>) => void | boolean): void;
        $on(event: string, fn: (...args: Array<any>) => void | boolean): void;
        $once(event: string, fn: (...args: Array<any>) => void | boolean): void;
        $remove(cb?: () => void): void;
        $set(exp: string, val: any): void;
        $watch(exp: string | (() => string), cb: (val: any, old?: any) => any, options?: {
            deep?: boolean;
            immediate?: boolean;
        }): void;
        _digest(): void;
    }
    function LifecycleHook(hook: string): (cls: any, name: string, desc: PropertyDescriptor) => PropertyDescriptor;
    function EventHook(hook: string): (cls: any, name: string, desc: PropertyDescriptor) => PropertyDescriptor;
    function Prop(options: any): (cls: any, name: string) => void;
    function componentOptions(cls: any): any;
    function Component(name: string, children?: any): (cls: any) => void;
}
declare namespace packadic {
    function Directive(id: string, elementDirective?: boolean): ClassDecorator;
    function ParamWatcher(id?: string): MethodDecorator;
    class BaseDirective {
        el: HTMLElement;
        vm: vuejs.Vue;
        expression: string;
        arg: any;
        raw: string;
        name: string;
        params: any;
        constructor();
        $el: JQuery;
        $set(exp: string, val: any): void;
        $delete(key: string): void;
        set(value: any): void;
        on(event: string, handler: Function): void;
        bind(): void;
        unbind(): void;
        update(newValue: any, oldValue: any): void;
    }
}
declare namespace packadic {
    function Transition(id: string, css?: boolean): ClassDecorator;
    interface ITransition {
        css?: boolean;
        enter?: (el: HTMLElement, done: Function) => void;
        enterCancelled?: (el: HTMLElement) => void;
        leave?: (el: HTMLElement, done: Function) => void;
        leaveCancelled?: (el: HTMLElement) => void;
        stagger?: (index: number) => number;
        enterStagger?: (index: number) => number;
        leaveStagger?: (index: number) => number;
    }
    abstract class BaseTransition implements ITransition {
        enter(el: HTMLElement, done: any): void;
    }
    abstract class BaseJqueryTransition extends BaseTransition {
        enterCancelled(el: any): void;
        leaveCancelled(el: any): void;
    }
}
declare namespace packadic {
    enum AppState {
        PRE_INIT = 0,
        INITIALISING = 1,
        INITIALISED = 2,
        STARTING = 3,
        STARTED = 4,
    }
    class App {
        constructor();
        static on(...args: any[]): void;
        static once(...args: any[]): void;
        static off(...args: any[]): void;
        static emit(...args: any[]): void;
        static log: typeof log;
        static out: BrowserPrettyConsole;
        protected static _layout: Layout;
        static layout: Layout;
        protected static _VM: any;
        protected static _vm: vuejs.Vue;
        static vm: vuejs.Vue;
        protected static _state: AppState;
        static state: AppState;
        protected static _router: vuejs.VueRouter;
        static router: vuejs.VueRouter;
        static $e(vel: string): JQuery;
        static defaults: Object;
        static config: IConfigProperty;
        static init(opts?: Object): typeof App;
        static start(opts?: any): PromiseInterface<any>;
        static dataRequest(name: string, fn: Function): Promise;
        static currentView: string;
        protected static _sharedConstructors: {
            [name: string]: any;
        };
        protected static _sharedInstances: {
            [shareId: string]: any;
        };
        static share(name: string, creator: Function): void;
        static shared(shareId: string, name: string, ...args: any[]): any;
    }
}
declare namespace packadic {
    class GridComponent extends BaseComponent {
        static template: string;
        rows: any[];
        columns: any[];
        filterKey: string;
        perPage: number;
        shareId: string;
        sortColumn: string;
        reversed: any;
        paginator: NpmPagination;
        pager: NpmPaginationData;
        filteredRows: any;
        currentPage: any;
        sortBy(column: any): void;
        beforeCompile(): void;
        compiled(): void;
    }
    class PaginationComponent extends BaseComponent {
        static template: string;
        shareId: string;
        maxLinks: number;
        paginator: NpmPagination;
        beforeCompile(): void;
        pager: NpmPaginationData;
        isCurrent(index: any): boolean;
        goto(index: number, event: MouseEvent): void;
        next(event: MouseEvent): void;
        prev(event: MouseEvent): void;
    }
    class GridDirective extends BaseDirective {
        static params: any[];
        paginator: NpmPagination;
        pager: NpmPaginationData;
        bind(): void;
        update(value: any): void;
    }
}
declare namespace packadic {
    interface IBreadcrumbLink extends ILink {
        title?: string;
        arrow?: boolean;
    }
    class PageBreadcrumbItemComponent extends BaseComponent {
        item: IBreadcrumbLink;
        type: string;
        route: string;
        path: string;
        href: string;
        title: string;
        arrow: boolean;
        beforeCompile(): void;
        link: any;
    }
    class PageBreadcrumbsComponent extends BaseComponent {
        items: IBreadcrumbLink[];
        autofix: boolean;
        isLast(index: number): boolean;
        beforeCompile(): void;
        ready(): void;
    }
    class PageComponent extends BaseComponent {
        title: string;
        subtitle: string;
        seperator: string;
    }
    class PageContentSizerDirective extends BaseDirective {
        listener(): void;
        bind(): void;
        unbind(): void;
    }
}
declare namespace packadic {
    interface ILink {
        type?: string;
        href?: string;
        route?: string;
        path?: string;
        target?: string;
    }
    interface IRoute {
        (name: string, path: string, viewPath: string): any;
        link?: (type: string, typeValue: string, target?: string) => ILink;
    }
    var route: IRoute;
    class LinkComponent extends BaseComponent implements ILink {
        link: ILink;
        type: string;
        href: string;
        route: string;
        path: string;
        target: string;
        _type: string;
        isType(...args: string[]): boolean;
        attrs: any;
        vlink: any;
        beforeCompile(): void;
    }
}
declare namespace packadic {
    interface ISidebarItem {
        title?: string;
        icon?: string;
        children?: ISidebarItem[];
        href?: string;
        route?: string;
        path?: string;
        active?: boolean;
        type?: string;
    }
    class SidebarItemComponent extends BaseComponent {
        static template: string;
        item: ISidebarItem;
        title: string;
        icon: string;
        href: string;
        type: string;
        isActive: boolean;
        hasChildren: boolean;
        route: string;
        path: string;
        children: any[];
        isOpen: boolean;
        hasSubmenu: boolean;
        link: any;
        toggle(): void;
        isType(...args: string[]): boolean;
        close(): void;
        open(closeOthers?: boolean): void;
        closeSubmenus(): boolean;
        beforeCompile(): void;
    }
    class SidebarComponent extends BaseComponent {
        items: ISidebarItem[];
        bodyClass: DOMTokenList;
        ensureBodyClass(name: string, shouldExist?: boolean): SidebarComponent;
        closed: boolean;
        hidden: boolean;
        condensed: boolean;
        toggle(): void;
        closeSubmenus(): void;
    }
    class SlideToggleTransition extends BaseJqueryTransition {
        enter(el: HTMLElement, done: any): void;
        leave(el: HTMLElement, done: any): void;
    }
    class SidebarDirective extends BaseDirective {
        static params: any[];
        update(oldVal: any, newVal: any): void;
    }
}
declare namespace packadic {
    function view(viewPath: string): (resolve: any) => void;
    abstract class View extends BaseComponent {
        static VIEW: boolean;
        static breadcrumb(title: string, type: string, typeValue: string, target?: string): IBreadcrumbLink;
    }
}
declare namespace packadic {
    class DropdownComponent extends BaseComponent {
        static template: string;
        toggleDropdown(e: any): void;
        ready(): void;
        beforeDestroy(): void;
    }
}
declare namespace packadic {
    class TooltipDirective extends BaseDirective {
        static params: any[];
        initPlugin(config?: any): void;
        bind(): void;
        update(value: any): void;
    }
    class PopoverDirective extends BaseDirective {
        static params: any[];
        initPlugin(config?: any): void;
        bind(): void;
        update(value: any): void;
    }
}
declare namespace packadic {
    var popoverMixin: any;
}
declare namespace packadic {
    class TabComponent extends BaseComponent {
        static template: string;
        $parent: TabsetComponent;
        header: string;
        disabled: string;
        show: boolean;
        index: number;
        show: boolean;
        transition: string;
        created(): void;
        ready(): void;
    }
}
declare namespace packadic {
    class TabsetComponent extends BaseComponent {
        static template: string;
        effect: string;
        renderData: any[];
        activeIndex: number;
        handleTabListClick(index: any, el: any): void;
    }
}
declare namespace packadic {
    class PageLoaderDirective extends BaseDirective {
        update(showLoader: any, odlval: any): void;
    }
    class TestDirective extends BaseDirective {
        static params: any[];
        watchA(val: any, oldVal: any): void;
    }
}
declare namespace packadic {
    abstract class BaseTransition implements ITransition {
        enterCancelled(el: any): void;
        leaveCancelled(el: any): void;
    }
    class FadeTransition extends BaseTransition {
        enter(el: HTMLElement, done: any): void;
        leave(el: any, done: any): void;
    }
    class FadeInTransition extends BaseTransition {
        enter(el: HTMLElement, done: any): void;
    }
    class FadeOutTransition extends BaseTransition {
        leave(el: any, done: any): void;
    }
    class ViewFadeTransition extends BaseTransition {
        enter(el: HTMLElement, done: any): void;
        leave(el: HTMLElement, done: any): void;
    }
}
