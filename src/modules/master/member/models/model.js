import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';

const Member = sequelize.define('Member', {
    code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    }
}, { schema: 'public' });

export default Member;