#!/usr/bin/env node
var webpack = require('webpack'),
    Module = require('module');

var System = global.System = require('systemjs');
require('./system.config');


//var resolve = require.resolve;
//require.resolve = function(path){
//    var result = resolve(path);
//    if(result) return result;
//    var sysresult = System.normalizeSync(path);
//    if(sysresult) return sysresult;
//    return result;
//};

var conf = module.exports = {
    entry: './src/scripts/packadic/index.ts',
    output: {
        path: './dev/assets/scripts',
        //publicPath: 'dist/',
        filename: 'packadic.js',
        libraryTarget: 'var',
        library: 'packadic'
    },
    externals: {
        bootstrap: 'bootstrap',
        jquery: 'jquery',
        loglevel: 'loglevel',
        pagination: 'pagination'

    },
    //devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.(png|jpg|gif)$/, loader: 'file?name=[name].[ext]?[hash]' }
        ]
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
};

var run = function(){
    // returns a Compiler instance
    var compiler = webpack(conf);
    compiler.run(function(err, stats) {
        console.log(err, stats);
    });
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}

if(process.argv[process.argv.length - 1] == 'run') run();
