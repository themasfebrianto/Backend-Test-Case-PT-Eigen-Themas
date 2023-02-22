import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';
import Lessons from '../../lessons/models/model.js';

const LessonsContents = sequelize.define('LessonsContents', {
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
    LessonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Lessons,
            key: 'id'
        }
    }
}, { schema: 'public' });

export default LessonsContents;