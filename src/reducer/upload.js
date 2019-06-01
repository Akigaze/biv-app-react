const initialState = {
  fileName: "123"
};

const uploadReducer = (state=initialState, action={}, ) => {
  const {type, payload} = action;
  switch (type) {
    default: return state;
  }
};

export default uploadReducer