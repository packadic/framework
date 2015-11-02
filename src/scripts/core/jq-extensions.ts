import {isTouchDevice} from './../lib';
import * as $ from 'jquery';

export function registerJQueryExtensions() {
    $.fn.prefixedData = function (prefix) {
        var origData = $(this).first().data();
        var data     = {};
        for (var p in origData) {
            var pattern = new RegExp("^" + prefix + "[A-Z]+");
            if (origData.hasOwnProperty(p) && pattern.test(p)) {
                var shortName   = p[prefix.length].toLowerCase() + p.substr(prefix.length + 1);
                data[shortName] = origData[p];
            }
        }
        return data;
    };

    $.fn.removeAttributes = function ():JQuery {
        return this.each(function () {
            var attributes = $.map(this.attributes, function (item) {
                return item.name;
            });
            var img        = $(this);
            $.each(attributes, function (i, item) {
                img.removeAttr(item);
            });
        });
    };

    $.fn.ensureClass = function (clas:string, has:boolean = true):JQuery {
        if (has === true && this.hasClass(clas) === false) {
            this.addClass(clas);
        } else if (has === false && this.hasClass(clas) === true) {
            this.removeClass(clas);
        }
        return this;
    };

    $.fn.onClick = function (...args:any[]):JQuery {
        return this.on.apply(this, [isTouchDevice() ? 'touchend' : 'click'].concat(args));
    }
};
