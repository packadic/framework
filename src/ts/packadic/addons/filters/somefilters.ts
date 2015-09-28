

module packadic.filters {

    export class SomeFilters {
        @filter('test')
        testFilter(value:any):any {
            return 'success' + value
        }

        @filter()
        changeit(val:any, old?:any):any {
            return val + old;
        }
    }

    export var someFilters = new SomeFilters();
    someFilters.changeit('as');

}
