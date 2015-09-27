var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var packadic;
(function (packadic) {
    var addons;
    (function (addons) {
        var filters;
        (function (filters) {
            var SomeFilters = (function () {
                function SomeFilters() {
                }
                SomeFilters.prototype.testFilter = function (value) {
                    return 'success' + value;
                };
                SomeFilters.prototype.changeit = function (val, old) {
                    return val + old;
                };
                Object.defineProperty(SomeFilters.prototype, "testFilter",
                    __decorate([
                        filters.Filter('test')
                    ], SomeFilters.prototype, "testFilter", Object.getOwnPropertyDescriptor(SomeFilters.prototype, "testFilter")));
                Object.defineProperty(SomeFilters.prototype, "changeit",
                    __decorate([
                        filters.Filter()
                    ], SomeFilters.prototype, "changeit", Object.getOwnPropertyDescriptor(SomeFilters.prototype, "changeit")));
                return SomeFilters;
            })();
            filters.SomeFilters = SomeFilters;
            var FilterColTest = (function () {
                function FilterColTest() {
                }
                FilterColTest.prototype.wtffilter = function (val, old) {
                    return val + old;
                };
                FilterColTest.prototype.byefilter = function (val, old) {
                    return val + old;
                };
                FilterColTest.prototype.hellofilter = function (val, old) {
                    return val + old;
                };
                FilterColTest.prototype.excludethis = function (val, old) {
                    return val + old;
                };
                FilterColTest = __decorate([
                    filters.FilterCollection(['excludethis'])
                ], FilterColTest);
                return FilterColTest;
            })();
            filters.FilterColTest = FilterColTest;
            filters.filterColTest = new FilterColTest();
            filters.someFilters = new SomeFilters();
            filters.someFilters.changeit('as');
        })(filters = addons.filters || (addons.filters = {}));
    })(addons = packadic.addons || (packadic.addons = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=somefilters.js.map