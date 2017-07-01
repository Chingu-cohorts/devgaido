import React from 'react';
import PropTypes from 'prop-types';

// orange if type === 'course', blue otherwise
const color = type => (type === 'course' ? '#db684e' : '#007399');

/**
 * our info card (left grid)
 * we do not include other card types even if almost identical in design
 * as components should be categorized by semantic meaning(scope),
 * not code similarity, this keeps our code scalable and prevent code smell
 * @prop {object} item contains card title and description
 * @prop {string} type can be 'path' 'course' or 'lesson'
 * the card color change using this value
 * @prop {object} extraContent optional, additional description
 * @return {function} stateless component
 */
const InfoCard = ({ item, type, extraContent }) => (
  <section className="panel">
    <header className="panel__header" style={{ backgroundColor: color(type) }}>
      {item.name}<i className="fa fa-info" />
    </header>
    <div className="panel__body">
      {item.description || 'No description given.'}
      {extraContent &&
      <div>
        <p>{extraContent.name}</p>
        {extraContent.description}
      </div>}
    </div>
  </section>
);

InfoCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  type: PropTypes.string.isRequired,
  extraContent: PropTypes.objectOf(PropTypes.string),
};

InfoCard.defaultProps = {
  extraContent: null,
};

export default InfoCard;
