import Lessons from '../models/model.js';

export const getAllLessons = async () => {
    return await Lessons.findAll();
};

export const getLessonById = async (id) => {
    return await Lessons.findByPk(id);
};

export const createLesson = async (lessonData) => {
    return await Lessons.create(lessonData);
};

export const updateLesson = async (id, lessonData) => {
    const lesson = await Lessons.findByPk(id);
    if (!lesson) {
        return null;
    }
    return await lesson.update(lessonData);
};

export const deleteLesson = async (id) => {
    const lesson = await Lessons.findByPk(id);
    if (!lesson) {
        return 0;
    }
    await lesson.destroy();
    return 1;
};