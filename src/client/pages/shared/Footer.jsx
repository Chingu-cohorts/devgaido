import React from 'react';
import { Link } from 'react-router-dom';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container padding-vertical-big flex flex-wrap justify-between">
      <Link to="/" className="flex logo logo--small margin-bottom-small" />
      <div className="flex-column items-center margin-bottom-tiny">
        <div className="flex margin-bottom-tiny">
          <Link to="/about" className="h4 h5-d1 uppercase margin-right-small">About</Link>
          {/* <Link to="/" className="uppercase margin-right-small">Terms</Link> */}
          <Link to="/disclaimer" className="h4 h5-d1 uppercase margin-right-small">Disclaimer</Link>
          {/* <Link to="/" className="uppercase margin-right-small">Privacy</Link> */}
          <Link to="/contact" className="h4 h5-d1 uppercase">Contact</Link>
        </div>
        <h5 className="h4 h5-d1 margin-top-tiny">
          <a
            href="https://chingu-cohorts.github.io/chingu-directory/"
            target="_blank" rel="noopener noreferrer"
          >
            &copy; Chingu Cohorts, {year}</a>
        </h5>
      </div>
      <div className="flex">
        <a href="https://github.com/Chingu-cohorts/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small h2"><i className="fa icon-github" /></a>
        <a href="https://twitter.com/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small h2"><i className="fa icon-twitter" /></a>
        <a href="https://www.youtube.com/channel/UC3goUqdIGkmFYzi9mC9bSYQ" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small h2"><i className="fa icon-youtube" /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
