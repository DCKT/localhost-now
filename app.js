var http = require('http'),
fs       = require('fs'),
path     = require('path');


http.createServer(function(req, res) {
	var url = req.url;
	var file = url === "/" ? "/index.html" : url;

	fs.readFile(__dirname + file, function(err, data) {
		if (!!err) {
			console.error('Error loading : '+ url);
			res.writeHead(404);
			res.end(url+ " was not found");
		}

		var type = path.extname(file);
		var contentType = null;

		if (type === "js") {
			contentType = "application/javascript";
		}
		else {
			contentType = "text/"+ type.slice(1, type.length);
		}

		res.writeHead(200, {
			'Content-Type': contentType
		});

		res.end(data);
	});
  
}).listen(1337);



