import React from 'react';
import User from '../user/user';
import Wall from '../wall/wall';
import './home.css';


function Home() {
  return (
    <div className="Home">
      <User />
      <div className="composeMsg">
        
      </div>
      <Wall />
    </div>
  );
}

export default Home;