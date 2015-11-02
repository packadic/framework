import {IConfigProperty,ConfigObject,createPromise} from '../lib';
import {AngularModule} from '../core';
import pageHeaderTpl from './page-header.jade!'
import pageContentTpl from './page-content.jade!'
import pageFooterTpl from './page-footer.jade!'
import pageSidebarTpl from './page-sidebar.jade!'
import {app} from './app';
import {SidebarItemsService,ThemeFactory} from './services';


class AbstractPageDirective {
    public static replace:boolean = true;
    public static require:string  = '';
    public static template:string = '';
    public static restrict:string = 'E';
}

@app.Directive('pageHeader')
export class PageHeaderDirective extends AbstractPageDirective {
    public static template:string = pageHeaderTpl({});
    public static scope:any       = {
        title: '='
    };

    constructor(@app.Inject('$scope') private $$scope:angular.IScope,
                @app.Inject('settings') private settings:IConfigProperty,
                @app.Inject('theme') private theme:ThemeFactory) {
        if (!this.$$scope['title']) this.$$scope['title'] = settings('headerTitle');
        this.$$scope['_th'] = this.theme;
        this.$$scope['toggleSidebar'] = () => { this.theme.isSidebarClosed() ? this.theme.openSidebar() : this.theme.closeSidebar() }
    }
}

@app.Directive('pageSidebar')
export class PageSidebarDirective extends AbstractPageDirective {
    public static template:string = pageSidebarTpl({});
    public static scope:any       = {
        items: '='
    };

    constructor(@app.Inject('$scope') public $$scope:any,
                @app.Inject('$state') public $state:any,
                @app.Inject('sidebarItems') public sidebarItems:SidebarItemsService,
                @app.Inject('theme') private theme:ThemeFactory) {
        if (!this.$$scope['title']) this.$$scope['title'] = sidebarItems.all();
        theme.boot();
    }
}

@app.Directive('pageContent')
export class PageContentDirective extends AbstractPageDirective {
    public static template:string    = pageContentTpl({});
    public static transclude:boolean = true;
    public static scope:any          = {
        title        : '@',
        subtitle     : '@',
        showSeperator: '@',
        breadcrumbs  : '='
    };

    constructor(@app.Inject('$scope') private $$scope:angular.IScope) {
    }
}

@app.Directive('pageFooter')
export class PageFooterDirective extends AbstractPageDirective {
    public static template:string = pageFooterTpl({});
    public static scope:any       = {
        text: '='
    };

    constructor(@app.Inject('$scope') private $$scope:angular.IScope,
                @app.Inject('settings') private settings:IConfigProperty) {
        if (!this.$$scope['text']) this.$$scope['text'] = settings('footerText')
    }
}
