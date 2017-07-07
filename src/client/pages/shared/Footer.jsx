import React from 'react';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container padding-top-small">
      <h5 className="center width-100">
        <a
          href="https://chingu-cohorts.github.io/chingu-directory/"
          target="_blank" rel="noopener noreferrer"
        >
          &copy; Chingu Cohorts, {year}</a>
      </h5>
    </div>
  </footer>
);

export default Footer;
