import React from 'react';
import User from '../user/user';
import Wall from '../wall/wall';
import axios from 'axios';
import { connect } from 'react-redux';
import './home.css';


class Home extends React.Component {
  state = {
    battletag: "",
    token: ""
  };

  componentWillMount = () => {
    //-----------DUMMY CODE FOR TESTING--------------------------
    this.setState({
      battletag: "Hellik#1992", 
      token: this.props.token
    });
   
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

const mapStateToProps = state => {
  return {
    battletag: state.battletag
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     on
//   }
// }

export default connect(mapStateToProps)(Home);