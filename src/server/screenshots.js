const fs = require('fs');
const generateShots = require('./generateShots');
const lessons = require('./models/corelessons.json');
const resolve = require('path').resolve;

const screenshotPath = resolve('src/client/assets/screenshots/');
const allLessonIds = Object.keys(lessons);

/**
 * @description Generate a screenshot for one or more lessons in the curriculum based on
 * invocation parameters.
 * @param {string} process.argv[2] A parameter designating which lessons screenshots are to
 * be generated for.
 *    '':            Generate screenshots for all lessons
 *    'new':         Generate screenshots based for any lesson for which there is no screenshot
 *    '<lesson-id>': Generate a screenshot for a specific lesson
 * @returns {null} N/a
 */
if (process.argv.length < 2 || process.argv.length > 3) {
  console.log('Usage: yarn screenshotter <parameter> where <parmeter> is one of the following:');
  console.log('   Parameter omitted - generate screenshots for all lessons.');
  console.log('   new               - generate screenshots for any lesson for which none exists');
  console.log('   <lesson-id>       - generate a screenshot for the specified lesson id');
  process.exit(-1);
}

if (process.argv.length === 2) {
  // No parameter specified, generate screenshots for all lessons
  generateShots(allLessonIds);
} else if (process.argv.length === 3) {
  let lessonIds = [];
  // 'new' parameter specified, generate screenshots for all lessons that don't already have them
  if (process.argv[2] === 'new') {
    const files = fs.readdirSync(screenshotPath);
    allLessonIds.forEach((lessonId) => {
      if (files.indexOf(`${lessonId}.jpg`) === -1) {
        lessonIds.push(lessonId);
      }
    });
  } else {
    // Lesson id specified, generate a screenshot for the specified lesson id
    lessonIds = [process.argv[2]];
  }
  generateShots(lessonIds);
}

