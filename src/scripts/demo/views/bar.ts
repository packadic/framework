import {View,IBreadcrumbLink} from "./../../packadic/index";
import template from './bar.jade!'

export default class BarView extends View {
    static template = template();

    breadcrumbs:IBreadcrumbLink = [
        View.breadcrumb('Home', 'route', 'home'),
        View.breadcrumb('Bar', 'route', 'bar')
    ]

};
