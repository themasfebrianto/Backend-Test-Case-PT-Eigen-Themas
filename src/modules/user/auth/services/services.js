import User from '../models/model.js';
import argon2 from 'argon2';

export const login = async (email, password) => {
    // Find the user with the provided email
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Invalid email');
    }

    // Verify the user's password using Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // If the email and password are correct, return the user
    return user;
};

export const register = async (userData) => {
    console.log(userData.password);
    if (!userData.password) {
        throw new Error('Password is required');
    }
    // Hash the user's password before storing it in the database
    const hashedPassword = await argon2.hash(userData.password);
    console.log(hashedPassword);

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
    const passwordMatch = await argon2.verify(user.password, oldPassword);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    // Hash the new password and update the user's record in the database
    const hashedPassword = await argon2.hash(newPassword);
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