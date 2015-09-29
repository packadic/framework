/// <reference path="./../types.d.ts" />


console.groupCollapsed('Packadic pre-init logs');

module packadic {

    export var app:Application;
    export var debug:Debug;

    /****************************/
    // Config Defaults
    /****************************/

    var configDefaults:any = {
        baseUrl: location.origin,
        assetPath: '/assets',
        vendor: {
            material: {
                "input": true,
                "ripples": true,
                "checkbox": true,
                "togglebutton": true,
                "radio": true,
                "arrive": true,
                "autofill": false,
                "withRipples": [ ".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple" ].join(","),
                "inputElements": "input.form-control, textarea.form-control, select.form-control",
                "checkboxElements": ".checkbox > label > input[type=checkbox]",
                "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
                "radioElements": ".radio > label > input[type=radio]"
            },
            slimscroll: {
                allowPageScroll: false,
                size: '6px',
                color: '#37474f', //util.material.color('blue-grey', 800),
                wrapperClass: 'slimScrollDiv',
                railColor: '#607d8b', //util.material.color('blue-grey', 500),
                position: 'right',
                height: '200px',
                alwaysVisible: false,
                railVisible: true,
                disableFadeOut: true
            },
            bootstrap: {
                tooltip: {
                    container: 'body',
                    template: '<div class="tooltip tooltip-packadic" role="tooltip"><div class="tooltip-inner"></div></div>',
                    selector: '*[data-toggle="tooltip"]'
                },
                popover: {
                    selector: '*[data-toggle="popover"]'
                }
            }
        }
    };

    export function getConfigDefaults():any {
        return configDefaults;
    }

    export function mergeIntoDefaultConfig(obj:any = {}) {
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

    export function ready(fn:Function) {
        if (isReady) {
            fn.call(app);
        } else {
            _readyCallbacks.push(fn);
        }
    }


    /**
     * @private
     */
    export function callReadyCallbacks() {
        if (isReady) {
            return;
        }
        _readyCallbacks.forEach((fn:Function) => {
            fn.call(app)
        });
        isReady = true;
    }
}
