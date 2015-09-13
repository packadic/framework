#!/usr/bin/env node
var jsdom = require('jsdom');

jsdom.env(
    '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        console.log("contents of a.the-link:", window.$("a.the-link").text());
        global.window = window;
        var pack = require('./.dev/assets/scripts/pack');
        var app = new pack.app.Application();
        console.log(pack, app);
    }
);

console.log('as');
