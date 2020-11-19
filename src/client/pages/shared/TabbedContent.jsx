import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const TabbedContent = ({ content, tabIndex, onClick }) => (
  <div>
    <div className="bg-white padding-horizontal-tiny-below-t flex flex-column-below-t items-center-below-t justify-center padding-vertical-tiny">
      {content.map((c, index) => (
        <Button
          className={index === tabIndex ? `${c.buttonClass} uppercase margin-horizontal-tiny margin-bottom-tiny-below-t` : 'button--default uppercase margin-horizontal-tiny margin-bottom-tiny-below-t'}
          onClick={() => onClick(index)}
          key={c.caption}
        >
          <div className="flex items-center">
            {c.icon ? c.icon : null}
            {c.caption}
          </div>
        </Button>
        ),
      )}
    </div>
    <div className="container padding-horizontal-0-below-t margin-top-small">
      {content[tabIndex].content}
    </div>
  </div>
);

TabbedContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape).isRequired,
  tabIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TabbedContent;
