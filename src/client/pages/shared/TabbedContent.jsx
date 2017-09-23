import React from 'react';
import PropTypes from 'prop-types';

const TabbedContent = ({ content, tabIndex, onClick }) => (
  <div>
    <div className="bg-white flex flex-column-t items-center-t justify-center padding-vertical-tiny">
      {content.map((c, index) => (
        <button
          className={index === tabIndex ? `${c.buttonClass} uppercase margin-horizontal-tiny margin-bottom-tiny-t` : 'button--default uppercase margin-horizontal-tiny'}
          onClick={() => onClick(index)}
          key={c.caption}
        >
          <div className="flex items-center">
            {c.icon ? c.icon : null}
            {c.caption}
          </div>
        </button>
        ),
      )}
    </div>
    <div className="container margin-top-small">
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
