const express = require('express');
const cors = require('cors');

const {sendMail} = require('./mailer');

const app = express();
const port = 3003;

app.use(cors())

app.get('/', (req, res) => {
  console.log("sdffdgsdfg ")
  res.send(200)
});

app.post('/', (req, res) => {
  console.log(req.query)
  sendMail(req.query.text);
  res.setHeader(
    'Content-Security-Policy',
    "connect-src 'self' 127.0.0.1:3003;"
  );
  res.send(200)
});

app.listen(port, () => {
  console.log(`listening at localhost:${port}`)
});

