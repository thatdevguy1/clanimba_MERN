import React from 'react';
import './login.css';

class Login extends React.Component{

  render(){
    
    return (
      <div className="login">
        <form>
          <label>
            Blizzard User Name
          </label>
          <input name="username"></input>
          <label>
            Blizzard Password
          </label>
          <input name="passwprd"></input>
          <button className="oAuthSubmit"></button>

          <a href="/auth">Log in with BLIZZ</a>
        </form>
      </div>
    );

  }
  
}

export default Login;