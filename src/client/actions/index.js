import { bindActionCreators } from 'redux';

import * as globalActions from './globalActions';
import * as curriculumActions from './curriculumActions';
import * as userActions from './userActions';

const allActions = { ...globalActions, ...curriculumActions, ...userActions };

let dispatch = null;

const actions = (dispatch) => bindActionCreators(allActions, dispatch);

export default bindActionCreators(allActions, dispatch);
