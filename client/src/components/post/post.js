import React from 'react';
import User from '../user/user'
import './post.css';
import { connect } from 'react-redux';
import wowIcon from '../../assets/wowIcon.png'

class Post extends React.Component {

    render() { 
        return ( 
            <div className="post">
                <div className="userMsgContainer">
                    <User user={this.props.battletag} icon={wowIcon} />
                </div>
                <div className="postMsg">
                    {this.props.msg}
                </div>
            </div>
         );
    }
}


const mapStateToProps = state => ({
    battletag: state.battletag,
    post: state.post
});

// const mapDispatchToProps = dispatch => {
//   return {
//     saveUser: (result) => dispatch(actionCreators.storeResult(result))
//     //saveUser: () => dispatch({type: 'SAVE_USER'})
//   };
// };

export default connect(mapStateToProps)(Post);


