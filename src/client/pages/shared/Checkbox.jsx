import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ checked, onChange, children }) => (
  <div className="flex align-items-center margin-left-small">
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="checkbox__box" />
    </label>
    <h5 className="no-margin margin-left-tiny">
      {children}
    </h5>
  </div>
);

Checkbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  children: null,
};

export default Checkbox;
