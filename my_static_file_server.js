var express = require('express');

app = express();

// binding the default path
app.use(express.static(__dirname + '/public'));

// listen port
app.listen(8080);
