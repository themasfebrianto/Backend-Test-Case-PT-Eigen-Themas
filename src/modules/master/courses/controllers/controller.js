import * as courseService from '../services/services.js';
import asyncHandler from 'express-async-handler';

export const getCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(courses);
});

export const getCourseById = asyncHandler(async (req, res) => {
    const course = await courseService.getCourseById(req.params.id);
    return res.status(200).json(course);
});

export const createCourse = asyncHandler(async (req, res) => {
    const insertedCourse = await courseService.createCourse(req.body);
    return res.status(201).json(insertedCourse);
});

export const updateCourse = asyncHandler(async (req, res) => {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    return res.status(200).json(updatedCourse);
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const numRows = await courseService.deleteCourse(req.params.id);
    return res.status(204).json(numRows);
});