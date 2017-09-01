const webshot = require('webshot');
const lessons = require('./models/corelessons');

const errors = [];
let count = 0;

const options = {
  renderDelay: 5000,
  timeOut: 3000,
};

/**
 * @description Create a .jpg screenshot for all lessons in the curriculum.
 * @param {any} lessonIds Array of lesson identifiers
 * @returns {null} N/a
 */
const generateShots = function (lessonIds) {
  if (lessonIds.length > 0) {
    const lessonId = lessonIds.pop();
    const lesson = lessons[lessonId];
    const extSrc = lesson.externalSource;
    let res = lesson.resources ? lesson.resources[0][1] : '';
    if (res === undefined) {
      res = '';
    }
    const url = extSrc || res;
    webshot(url, `./src/client/assets/screenshots/${lessonId}.jpg`, options, (err) => {
      count += 1;

      if (err) {
        console.log('Couldn\'t take screenshot of', lessonId, url);
        errors.push(lessonId);
      } else {
        console.log(`${lessonId}.jpg`);
      }
      generateShots(lessonIds);
    });
  } else {
    console.log('Successfully created', count, 'screenshots.');
    console.log('Unsuccessful: ', errors.length);
    errors.forEach((errLessonId) => {
      console.log(errLessonId);
    });
  }
};

module.exports = generateShots;
