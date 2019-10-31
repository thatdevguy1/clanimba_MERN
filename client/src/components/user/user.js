import React from 'react';
import './user.css';
import wowIcon from '../../assets/wowIcon.png';

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
        <div id="userWrap">
          <img className="userImg"  src={icon} />
          <p>{this.props.user}</p>
        </div>
      </div>
    );

  }
  
}

export default User;
