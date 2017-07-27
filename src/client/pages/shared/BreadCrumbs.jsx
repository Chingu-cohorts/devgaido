import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ rootNode, nodes, invertIconColors }) => {
  const content = [];
  content.push(<Link className="c-white normal padding-right-tiny" to={rootNode.url} key={rootNode.url}>{rootNode.name}</Link>);

  nodes.forEach((node) => {
    content.push(<i className={`fa fa-caret-right padding-right-tiny ${invertIconColors ? 'c-primary' : 'c-secondary '}`} key={node.name} />);
    content.push(<Link className="c-white normal padding-right-tiny" to={node.url} key={node.url}>{node.name}</Link>);
  });
  return (
    <div className="breadcrumbs abs-top-left">
      {content}
    </div>
  );
};

BreadCrumbs.propTypes = {
  invertIconColors: PropTypes.bool,
  rootNode: PropTypes.objectOf(PropTypes.shape).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

BreadCrumbs.defaultProps = {
  invertIconColors: false,
};

export default BreadCrumbs;
