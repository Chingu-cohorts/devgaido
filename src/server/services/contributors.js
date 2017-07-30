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
 * @returns {Promise} - A Promise which when resolved contains the list of
 * GitHub contributors to the application.
 */
const retrieveContributors = new Promise((resolve, reject) => {
  console.log('made it to retrieveContributors');
  fetch(url)
  .then(resp => resp.json())
  .then((teamArray) => {
    const contributors = teamArray.reduce((teamList, contributor) => {
      const teamMember = {};
      teamMember.login = contributor.login;
      teamMember.avatar_url = contributor.avatar_url;
      teamMember.html_url = contributor.html_url;
      teamList.push(teamMember);
      return teamList;
    }, []);
    console.log(`contributors: ${contributors}`);
    return resolve(contributors);
  })
  .catch((fetchError) => {
    console.log(`Error encountered attempting to fetch contributors from GitHub. ${fetchError}`);
    reject(fetchError);
  });
});

export default retrieveContributors;
