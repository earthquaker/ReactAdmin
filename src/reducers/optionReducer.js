export default function reducer(state={}, action) {
    switch(action.type) {
        case "SET_SELECTED_OPTION": {
            state = {...action.payload};
            return state;
        }
        default:
            return state;
    }
};