const initialState = {
    battletag: '',
    icon: '',
    guild: '',
    token: null,
    post: []
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case "SAVE_USER":
            return {
                ...state, 
                battletag: action.result.data.battleTag,
                icon: action.result.data.charImg,
                guild: action.result.data.guild
            };

        //SAVING POSTS TO DB
        case "SAVE_MSG":
            if (state.post.filter(e => e._id === action.result.data._id).length > 0) {
                var post = state.post.map(post => {
                    if (post._id != action.result.data._id){
                        return post
                    } 
                    return action.result.data
                });
            } else {
                var post = [...state.post, action.result.data];
            } 
            return {
                ...state,
                battletag: action.result.user,
                post: post
            };
        
            //GETTING POSTS FROM DB (bad naming for case)
        case "SAVE_POSTS":
        console.log("getting posts reached in reducer"+ JSON.stringify(action.result.data));
            return {
                ...state, 
                post: action.result.data
            };
    };

    return state;
};

export default reducer;