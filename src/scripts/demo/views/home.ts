import {View,IBreadcrumbLink, route} from "./../../packadic/index";
import template from './home.jade!'

export default class HomeView extends View {
    static template = template();
    breadcrumbs:IBreadcrumbLink = [
        View.breadcrumb('Home', 'route', 'home')
    ]
};
