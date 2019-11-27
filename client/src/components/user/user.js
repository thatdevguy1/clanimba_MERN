import React from 'react';
import './user.css';
import wowIcon from '../../assets/wowIcon.png';
import {Grid, Avatar} from '@material-ui/core';

class User extends React.Component{

  // componentDidMount = () => {
  //   console.log(this.props);
  // }

  // componentWillReceiveProps = (nextProps) => {
  //   console.log(nextProps);
  // }
  
  
  render(){

    let icon = this.props.icon ? "https://render-us.worldofwarcraft.com/character/" + this.props.icon : wowIcon;
    let mainStyle = this.props.mainIcon ? { width:"70px", height: "70px", border:"solid 6px #f5f5f5", fontSize: "18px"} : {};
    let setStyle = this.props.mainIcon ? {marginBottom: "-40px"} : {};
    let setFont = this.props.mainIcon ? {fontSize: "18px", fontWeight: "bold"} : {};

    return (
      <div className="user" style={setStyle}>
        {/* <div id="userWrap"> */}
        {/* className="userImg" */}
        <Grid container justify="center" alignItems="center">
          <Avatar src={icon} style={mainStyle}/>
          <p style={setFont}>{this.props.user}</p>
        </Grid>
      </div>
    );

  }
  
}

export default User;
