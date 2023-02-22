import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';
import Courses from '../../courses/models/model.js';

const LessonsGroups = sequelize.define('LessonsGroups', {
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
    CourseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Courses,
            key: 'id'
        }
    }
}, { schema: 'public' });

export default LessonsGroups;