/* eslint-disable no-unused-vars */
function UserReducer(currentUser,action){
    switch(action.type){
        case "SET_USER":
            return action.payload;
        case "DELETE_USER":
            return {};
        default:
            return currentUser;
    }
}
export default UserReducer;