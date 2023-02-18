import Course from '../models/model.js';

export const getAllCourses = async () => {
    const courses = await Course.findAll();
    return courses;
};

export const getCourseById = async (id) => {
    const course = await Course.findByPk(id);
    return course;
};

export const createCourse = async (courseData) => {
    const course = await Course.create(courseData);
    return course;
};

export const updateCourse = async (id, courseData) => {
    const [numRows, [updatedCourse]] = await Course.update(
        { name: courseData.name, code: courseData.code, status: courseData.status },
        { where: { id }, returning: true }
    );
    return numRows > 0 ? updatedCourse : null;
};

export const deleteCourse = async (id) => {
    const numRows = await Course.destroy({ where: { id } });
    return numRows;
};