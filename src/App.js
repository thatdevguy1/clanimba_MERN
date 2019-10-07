import React from 'react';
import Home from './components/home/home';
import Login from './components/login/login';
import './App.css';

class App extends React.Component{
  state = {
    uid: 123
  };

  render(){
    
    var display = this.state.uid != null ? <Home /> : <Login />;
    
    return (
      <div className="App">
        {display}
      </div>
    );

  }
  
}

export default App;
