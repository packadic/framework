/// <reference path="../typings/tsd/tsd.d.ts" />
/// <reference path="../typings/underscore.string.d.ts" />
/// <reference path="../typings/eventemitter2/eventemitter2.d.ts" />

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

declare module angular.ui {
    //IPreviousStateService
    //IPreviousState
    interface IFutureState {
        state: IState;
        params?: ui.IStateParamsService;
    }
    interface IFutureStateProvider {
        futureState(fsDef:any):void;
        stateFactory(type:any, stateFactory:any):void;
        addResolve(resolveFn:any):void;
    }
}
