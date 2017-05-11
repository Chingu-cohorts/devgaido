import LearningPath from '../models/learningpath.json';

let subjectsList = {};

const getSubjects = (req, res) => {
  console.log('Got here');
  subjectsList = res.json({ LearningPath });
  return subjectsList;
};

export { getSubjects };
