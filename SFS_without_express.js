// A static web server without express module

var sys = require("sys"),
    my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");

my_http.createServer(function(request, response){
    var my_path = url.parse(request.url).pathname;
    // append public as the file is stored in that folder
    var full_path = path.join(process.cwd() + "/public" , my_path);
    filesys.exists(full_path, function(exists){
        if(!exists) {
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();   // closing this is important
        }
        else {
            // read file
            filesys.readFile(full_path, "binary", function(err, file){
                if(err) {
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                }
                else {
                    response.writeHeader("200", {"Content-Type": "text/plain"});
                    response.write(file, "binary");
                    response.end();
                }
            });
        }

    });
}).listen(8080);
sys.puts("Server is running");
