import * as _ from 'lodash';
import {App as Vue} from './../index';



/**
 * The @directive decorator registers a Vue Directive
 * ```typescript
 * module packadic.extensions {
 *      @extension('code-block', { })
 *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
 * }
 * ```
 * @param {String} name - The name of the directive
 * @param {Boolean} isElementDirective - Register as element directive
 * @returns {function(packadic.directives.Directive): void}
 */
export function Directive(name:string, isElementDirective:boolean=false):(cls:typeof BaseDirective)=>void {

    return (cls:typeof BaseDirective):void => {

        let definition:any = {
            isLiteral: false,
            twoWay: false,
            acceptStatement: false,
            deep: false
        };

        let obj:any = new cls();
        let proto:any = Object.getPrototypeOf(obj);

        Object.getOwnPropertyNames(obj).forEach((defName:string) => {
            definition[defName] = obj[defName];
        });

        Object.getOwnPropertyNames(proto).forEach((method:string):void => {
            if (['constructor'].indexOf(method) > -1)
                return;

            let desc:PropertyDescriptor = Object.getOwnPropertyDescriptor(proto, method);
            if (typeof desc.value === 'function') {
                definition[method] = proto[method];
            } else if (typeof desc.set === 'function') {
                Object.defineProperty(definition, method, desc);
            } else if (typeof desc.get === 'function') {
                Object.defineProperty(definition, method, desc);
            }

        });

        console.log('@directive ', name, definition, proto);

        if(isElementDirective){
            Vue.elementDirective(name, definition);
        } else {
            Vue.directive(name, definition);
        }
    }
}

export class BaseDirective {
    el:HTMLElement;
    vm:vuejs.Vue;
    expression:string;
    arg:any;
    raw:string;
    name:string;


    constructor() {
        // remove all members, they are only needed at compile time.
        var myPrototype = (<Function>Directive).prototype;
        $.each(myPrototype, (propertyName, value)=> {
            delete myPrototype[propertyName];
        });
    }

    get $el():JQuery {
        return $(this.el);
    }

    // methods: http://vuejs.org/api/instance-methods.html
    $set(exp:string, val:any):void {
    }
    $delete(key:string):void {}

    set(value:any):void {}
    on(event:string, handler:Function):void {}

    bind():void {
    }

    unbind():void {
    }

    update(newValue:any, oldValue:any):void {
    }
}

export class ElementDirective extends Directive {

}
