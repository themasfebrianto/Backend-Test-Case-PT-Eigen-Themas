import Course from '../models/model.js';

export const getAllCourses = async () => {
    return Course.findAll();
};

export const getCourseById = async (id) => {
    return Course.findByPk(id);
};

export const createCourse = async (courseData) => {
    const course = new Course(courseData);
    return course.save();
};

export const updateCourse = async (id, courseData) => {
    const [, [updatedCourse]] = await Course.update(courseData, {
        returning: true,
        where: { id }
    });
    return updatedCourse;
};

export const deleteCourse = async (id) => {
    return Course.destroy({ where: { id } });
};