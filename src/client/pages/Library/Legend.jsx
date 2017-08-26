import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LegendIcon = ({ title, icon }) => (
  <div className="legend__lessons margin-left-tiny center">
    <i className={icon} />
    <h5 className="c-white no-margin">{title}</h5>
  </div>
);
const Legend = ({ uiState }) => (
  uiState.curLibraryTab === 1 ?
    <div className="legend abs-bottom-right flex items-end margin-bottom-small margin-right-small">
      <LegendIcon title="Course" icon="fa icon-university c-pale-green h2" />
      <LegendIcon title="Book" icon="fa icon-book c-pale-blue h2" />
      <LegendIcon title="Project" icon="fa icon-gears c-pale-red h2" />
    </div> : null
);

LegendIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Legend.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  uiState: store.uiState,
}))(Legend);
