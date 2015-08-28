var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./../../types.d.ts" />
/// <amd-dependency path="x-editable" />
/// <amd-dependency path="spectrum" />
var $ = require('jquery');
var plugins = require('app/plugins');
var material = require('modules/material');
var template = require('templates/styler');
var colorValues = [];
var palette = [];
$.each(material.colors, function (name, variants) {
    var variantValues = [];
    $.each(variants, function (variant, colorCode) {
        colorValues.push(colorCode);
        variantValues.push(colorCode);
    });
    palette.push(variantValues);
});
function addSpectrumToEl($el) {
    $el.spectrum({
        showPalette: true,
        palette: palette,
        containerClassName: 'sp-packadic-styler',
        showSelectionPalette: true,
        //selectionPalette    : colorValues,
        showInitial: true,
        showInput: true,
        showAlpha: false,
        preferredFormat: "hex",
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
    });
}
var StylerPlugin = (function (_super) {
    __extends(StylerPlugin, _super);
    function StylerPlugin() {
        _super.apply(this, arguments);
        this.VERSION = '0.0.1';
    }
    StylerPlugin.prototype._getVariables = function () {
        return $.ajax({
            url: this.options.host.toString() + ':' + this.options.port.toString()
        });
    };
    StylerPlugin.prototype.refresh = function () {
        var self = this;
        self._getVariables().done(function (res) {
            self.$element.html(template(res));
            self._bindXEditable(self.$element.find('a.scss-variable-value'));
        });
    };
    StylerPlugin.prototype._create = function () {
        var self = this;
        self._prepareXEditable();
        self.refresh();
    };
    StylerPlugin.prototype._addRow = function (variable) {
        var $tr = $('<tr>'), $tdName = $('<td>'), $span = $('<span>').addClass('scss-variable-name').text(variable.name), $tdVal = $('<td>'), $a = $('<a>').addClass('scss-variable-value').text(variable.value).attr('id', variable.name);
        $a.attr('data-scss-file-name', this.options.file).attr('data-type', variable.type);
        //$tr.append($tdName.append($span), $tdVal.append($a)).appendTo(this.$tbody);
    };
    StylerPlugin.prototype._bindXEditable = function ($el) {
        var self = this;
        $el.on('init', function (event, editable) {
            var $this = $(this);
            var fileName = $this.data('scss-file-name');
            var varName = $this.attr('id');
            editable.options.pk = {
                fileName: fileName,
                varName: varName
            };
            editable.options.title = varName;
        });
        $el.on('shown', function (event, editable) {
            console.log(arguments);
            if (editable.input.type === 'color') {
            }
        });
        $el.editable({
            url: this.options.host + ':' + this.options.port.toString(),
            success: function (response, newValue) {
                console.log('editable resp', response, newValue);
                response.result.files.forEach(function (file) {
                    var $el = $('link[data-styler="' + file.baseName + '"]').first();
                    console.log('$el link editing: ', $el);
                    $el.attr('href', self.packadic.config('paths.assets') + '/styles/' + file.relPath);
                });
            }
        });
    };
    StylerPlugin.prototype._prepareXEditable = function () {
        $.fn.editable.defaults.mode = 'inline';
        $.fn['editableform'].buttons = $.fn['editableform'].buttons
            .replace('glyphicon glyphicon-ok', 'fa fa-fw fa-check')
            .replace('glyphicon glyphicon-remove', 'fa fa-fw fa-times');
        function Color(options) {
            this.init('color', options, Color['defaults']);
        }
        $.fn['editableutils'].inherit(Color, $.fn['editabletypes'].abstractinput);
        $.extend(Color.prototype, {
            render: function () {
                this.$input = this['$tpl'].find('input');
                var cp = this.$input.parent().spectrum({
                    showPalette: true,
                    palette: palette,
                    containerClassName: 'sp-packadic-styler',
                    showSelectionPalette: true,
                    //selectionPalette    : colorValues,
                    showInitial: true,
                    showInput: true,
                    showAlpha: false,
                    flat: true,
                    preferredFormat: "hex",
                    showPaletteOnly: true,
                    togglePaletteOnly: true,
                    togglePaletteMoreText: 'more',
                    togglePaletteLessText: 'less',
                });
            },
            autosubmit: function () {
                this.$input.keydown(function (e) {
                    if (e.which === 13) {
                        $(this).closest('form').submit();
                    }
                });
            }
        });
        Color['defaults'] = $.extend({}, $.fn['editabletypes'].abstractinput.defaults, {
            tpl: '<div class="editable-color"><input type="hidden" class="form-control" value="" /></div>'
        });
        $.fn['editabletypes'].color = Color;
    };
    StylerPlugin.prototype.echo = function () {
        console.log('ECHOING', arguments);
    };
    StylerPlugin.defaults = {
        port: 3000,
        host: 'http://127.0.0.1'
    };
    return StylerPlugin;
})(plugins.BasePlugin);
plugins.register('styler', StylerPlugin);
module.exports = StylerPlugin;
//# sourceMappingURL=styler.js.map