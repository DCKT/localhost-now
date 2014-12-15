var http = require('http'),
fs       = require('fs'),
path     = require('path');


exports.start = function(args) {
	var port = parseInt(args[0]) ? args[0] : 1337;

	http.createServer(function(req, res) {
		var url = req.url;

		if (url.indexOf('?') != -1) {
			url = url.split('?')[0];
		}

		var file = url === "/" ? "/index.html" : url;

		fs.readFile(path.normalize(process.cwd()) + file, function(err, data) {
			if (!!err) {
				console.error('Error loading : '+ url);
				res.writeHead(404);
				res.end();
			}
			else {
				var type = path.extname(file);

				if (type === ".js") {
	        contentType = 'application/javascript';
				}
				else {
					contentType = "text/"+ type.slice(1, type.length);
				}

				res.setHeader('content-type', contentType);
				res.end(data);
			}


		});

	}).listen(port);
	process.stdout.write("\033[33mWeb Server started on localhost:"+ port +" \033[39m\n");
}

