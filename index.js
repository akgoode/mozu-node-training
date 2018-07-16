const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const eventHandler = require('./eventHandler');

const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// This route isn't necessary, I just use it for confirmation that everything is working correctly before I
// attempt to refresh through the sandbox until I know its working.
router.get('/', (req, res) => {
    displayForm(res, 'config/index.html');
})

// This is what appears in the configuration section
// of the app menu inside each sandbox in which it is installed.
// Always a post request to the URL that you set inside the packages tab
router.post('/', (req, res) => {
    displayForm(res, 'config/index.html');
})

// Route for events to hit
// this url is configured in the events tab of your app in dev center
router.post('/events', (req, res) => {
	console.log(req.body.eventId);
	console.log(eventHandler(req.body.eventId));
    res.write('test event');
    res.end();
});

// Route for configuration form submission
router.post('/config', (req, res) => {
    displayForm(res, 'config/thankyou.html');
    const data = req.body.data;
    console.log('Your data is: ' + data);
});

app.use(router);
app.use(express.static(path.join(__dirname, 'config')));

const server = http.createServer(app);

server.listen(PORT,() => {
	console.log('Listening on port' + PORT);
});
server.timeout = 240000;