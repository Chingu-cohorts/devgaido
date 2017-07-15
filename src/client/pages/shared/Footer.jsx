import React from 'react';
import { Link } from 'react-router-dom';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container padding-vertical-big flex justify-space-between">
      <div className="flex-column margin-right-huge">
        <Link to="/" className="logo logo--small" />
        <h5 className="margin-top-small">
          <a
            href="https://chingu-cohorts.github.io/chingu-directory/"
            target="_blank" rel="noopener noreferrer"
          >
            &copy; Chingu Cohorts, {year}</a>
        </h5>
      </div>
      <div className="flex">
        <Link to="/" className="uppercase margin-right-small">About</Link>
        <Link to="/" className="uppercase margin-right-small">Terms</Link>
        <Link to="/disclaimer" className="uppercase margin-right-small">Disclaimer</Link>
        <Link to="/" className="uppercase margin-right-small">Privacy</Link>
        <Link to="/" className="uppercase margin-right-small">Contact</Link>
      </div>
      <div className="flex h2">
        <a href="https://github.com/Chingu-cohorts/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small"><i className="fa fa-github" /></a>
        <a href="/" target="_blank" rel="noopener noreferrer" className="margin-right-small"><i className="fa fa-facebook" /></a>
        <a href="/" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small"><i className="fa fa-twitter" /></a>
        <a href="/" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small"><i className="fa fa-youtube" /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
