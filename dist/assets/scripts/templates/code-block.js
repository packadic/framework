this["JST"] = this["JST"] || {};

this["JST"]["src/templates/code-block"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div v-class=\"code-block-show: show, code-block-minimized: minimized\" v-el=\"block\" v-on=\"click: tryMaximize\" class=\"code-block\">\n  <div v-if=\"showTop\" class=\"code-block-top\">\n    <div class=\"code-block-information\">\n      <h4><span v-text=\"title\"></span><small v-text=\"description\"></small></h4>\n      <dl>\n        <dt>Language</dt>\n        <dd v-text=\"language\"></dd>\n        <dt>Lines</dt>\n        <dd v-text=\"lines\"></dd>\n      </dl>\n    </div>\n  </div>\n  <div v-el=\"content\" class=\"code-block-content\">\n    <div class=\"code-block-actions\">\n      <template v-repeat=\"actions\"><a href=\"javascript:;\" data-toggle=\"tooltip\" data-container=\"body\" title=\"{{title}}\" data-clipboard-text=\"Copy me!\" v-on=\"click: onClick\" id=\"{{id}}\" class=\"btn code-block-action-button {{actionBtnClass}}\"><i class=\"fa {{icon}}\"></i></a></template>\n    </div>\n    <pre v-el=\"pre\" class=\"line-numbers\"><code v-el=\"code\" class=\"code-block-code\">\n        <content></content></code></pre>\n  </div>\n</div>");;return buf.join("");
};