import {View,IBreadcrumbLink} from "./../../../packadic/index";
import template from './roles.jade!'

export default class RolesView extends View {
    static template = template();

    breadcrumbs:IBreadcrumbLink = [
        View.breadcrumb('Home', 'route', 'home'),
        View.breadcrumb('User management', 'route', 'users.index'),
        View.breadcrumb('Roles', 'route', 'users.roles')
    ]

};
