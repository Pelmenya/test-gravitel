import { combineReducers } from 'redux';
import { errorRequestReducer } from './slices/error-request/error-request';

export const rootReducer = combineReducers({
  errorRequest: errorRequestReducer,
});
