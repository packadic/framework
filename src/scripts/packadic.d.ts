declare module packadic {
    var _: any;
    var _s: any;
    var aaa: any;
}
declare module packadic.util {
    function stringify(obj: any): any;
    function parse(str: string, date2obj?: any): any;
    function clone(obj: any, date2obj?: any): any;
}
declare module packadic.util {
    var str: UnderscoreStringStatic;
    var arr: _.LoDashStatic;
    module num {
        function round(value: any, places: any): number;
    }
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
    function makeString(object: any): string;
    function defaultToWhiteSpace(characters: any): any;
    function def(val: any, def: any): any;
    function defined(obj?: any): boolean;
    function cre(name?: string): any;
    function getViewPort(): any;
    function isTouchDevice(): boolean;
    function getRandomId(length?: number): string;
    function getTemplate(name: any): any;
}
declare module packadic.util {
    var colors: any;
    function color(name: string, variant?: any, prefixHexSymbol?: boolean): any;
}
declare module packadic.util {
    function kindOf(value: any): any;
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
declare module packadic.util {
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
declare module packadic.util {
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
    var defaultConfig: EventEmitter2Configuration;
    abstract class EventEmitter extends EventEmitter2 {
        constructor(eventOptions?: {});
    }
}
declare module packadic {
    class App extends Vue {
        protected static _instance: App;
        static instance: App;
        static defaults: Object;
        protected _config: ConfigObject;
        config: IConfigProperty;
        debugging: any;
        constructor();
        init(options?: Object): App;
        start(): App;
    }
}
declare module packadic {
}
declare module "packadic" {
    export = packadic;
}
