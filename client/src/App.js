import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/home/home';
import Login from './components/login/login';
import Callback from './components/callback/callback'
import './App.css';

class App extends React.Component{
  state = {
    uid: null,
    token: ""
  };

  setToken = (token) => {
    console.log("setToken is reached")
    //This is the code token, not the oAuth access token. This is used as a unique id for the users current session with his access token from oauth.
    let tokenTrim = token.split("=");
    this.setState({
      auth: true,
      token: tokenTrim[1]
    }, ()=>{
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem("token", tokenTrim[1]);
    });
  };

  componentWillMount(){
    if(sessionStorage.getItem("auth") === "true"){
      this.setState({
        auth: true,
        token: sessionStorage.getItem("token")
      })
    }
  }

  render(){
    
    return (
      <BrowserRouter>
        <div className="App">
        <div className="bgCover"></div>
          <Route path="/" exact render={ this.state.auth == true ? (props) => (<Home {...props} token={this.state.token} />) : (props) => (<Login {...props} /> )} />
          <Route path="/callback" render={ props => <Callback {...props} setToken={this.setToken} />} />
        </div>
      </BrowserRouter>
    );

  }
  
}

export default App;
