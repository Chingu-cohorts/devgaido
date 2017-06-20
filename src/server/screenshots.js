const webshot = require('webshot');
const lessons = require('./models/corelessons');

let count = 0;
Object.keys(lessons).forEach((lessonId) => {
  if (lessons[lessonId].externalSource !== '') {
    webshot(lessons[lessonId].externalSource, `./src/client/assets/screenshots/${lessonId}.jpeg`, (err) => {
      if (err) { console.log(err); return; }

      count += 1;
      console.log(lessons[lessonId].externalSource, count);
    });
  }
});

