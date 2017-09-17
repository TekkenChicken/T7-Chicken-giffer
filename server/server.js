const listEndpoints = require('express-list-endpoints');
const express = require('express');
const path = require('path');
const rp = require('request-promise');
const config = require('./config.json');
const routes = require('./routes.js')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({
    extended: false
}));


const router = express.Router();
const PORT = process.env.PORT || 8000;

app.use('/', routes);
app.use(express.static(path.join(__dirname, '../dist')));

const { client_secret, client_id, username, password } = config;

const fetchAuth = (client_secret, client_id, username, password) => {
    const options = {
        method: 'POST',
        url: 'https://api.gfycat.com/v1/oauth/token',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            grant_type: 'password',
            client_id,
            client_secret,
            username,
            password,
        },
        json: true,
    }

    return rp(options)
}

app.get('/getAuth', (req, res) => {
    fetchAuth(client_secret, client_id, username, password)
    .then(data => {
        return res.status(200).json(data)
    })
    .catch(err => res.status(400).json(err))
})

app.use('/', router)

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});