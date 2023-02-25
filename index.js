import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./src/routes.js";
import { sequelize } from './src/helpers/modelHelpers.js';
import { defineAssociations } from './src/config/relation.js';
import { createLogger, format, transports } from "winston";
import helmet from 'helmet';
import asyncHandler from 'express-async-handler';
import 'express-async-errors'; // Import express-async-errors to handle async errors

const { combine, timestamp, label, printf } = format;

dotenv.config(); // import env config
const app = express(); // add express

(async () => {
    try {
        await sequelize.sync(); //sync model
        defineAssociations(); // define relation
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

// Initialize logger
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "info",
    format: combine(
        label({ label: "Logging" }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" })
    ]
});

// Middleware for logging
app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.originalUrl}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use(helmet()); // Add helmet middleware
app.use('/api', route);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send("Something went wrong.");
});

const port = process.env.PORT;

// Wrap the app.listen() call with asyncHandler
app.listen(port, asyncHandler(() => {
    console.log(`Server up and running on port ${port}...`);
}));
