import React from 'react';
import User from '../user/user';
import Wall from '../wall/wall';
import NewPost from '../newPost/newPost'
import axios from 'axios';
import { connect } from 'react-redux';
import './home.css';
import wowIcon from '../../assets/wowIcon.png'
import * as actionCreators from '../../store/action/actions';


class Home extends React.Component {
  state = {
    battletag: "",
    token: ""
  };

  componentWillMount = () => { 
    this.props.saveUser(this.props.token);
  };
  
  render(){
    return (
      <div className="Home">
        <div className="userContainer">
          <User user={this.props.battletag} icon={wowIcon}/>
        </div>
        <NewPost />
        <Wall />
      </div>
    ); 
  };
 
};

const mapStateToProps = state => ({
    battletag: state.battletag
});

const mapDispatchToProps = dispatch => {
  return {
    saveUser: (result) => dispatch(actionCreators.storeResult(result))
    //saveUser: () => dispatch({type: 'SAVE_USER'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);