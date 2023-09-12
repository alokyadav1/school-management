function StandardReducer(standard, action){
    switch(action.type){
        case "SET_STANDARD":
            return action.payload;
        case "ADD_STANDARD":
            return standard.push(action.payload)
        default:
            return standard;
    }
}

export default StandardReducer;