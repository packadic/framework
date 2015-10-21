var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var MyEle = (function (_super) {
    __extends(MyEle, _super);
    function MyEle() {
        console.log('MyEle');
    }
    MyEle = __decorate([
        component('myele')
    ], MyEle);
    return MyEle;
})(polymer.Base);
exports.MyEle = MyEle;
var packadic;
(function (packadic) {
    var components;
    (function (components) {
        MyEle.register();
        var IBoxComponent = (function (_super) {
            __extends(IBoxComponent, _super);
            function IBoxComponent() {
                _super.apply(this, arguments);
            }
            IBoxComponent.prototype.ready = function () {
                $(this.$el).attr('id', this.id);
            };
            IBoxComponent.template = getTemplate('ibox')({});
            IBoxComponent.replace = true;
            __decorate([
                prop({ type: String, required: true, 'default': '' })
            ], IBoxComponent.prototype, "id");
            Object.defineProperty(IBoxComponent.prototype, "ready",
                __decorate([
                    lifecycleHook('ready')
                ], IBoxComponent.prototype, "ready", Object.getOwnPropertyDescriptor(IBoxComponent.prototype, "ready")));
            IBoxComponent = __decorate([
                component('ibox')
            ], IBoxComponent);
            return IBoxComponent;
        })(Component);
        components.IBoxComponent = IBoxComponent;
    })(components = packadic.components || (packadic.components = {}));
})(packadic || (packadic = {}));
