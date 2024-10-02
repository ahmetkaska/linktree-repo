import * as types from "../actions/types";

const initialState = {
  linktree: [],
  currentLinktree: null
};



const linktreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LINKTREES:
      return {
        ...state,
        linktree: action.payload
      };

    case types.FETCH_SINGLE_LINKTREE:
      return {
        ...state,
        currentLinktree: action.payload
      };

    case types.CREATE_LINKTREE:
      return {
        ...state,
        linktree: [...state.linktree, action.payload]
      };

    case types.UPDATE_LINKTREE:
      return {
        ...state,
        linktree: state.linktrees.map(linktree => {
          if (linktree._id === action.payload._id) {
            return action.payload;
          } else {
            return linktree;
          }
        }),
        currentLinktree: action.payload
      };

    case types.DELETE_LINKTREE:
      return {
        ...state,
        linktree: state.linktree.filter(linktree => linktree._id !== action.payload),
        currentLinktree: state.currentLinktree && state.currentLinktree._id === action.payload ? null : state.currentLinktree
      };

    case types.ADMIN_LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };

    case types.ADMIN_LOGOUT:
      return {
       ...state,
        isAuthenticated: false,
       currentLinktree: null
      };

    default:
      return state;
  }
};

export default linktreeReducer;
