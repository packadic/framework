var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../types.d.ts"/>
var $ = require('jquery');
var widgets = require('widgets');
var App = window['App'];
var $body = $('body');
var PackadicProgressbarWidget = (function (_super) {
    __extends(PackadicProgressbarWidget, _super);
    function PackadicProgressbarWidget() {
        _super.call(this);
        this.version = '1.0.0';
        this.widgetEventPrefix = 'progressbar.';
        this.options = {
            transitionDelay: 300,
            refreshSpeed: 50,
            textDisplay: 'none',
            textFormat: '{value} / {max} ({percent}%)',
            value: 0
        };
    }
    PackadicProgressbarWidget.prototype._getDataAttributes = function () {
        var data = this.element.prefixedData('bar');
        return data;
    };
    PackadicProgressbarWidget.prototype._formatAmount = function (val, percent, max, min) {
        return this.options.textFormat
            .replace(/\{value\}/g, val)
            .replace(/\{percent\}/g, percent)
            .replace(/\{remaining\}/g, max - val)
            .replace(/\{max\}/g, max)
            .replace(/\{min\}/g, min);
    };
    PackadicProgressbarWidget.prototype._updateBaseValues = function () {
        this.options = $.extend(true, this.options, this._getDataAttributes());
        var $el = this.element;
        this.$parent = $el.parent();
        this.targetValue = parseInt(this.options.value);
        this.minValue = parseInt($el.attr('aria-valuemin')) || 0;
        this.maxValue = parseInt($el.attr('aria-valuemax')) || 100;
        this.isVertical = this.$parent.hasClass('vertical');
        this.percentage = Math.round(100 * (this.targetValue - this.minValue) / (this.maxValue - this.minValue));
    };
    PackadicProgressbarWidget.prototype._create = function () {
        var self = this;
        this._updateBaseValues();
        if (isNaN(this.targetValue)) {
            this._trigger('fail', ['data-transitiongoal not set']);
            return;
        }
        if (this.options.textDisplay === 'center' && !this.$back_text && !this.$front_text) {
            this.$back_text = $('<span>').addClass('progressbar-back-text').prependTo(this.$parent);
            this.$front_text = $('<span>').addClass('progressbar-front-text').prependTo(this.element);
            var parent_size;
            if (this.isVertical) {
                parent_size = this.$parent.css('height');
                this.$back_text.css({ height: parent_size, 'line-height': parent_size });
                this.$front_text.css({ height: parent_size, 'line-height': parent_size });
                this._on(this.window, {
                    'resize': function (event) {
                        parent_size = this.$parent.css('height');
                        this.$back_text.css({ height: parent_size, 'line-height': parent_size });
                        this.$front_text.css({ height: parent_size, 'line-height': parent_size });
                    }
                });
            }
            else {
                parent_size = this.$parent.css('width');
                this.$front_text.css({ width: parent_size });
                this._on(this.window, {
                    resize: function (event) {
                        parent_size = this.$parent.css('width');
                        this.$front_text.css({ width: parent_size });
                    }
                });
            }
        }
        setTimeout(this._start.bind(this), this.options.transitionDelay);
    };
    PackadicProgressbarWidget.prototype._start = function () {
        if (this.isVertical) {
            this.element.css('height', this.percentage + '%');
        }
        else {
            this.element.css('width', this.percentage + '%');
        }
        this.progressIntervalId = setInterval(this._update.bind(this), this.options.refreshSpeed);
    };
    PackadicProgressbarWidget.prototype.update = function () {
        this._updateBaseValues();
        this._start();
    };
    PackadicProgressbarWidget.prototype._update = function () {
        if (this.isVertical) {
            this.this_size = this.element.height();
            this.parent_size = this.$parent.height();
        }
        else {
            this.this_size = this.element.width();
            this.parent_size = this.$parent.width();
        }
        this.current_percentage = Math.round(100 * this.this_size / this.parent_size);
        this.current_value = Math.round(this.minValue + this.this_size / this.parent_size * (this.maxValue - this.minValue));
        if (this.current_percentage >= this.percentage) {
            this.current_percentage = this.percentage;
            this.current_value = this.targetValue;
            this._trigger('done', [this.element]);
            clearInterval(this.progressIntervalId);
        }
        if (this.options.textDisplay !== 'none') {
            this.text = this._formatAmount(this.current_value, this.current_percentage, this.maxValue, this.minValue);
            if (this.options.textDisplay === 'fill') {
                this.element.text(this.text);
            }
            else if (this.options.textDisplay === 'center') {
                this.$back_text.text(this.text);
                this.$front_text.text(this.text);
            }
        }
        this.element.attr('aria-valuenow', this.current_value);
        this._trigger('done', [this.current_percentage, this.element]);
    };
    PackadicProgressbarWidget.prototype._destroy = function () {
    };
    PackadicProgressbarWidget.prototype._init = function () {
        return undefined;
    };
    PackadicProgressbarWidget.prototype._setOption = function (key, value) {
        var self = this;
        switch (key) {
            case 'hidden':
                break;
        }
        this._super(key, value);
        return this;
    };
    return PackadicProgressbarWidget;
})(widgets.WidgetBase);
exports.PackadicProgressbarWidget = PackadicProgressbarWidget;
widgets.make('packadic.progressbar', new PackadicProgressbarWidget());
