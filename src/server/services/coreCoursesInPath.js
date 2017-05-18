import { getPath } from './corePaths';
import { getCourse } from './coreCourses';

/**
 * Retrive all courses in a given path
 * 
 * @param {String} pathName - Unique path name
 */
const getCoursesInPath = pathName => {
  console.log('getCoursesInPath for ', pathName);
  const path = getPath(pathName);
  console.log('Path:', path);
  console.log('Courses:', path.courses);
  const pathCourses = path["courses"].reduce((courses, courseName) => {
    courses.push(getCourse(courseName));
    return courses;
  }, []);
  return pathCourses;
}

export { getCoursesInPath };
