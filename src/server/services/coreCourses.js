import CoreCourses from '../models/corecourses.json';
import { getLesson } from './coreLessons';

/**
 * Extract a specific course and its details from the Core Courses
 *
 * @param {String} courseName - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getCourse = (courseName) => JSON.stringify(CoreCourses.find(currentCourse => currentCourse.name === courseName));

/**
 * Retrieve all courses and their details
 *
 * @returns {String[]} - JSON object containing all Core Courses
 */
const getAllCourses = () => CoreCourses;

/**
 * Build a JSON document from containing the full representation of the
 * course names provided in the input parameter and the Core Lessons owned by
 * each. The resulting JSON document will contain all details for each course
 * as well as the details for each lesson it owns.
 *
 * @param {String} courseNames - JSON document containing 0 or more course names
 * @returns {Object} - JSON object containing all paths, courese, and lessons.
 */
const getFullCourses = (courseNames) => {
  console.log(`..getFullCourses courseNames: ${JSON.stringify(courseNames, undefined, 2)}`);
  const allCourses = courseNames.reduce((fullCourse, currentCourseName) => {
    const course = CoreCourses.find(currentCourse => currentCourse.name === currentCourseName);
    console.log(`course: ${course}`);
    const lessonsInCourse = course.lessons.reduce((fullLessons, currentLessonName) => {
      const lesson = getLesson(currentLessonName);
      fullLessons.push(lesson);
      return fullLessons;
    }, []);
    const courseInfo = JSON.stringify(course) + lessonsInCourse;
    console.log(`courseInfo: ${courseInfo}`);
    return fullCourse.push(courseInfo);
  }, []);
  return allCourses;
};
export { getCourse, getAllCourses, getFullCourses };
