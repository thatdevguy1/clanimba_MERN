const initialState = {
    auth: false,
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

        case "SAVE_MSG":
        console.log("save msg reached");
        let post = [...state.post, action.result.data];
            return {
                ...state,
                battletag: action.result.user,
                post: post
            };
        
        case "SAVE_POSTS":
        console.log("getting posts reached in reducer");
            return {
                ...state, 
                post: action.result.data
            };
    };

    return state;
};

export default reducer;