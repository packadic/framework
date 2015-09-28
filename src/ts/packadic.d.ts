/// <reference path="types.d.ts" />
declare module packadic {
    var app: Application;
    var debug: Debug;
    function getConfigDefaults(): any;
    function mergeIntoDefaultConfig(obj?: any): void;
    var _readyCallbacks: Function[];
    function ready(fn: Function): void;
    function callReadyCallbacks(): void;
}
declare module packadic {
    var namespacePrefix: string;
    function directive(name: string, isElementDirective?: boolean): (cls: any) => void;
    function filter(name?: string): MethodDecorator;
    function component(name: string): (cls: any) => void;
    function widget(name: string, proto: any): void;
    function plugin(name: string, regOpts?: any): (cls: typeof plugins.Plugin) => void;
    module directives {
        class Directive {
            el: HTMLElement;
            vm: vuejs.Vue;
            expression: string;
            arg: any;
            raw: string;
            name: string;
            constructor();
            $set(exp: string, val: any): void;
            $delete(key: string): void;
            set(value: any): void;
            on(event: string, handler: Function): void;
            bind(): void;
            unbind(): void;
            update(newValue: any, oldValue: any): void;
        }
        class ElementDirective extends Directive {
        }
    }
    module filters {
        interface FilterCallback extends vuejs.FilterCallback {
            (value: any, begin?: any, end?: any): any;
        }
        function FilterCollection(excludedFunctions?: string[]): (target: any) => void;
    }
    module components {
        class Component {
            $: any;
            $$: any;
            $data: any;
            $children: Array<Vue>;
            $el: HTMLElement;
            $options: any;
            $parent: Vue;
            $root: Vue;
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
            $get(exp: string): any;
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
        }
        function lifecycleHook(hook: string): (cls: any, name: string, desc: PropertyDescriptor) => PropertyDescriptor;
        function eventHook(hook: string): (cls: any, name: string, desc: PropertyDescriptor) => PropertyDescriptor;
        function prop(options: any): (cls: any, name: string) => void;
    }
    module widgets {
        function extendWidget(name: string, parent: any, proto: Widget): void;
        class Widget {
            _create(): any;
            _destroy(): void;
            _init(): any;
            _delay(fn: any, delay: number): number;
            _focusable(element: JQuery): any;
            _getCreateEventData(): Object;
            _getCreateOptions(): Object;
            _hide(element: JQuery, option: Object, callback: Function): any;
            _hoverable(element: JQuery): any;
            _off(element: JQuery, eventName: string): any;
            _on(element: JQuery | string, handlers: Object): any;
            _setOption(key: string, value: Object): any;
            _setOptions(options: Object): any;
            _show(element: JQuery, option: Object, callback: Function): any;
            _super(...arg: any[]): void;
            _superApply(args: any): void;
            _trigger(type: String, args?: any[], data?: Object): any;
            destroy(): void;
            disable(): void;
            enable(): void;
            instance(): Object;
            option(arg: any): any;
            element: JQuery;
            document: JQuery;
            namespace: string;
            options: any;
            uuid: number;
            version: string;
            widgetEventPrefix: string;
            widgetFullName: string;
            widgetName: string;
            window: JQuery;
            protected bindings: JQuery;
            protected eventNamespace: string;
            constructor();
            app: Application;
        }
    }
    module plugins {
        interface IPluginRegisterOptions {
            'namespace'?: string;
            'class'?: any;
            'name'?: string;
            'callback'?: Function;
            'loadPath'?: string;
        }
        class Plugin {
            options: any;
            app: Application;
            static defaults: any;
            VERSION: string;
            NAMESPACE: string;
            enabled: boolean;
            protected _options: any;
            protected $window: JQuery;
            protected $document: JQuery;
            protected $body: JQuery;
            protected $element: JQuery;
            constructor(element: any, options: any, ns: string);
            instance(): Plugin;
            protected _create(): void;
            protected _destroy(): void;
            destroy(): void;
            _trigger(name: string, extraParameters?: any[] | Object): Plugin;
            _on(name: string, cb: any): Plugin;
            _on(name: string, sel?: string, cb?: any): Plugin;
            static register(name: string, pluginClass: any): void;
        }
        function registerPlugin(name: string, pluginClass: typeof Plugin, opts?: IPluginRegisterOptions): void;
    }
}
declare module packadic {
    import PromiseInterface = packadic.util.promise.PromiseInterface;
    interface IApplication {
    }
    function EventHook(hook: string): (cls: any, name: string, desc: PropertyDescriptor) => PropertyDescriptor;
    class Application extends Vue implements IApplication {
        data: any;
        static defaults: any;
        protected static _instance: Application;
        DEBUG: boolean;
        protected _events: EventEmitter2;
        config: IConfigProperty;
        protected _config: IConfig;
        isInitialised: boolean;
        isBooted: boolean;
        timers: any;
        extensions: extensions.Extensions;
        constructor(options?: {});
        static instance: Application;
        init(opts?: any): Application;
        boot(): PromiseInterface<Application>;
        debug: Debug;
        getAssetPath(path?: string, prefixBaseUrl?: boolean): string;
        mergeData(newData?: Object): void;
        protected _loaded: {
            [name: string]: boolean;
        };
        load(type: string, path: string, bower?: boolean, pathSuffix?: string): PromiseInterface<any[]>;
        loadJS(path: string, bower?: boolean): PromiseInterface<any[]>;
        loadCSS(path: string, bower?: boolean): PromiseInterface<any[]>;
        on(event: string, listener: Function): Application;
        once(event: string, listener: Function): Application;
        off(event: string, listener: Function): Application;
        emit(event: string, ...args: any[]): Application;
        booted(fn: Function): void;
    }
}
declare module packadic {
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
        raw(prop?: any): any;
        process(raw: any): any;
        unset(prop: any): any;
    }
    interface IConfigProperty extends IConfig {
        (args?: any): any;
    }
    class ConfigObject implements IConfig {
        private data;
        private allDelimiters;
        private static propStringTmplRe;
        constructor(obj?: Object);
        static makeProperty(config: IConfig): IConfigProperty;
        unset(prop: any): any;
        static getPropString(prop: any): string;
        static escape(str: string): string;
        raw(prop?: any): any;
        get(prop?: any): any;
        set(prop: string, value: any): ConfigObject;
        merge(obj: Object): ConfigObject;
        process(raw: any): any;
        private addDelimiters(name, opener, closer);
        private setDelimiters(name);
        private processTemplate(tmpl, options);
    }
}
declare module packadic {
    class StyleStuff {
        protected _styles: {
            [key: string]: string;
        };
        constructor();
        addMSC(name: string[] | string, variant?: any): StyleStuff;
        addFont(name: string, ff: string): StyleStuff;
        add(name: string, val: string | string[]): StyleStuff;
        all(): any;
        get(name: string): any;
        has(name: string): boolean;
    }
    class Debug {
        protected enabled: boolean;
        protected matcher: RegExp;
        protected start: Date;
        protected styles: StyleStuff;
        constructor();
        printTitle(): void;
        log(...args: any[]): void;
        logEvent(eventName: string, ...args: any[]): void;
        out(message: string, ...args: any[]): void;
        enable(): void;
        isEnabled(): boolean;
        setStartDate(start: Date): Debug;
    }
}
declare module packadic {
    function extension(name: string, configToMergeIntoDefaults?: any): (cls: typeof extensions.Extension) => void;
    module extensions {
        interface IExtension {
            app: Application;
        }
        interface IExtensionClass<T extends IExtension> {
            dependencies: string[];
            new (name: string, host: Extensions, app: Application): T;
        }
        class Extensions {
            protected app: Application;
            protected extensions: {
                [name: string]: Extension;
            };
            protected static EXTENSIONS: {
                [name: string]: IExtensionClass<Extension>;
            };
            protected static EXTENSIONSDEPS: util.obj.DependencySorter;
            private static _instance;
            constructor(app?: Application);
            static instance: Extensions;
            has(name: string): boolean;
            get(name?: string): Extension;
            protected load(name: any, cb?: Function): Extension;
            all(): {
                [name: string]: Extension;
            };
            getRegisteredNames(): string[];
            getRegistered(): {
                [name: string]: IExtensionClass<Extension>;
            };
            loadAll(): Extensions;
            each(fn: _.ObjectIterator<Extension, void>): Extensions;
            static register<T extends IExtension>(name: string, componentClass: IExtensionClass<Extension>, configToMergeIntoDefaults?: any): void;
        }
        class Extension implements IExtension {
            static dependencies: string[];
            app: Application;
            extensions: Extensions;
            name: string;
            constructor(name: string, extensions: Extensions, app: Application);
            config: IConfigProperty;
            private _make();
            private _boot();
            private _booted();
            protected make(): void;
            protected init(): void;
            protected boot(): void;
            protected booted(): void;
        }
    }
}
declare module packadic {
    import PromiseInterface = packadic.util.promise.PromiseInterface;
    function kindOf(value: any): any;
    function def(val: any, def: any): any;
    function defined(obj?: any): boolean;
    function cre(name?: string): JQuery;
    function getViewPort(): any;
    function isTouchDevice(): boolean;
    function getRandomId(length?: number): string;
    function getTemplate(name: any): any;
    var Clipboard: typeof ZeroClipboard;
    function getClipboard(): PromiseInterface<any>;
}
declare module packadic.storage {
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
        length: number;
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
declare module packadic {
    import PromiseInterface = packadic.util.promise.PromiseInterface;
    function notify(opts?: any): PromiseInterface<Noty>;
    function highlight(code: string, lang?: string, wrap?: boolean, wrapPre?: boolean): util.promise.PromiseInterface<string>;
    function makeSlimScroll(el: any, opts?: any): void;
    function destroySlimScroll(el: any): void;
    function registerHelperPlugins(): void;
}
declare module packadic.util.JSON {
    function stringify(obj: any): any;
    function parse(str: string, date2obj?: any): any;
    function clone(obj: any, date2obj?: any): any;
}
declare module packadic.util {
    var str: UnderscoreStringStatic;
    var arr: _.LoDashStatic;
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
    function codeIndentFix(str: string): string;
    function preCodeIndentFix(el: HTMLElement): string;
    module num {
        function round(value: any, places: any): number;
    }
    function makeString(object: any): string;
    function defaultToWhiteSpace(characters: any): any;
}
declare module packadic.util.material {
    var colors: any;
    function color(name: string, variant?: any, prefixHexSymbol?: boolean): any;
}
declare module packadic.util.obj {
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
declare module packadic.util.promise {
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
    function create<T>(): DeferredInterface<T>;
    function when<T>(value?: ThenableInterface<T>): PromiseInterface<T>;
    function when<T>(value?: T): PromiseInterface<T>;
}
declare module packadic.util.version {
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
declare module packadic.components {
    class CodeBlock extends Component {
        static template: string;
        static replace: boolean;
        language: string;
        title: string;
        description: string;
        showTop: boolean;
        theme: string;
        toManyLines: number;
        lineChangeStep: number;
        fixCodeIndent: boolean;
        show: boolean;
        minimized: boolean;
        lines: number;
        original: string;
        code: string;
        actionBtnClass: string;
        client: ZeroClipboard;
        isrdy: boolean;
        actions: any[];
        created(): void;
        ready(): void;
        beforeDestroy(): void;
        maximize(): void;
        minimize(): void;
        tryMaximize(): void;
        onCopyClick(e: any): void;
        onOpenInWindowClick(e: any): void;
        onMinimizeToggleClick(e: any): void;
        onDecreaseLinesClick(e: any): void;
        onIncreaseLinesClick(e: any): void;
        setCodeContent(code: string, fixIndent?: boolean): void;
        initClipboard(): void;
        getHeightBetweenLines(one: number, two: number): number;
        initScrollContent(): void;
        destroyScrollContent(): void;
    }
}
declare module packadic.directives {
    class BreadcrumbsDirective extends Directive {
        deep: boolean;
        hasOwnContent: boolean;
        $el: JQuery;
        $items: JQuery;
        $links: JQuery;
        bind(): void;
        unbind(): void;
        setOptions(opts?: any): void;
        update(value: any): void;
        createItem(name: string, href?: string | boolean, last?: boolean): JQuery;
        _getInfoContent(value?: any): void;
    }
}
declare module packadic.filters {
    class SomeFilters {
        testFilter(value: any): any;
        changeit(val: any, old?: any): any;
    }
    var someFilters: SomeFilters;
}
declare module packadic.plugins {
    class TestPlugin extends Plugin {
        protected _create(): void;
    }
}
declare module packadic.widgets {
    class TestWidget extends Widget {
        version: string;
        widgetEventPrefix: string;
        options: any;
        constructor();
        _create(): any;
    }
}
