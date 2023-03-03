import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';


const Book = sequelize.define('Book', {
    code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { schema: 'public' });

export default Book;
