import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';

const Course = sequelize.define('Course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { schema: 'public' });

export default Course;