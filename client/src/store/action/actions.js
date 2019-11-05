import axios from 'axios';

export const saveResult = ( res ) => {
  return {
      type: 'SAVE_USER',
      result: res
  };
}

export const saveMsg = (res) => {
  return {
    type: 'SAVE_MSG',
    result: res
  }
};

export const savePosts = (res) => {
  return{
    type: 'SAVE_POSTS',
    result: res
  }
}

export const findPosts = () => {
  return dispatch => {
    axios.get(`/posts`)
    .then( (response) => {
      console.log(JSON.stringify(response));
      // handle success
      dispatch(savePosts(response));
    })
    .catch(function (error) {
      // handle error SEND BACK TO LOGIN***
      console.log(error);
    });
  }
}



export const storeResult = ( res ) => {
  return dispatch => {
      axios.get(`/user/${res}`)
        .then( (response) => {
          // handle success
          dispatch(saveResult(response));
        })
        .catch(function (error) {
          // handle error SEND BACK TO LOGIN***
          console.log(error);
        });
    }
};

export const storeMsg = ( res ) => {
  return dispatch => {
    axios.post(`/msg/${escape(res.user)}/${res.msg}/${res.icon}`)
      .then( (response) => {
        // handle success
        console.log(`The result in the ajax call is: ${JSON.stringify(response)}`)
        dispatch(saveMsg(response));
      })
      .catch(function (error) {
        // handle error SEND BACK TO LOGIN***
        console.log(error);
    });
  }
};

export const storeReply = ( res ) => {
  return dispatch => {
    axios.put(`/reply/${escape(res.user)}/${res.msg}/${res.icon}/${res.opId}`)
      .then( (response) => {
        // handle success
        console.log(`The result in the ajax call for REPLY is: ${JSON.stringify(response)}`)
        dispatch(saveMsg(response));
      })
      .catch(function (error) {
        // handle error SEND BACK TO LOGIN***
        console.log(error);
    });
  }
};