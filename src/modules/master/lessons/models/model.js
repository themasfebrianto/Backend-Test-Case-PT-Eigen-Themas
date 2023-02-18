import Sequelize from 'sequelize';
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

const Course = sequelize.define('Course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// sync the model with the database
sequelize.sync();

export default Course;