import { combineReducers } from 'redux';
import user from './userReducer';
import learningPath from './learningPathReducer';

export default combineReducers({ user, learningPath });
