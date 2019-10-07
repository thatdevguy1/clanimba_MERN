import React from 'react';
import User from '../user/user';
import Wall from '../wall/wall';
import './home.css';


function Home() {
  return (
    <div className="Home">
    <h1>Home page</h1>
      <User />
      <div className="composeMsg">
        
      </div>
      <Wall />
    </div>
  );
}

export default Home;