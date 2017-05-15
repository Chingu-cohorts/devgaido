import { combineReducers } from 'redux';
import user from './userReducer';
import learningPaths from './learningPathsReducer';

export default combineReducers({ user, learningPaths });
