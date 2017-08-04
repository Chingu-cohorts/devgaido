import { combineReducers } from 'redux';
import user from './userReducer';
import curriculum from './curriculumReducer';
import uiState from './uiStateReducer';
import auth0 from './auth0Reducer';
import contributors from './contributorsReducer';

export default combineReducers({ user, curriculum, uiState, auth0, contributors });
