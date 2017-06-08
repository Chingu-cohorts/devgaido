import React from 'react';

const Path = ({ match }) => (
  <div className="lostContainer">
    <div className="content">
      <h1>PATH: {match.params.name}</h1>
    </div>
  </div>
);

export default Path;
