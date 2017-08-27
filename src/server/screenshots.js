const generateShots = require('./generateShots');
const lessons = require('./models/corelessons.json');

const allLessonIds = Object.keys(lessons);

generateShots(allLessonIds);
