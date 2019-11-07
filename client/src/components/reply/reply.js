import React from 'react';
import User from '../user/user';
import './reply.css';
import {Paper} from '@material-ui/core';

class Reply extends React.Component {
    render() { 
        return (
            <div className="reply">
                <div className="userWrapper">
                    <User user={this.props.user} icon={this.props.icon} /> 
                </div>
                <div className="replyMsg">{this.props.msg}</div>
            </div>
        )
    }
}
 
export default Reply;