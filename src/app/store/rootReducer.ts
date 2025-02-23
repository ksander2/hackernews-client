import { combineReducers } from '@reduxjs/toolkit';
import storiesReducer from './storiesStore';

export default combineReducers({
  stories: storiesReducer,
});
