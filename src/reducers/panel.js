const panelReducer=(state=false, action)=>{
    if(action.type=='SET_CART_PANEL'){
        return action.res
    }
    return state;
}

export default panelReducer