import React from 'react';
import './user.css';

class User extends React.Component{

  componentDidMount = () => {
    console.log(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
  }
  
  render(){
    
    return (
      <div className="user">
        <h1>welcome {this.props.user}</h1>
      </div>
    );

  }
  
}

export default User;
