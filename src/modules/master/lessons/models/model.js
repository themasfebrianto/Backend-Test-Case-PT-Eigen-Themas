import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';
import LessonsGroups from '../../lessonsGroups/models/model.js';

const Lessons = sequelize.define('Lessons', {
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
    LessonsGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: LessonsGroups,
            key: 'id'
        }
    }
}, { schema: 'public' });

export default Lessons;