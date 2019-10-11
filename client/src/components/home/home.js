import React from 'react';
import User from '../user/user';
import Wall from '../wall/wall';
import axios from 'axios';
import './home.css';


class Home extends React.Component {
  state = {
    battletag: ""
  };

  componentWillMount = () => {
    //-----------DUMMY CODE FOR TESTING--------------------------
    this.setState({battletag: "Hellik#1992"});
   
    /************LEGIT CODE BELOW TO GET USER NAME***************/
    // axios.get(`/user/${this.props.token}`)
    //   .then( (response) => {
    //     // handle success
    //     this.setState({ battletag: response.data.battleTag });
    //   })
    //   .catch(function (error) {
    //     // handle error SEND BACK TO LOGIN
    //     console.log(error);
    //   });
    };
  
  render(){
    return (
      <div className="Home">
        <User user={this.state.battletag}/>
        <div className="composeMsg">
        </div>
        <Wall />
      </div>
    );
  }
 
}

export default Home;