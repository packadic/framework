(function () {


    packadic.debug = new packadic.Debug();
    packadic.app = packadic.Application.instance;
    packadic.app.on('pre-init', () => {
        console.groupEnd();
    });
    packadic.app.on('init', (args:any[]) => {
        var app:packadic.Application = args[0];
        console.log('init app systemjs', app);
        System.config({
            defaultJSExtensions: true,
            map: {
                css: app.getAssetPath('scripts/systemjs/css-plugin.js')
            },
            meta: {
                '*.css': {
                    loader: 'css'
                },
                '*codemirror.js': { format: 'global', exports: 'CodeMirror'},
                '*highlightjs/highlight.pack*.js': { format: 'global', exports: 'hljs'},
                '*prism/prism*.js': { format: 'global', exports: 'Prism'}
            }
        })
    });
}.call(this));
