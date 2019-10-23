const initialState = {
    auth: false,
    battletag: '',
    token: null,
    post: null
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case "SAVE_USER":
            return {
                ...state, 
                battletag: action.result.data.battleTag,
                icon: ""
            };
        case "SAVE_MSG":
        console.log("save msg reached");
            return {
                ...state,
                battletag: action.result.user,
                post: action.result.msg
            }
    };

    return state;
};

export default reducer;