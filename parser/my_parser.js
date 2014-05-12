// Require my new parser.js file
var Parser = require('./parser');

// Load the fs (filesystem) module
var fs = require('fs');

// Read the contents of the file into memory
fs.readFile('example_log.txt', function (err, logData) { 
    // if error display error
    if(err) throw err;

    // logData if a buffer
    var text = logData.toString();

    // create an instance of Parser object
    var parser = new Parser();

    console.log(parser.parse(text));
});
