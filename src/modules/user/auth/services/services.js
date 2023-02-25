import User from '../models/model.js';
import bcrypt from 'bcrypt';

export const login = async (email, password) => {
    // Find the user with the provided email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Check if the provided password matches the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid email or password');
    }

    // If the email and password are correct, return the user
    return user;
};

export const register = async (userData) => {
    // Log password and saltRounds values for debugging
    console.log('password:', userData.password);
    const saltRounds = 10;
    console.log('saltRounds:', saltRounds);

    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create a new user with the provided data
    const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword
    });

    return user;
};

export const changePasswordUser = async (userId, oldPassword, newPassword) => {
    // Find the user with the provided ID
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Check if the old password matches the stored password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    // Hash the new password and update the user's record in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return user;
};

export const deletedUser = async (userId) => {
    // Find the user with the provided ID
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Delete the user's record from the database
    await user.destroy();

    return user;
};