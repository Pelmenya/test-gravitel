import { combineReducers } from 'redux';
import { dashBoardReducer } from './slices/dashboard/dashboard';
import { errorRequestReducer } from './slices/error-request/error-request';

export const rootReducer = combineReducers({
  errorRequest: errorRequestReducer,
  dashboard: dashBoardReducer,
});
