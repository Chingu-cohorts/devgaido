const fetch = require('node-fetch');

const url = 'https://api.github.com/repos/Chingu-cohorts/devgaido/contributors';

/**
 * Develoment Team Model
 *
 * This module contains functions implementing the model layer functionality
 * describing the members of the Development Team. This model is specified as
 * an array whose elements contain the following:
 *
 *   "contributor-login-id"   <-- Unique GitHub contributor login id
 *   "avatar_url": "...",     <-- URL to contributors GitHub avatar
 *   "html_url": "...",       <-- URL to contributors GitHub profile
 */

/**
 * Retrieve members of the development team from the GitHub repo.
 *
 * @returns {Object} - JSON object containing development team attributes
 */
const initializeContributors = () => {
  fetch(url)
  .then(resp => resp.json())
  .then(teamArray => teamArray.reduce((teamList, contributor) => {
    const teamMember = [];
    teamMember.login = contributor.login;
    teamMember.avatar_url = contributor.avatar_url;
    teamMember.html_url = contributor.html_url;
    teamList.push(teamMember);
    return teamList;
  }, []));
};

export default initializeContributors;
