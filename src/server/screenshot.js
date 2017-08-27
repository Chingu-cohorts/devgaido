const generateShots = require('./generateShots');
// const lessons = require('./models/corelessons');

/**
 * @description Generate a screenshot for the specified lesson
 * @param {any} lessonId Lesson name
 * @returns {null} N/a
 */
const takeScreenshot = (lessonId) => {
  const lessonIds = [lessonId];
  generateShots(lessonIds);
};

takeScreenshot(process.argv[2]);
