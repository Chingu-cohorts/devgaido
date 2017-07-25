import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const CardTemplate = ({ title, bgColorClass, iconClass, heightClass, content, footerContent }) => (
  <div className={`card flex-column border-round bg-white ${heightClass}`}>
    <div className={`card__header flex align-items-center border-round-top ${bgColorClass}`}>
      <h5 className="card__header__text flex-1 c-white uppercase no-margin">{title}</h5>
      {iconClass ? <i className={`fa c-white h4 ${iconClass}`} /> : null}
    </div>
    <div className="card__content flex-1">
      {content}
    </div>
    {footerContent ?
      <div className="card__footer width-100 right">
        {footerContent}
      </div> : null}
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

const LinkCard = ({ item, bgColorClass, iconClass, childIconClass, imgSrc, connectionClass, heightClass, linkTo }) => {
  const ratingStars = [];
  for (let i = 0; i < item.rating; i += 1) {
    ratingStars.push(<i className="fa fa-star c-secondary h4 margin-left-tiny" />);
  }
  return (
    <Link className={`link-card ${connectionClass} relative width-100`} to={linkTo}>
      {CardTemplate({
        title: item.name,
        bgColorClass,
        iconClass,
        heightClass,
        content: <div className="flex">
          {imgSrc ?
            <div className="lcard__content-left flex-1 margin-top-small">
              <div className="preview2 overflow-hidden no-margin right border-round border-1px" style={{ background: `url(${imgSrc})`, backgroundSize: 'cover' }} />
            </div> : null}
          <div className="lcard__content-left flex-2 margin-left-small margin-top-small">
            <h5>{item.description}</h5>
            <div className="flex justify-space-between">
              <h6 className="normal" />
              <div>
                {ratingStars}
              </div>
            </div>
            <div className="flex justify-space-between">
              <h6 className="normal" />
              <div>
                <h5 className="c-primary uppercase right no-margin">Very Long</h5>
                <h6 className="c-primary uppercase right">(> 100 hours)</h6>
              </div>
            </div>
            <div className="right">
              {item.subjectNames.map(
                subjectName => <h6 className="tag center c-primary border-pill border-1px border-primary display-inline-block">{subjectName}</h6>,
              )}

            </div>
            <div className="flex justify-end">
              {!item.completed && item.nTotal ?
                <h3 className="no-margin right flex-1">
                  <i className={`fa ${childIconClass} h3 right margin-right-tiny`} /><span className="">{item.nCompleted}/{item.nTotal}</span>
                  <i className={'fa fa-graduation-cap c-primary h3 right margin-left-big margin-right-tiny'} /><span className="">124/235</span>
                </h3> : null}
              {item.completed ? <i className="fa fa-check-circle-o h1 c-secondary right" /> : null}
            </div>
          </div>
        </div>,
      })}
    </Link>
  );
};

/*
const LinkCard = ({ item, bgColorClass, iconClass, childIconClass, connectionClass, heightClass, linkTo }) => (
  <Link className={`link-card ${connectionClass} relative width-100`} to={linkTo}>
    {CardTemplate({
      title: item.name,
      bgColorClass,
      iconClass,
      heightClass,
      content: <p>{item.description ? item.description : 'No description given.'}</p>,
      footerContent: (
        <div>
          {!item.completed && item.nTotal ?
            <h4 className="no-margin right">
              <i className={`fa ${childIconClass} h4 right margin-right-tiny`} /><span className="bold">{item.nCompleted}/{item.nTotal}</span>
            </h4> : null}
          {item.completed ? <i className="fa fa-check-circle-o h1 c-primary right" /> : null}
        </div>
      ),
    })}
  </Link>
);*/


CardTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  bgColorClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  heightClass: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  footerContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CardTemplate.defaultProps = {
  iconClass: '',
  bgImageClass: '',
  heightClass: '',
  footerContent: null,
};

LinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  bgColorClass: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  iconClass: PropTypes.string,
  childIconClass: PropTypes.string,
  connectionClass: PropTypes.string,
  heightClass: PropTypes.string,
};

LinkCard.defaultProps = {
  iconClass: '',
  childIconClass: '',
  linkTo: '#',
  connectionClass: '',
  heightClass: '',
};

export { MenuCard, LinkCard, PreviewCard };
