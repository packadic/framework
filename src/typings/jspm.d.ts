interface JSPMBundleOptions {
    inject?:boolean;
    mangle?:boolean;
    minify?:boolean;
    lowResSourceMaps?:boolean;
    sourceMaps?:boolean;
}
interface JSPM {
    setPackagePath(filePath:string):void;
    bundle(expression:string, fileName:string, options:JSPMBundleOptions):Promise<any>;
    unbundle():Promise<any>;
    bundleSFX(moduleName:string, fileName:string, options:JSPMBundleOptions):Promise<any>;
}

declare module "jspm" {
    var jspm:JSPM;
    export = jspm;
}
