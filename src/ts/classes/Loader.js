var $ = require('jquery');
var Loader = (function () {
    function Loader(name, el) {
        this.name = name;
        this.$el = typeof (el) === 'string' ? $(el) : el;
    }
    Loader.prototype.stop = function () {
        if (!this.started) {
            return;
        }
        this.$el.removeClass(this.name + '-loader-content');
        this.$parent.removeClass(this.name + '-loading');
        this.$loader.remove();
        this.started = false;
    };
    Loader.prototype.start = function () {
        if (this.started) {
            return;
        }
        this.$el.addClass(this.name + '-loader-content');
        this.$parent = this.$el.parent().addClass(this.name + '-loading');
        var $loaderInner = $('<div>').addClass('loader loader-' + this.name);
        this.$loader = $('<div>').addClass(this.name + '-loader');
        this.$loader.append($loaderInner).prependTo(this.$parent);
    };
    return Loader;
})();
module.exports = Loader;
//# sourceMappingURL=Loader.js.map