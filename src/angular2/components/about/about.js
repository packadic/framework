System.register(['angular2/angular2'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var angular2_1;
    var About;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            About = (function () {
                function About(list) {
                    this.list = list;
                }
                About.prototype.addName = function (newname) {
                    this.list.add(newname.value);
                    newname.value = '';
                    return false;
                };
                About = __decorate([
                    angular2_1.Component({
                        selector: 'about'
                    }),
                    angular2_1.View({
                        templateUrl: './components/about/about.html',
                        directives: [angular2_1.CORE_DIRECTIVES]
                    })
                ], About);
                return About;
            })();
            exports_1("About", About);
        }
    }
});
//# sourceMappingURL=about.js.map