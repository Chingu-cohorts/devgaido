import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const CardTemplate = ({ title, bgColorClass, iconClass, heightClass, content }) => (
  <div className={`card border-round bg-white ${heightClass}`}>
    <div className={`card__header flex align-items-center border-round-top ${bgColorClass}`}>
      <h5 className="card__header__text flex-1 c-white uppercase no-margin">{title}</h5>
      {iconClass ? <i className={`fa c-white h4 ${iconClass}`} /> : null}
    </div>
    <div className="card__content flex-1">
      {content}
    </div>
  </div>
);

const MenuCard = ({ children }) => (
  CardTemplate({
    title: 'Menu',
    bgColorClass: 'bg-grey',
    iconClass: '',
    content: (
      <div>
        {children}
      </div>),
  })
);

const InfoCard = ({ item, bgColorClass, children }) => (
  CardTemplate({
    title: item.name,
    bgColorClass,
    iconClass: 'fa-info',
    content: (
      <div className="flex-column justify-space-between">
        <p>{item.description}</p>
        {children}
      </div>),
  })
);

const PreviewCard = ({ bgColorClass, children }) => (
  CardTemplate({
    title: 'Preview',
    bgColorClass,
    iconClass: 'fa-eye',
    content: (
      <div className="card__preview border-round subtle-border overflow-hidden">
        {children || <p>No preview available.</p>}
      </div>),
  })
);

const LinkCard = ({ item, bgColorClass, iconClass, connectionClass, heightClass, linkTo }) => (
  <Link className={`link-card ${connectionClass} relative width-100`} to={linkTo}>
    {CardTemplate({
      title: item.name,
      bgColorClass,
      iconClass,
      heightClass,
      content: (
        <div className="flex-column justify-space-between">
          <p>{item.description ? item.description : 'No description given.'}</p>
          {item.nTotal ?
            <h4 className="c-primary no-margin right">
              Completed: <span className="bold">{item.nCompleted}/{item.nTotal}</span>
            </h4> : null}
        </div>),
    })}
  </Link>
);


CardTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  bgColorClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  heightClass: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

CardTemplate.defaultProps = {
  iconClass: '',
  bgImageClass: '',
  heightClass: '',
};

LinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  bgColorClass: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  iconClass: PropTypes.string,
  connectionClass: PropTypes.string,
  heightClass: PropTypes.string,
};

LinkCard.defaultProps = {
  iconClass: '',
  linkTo: '#',
  connectionClass: '',
  heightClass: '',
};

export { InfoCard, MenuCard, LinkCard, PreviewCard };
