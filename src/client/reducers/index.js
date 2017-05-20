import { combineReducers } from 'redux';
import user from './userReducer';
import curriculum from './curriculumReducer';
import uiState from './uiStateReducer';

export default combineReducers({ user, curriculum, uiState });
