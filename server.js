const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((request, response) => {

	let pathname = url.parse(request.url).pathname;

	let filepath = path.resolve(__dirname + pathname);

	let extname = path.extname(pathname);

	if (extname === "") {
		extname = ".html";
		filepath = path.resolve(filepath + "/index.html");
	}

	extname = extname.split(".")[1];

	let filetype = config[extname];

	fs.stat(filepath, (err, stats) => {
		if (err) {
			notFound(response);
			return console.error(err);
		}
		if (stats.isFile()) {
			var readerStream = fs.createReadStream(filepath);
			readerStream.setEncoding('UTF8');
			readerStream.on('error', function(err){
			   console.error(err);
			});

			readerStream.pipe(response);
		}else{
			notFound(response);
		}
	})
	
}).listen(8888);
function notFound(response) {
	response.writeHead(404,{"Content-type": "text/html"});
	response.end("<h1 style='text-align:center;margin-top:80px;color:gray'>404 NOT FOUNT</h1>");
}
let config = {
	"css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
}
console.log('starting at 8888...');