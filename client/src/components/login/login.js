import React from 'react';
import './login.css';

class Login extends React.Component{

  render(){
    
    return (
      <div className="login">
        <h1>Welcome to clan iMBA</h1>
        <a href="/auth"><button>Sign in with Blizzard</button></a>
      </div>
    );

  }
  
}

export default Login;