import React from 'react';
import PropTypes from 'prop-types';

import PageDivider from '../shared/PageDivider';

const TabbedContent = ({ content, tabIndex, onClick }) => (
  <div>
    <PageDivider>
      <div className="flex-1 center">
        {content.map((c, index) => (
          <button
            className={index === tabIndex ? `${c.buttonClass} uppercase margin-horizontal-tiny ` : 'button--default uppercase margin-horizontal-tiny'}
            onClick={() => onClick(index)}
            key={c.caption}
          >
            {c.caption}
          </button>
          ),
        )}
      </div>
    </PageDivider>
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
