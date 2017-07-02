import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setColor } from './utils/colorPicker';

/**
 * our link card (right grid) / general
 * we do not include other card types even if almost identical in design
 * as components should be categorized by semantic meaning(scope),
 * not code similarity, this keeps our code scalable and prevent code smell
 * @prop {object} item contains card title and description
 * @prop {string} color can be 'primary' (orange) or null (blue)
 * the card header color change using this value
 * @prop {object} path link to content
 * @return {function} stateless component
 */
const LinkCard = ({ item, color, path }) => (
  <Link className="col-quarter" to={path}>
    <section className="panel">
      <header className="panel__header" style={{ backgroundColor: setColor(color) }}>
        {item.name}<i className="fa fa-road" />
      </header>
      <div className="panel__body">
        {item.description || 'No description given.'}
      </div>
      <footer className="panel__footer">
        {item.nCompleted}/{item.nTotal}
      </footer>
    </section>
  </Link>
);

LinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  color: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default LinkCard;
