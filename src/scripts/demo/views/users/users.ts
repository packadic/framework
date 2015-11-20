import {View,IBreadcrumbLink, App, LifecycleHook} from "./../../../packadic/index";
import template from './users.html!text'

export default class UsersView extends View {
    static template = template;

    breadcrumbs:IBreadcrumbLink = [
        View.breadcrumb('Home', 'route', 'home'),
        View.breadcrumb('User management', 'route', 'users.index')
    ];

    searchQuery:string   = '';
    gridColumns:string[] = ['first_name', 'email', 'ip_address'];
    users:any[]          = [];

    @LifecycleHook('created') created() {
        App.dataRequest('users', (data:any) => {
            this.users = data;
        })
    }

};
