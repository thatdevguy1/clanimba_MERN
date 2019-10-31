import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './newPost.css';
import * as actionCreators from '../../store/action/actions';


class NewPost extends React.Component {
  state = {
    msg: ""
  };
  

  handlePost = (event) => {
    event.preventDefault();
    
    this.props.saveMsg({
      user: this.props.battletag,
      msg: this.state.msg,
      icon: this.props.icon
    });
    //send ajax call to post msg
  };

  handleChange = (event) => {
    this.setState({
      msg: event.target.value
    });
  };

  render(){
    return (
      <div className="NewPost">
        <textarea class="postText" onChange={this.handleChange} placeholder="Create New Post..."></textarea>
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
    saveMsg: (result) => dispatch(actionCreators.storeMsg(result))
    //saveUser: () => dispatch({type: 'SAVE_USER'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);