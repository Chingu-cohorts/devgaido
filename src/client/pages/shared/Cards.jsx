import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import { Link } from 'react-router-dom';

import actions from '../../actions';

const { setLastTouchedPath } = actions;

const CardTemplate = ({ title, bgColorClass, iconClass, iconClass2, heightClass, content, footerContent }) => (
  <div className={`card flex-column border-round bg-white ${heightClass}`}>
    <div className={`card__header flex align-items-center border-round-top ${bgColorClass}`}>
      {iconClass ? <i className={`fa c-white h4 ${iconClass} margin-right-small`} /> : null}
      <h4 className="card__header__text flex-1 c-white uppercase no-margin">{title}</h4>
      {iconClass2 ? <i className={`lcard__checkmark fa c-white h1 no-margin absolute ${iconClass2}`} /> : null}
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

const LinkCard = ({ item, bgColorClass, iconClass, childIconClass, imgSrc, borderClass, connectionClass, heightClass, linkTo, pathId }) => {
  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < item.rating) {
      ratingStars.push(<i className="fa icon-star c-secondary h4 margin-left-tiny" key={item.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-secondary h4 margin-left-tiny" key={item.name + i} />);
    }
  }
  const subjects = [];
  const numSubjects = Math.min(2, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(item.subjectNames[i]);
  }
  if (item.subjectNames.length > 2) {
    subjects.push(`... ${item.subjectNames.length - 2} more ...`);
  }
  return (
    <Link className={`link-card ${connectionClass} relative width-100`} to={linkTo} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      {CardTemplate({
        title: item.name,
        bgColorClass,
        iconClass,
        iconClass2: item.completed ? 'icon-check-circle-o' : '',
        heightClass,
        content: <div className="flex">
          {imgSrc ?
            <LazyLoad height={200} once offset={201}>
              <div className="lcard__content-left flex-1 flex-column">
                <div className="preview2 flex-1 no-margin border-round border-1px" style={{ background: `url(${imgSrc})`, backgroundSize: 'cover', borderColor: '#ccc' }} />
              </div>
            </LazyLoad>
             : null}
          <div className="lcard__content-left flex-2 margin-left-small">
            <h5>{item.description}</h5>
            <div className="right">
              <div>
                {ratingStars}
              </div>
            </div>
            <div className="right margin-top-small">
              <div>
                {/* <h5 className="c-primary uppercase right no-margin">Very Long</h5>*/}
                <h5 className="c-primary uppercase right">{item.estimatedTimeStr} hours</h5>
              </div>
            </div>
            <div className="right">
              {subjects.map(
                subjectName => <h6 className="tag center c-white border-pill bg-grey display-inline-block" key={item.name + subjectName} >{subjectName}</h6>,
              )}
            </div>
            <div className="flex justify-end">
              {item.nTotal && item.nTotal !== 1 ?
                <h3 className="no-margin right margin-top-small">
                  <i className={`fa ${childIconClass} h3 right margin-right-tiny`} />
                  <span className="">{item.nCompleted}/{item.nTotal}</span>
                </h3> : null}
              {item.nLessonsTotal ?
                <h3 className="no-margin right margin-top-small">
                  <i className={'fa icon-graduation-cap c-primary h3 right margin-left-big margin-right-tiny'} />
                  <span className="">{item.nLessonsCompleted}/{item.nLessonsTotal}</span>
                </h3> : null}
            </div>
          </div>
        </div>,
      })}
    </Link>
  );
};

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

export { MenuCard, LinkCard };
