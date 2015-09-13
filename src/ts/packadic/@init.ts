/// <reference path="./../types.d.ts" />


module packadic
{
    export var app:Application;
    export var debug:Debug;

    /****************************/
    // Config Defaults
    /****************************/

    var configDefaults:any = {
        vendor: {
            material: {
                // These options set what will be started by $.material.init()
                "input": true,
                "ripples": true,
                "checkbox": true,
                "togglebutton": true,
                "radio": true,
                "arrive": true,
                "autofill": false,

                "withRipples": [
                    ".btn:not(.btn-link)",
                    ".card-image",
                    ".navbar a:not(.withoutripple)",
                    ".dropdown-menu a",
                    ".nav-tabs a:not(.withoutripple)",
                    ".withripple"
                ].join(","),
                "inputElements": "input.form-control, textarea.form-control, select.form-control",
                "checkboxElements": ".checkbox > label > input[type=checkbox]",
                "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
                "radioElements": ".radio > label > input[type=radio]"
            }
        }
    };

    export function getConfigDefaults():any{
        return configDefaults;
    }

    export function mergeIntoDefaultConfig(obj:any = {}){
        configDefaults = _.merge(configDefaults, obj)
    }

    /****************************/
    // Application ready callbacks
    /****************************/


    var isReady:boolean = false;

    /**
     * @private
     */
    export var _readyCallbacks:Function[] = [];

    export function ready(fn:Function){
        if(isReady){
            fn.call(app);
        } else {
            _readyCallbacks.push(fn);
        }
    }

    /**
     * @private
     */
    export function callReadyCallbacks(){
        if(isReady){
            return;
        }
        _readyCallbacks.forEach((fn:Function) => {
            fn.call(app)
        });
        isReady = true;
    }



}
