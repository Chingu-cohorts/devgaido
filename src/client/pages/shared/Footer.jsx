import React from 'react';
import { Link } from 'react-router-dom';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container padding-top-big flex flex-column-below-t items-center-below-t justify-between">
      <Link to="/" className="flex logo logo--small margin-bottom-small width-20-above-t" />
      <div className="flex flex-column-below-t items-center margin-bottom-tiny">
        <Link to="/about" className="uppercase margin-right-small margin-right-0-below-t">About</Link>
        {/* <Link to="/" className="uppercase margin-right-small">Terms</Link> */}
        <Link to="/disclaimer" className="uppercase margin-right-small margin-right-0-below-t">Disclaimer</Link>
        {/* <Link to="/" className="uppercase margin-right-small">Privacy</Link> */}
        <Link to="/contact" className="uppercase">Contact</Link>
      </div>
      <div className="flex width-20-above-t justify-end">
        <a href="https://github.com/Chingu-cohorts/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small h2"><i className="fa icon-github" /></a>
        <a href="https://twitter.com/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small h2"><i className="fa icon-twitter" /></a>
        <a href="https://www.youtube.com/channel/UC3goUqdIGkmFYzi9mC9bSYQ" target="_blank" rel="noopener noreferrer" className="uppercase h2"><i className="fa icon-youtube" /></a>
      </div>
    </div>
    <h5 className="container padding-bottom-big margin-top-tiny center">
      <a
        href="https://chingu-cohorts.github.io/chingu-directory/"
        target="_blank" rel="noopener noreferrer"
      >
        &copy; Chingu Cohorts, {year}</a>
    </h5>
  </footer>
);

export default Footer;
