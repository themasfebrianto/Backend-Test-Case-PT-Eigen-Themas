import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';

const Borrow = sequelize.define('Borrow', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    memberCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
            model: 'Members',
            key: 'code'
        }
    },
    bookCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
            model: 'Books',
            key: 'code'
        }
    },
    borrowedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    returnedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
}, { schema: 'public' });

export default Borrow;
