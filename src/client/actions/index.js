import { bindActionCreators } from 'redux';

import * as uiStateActions from './uiStateActions';
import * as curriculumActions from './curriculumActions';
import * as userActions from './userActions';

import store from '../store';

const allActions = {
  ...uiStateActions,
  ...curriculumActions,
  ...userActions,
};

export default bindActionCreators(allActions, store.dispatch);
