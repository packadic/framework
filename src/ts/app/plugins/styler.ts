/// <reference path="./../../types.d.ts" />
/// <amd-dependency path="x-editable" />
/// <amd-dependency path="spectrum" />
import $ = require('jquery');
import plugins = require('app/plugins');
import material = require('modules/material');
import template = require('templates/styler');


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

function addSpectrumToEl($el:JQuery){
    $el.spectrum(<Spectrum.Options> {
        showPalette         : true,
        palette             : palette,
        containerClassName  : 'sp-packadic-styler',
        showSelectionPalette: true, // true by default
        //selectionPalette    : colorValues,
        showInitial         : true,
        showInput           : true,
        showAlpha           : false,

        preferredFormat: "hex",

        showPaletteOnly      : true,
        togglePaletteOnly    : true,
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
    });
}

class StylerPlugin extends plugins.BasePlugin {

    public static defaults:any = {
        port: 3000,
        host: 'http://127.0.0.1'
    };

    public VERSION:string = '0.0.1';

    protected variables:any;

    protected _getVariables():JQueryXHR {
        return $.ajax(<JQueryAjaxSettings> {
            url: this.options.host.toString() + ':' + this.options.port.toString()
        })
    }

    public refresh(){
        var self:StylerPlugin = this;
        self._getVariables().done(function (res:StylerResponse) {
            if(res.code === 200) {
                self.$element.html(template(res.data));
                self._bindXEditable(self.$element.find('a.scss-variable-value'));
            }
        });
    }

    public _create() {
        var self:StylerPlugin = this;
        self._prepareXEditable();
        self.refresh();
    }


    protected _bindXEditable($el:JQuery) {
        var self:StylerPlugin = this;
        $el.on('init', function (event, editable:any) {
            var $this = $(this);
            var fileName = $this.data('scss-file-name');
            var varName = $this.attr('id');

            editable.options.pk = {
                fileName: fileName,
                varName: varName
            };
            editable.options.title = varName;
        });
        $el.on('shown', function (event, editable:any) {
            console.log(arguments);
            if (editable.input.type === 'color') {
                editable.input.$input.parent().spectrum('set', editable.value);

            }
        });
        $el.editable({
            url: this.options.host + ':' + this.options.port.toString(),
            success: function(response, newValue) {
                console.log('editable resp', response, newValue);

                response.result.files.forEach(function(file:any){
                    var $el:JQuery = $('link[data-styler="' + file.baseName + '"]').first();
                    console.log('$el link editing: ', $el);
                    $el.attr('href', self.packadic.config('paths.assets') + '/styles/' + file.relPath);

                });
            }
        });
    }

    protected _prepareXEditable() {

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
                    showPalette         : true,
                    palette             : palette,
                    containerClassName  : 'sp-packadic-styler',
                    showSelectionPalette: true, // true by default
                    //selectionPalette    : colorValues,
                    showInitial         : true,
                    showInput           : true,
                    showAlpha           : false,
                    flat: true,

                    preferredFormat: "hex",

                    /*showPaletteOnly      : true,
                    togglePaletteOnly    : true,
                    togglePaletteMoreText: 'more',
                    togglePaletteLessText: 'less',*/
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
    }

    public echo() {
        console.log('ECHOING', arguments);
    }
}
export = StylerPlugin;
plugins.register('styler', StylerPlugin);
