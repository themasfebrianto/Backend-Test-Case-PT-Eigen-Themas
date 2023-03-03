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
            model: 'Member',
            key: 'code'
        }
    },
    bookCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
            model: 'Book',
            key: 'code'
        }
    },
    borrowedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    returnedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
}, { schema: 'public' });

export default Borrow;