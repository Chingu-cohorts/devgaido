import { combineReducers } from 'redux';
import user from './userReducer';
import learningPath from './learningPathReducer';
import PathsState from '../pages/Paths/PathsReducer';

export default combineReducers({ user, learningPath, PathsState });
