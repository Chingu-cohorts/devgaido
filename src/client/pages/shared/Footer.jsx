import React from 'react';
import { Link } from 'react-router-dom';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container padding-vertical-big flex justify-between">
      <Link to="/" className="logo logo--small" />
      <div className="flex-column items-center">
        <div className="flex">
          <Link to="/about" className="uppercase margin-right-small">About</Link>
          {/* <Link to="/" className="uppercase margin-right-small">Terms</Link> */}
          <Link to="/disclaimer" className="uppercase margin-right-small">Disclaimer</Link>
          {/* <Link to="/" className="uppercase margin-right-small">Privacy</Link> */}
          <Link to="/contact" className="uppercase">Contact</Link>
        </div>
        <h5 className="margin-top-small">
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
