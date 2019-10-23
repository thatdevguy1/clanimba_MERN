const express = require('express')
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const User = require('./server/models/user');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// support parsing of application/json type post data
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client/build')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });



/* ROUTES */
app.get('/user/:token', (req, res) => {
  console.log(req.params.token);
  User.findOne({token : req.params.token}, function(err, userInfo){
		if(err){
      
      console.log("Error retrieving user " + err);
      res.status(404);
		} else {
      console.log(`THIS IS USERINFO ---------->  ${userInfo}`);
			res.json(userInfo);
		}
  });
});

app.post('/msg/:user/:msg', (req, res) => {
  console.log(req.params.user + ": " + req.params.msg);
  const user = req.params.user;
  let msg = req.params.msg;

  User.updateOne({battleTag : user}, {posts : msg}, function(err, post){
		if(err){
      
      console.log("Error retrieving user " + err);
      res.status(404);
		} else {
      console.log(`THIS IS THE RESULT OF THE UPDATEONE MSG ---------->  ${JSON.stringify(post)}`);
      res.status(200).send();
		}
  });
});

/* --------- BLIZZARD OAUTH2 --------- */

  // Set the configuration settings
const credentials = {
    client: {
      id: process.env.ID,
      secret: process.env.SECRET
    },
    auth: {
      tokenHost: 'https://us.battle.net'
    //   tokenPath: 'oauth/access_token',
    //   authorizePath: 'oauth/authorize'
    }
  };
   
  // Initialize the OAuth2 Library
  const oauth2 = require('simple-oauth2').create(credentials);

  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:8080/callback',
    scope: 'wow.profile',
    response_type: 'code'


    // state: ''
  });
   
  // Get the access token object (the authorization code is given from the previous step).
  app.get('/auth', (req, res) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
  });

  // Callback service parsing the authorization token and asking for the access token
  app.get('/callback', async (req, res) => {
    const  { code }  = req.query;
    const options = {
      code,
      grant_type: 'authorization_code',
      scope: 'wow.profile',
      redirect_uri: 'http://localhost:8080/callback'
    };

    try {
      const result = await oauth2.authorizationCode.getToken(options);
      console.log("result is here:::::::::: " + JSON.stringify(result));

      //console.log('The resulting token: ', result);

      const token = oauth2.accessToken.create(result);
      console.log("token is here::::::::::: " + JSON.stringify(token));

      //console.log(token.token.access_token);


    //   axios({
    //     method: 'get',
    //     url: `https://us.api.blizzard.com//wow/user/characters?access_token=${token.token.access_token}`
    //   })
    //     .then(function (response) {
    //         console.log(response.data);
    //         return res.status(200).json(response.data);
    //     })
    //     .catch(err => {
    //         console.error("Error Getting Userinfo", err.message);
    //     });
    
    
    //Get userinfo including ID and GameTag
    axios({
        method: 'get',
        url: `https://us.battle.net/oauth/userinfo?access_token=${token.token.access_token}`
    }).then(function (response) {
       
        var newUser = new User({
            battleTag: response.data.battletag,
            token: code
        });

        User.count({battleTag: response.data.battletag}, (err, docs) => {
            if (err) throw err;
            if(docs > 0){
              console.log("found a user in database " + response.data.battletag);
                User.findOneAndUpdate({battleTag : response.data.battletag}, {token : code}, (err, doc) => {
                    if (err) throw err;
                    console.log(doc);
                    res.sendFile(path.join(__dirname, "client/build/index.html")); 
                });
            } else {
                newUser.save((err, user)=>{
                  console.log(user)
                    if (err) throw err;
                    return res.sendFile(path.join(__dirname, "client/build/index.html")); 
                });
            }
        });

    }).catch(err => {
        console.error("Error Getting Userinfo", err.message);
    })

    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
  };
});
   

 /* MONGOOSE CONNECT */
const db = "mongodb://localhost:27017/imba";
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err){
        if(err){
        console.error("Error! " + err);
     }
}); 


/* --------- SERVER LISTENING ---------- */
app.listen(port, () => console.log(`app listening on port ${port}!`));