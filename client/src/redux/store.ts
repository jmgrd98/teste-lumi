import { createStore } from 'redux';

const initialState = {
  isSidebarOpen: false,
};

function sidebarReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
}

const store = createStore(sidebarReducer);

export default store;
