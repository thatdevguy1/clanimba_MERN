const express = require('express');
const axios = require('axios');
const User = require('../../models/user');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const router = express.Router();

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
    redirect_uri: 'https://clanimba.herokuapp.com/callback',
    //redirect_uri: 'http://localhost:8080/callback',
    scope: 'wow.profile',
    response_type: 'code'


    // state: ''
  });
   
  // Get the access token object (the authorization code is given from the previous step).
  router.get('/auth', (req, res) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
  });

  // Callback service parsing the authorization token and asking for the access token
  router.get('/callback', async (req, res) => {
    const  { code }  = req.query;
    const options = {
      code,
      grant_type: 'authorization_code',
      scope: 'wow.profile',
      redirect_uri: 'https://clanimba.herokuapp.com/callback'
      //redirect_uri: 'http://localhost:8080/callback'
    };

    try {
      const result = await oauth2.authorizationCode.getToken(options);
      console.log("result is here:::::::::: " + JSON.stringify(result));

      const token = oauth2.accessToken.create(result);
      console.log("token is here::::::::::: " + JSON.stringify(token));
    
    //Get userinfo including ID and GameTag
      axios({
          method: 'get',
          url: `https://us.battle.net/oauth/userinfo?access_token=${token.token.access_token}`
      }).then(async function (response) {
          
        try{
          const response2 = await axios({
            method: 'get',
            url: `https://us.api.blizzard.com/profile/user/wow?access_token=${token.token.access_token}&namespace=profile-us&locale=en_us`
          });
            
          var newUser;

          const response3 = await axios({
            method: 'get',
            url: `https://us.api.blizzard.com/profile/wow/character/${response2.data.wow_accounts[0].characters[0].realm.slug}/${response2.data.wow_accounts[0].characters[0].name.toLowerCase()}/character-media?access_token=${token.token.access_token}&namespace=profile-us&locale=en_us`
          });
            
          if(response2.data.wow_accounts[0].characters.length > 0) {
              newUser = new User({
                battleTag: response.data.battletag,
                charImg: response3.data.avatar_url,
                guild: null,
                token: code
              });
          } else {
            newUser = new User({
              battleTag: response.data.battletag,
              charImg: null,
              guild: null,
              token: code
            });
          }

          User.count({battleTag: response.data.battletag}, (err, docs) => {
            if (err) throw err;
            if(docs > 0){
              console.log("found a user in database " + response.data.battletag);
                User.findOneAndUpdate({battleTag : response.data.battletag}, {token : code}, (err, doc) => {
                  if (err) throw err;
                  console.log(doc);
                  res.sendFile(path.join(__dirname, "../../../client/build/index.html")); 
                });
            } else { 
                newUser.save((err, user)=>{
                  console.log(user)
                    if (err) throw err;
                    return res.sendFile(path.join(__dirname, "../../../client/build/index.html")); 
                });
              };
          });
        } catch (error) {
          console.log("Error getting character profile info from blizzard api", error.message);
        };
          
    }).catch(err => {
        console.error("Error Getting Userinfo from oAuth endpoint", err.message);
    })

    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
  };
});

module.exports = router;