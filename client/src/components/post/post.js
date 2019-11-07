import React from 'react';
import User from '../user/user';
import NewPost from '../newPost/newPost';
import './post.css';
import Reply from '../reply/reply';
import { connect } from 'react-redux';
import wowIcon from '../../assets/wowIcon.png';
import {Paper} from '@material-ui/core';

class Post extends React.Component {
    
   

    render() { 
         let replies = this.props.replyMsgs.map(reply => {
             console.log("replies loop");
                return  <Reply user={reply.user} icon={reply.icon} msg={reply.msg}/>
            })
        return ( 
            <div className="post">
                <div className="userMsgContainer">
                    <User user={this.props.userName} icon={this.props.posterIcon} />
                </div>
                <div className="postMsg">
                    {this.props.msg}
                    <hr/>
                    <div className="replySection">
                        {replies}
                        <NewPost type="replyPost" opId={this.props.opId} />
                    </div>
                </div>
            </div>
         );
    }
}


const mapStateToProps = state => ({
    battletag: state.battletag,
    icon: state.icon,
    guild: state.guild,
    post: state.post
});

// const mapDispatchToProps = dispatch => {
//   return {
//     saveUser: (result) => dispatch(actionCreators.storeResult(result))
//     //saveUser: () => dispatch({type: 'SAVE_USER'})
//   };
// };

export default connect(mapStateToProps)(Post);


