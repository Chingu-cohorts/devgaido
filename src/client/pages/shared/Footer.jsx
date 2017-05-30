import React from 'react';

const year = new Date().getFullYear();

const Footer = () =>
  (
    <footer>
      <div className="footer-content">
        <h5>
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
