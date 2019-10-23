import React from 'react';
import Post from '../post/post';
import { connect } from 'react-redux';
import './wall.css';

class Wall extends React.Component{

  componentDidMount(){
    console.log("wall component props for post: " + this.props.post);
  }

  render(){
    
    return (
      <div className="wall">
        <Post msg={this.props.post} />
       
      </div>
    );

  }
  
}

const mapStatetoProps = state => ({
  battletag: state.battletag,
  post: state.msg
});

export default connect(mapStatetoProps)(Wall);
