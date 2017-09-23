import React from 'react';
import PropTypes from 'prop-types';

import PageDivider from '../shared/PageDivider';

const TabbedContent = ({ content, tabIndex, onClick }) => (
  <div>
    <PageDivider>
      <div className="flex-1 center">
        {content.map((c, index) => (
          <button
            className={index === tabIndex ? `${c.buttonClass} h4 h5-t uppercase margin-horizontal-tiny ` : 'button--default h4 h5-t uppercase margin-horizontal-tiny'}
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
