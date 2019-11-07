import React from 'react';
import './user.css';
import wowIcon from '../../assets/wowIcon.png';
import {Grid, Avatar, TextField} from '@material-ui/core';

class User extends React.Component{

  // componentDidMount = () => {
  //   console.log(this.props);
  // }

  // componentWillReceiveProps = (nextProps) => {
  //   console.log(nextProps);
  // }
  
  
  render(){

    let icon = this.props.icon ? "https://render-us.worldofwarcraft.com/character/" + this.props.icon : wowIcon;
    
    return (
      <div className="user">
        {/* <div id="userWrap"> */}
        {/* className="userImg" */}
        <Grid container justify="center" alignItems="center">
          <Avatar src={icon} />
          <p>{this.props.user}</p>
        </Grid>
          
      </div>
    );

  }
  
}

export default User;
