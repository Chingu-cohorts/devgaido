import { bindActionCreators } from 'redux';

import * as globalActions from './globalActions';
import * as curriculumActions from './curriculumActions';
import * as userActions from './userActions';
import * as DashBoardActions from './DashboardActions';
import * as LibraryActions from './LibraryActions';

import store from '../store';

const allActions = {
  ...globalActions,
  ...curriculumActions,
  ...userActions,
  ...DashBoardActions,
  ...LibraryActions,
};

export default bindActionCreators(allActions, store.dispatch);
