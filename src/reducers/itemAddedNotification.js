
const itemAddedNotificationReducer= (state=false, action)=>{
    if(action.type=='SET_ITEM_BAR'){
        
        return action.res
    }
    return state
}


export default itemAddedNotificationReducer