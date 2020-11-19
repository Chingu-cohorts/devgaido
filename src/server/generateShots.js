const webshot = require('webshot');
const lessons = require('./models/corelessons');

let errors = [];
let retryLessonIds = [];
let count = 0;

const options = {
  renderDelay: 2000,
  timeOut: 3000,
};

const LONG_RENDER_DELAY = 'long';
let retryInProgress = false;

/**
 * @description Create a .jpg screenshot for all lessons in the curriculum.
 * @param {any} lessonIds Array of lesson identifiers
 * @param {String} delayType Length type of options.renderDelay interval.
 *                          'short' results in 2000 and 'long' results in 5000.
 * @returns {Array} Array of lesson ids that were in error.
 */
const generateShots = function (lessonIds, delayType) {
  if (lessonIds.length > 0) {
    options.renderDelay = delayType === undefined ? 2000 : 10000;
    console.log(`options.renderDelay: ${options.renderDelay} lessonIds.length: ${lessonIds.length}`);
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
        console.log(`Successfully generated ${lessonId}.jpg`);
      }
      generateShots(lessonIds);
    });
  } else if (!retryInProgress) {
    // Display the failed lessons and then retry screenshot generation using a
    // longer rendering delay interval
    if (errors.length > 0) {
      retryInProgress = true;
      console.log('Retrying failed lessons:');
      errors.forEach((errLessonId) => {
        console.log(`...${errLessonId}`);
      });
      retryLessonIds = errors.slice();
      errors = [];
      console.log(`retryLessonIds: ${retryLessonIds}`);
      generateShots(retryLessonIds, LONG_RENDER_DELAY);
      if (errors.length > 0) {
        console.log('Failed lessons:');
        errors.forEach((errLessonId) => {
          console.log(`...${errLessonId}`);
        });
      }
    }
    console.log(`Attempted to create ${count} screenshots.`);
    console.log(`Successfully created ${count - errors.length} screenshots.`);
    console.log(`Unsuccessful ${errors.length}`);
  }
};

module.exports = generateShots;
