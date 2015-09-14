var namp = require('namp'),
    fs = require('fs'),
    globule = require('globule'),
    path = require('path');

fs.readFile("SYNTAX.md", "utf8", function (err, data) {
    if (!err) {
        var output = namp(data, {highlight: true } );
        fs.writeFileSync("SYNTAX.html", output.html);

        console.log("Finished! By the way, I found this metadata:\n" + console.log(output.metadata));
    }
});

module.exports = function(grunt){

    grunt.registerTask('mdgen', '', function(){
        var options = this.options({
            src: 'src/md'
        });

        var target = grunt.config.get('target');
        var dest = grunt.config.get('target.dest');

        globule.find(options.src).forEach(function(filePath){
            var output = namp(fs.readFileSync(filePath, 'utf8'), {
                highlight: true
            });
            fs.writeFileSync(path.join(target.dest, path.basename(filePath, path.extname(filePath)) + '.html'));
            grunt.log.ok('Generated MD ' + filePath);
        });

    });
};
