#!/usr/bin/env node
var StaticServer = require('static-server');
var server = new StaticServer({
    rootPath: './swagger-editor',            // required, the root of the server file tree
    name: 'swagger-server',   // optional, will set "X-Powered-by" HTTP header
    port: 8080,               // optional, defaults to a random port
    host: '127.0.0.1',       // optional, defaults to any interface
    followSymlink: true,      // optional, defaults to a 404 error
    index: 'index.html'         // optional, defaults to 'index.html'
});

server.start(function () {
    console.log('Server listening to', server.port);
});

server.on('request', function (req, res) {
    console.log('req', req.path);
    if(req.path === '/editor/spec'){
        console.log(require('util').inspect(req, { colors: true }));
        require('fs').writeFileSync('./request.json', require('util').inspect(req, { colors: false }));
    }
});
