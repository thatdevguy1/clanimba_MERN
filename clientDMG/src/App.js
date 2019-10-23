import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/home/home';
import Login from './components/login/login';
import Callback from './components/callback/callback'
import './App.css';

class App extends React.Component{
  state = {
    auth: false,
    uid: null,
    token: "null"
  };

  setToken = (token) => {
    console.log("setToken is reached")
    let tokenTrim = token.split("=");
    this.setState({
      auth: true,
      token: tokenTrim[1]
    }, ()=>{
      console.log(this.state.token);
    });
  };

  render(){
    
    return (
      <BrowserRouter>
        <div className="App">
          {/* -------------- LEGIT CODE BELOW REMOVED FOR TESTING ---------------- */}
          {/* <Route path="/" exact render={ this.state.auth == true ? (props) => (<Home {...props} token={this.state.token} />) : (props) => (<Login {...props} /> )} /> */}
          <Route path = "/" render = {props => <Home {...props} />} />
          <Route path="/callback" render={ props => <Callback {...props} setToken={this.setToken} />} />
          {/* <Route path="/callback" component={()=> <Callback setToken = {()=>{this.setToken}} />} /> */}

        </div>
      </BrowserRouter>
    );

  }
  
}

export default App;
