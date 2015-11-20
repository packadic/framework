import {View,IBreadcrumbLink} from "./../../../packadic/index";
import template from './permissions.jade!'

export default class PermissionsView extends View {
    static template = template();

    breadcrumbs:IBreadcrumbLink = [
        View.breadcrumb('Home', 'route', 'home'),
        View.breadcrumb('User management', 'route', 'users.index'),
        View.breadcrumb('Permissions', 'route', 'users.permissions')
    ]

};
