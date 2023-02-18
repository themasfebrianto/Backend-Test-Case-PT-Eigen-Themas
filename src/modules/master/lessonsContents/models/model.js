import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';

const Lessons = sequelize.define('LessonsContents', {
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quiz: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { schema: 'public' });

export default Lessons;