import React from 'react';

const handleShowMeClick = () => {
  console.log('CLICK BABY');
};

const Home = () => (
  <div>
    <div className="content">
      <h1>DevGaido...</h1>
      <h2>Your guided path to Web Development Expertise</h2>
      <p>Learning web development from scratch or merely adding to existing web development
  skills can be a difficult and confusing task. Where do you start?</p>
      <p>Luckily, DevGaido is here to help. By answer a few questions about your goals, your
  current expertise, and your techical interests DevGaido can build a learning path that’s
  customised to you. A learning path to let you achieve your goal of  becoming a
  Web Developer or merely adding new skills.</p>
      <h2>Best of all - IT IS FREE!!!</h2>
      <h2>What Do We Offer?</h2>
      <p>DevGaido’s course catalog contains lessons, videos, quizzes, and documents focused
  on the subjects you will need to develop and refine your web development skills. These
  include Javascript, HTML, CSS, and popular Javascript libraries such as Angular,
  React, and Vue.</p>
      <h2>Want to See More?</h2>
      <div className="centeredContent">
        <button className="inline button-continue" type="button" onClick={handleShowMeClick} ><i />&nbsp;&nbsp;Show Me the Courses!</button>
      </div>
    </div>
  </div>
);

export default Home;
