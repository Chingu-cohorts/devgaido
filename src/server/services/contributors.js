import fetch from 'node-fetch';

const url = 'https://api.github.com/repos/Chingu-cohorts/devgaido/contributors';

/**
 * Develoment Team Model
 *
 * This module contains functions implementing the model layer functionality
 * describing the members of the Development Team. This model is specified as
 * a JSON object formatted as follows:
 *
 *   {
 *     "contributor-login-id": {  <-- Unique GitHub contributor login id
 *       "avatar_url": "...",     <-- URL to contributors GitHub avatar
 *       "html_url": "...",       <-- URL to contributors GitHub profile
 *     },
 *     ...
 *   }
 */

/**
 * Retrieve members of the development team from the GitHub repo.
 *
 * @returns {Promise} - A Promise which when resolved contains a JSON object
 * defining the GitHub contributors to the application.
 */
const getContributors = new Promise((resolve, reject) => {
  let contributors = [];
  fetch(url)
  .then(resp => resp.json())
  .then((teamArray) => {
    teamArray.forEach((contributor) => {
      const teamMember = `"name": ${contributor.login}" "avatar_url": "${contributor.avatar_url}", "html_url": "${contributor.html_url}"`;
      contributors.push(teamMember);
    }, []);
    console.log(`contributors: ${contributors}`);
    resolve(contributors);
  })
  .catch((fetchError) => {
    console.log(`Error encountered attempting to fetch contributors from GitHub. ${fetchError}`);
    reject(fetchError);
  });
});

export default getContributors;
