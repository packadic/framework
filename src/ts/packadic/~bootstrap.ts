(function () {
    packadic.debug = new packadic.Debug();
    packadic.ready((app:packadic.Application) => {
        console.log('init app systemjs', app);
        System.config({
            defaultJSExtensions: true,
            map: {
                css: app.getAssetPath('scripts/systemjs/css-plugin.js'),
                // jquery-fake resolves the jquery meta without actually doing anything, to use if jquery is already included using script(src)
                'jquery-fake': app.getAssetPath('scripts/systemjs/jquery-fake-plugin.js')
            },
            meta: {
                '*.css': {
                    loader: 'css'
                },
                'jquery': {format: 'global', exports: '$', loader: 'jquery-fake'},
                '*codemirror.js': {format: 'global', exports: 'CodeMirror'},
                '*highlightjs/highlight.pack*.js': {format: 'global', exports: 'hljs'},
                '*prism/prism*.js': {format: 'global', exports: 'Prism'},
                '*pnotify*.js': {format: 'global', exports: 'PNotify'}
            }
        })
    })
}.call(this));
