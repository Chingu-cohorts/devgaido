let fetch = require('node-fetch');

const url = 'https://api.github.com/repos/Chingu-cohorts/devgaido/contributors';

/**
 * Retrieve members of the development team from the GitHub repo.
 *
 * @returns {Object} - JSON object containing development team attributes
 */
const getDevTeam = () => {
  fetch(url)
  .then((resp) => {
    return JSON.parse(resp.json()).reduce((teamList, currentMember) => {
      const teamMember = [
        currentMember.login,
        currentMember.avatar_url,
        currentMember.html_url,
      ];
      return teamList.push(teamMember);
    }, []);
  })
  .then((teamList) => {
    console.log(teamList);
  });
};

export default getDevTeam;
