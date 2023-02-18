import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';

const lessonGroups = sequelize.define('lessonGroups', {
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
});

export default lessonGroups;