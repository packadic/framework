/// <reference path="types.d.ts" />
requirejs.config(window.packadicConfig.requirejs);
requirejs(['Packadic'], function (Packadic) {
    var packadic = window.packadic = Packadic.instance;
    packadic.DEBUG = true;
    packadic.init({});
    packadic.boot();
    packadic.removePageLoader();
    packadic.plugins.load('example', function () {
        var m = $('body, head').example({ asdf: 'a' });
        var i = $('body, head').example('instance');
        console.log('make', m);
        console.log('instance', i);
    });
});
//# sourceMappingURL=init.js.map