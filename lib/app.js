var http = require('http'),
fs       = require('fs'),
path     = require('path');


exports.start = function() {
	http.createServer(function(req, res) {
		var url = req.url;
		var file = url === "/" ? "/index.html" : url;


		fs.readFile(process.env.PWD + file, function(err, data) {
			if (!!err) {
				console.error('Error loading : '+ url);
				res.writeHead(404);
				res.end();
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
	process.stdout.write("\033[33mWeb Server started on localhost:1337 \033[39m\n");
}

