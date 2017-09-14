// const anObj = require('./corecourses.json');
// const fs = require('fs');
// const beautify = require('json-beautify');

// let newCoreCourses = {};
// Object.keys(anObj).forEach((lesson) =>{
//   // const newObj = {[lesson]: {
//   //   'version-1.0': {
//   //     name: anObj[lesson].name,
//   //     description: anObj[lesson].description,
//   //     lessonIds: anObj[lesson].lessonIds,
//   //   },
//   // }
//   const newObj = {
//     [lesson]: {
//       'version-1-0': {
//         source: anObj[lesson].source,
//         name: anObj[lesson].name,
//         description: anObj[lesson].description,
//         type: anObj[lesson].type,
//         instructions: anObj[lesson].instructions,
//         resources: anObj[lesson].resources,
//         subjects: anObj[lesson].subjects,
//         externalSource: anObj[lesson].externalSource,
//         estimatedTime: anObj[lesson].estimatedTime,
//       },
//     },
//   };
//   newCoreCourses = Object.assign(newCoreCourses, newObj)
// });
// console.log(newCoreCourses);

// fs.writeFile("testUtility.json", beautify(newCoreCourses, null, 2, 80), function(err) {
//     if(err) {
//         return console.log(err);
//     }
// });
