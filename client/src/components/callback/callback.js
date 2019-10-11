import React from 'react';
import { Redirect } from "react-router-dom";

class Callback extends React.Component{
    state={
    };

    componentDidMount(){
        console.log(this.props);
        // console.log(this.props.history.location.search.split("="));
        this.props.setToken(this.props.location.search);
    }

  render(){
    
    return (
      <div className="callback">
       <h1>Success</h1>
       <Redirect to="/"/>
      </div>
    );

  }
  
}

export default Callback;