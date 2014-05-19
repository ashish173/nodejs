/* A webserver that handles multiple ajax requests
 * and does not bombard them onto the server 
 * rather it uses asynchronous calls to the api server
 */

var events = require("events"),
    my_http = require("http"),
    sys = require("sys"),
    url = require("url");
//
var http_options = {
    method: "GET",
    host: "graph.facebook.com",
    port : 80,
    path: "/19292868552"
};

// var facebook_client = my_http.request(http_options, );
// createClient is deprecated use in http.request 
// create an emitter object
var facebook_emitter = new events.EventEmitter();

function get_data() {
    var request = my_http.request(http_options);
    
    // response listener is triggered when the request starts 
    // recievind data
    request.addListener("response", function(response){
        var body = "";
        // Data recieved in chunks so this collects all the
        // data sent from Nodejs server
        response.addListener("data", function(data){
            body += data;
        });
    
        // end is triggered when specified action has finished
        response.addListener("end", function() {
            var data = JSON.parse(body);
            facebook_emitter.emit("data", String(data.likes));
            sys.puts("likes are " + String(data.likes));
        });
    });

    request.end();
    
    sys.puts("Exiting get_data function");
}

my_http.createServer(function(request, response){ 
    var my_path = url.parse(request.url).pathname;
    if(my_path === "/getdata") {
        sys.puts("get_data resource accessed");
        var listener = facebook_emitter.once("data", function(data){
            response.writeHeader(200, {"Content-Type": "text/plain"});
            response.write(data);

            response.end();
        });
    }
    else {
        // load_file(my_path, response);
        response.writeHeader(404, {"Content-Type": "text/plain"});
        response.write("404 File not found");
        response.end();
    }
    
     // get_data();
}).listen(8080);

/* Calling the get_data method every 5 second will save the overhead of calling the get_data 
 * method on all client requests.  
 * once every 5 seconds we have a new emitter object
 * which has latest count which can be used to reply to all client requests
 * Thus preventing multiple queries at once
 */
setInterval(get_data, 2000);

// echo message
sys.puts("server is running");
