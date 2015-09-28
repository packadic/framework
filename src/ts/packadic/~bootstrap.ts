(function () {
    packadic.debug = new packadic.Debug();
    var app = packadic.app = packadic.Application.instance;

    // Add pre-init group end
    app.on('pre-init', () => {
        console.groupEnd();
    });

    // Add data
    var data = {
        breadcrumbs: {
            home: true,
            items: [
            ]
        }
    };
    Object.keys(data).forEach((key:string) => {
        app.$add(key, data[key]);
    });

    // Configure SystemJS on init
    app.on('init', (args:any[]) => {
        var app:packadic.Application = args[0];
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
                'jquery': {format:'global', exports: '$', loader: 'jquery-fake'},
                '*codemirror.js': { format: 'global', exports: 'CodeMirror'},
                '*highlightjs/highlight.pack*.js': { format: 'global', exports: 'hljs'},
                '*prism/prism*.js': { format: 'global', exports: 'Prism'},
                '*pnotify*.js': { format: 'global', exports: 'PNotify'}
            }
        })
    });
}.call(this));
