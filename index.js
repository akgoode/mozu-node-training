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

// this is what appears in the configuration section of the app menu
// a post request to the url set in the packages tab in the app record in dev center
router.post('/', (req, res) => {
    displayForm(res, 'index.html');
})

router.post('/events', (req, res) => {
    console.log(req);
    res.write('test event');
    res.end();
});

app.use(router);

const server = http.createServer(app);

server.listen(PORT,() => {
	console.log('Listening on port' + PORT);
});
server.timeout = 240000;