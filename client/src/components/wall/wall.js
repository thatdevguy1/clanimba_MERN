import React from 'react';
import Post from '../post/post';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/actions';
import './wall.css';

class Wall extends React.Component{

  componentWillMount(){
    this.props.findPosts();
  }

  render(){
    let postList = this.props.post.map( post => <Post msg={post.post} userName={post.user} posterIcon={post.charImg}/> );
    return (
      <div className="wall">
        {postList}
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
    findPosts: () => dispatch(actionCreators.findPosts())
    //saveUser: () => dispatch({type: 'SAVE_USER'})
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Wall);
