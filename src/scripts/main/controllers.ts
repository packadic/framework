
import {AngularModule,IConfigProperty} from '../core';
import {app} from './app';
import {SidebarItemsService} from './services';

@app.Controller('RootController')
export class RootController {
    constructor(@app.Inject('$rootScope') private $rootScope:ng.IRootScopeService,
                @app.Inject('$scope') private $scope:ng.IScope,
                @app.Inject('$state') public $state:ng.ui.IStateService,
                @app.Inject('$stateParams') public $stateParams:ng.ui.IStateParamsService,
                @app.Inject('sidebarItems') public sidebarItems:SidebarItemsService
    //            @app.Inject('theme') public theme:ThemeFactory
    ) {
        console.log('RootController', this);
        this.$rootScope['sidebarItems'] = this.sidebarItems.all();


        //setTimeout(() => { $state.go('home') }, 2000);
    }
}

@app.Controller('HomeController')
export class HomeController {
    constructor(@app.Inject('$scope') public $scope:ng.IScope,
                @app.Inject('theme') public theme:any,
                @app.Inject('settings') public settings:IConfigProperty) {
        console.log('HomeController', this);

        this.$scope['headerTitle'] = settings('title');
        this.$scope['breadcrumbs'] = [
            {title:'Home'},
            {title:'Home'}
        ]
    }
}


export abstract class AbstractBaseController {

}
