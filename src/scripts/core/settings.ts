import * as angular from 'angular';
import {IConfigProperty,ConfigObject} from '../lib';

var _config:ConfigObject = new ConfigObject({
    title      : 'Packadic',
    headerTitle: '<%= title %>',
    footerText: 'Copyright &copy; <%= title %> <%= (new Date()).getFullYear() %>',
    backend: {
        routeUrl: 'http://dev8.radic.nl/data/routes.json'
    },

    theme: {
        selectors   : {
            'search'      : '.sidebar-search',
            'header'      : '.page-header',
            'header-inner': '<%= layout.selectors.header %> .page-header-inner',

            'container'      : '.page-container',
            'sidebar-wrapper': '.page-sidebar-wrapper',
            'sidebar'        : '.page-sidebar',
            'sidebar-menu'   : '.page-sidebar-menu',
            'content-wrapper': '.page-content-wrapper',
            'content'        : '.page-content',

            'content-head'       : '<%= layout.selectors.content %> .page-head',
            'content-breadcrumbs': '<%= layout.selectors.content %> .page-breadcrumbs',
            'content-inner'      : '<%= layout.selectors.content %> .page-content-inner',

            'footer'      : '.page-footer',
            'footer-inner': '.page-footer-inner',
        },
        breakpoints : {
            'screen-lg-med': "1260px",

            'screen-lg-min': "1200px",
            'screen-md-max': "1199px",

            'screen-md-min': "992px",
            'screen-sm-max': "991px",

            'screen-sm-min': "768px",
            'screen-xs-max': "767px",

            'screen-xs-min': "480px"
        },
        breakpoints4: { // bootstrap 4
            xs: 0,
            sm: 544,
            md: 768,
            lg: 992,
            xl: 1200
        },
        sidebar     : {
            autoScroll       : true,
            keepExpanded     : true,
            slideSpeed       : 200,
            togglerSelector  : '.sidebar-toggler',
            openCloseDuration: 600,
            openedWidth      : 235,
            closedWidth      : 54,
            resolveActive    : true
        },
        preferences : {
            sidebar: {
                hidden   : false,
                closed   : false,
                reversed : false,
                fixed    : true,
                condensed: false,
            },
            header : {
                fixed: true
            },
            footer : {
                fixed: true
            },
            page   : {
                boxed: false
            }
        },
    }
});

export var settings:IConfigProperty = ConfigObject.makeProperty(_config);




