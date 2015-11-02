import * as angular from 'angular';
import {IConfigProperty} from '../../lib'
import {AngularModule} from '../../core'
import {app} from '../../main'
import booksTpl from './books.jade!'


export var books:any = AngularModule.create('app.books', [app.name]);

@books.Controller('BooksController')
export class BooksController {
    constructor(@books.Inject('$scope') public $scope:ng.IScope,
                @books.Inject('theme') public theme:any,
                @books.Inject('settings') public settings:IConfigProperty) {
        console.log('BooksController', this);

        this.$scope['headerTitle'] = settings('title');
        this.$scope['breadcrumbs'] = [
            {title:'Home'},
            {title:'Books'}
        ]
    }
}


books.config(['$stateProvider', function ($stateProvider:ng.ui.IStateProvider) {
    $stateProvider.state('books', {
        parent      : 'root',
        url         : 'books',
        controller  : 'BooksController',
        views       : {main: {template: booksTpl({})}},
        controllerAs: 'booksCtrl',

    });

    console.log('books stateprov', $stateProvider)
}]);
