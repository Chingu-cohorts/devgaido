import { combineReducers } from 'redux';
import user from './userReducer';
import curriculum from './curriculumReducer';
import uiState from './uiStateReducer';
import backendData from './backendDataReducer';
import contributors from './contributorsReducer';

export default combineReducers({ user, curriculum, uiState, backendData, contributors });
