var BaseApp = (function () {
    function BaseApp(p) {
        this.p = p;
        p.on('init', this._init.bind(this));
        p.on('boot', this._boot.bind(this));
        p.on('booted', this._booted.bind(this));
    }
    Object.defineProperty(BaseApp.prototype, "config", {
        get: function () {
            return this.p.config;
        },
        enumerable: true,
        configurable: true
    });
    BaseApp.prototype._boot = function () {
        this.boot();
    };
    BaseApp.prototype._init = function () {
        this.init();
    };
    BaseApp.prototype._booted = function () {
        this.booted();
    };
    BaseApp.prototype.boot = function () {
    };
    BaseApp.prototype.init = function () {
    };
    BaseApp.prototype.booted = function () {
    };
    return BaseApp;
})();
module.exports = BaseApp;
//# sourceMappingURL=BaseApp.js.map