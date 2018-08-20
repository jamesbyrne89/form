import { createStore } from 'redux';
import { loadState, saveState } from './api/localStorage';
import formReducer from './reducers/form';

const persistedState = loadState();

const store = createStore(formReducer, persistedState);

store.subscribe(() => saveState(store.getState()));

export default store;
