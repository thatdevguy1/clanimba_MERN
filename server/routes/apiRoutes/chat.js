const express = require('express');
const User = require('../../models/user');
const Posts = require('../../models/posts');
const io = require('../../../socket');

const router = express.Router();

//Get users associated token from blizzard authorization
router.get('/user/:token', (req, res) => {
    console.log(req.params.token);
    User.findOne({token : req.params.token}, function(err, userInfo){
          if(err){
        
        console.log("Error retrieving user " + err);
        res.status(404);
          } else {
              res.json(userInfo);
          }
    });
  });
  
  //Get all posts in db
  router.get('/posts', (req, res) => {
    Posts.find(function(err, posts){
          if(err){
        
        console.log("Error retrieving user " + err);
        res.status(404);
          } else {
              res.json(posts);
          }
    });
  });


//Save a new message to the database
    router.post('/msg', (req, res) => {
  
      console.log(req.body.user);
      const user = req.body.user;
      const charImg = req.body.icon;
      let msg = req.body.msg;
      const date = new Date();
  
      let newPost = new Posts({
        user: user,
        charImg: charImg,
        post: msg,
        date: date,
        replies: []
    });
    newPost.save(function(err, post){
          if(err){
        console.log("Error retrieving user " + err);
        res.status(404);
          } else {
            //Emit a websocket response to all users connected with the updated post
            io.getIO().emit('posts', {
            action: 'create',
            post: newPost
            });
        //Send that message back to the person who posted
        res.status(200).json(newPost);
          }
    });
  });
  
  //Update a currect post with a new reply in the db
  router.put('/reply', (req, res) => {
    const user = req.body.user;
    const charImg = req.body.icon;
    let msg = req.body.msg;
    const opId = req.body.opId;
    const date = new Date();
  
    Posts.findOneAndUpdate({_id: opId}, {$push: {replies : {user: user, icon: charImg, msg: msg}}}, {new: true}, (err, doc) => {
      if (err){
        res.status(404);
      }
      //Emit changes to all users connected
      io.getIO().emit('posts', {
        action: 'reply',
        post: doc
      });
      //Send the updated document back to the client
      res.status(200).json(doc);
    });
  });

  module.exports = router;