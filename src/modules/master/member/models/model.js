import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';

const Member = sequelize.define('Members', {
    code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    borrowedBooks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    penaltyExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    schema: 'public',
    tableName: 'Members'
});

export default Member;
