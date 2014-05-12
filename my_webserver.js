// importing http module
var http = require('http');


/* request contains all the information about the request
 * that has been made to the server
 * response contains info that is sent back by the server
 * function given as the first arguement is trigged every
 * time an event is triggered on port 8080
 */

http.createServer(function (request, response) { 
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8080);

console.log('Server is running');
