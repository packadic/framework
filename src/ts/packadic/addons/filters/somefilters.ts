

module packadic.addons.filters {

    export class SomeFilters {
        @Filter('test')
        testFilter(value:any):any {
            return 'success' + value
        }

        @Filter()
        changeit(val:any, old?:any):any {
            return val + old;
        }
    }

    @FilterCollection(['excludethis'])
    export class FilterColTest {
        wtffilter(val:any, old?:any):any {
            return val + old;
        }
        byefilter(val:any, old?:any):any {
            return val + old;
        }
        hellofilter(val:any, old?:any):any {
            return val + old;
        }
        excludethis(val:any, old?:any):any {
            return val + old;
        }
    }

    export var filterColTest = new FilterColTest();
    export var someFilters = new SomeFilters();
    someFilters.changeit('as');

}
