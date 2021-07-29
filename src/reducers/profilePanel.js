const profilePanelReducer = (state = false, action) => {
  if (action.type == "SET_PROFILE_PANEL") {
    return action.res;
  }
  return state;
};

export default profilePanelReducer;
