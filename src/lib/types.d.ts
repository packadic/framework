/// <reference path="../types.d.ts" />
/// <reference path="./types/tsd.d.ts" />
/// <reference path='./underscore.string.d.ts' />
/// <reference path='./tmp.d.ts' />

declare module "globule" {
    export function find(...args:any[]): string[];
}

declare module "gonzales-pe"{
    export function cssToAST(...args:any[]):any;
    export function astToTree(...args:any[]):any;
}
