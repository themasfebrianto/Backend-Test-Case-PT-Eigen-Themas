import { sequelize, Sequelize } from '../../../../helpers/modelHelpers.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, { schema: 'public' });

// Hash password before saving user to database
User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
});

// Define method to compare entered password with hashed password
User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;