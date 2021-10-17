'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


const port = 9000;
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get-token", (req, res) => {
  const API_KEY = "9dc7ab5b-c227-4f0f-a0fe-8ff279cdaf75";
  const SECRET_KEY = "2e3812d57719479b3a35110d7fb9d51921c16f3ce25bd5374504b96dc9ce528a";
  const options = { expiresIn: "10d", algorithm: "HS256" };
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod", "ask_join"], // Trigger permission.
  };
  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});




module.exports = app;
module.exports.handler = serverless(app);
