import LessonsGroups from '../models/model.js';

export const getAllLessonsGroups = async () => {
    const lessonsGroups = await LessonsGroups.findAll();
    return lessonsGroups;
};

export const getLessonsGroupById = async (id) => {
    const lessonsGroup = await LessonsGroups.findByPk(id);
    return lessonsGroup;
};

export const createLessonsGroup = async (data) => {
    const newLessonsGroup = await LessonsGroups.create(data);
    return newLessonsGroup;
};

export const updateLessonsGroup = async (id, data) => {
    const [numRows, [updatedLessonsGroup]] = await LessonsGroups.update(
        data,
        {
            returning: true,
            where: { id },
        }
    );
    return updatedLessonsGroup;
};

export const deleteLessonsGroup = async (id) => {
    const numRows = await LessonsGroups.destroy({ where: { id } });
    return numRows;
};