var packadicConfig = (function () {

    var bowerDir = '../bower_components/';
    var requireJs = {
        baseUrl: "assets/scripts/",
        paths: {
            'eventemitter2': bowerDir + 'eventemitter2/lib/eventemitter2',
            'async': bowerDir + 'async/dist/async.min',
            'jade': bowerDir + 'jade/runtime',
            'jquery': bowerDir + 'jquery/dist/jquery.min',
            'bootstrap': bowerDir + 'bootstrap/dist/js/bootstrap.min',
            'material': bowerDir + 'bootstrap-material-design/dist/js/material.min',
            'ripples': bowerDir + 'bootstrap-material-design/dist/js/ripples.min',

            'slimscroll': bowerDir + 'jquery-slimscroll/jquery.slimscroll.min',

            'highlightjs': bowerDir + 'highlightjs/highlight.pack',
            'jstree': bowerDir + 'jstree/dist/jstree.min',
            'x-editable': bowerDir + 'x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min',
            'colorpicker': bowerDir + 'mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min',
            'spectrum': bowerDir + 'spectrum/spectrum',

            'highlightjs-css': bowerDir + 'highlightjs/styles',
            'jstree-css': bowerDir + 'jstree/dist/themes/default/style.min'
        },
        map: {
            '*': {
                'css': bowerDir + 'require-css/css.min' // or whatever the path to require-css is
            }
        },
        shim: {
            'app': ['jquery', 'bootstrap', 'material'],
            'jade': { exports: 'jade' },
            'jquery': {
                exports: '$', init: function () {
                    this.jquery.noConflict();
                }
            },
            'highlightjs': {exports: 'hljs'},
            'material': ['jquery', 'bootstrap'],
            'ripples': ['jquery', 'material'],
            'bootstrap': ['jquery'],
            'slimscroll': ['jquery'],
            'jstree': ['jquery'],
            'x-editable': ['jquery', 'bootstrap'],
            'spectrum': ['jquery']
        },
        waitSeconds: 5,
        config: {
            debug: true
        }
    };

    return {
        paths: {
            assets: 'assets'
        },
        requirejs: requireJs,
        app: {
            plugins: ['example', 'sidebar', 'styler']
        },
        selectors: {
            'search': '.sidebar-search',
            'header': '.page-header',
            'header-inner': '<%= selectors.header %> .page-header-inner',

            'container': '.page-container',
            'sidebar-wrapper': '.page-sidebar-wrapper',
            'sidebar': '.page-sidebar',
            'sidebar-menu': '.page-sidebar-menu',
            'content-wrapper': '.page-content-wrapper',
            'content': '.page-content',

            'content-head': '<%= selectors.content %> .page-head',
            'content-breadcrumbs': '<%= selectors.content %> .page-breadcrumbs',
            'content-inner': '<%= selectors.content %> .page-content-inner',

            'footer': '.page-footer',
            'footer-inner': '.page-footer-inner',
        },
        breakpoints: {
            'screen-lg-med': "1260px",
            'screen-lg-min': "1200px",
            'screen-md-max': "1199px",
            'screen-md-min': "992px",
            'screen-sm-max': "991px",
            'screen-sm-min': "768px",
            'screen-xs-max': "767px",
            'screen-xs-min': "480px"
        },
        plugins: ['example'],
        vendor: {
            material: {
                input: true,
                ripples: false,
                checkbox: true,
                togglebutton: true,
                radio: true,
                arrive: true,
                autofill: false,
                withRipples: [
                    ".btn:not(.btn-link)",
                    ".card-image",
                    ".navbar a:not(.withoutripple)",
                    ".dropdown-menu a",
                    ".nav-tabs a:not(.withoutripple)",
                    ".withripple"
                ].join(","),
                inputElements: "input.form-control, textarea.form-control, select.form-control",
                checkboxElements: ".checkbox > label > input[type=checkbox]",
                togglebuttonElements: ".togglebutton > label > input[type=checkbox]",
                radioElements: ".radio > label > input[type=radio]"
            },
            slimscroll: {
                allowPageScroll: false,
                size: '6px',
                color: '#000',
                wrapperClass: 'slimScrollDiv',
                railColor: '#222',
                position: 'right',
                height: '200px',
                alwaysVisible: false,
                railVisible: true,
                disableFadeOut: true
            }
        }
    };

}.call(this));
