const express = require('express')
const io = require('./socket');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
bodyParser = require('body-parser');

const oAuth = require('./server/routes/apiRoutes/oAuth');
const chat = require('./server/routes/apiRoutes/chat');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(oAuth);
app.use(chat);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

 /* MONGOOSE CONNECT */
 //const db = "mongodb://localhost:27017/imba";
  const db = "mongodb://heroku_jzhp8twp:s1ih886v6692equ0mugds4cksb@ds349618.mlab.com:49618/heroku_jzhp8twp";
 mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err){
        if(err){
        console.error("Error! " + err);
     }
}).then(result => {
  /*SOCKET IO HOOK UP AND LISTEN TO SERVER ON MONGOOSE SUCCESS */
  const server = app.listen(port, () => console.log(`app listening on port ${port}!`));
  const io = require('./socket').init(server);
  io.on('connection', socket => {
    console.log('Client connected');
  });
})
.catch(err => console.log(err));
