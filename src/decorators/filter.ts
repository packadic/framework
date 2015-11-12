import * as _ from 'lodash';
import {App as Vue} from './../index';

export interface FilterCallback extends vuejs.FilterCallback {
    (value:any, begin?:any, end?:any): any;
}

/**
 * The @filter decorator registers a Vue filter
 * ```typescript
 * module packadic.filters {
     *      export class SomeFilters {
 *            @filter('code-block')
 *            codeBlockFilter(){
     *                console.log('init layout extension');
     *            }
 *            @filter
 *            code(){
     *                console.log('booting layout extension');
     *            }
 *       }
 * }
 * ```
 * @param {String} name - The name of the filter
 * @returns {function(filters.FilterCallback, string, TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>}
 */
export function Filter(name?:string):MethodDecorator {
    return (target:FilterCallback, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) => {
        name = name || propertyKey;
        var originalMethod = descriptor.value;
        descriptor.value = function (...args:any[]) {
            console.log("The method args are: " + JSON.stringify(args)); // pre
            var result = originalMethod.apply(this, args);               // run and store the result
            console.log("The return value is: " + result);               // post
            return result;                                               // return the result of the original method
        };
        Vue.filter(name, target);
        return descriptor;
    }
}


