import React from 'react';
import openSocket from 'socket.io-client';
import Post from '../post/post';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/actions';
import './wall.css';

class Wall extends React.Component{

  componentWillMount(){
   
    this.props.findPosts();
  }

    
  componentDidMount = () => {
    const socket = openSocket('https://clanimba.herokuapp.com/');
    socket.on('posts', data => {
      console.log("socket new post reached " + JSON.stringify(data.post));
      //Switch set up in case of future seperation between create and reply reducer dispatch
      switch(data.action){
        case 'create' : console.log("socket new post reached");
                        this.props.savePost(data.post);
                        break;
        case 'reply' : console.log("socket reply reached");
                       this.props.savePost(data.post);
                       break;
      }
    });
  }

  render(){
    let postList = this.props.post.map( post => <Post opId={post._id} msg={post.post} userName={post.user} posterIcon={post.charImg} replyMsgs={post.replies} /> );
    return (
      <div className="wall">
        {postList.reverse()}
      </div>
    );
  };
};

const mapStatetoProps = state => ({
  battletag: state.battletag,
  post: state.post
});

const mapDispatchToProps = dispatch => {
  return {
    findPosts: () => dispatch(actionCreators.findPosts()),
    savePost: (data) => dispatch({type: 'SAVE_MSG', result: {data}})
    //saveUser: () => dispatch({type: 'SAVE_USER'})
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Wall);
