/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { togglePath } from './PathsActions';

const toggleItem = (e, id, dispatch) => {
  dispatch(togglePath(id));
};
const openedClass = opened => (opened ? 'opened' : '');

const Path = ({ id, name, description, dispatch, opened, key }) => (
  <div className={`grid-quarter learning-path-item ${openedClass(opened)}`} onClick={e => toggleItem(e, id, dispatch)} key={key}>
    <div className="learning-path-item-header">
      <i className="path-icon" />
      <i className="no-icon" />
    </div>
    <span className="learning-path-category">Path</span>
    <h3 className="learning-path-item-name">{name}</h3>
    <ul>
      <li className="learning-path-item-subject">{description}</li>
    </ul>
    <div className="learning-path-item-footer">
      <a className="view-item" href="/">Explore</a>
    </div>
  </div>
);

const Paths = ({ curriculum, uiState, dispatch }) => {
  const description = 'Welcome to the WordPress Development Track. You\'ll be led through a series of Courses and Workshops so you can efficiently master the skills you need achieve your goals.';

  const pathsArr = [];

  curriculum.paths.forEach((path, index) => {
    const name = path['Lesson Name'];
    pathsArr.push(Path({
      key: uiState.Pages.Paths.pathStates[index].id,
      id: uiState.Pages.Paths.pathStates[index].id,
      dispatch,
      name,
      opened: uiState.Pages.Paths.pathStates[index].opened,
      description,
    }));
  });

  return (
    <div className="content container-wide">
      {pathsArr}
    </div>
  );
};

Path.propTypes = {
  id: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Paths.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  curriculum: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
};

Paths.defaultProps = {
  uiState: null,
  curriculum: null,
  dispatch: null,
};

export default Paths;
