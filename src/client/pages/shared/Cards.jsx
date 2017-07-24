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

const LinkCard = ({ item, bgColorClass, iconClass, childIconClass, imgSrc, connectionClass, heightClass, linkTo }) => (
  <Link className={`link-card ${connectionClass} relative width-100`} to={linkTo}>
    {CardTemplate({
      title: item.name,
      bgColorClass,
      iconClass,
      heightClass,
      content: <div className="flex">
        {imgSrc ?
          <div className="mcard__content-left flex-1 margin-top-small">
            <div className="preview2 overflow-hidden no-margin right border-round border-1px" style={{ background: `url(${imgSrc})`, backgroundSize: 'cover' }} />
          </div> : null}
        <div className="mcard__content-left flex-1 margin-left-small margin-top-small">
          <h5>{item.description}</h5>
        </div>
        <div className="mcard__content-right flex-1 margin-left-small margin-top-small">
          <div className="flex justify-space-between">
            <h6 className="normal">Rating</h6>
            <div>
              <i className="fa fa-star c-primary h4 margin-left-tiny" />
              <i className="fa fa-star c-primary h4 margin-left-tiny" />
              <i className="fa fa-star c-primary h4 margin-left-tiny" />
              <i className="fa fa-star c-primary h4 margin-left-tiny" />
            </div>
          </div>
          <div className="flex justify-space-between">
            <h6 className="normal">Estimated Length</h6>
            <div>
              <h5 className="c-secondary uppercase right no-margin">Very Long</h5>
              <h6 className="c-secondary uppercase right">(> 100 hours)</h6>
            </div>
          </div>
          <div className="flex justify-space-between">
            <h6 className="normal">Tags</h6>
            <div className="width-75 right">
              <h6 className="tag center c-primary border-pill border-1px border-primary display-inline-block">HTML</h6>
              <h6 className="tag center c-primary border-pill border-1px border-primary display-inline-block">Javascript</h6>
              <h6 className="tag center c-primary border-pill border-1px border-primary display-inline-block">MongoDB</h6>
              <h6 className="tag center c-primary border-pill border-1px border-primary display-inline-block">CSS</h6>
            </div>
          </div>
        </div>
      </div>,
      footerContent: (
        <div>
          {!item.completed && item.nTotal ?
            <h3 className="no-margin right">
              <i className={`fa ${childIconClass} h3 right margin-right-tiny`} /><span className="">{item.nCompleted}/{item.nTotal}</span>
              <i className={`fa fa-graduation-cap c-primary h3 right margin-left-big margin-right-tiny`} /><span className="">124/235</span>
            </h3> : null}
          {item.completed ? <i className="fa fa-check-circle-o h1 c-secondary right" /> : null}
        </div>
      ),
    })}
  </Link>
);
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

export { InfoCard, MenuCard, LinkCard, PreviewCard };
