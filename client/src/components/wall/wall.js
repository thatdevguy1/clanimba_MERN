import React from 'react';
import Post from '../post/post';
import { connect } from 'react-redux';
import './wall.css';

class Wall extends React.Component{


  render(){
    let postList = this.props.post.map( post => <Post msg={post} /> )
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

export default connect(mapStatetoProps)(Wall);
