const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');

const router = express.Router();

const PORT = 8080;

displayForm = (res, file) => {
	fs.readFile(file, (err, data) => {
		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': data.length
		});
		res.write(data);
		res.end();
	});
}

router.get('/', (req, res) => {
    displayForm(res, 'index.html');
})

router.post('/events', (req, res) => {
    console.log(req.body || 'empty request body');
    res.write(req.body);
    res.end();
});

app.use(router);

const server = http.createServer(app);

server.listen(PORT,() => {
	console.log('Listening on port' + PORT);
});
server.timeout = 240000;