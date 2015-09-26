
module packadic {

    export module addons {


        export interface IAddon {
            app:Application;
        }
        export class Base {
            app:Application;
            constructor(app:Application){
                this.app = app;
            }
        }

        export class AddonManager {

        }


        export class Directive {
            el:HTMLElement;
            vm:vuejs.Vue;
            expression:string;
            arg:any;
            raw:string;
            name:string;

            bind():void {}
            unbind():void {}
            update(newValue:any, oldValue:any):void {}
        }

        export class ElementDirective extends Directive {

        }

        export function createDirective(name:string):(cls:any)=>void {
                return (cls:any):void => {

                    let definition:any  = {
                        isLiteral: false,
                        twoWay: false,
                        acceptStatement: false,
                        deep: false
                    };

                    Object.keys(definition).forEach((defName:string) => {
                        if(cls.hasOwnProperty(defName)){
                            definition[defName] = cls[defName];
                        }
                    });

                    // create object and get prototype
                    let obj:any = new cls();
                    let proto:any = Object.getPrototypeOf(obj);

            }
        }


        export interface TwoWayFilter {
            read(val:any):any;
            write(val:any, oldVal:any):any;
        }
        interface TwoWayFilterObject  extends vuejs.FilterCallback {
            [name:string]: TwoWayFilter
        }
        interface TwoWayFilterCallback {
            (): TwoWayFilter;
        }


        export interface FilterCallback extends vuejs.FilterCallback {
            (value:any,begin?:any,end?:any): any;
        }

        export function Filter(name?:string) : MethodDecorator {
            return (target: FilterCallback, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
                name = name || propertyKey;
                var originalMethod = descriptor.value;
                descriptor.value = function(...args: any[]) {
                    console.log("The method args are: " + JSON.stringify(args)); // pre
                    var result = originalMethod.apply(this, args);               // run and store the result
                    console.log("The return value is: " + result);               // post
                    return result;                                               // return the result of the original method
                };
                Vue.filter(name, target);
                return descriptor;
            }
        }
        export function FilterCollection(excludedFunctions:string[]=[]) {
            return function (target: any) {
                let proto = Object.getPrototypeOf(target);
                let filters:{[name:string]:Function} = {};
                Object.getOwnPropertyNames(proto).forEach((method:string):void => {

                    if (['constructor'].concat(excludedFunctions).indexOf(method) > -1) {
                        return;
                    }

                    let desc:PropertyDescriptor = Object.getOwnPropertyDescriptor(proto, method);

                    // normal methods
                    if (typeof desc.value === 'function'){
                        Vue.filter(method, proto[method]);
                    }
                });
            }
        }


        export class SomeFilters {
            @Filter('test')
            testFilter(value:any):any {
                return 'success' + value
            }

            @Filter()
            changeit(val:any, old?:any):any {
                return val + old;
            }
        }

        @FilterCollection(['excludethis'])
        export class FilterColTest {
            wtffilter(val:any, old?:any):any {
                return val + old;
            }
            byefilter(val:any, old?:any):any {
                return val + old;
            }
            hellofilter(val:any, old?:any):any {
                return val + old;
            }
            excludethis(val:any, old?:any):any {
                return val + old;
            }
        }

        export var filterColTest = new FilterColTest();
        export var someFilters = new SomeFilters();
        someFilters.changeit('as');
    }
}
