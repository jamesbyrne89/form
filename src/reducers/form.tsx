const initialState = {};

const formReducer = (state = initialState, action: any) => {
  if (action.type === 'POST_DATA') {
    return action.payload;
  }
  return state;
};

export default formReducer;
