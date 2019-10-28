import React from 'react';
import './user.css';

class User extends React.Component{

  // componentDidMount = () => {
  //   console.log(this.props);
  // }

  // componentWillReceiveProps = (nextProps) => {
  //   console.log(nextProps);
  // }
  
  render(){
    
    return (
      <div className="user">
        <div id="userWrap">
          <img className="userImg"  src={"https://render-us.worldofwarcraft.com/character/" + this.props.icon} />
          <p>{this.props.user}</p>
        </div>
      </div>
    );

  }
  
}

export default User;
