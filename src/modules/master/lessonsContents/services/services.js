import Lessons from '../models/model.js';

export const getAllLessonContents = async () => {
    const lessonContents = await Lessons.findAll();
    return lessonContents;
};

export const getLessonContentById = async (id) => {
    const lessonContent = await Lessons.findOne({ where: { id } });
    return lessonContent;
};

export const createLessonContent = async (content, quiz, status) => {
    const lessonContent = await Lessons.create({ content, quiz, status });
    return lessonContent;
};

export const updateLessonContent = async (id, content, quiz, status) => {
    const [numRows, [updatedLessonContent]] = await Lessons.update(
        { content, quiz, status },
        {
            where: { id },
            returning: true,
        }
    );
    if (numRows > 0) {
        return updatedLessonContent;
    } else {
        throw new Error('Lesson content not found');
    }
};

export const deleteLessonContent = async (id) => {
    const numRows = await Lessons.destroy({ where: { id } });
    if (numRows > 0) {
        return true;
    } else {
        throw new Error('Lesson content not found');
    }
};