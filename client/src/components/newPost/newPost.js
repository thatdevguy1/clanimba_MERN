import React from 'react';
import { connect } from 'react-redux'
import './newPost.css';
import * as actionCreators from '../../store/action/actions';
import {TextField} from '@material-ui/core';
import openSocket from 'socket.io-client';



class NewPost extends React.Component {
  state = {
    msg: ""
  };
  
    
  
  
  // componentDidMount = () => {
  //   const socket = openSocket('http://localhost:8080');
  //   socket.on('posts', data => {
  //     console.log("socket new post reached " + JSON.stringify(data.post));
  //     if (data.action === 'create') {
  //       console.log("socket new post in if statement reached");
  //       this.props.savePost(data.post);
  //     } 
  //   });
  // }

  componentWillUnmount = () => {

  }

  handlePost = (event) => {
    event.preventDefault();

    this.refs.textField.children[1].children[0].value = "";
    
    this.props.type === "normalPost" ? this.props.saveMsg({
      user: this.props.battletag,
      msg: this.state.msg,
      icon: this.props.icon
    }) : this.props.saveReply({
      user: this.props.battletag,
      msg: this.state.msg,
      icon: this.props.icon,
      opId: this.props.opId
    })
    //send ajax call to post msg
  };

  handleChange = (event) => {
    this.setState({
      msg: event.target.value
    }, ()=>{
    });
  };

  render(){
    return (
      <div className="NewPost">
       <TextField
            id="outlined-basic"
            label={this.props.type === "normalPost" ? "New Post" : "New Reply"}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            multiline={true}
            ref="textField"
          />
        {/* <textarea className="postText" onChange={this.handleChange} placeholder="Create New Post..."></textarea> */}
        <button className="submitPost" onClick={this.handlePost}>POST</button>
      </div>
    ); 
  }
 
}

const mapStateToProps = state => ({
  battletag: state.battletag,
  icon: state.icon
});

const mapDispatchToProps = dispatch => {
  return {
    saveMsg: (result) => dispatch(actionCreators.storeMsg(result)),
    saveReply: (result) => dispatch(actionCreators.storeReply(result))
    // savePost: (data) => dispatch({type: 'SAVE_MSG', result: {data}})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);