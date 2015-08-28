/// <reference path="types.d.ts" />
declare var requirejs:Require;

requirejs.config(window.packadicConfig.requirejs);

requirejs(['Packadic'], /** @param {Packadic} Packadic */ function(Packadic:any){
    var packadic = window.packadic = Packadic.instance;
    packadic.DEBUG = true;
    packadic.init({

    });
    packadic.boot();
    packadic.removePageLoader();

    packadic.plugins.load('example', function(){
        var m = $('body, head').example({ asdf: 'a' });
        var i = $('body, head').example('instance');
        console.log('make', m);
        console.log('instance', i);
    });
});


