// parser constructor
var Parser = function() {

};

// Parses the specified text
Parser.prototype.parse = function(text) {
    var results = {};

    // break up file into lines
    var lines = text.split('\n');
    // Iterating over each line and extracting
    lines.forEach(function(line) {
        var parts = line.split(' ');
        var letter = parts[1];
        var count = parseInt(parts[2]);

        if(!results[letter]) {
            results[letter] = 0;
        }
        results[letter] += parseInt(count);
    });
    return results;
};

// Export the parser constructor from this module
// We can export whatever we want from a js file
module.exports = Parser;


