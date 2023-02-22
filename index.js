import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./src/routes.js";
import { sequelize } from './src/helpers/modelHelpers.js';
import { defineAssociations } from './src/config/relation.js';
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

dotenv.config(); // import env config

await sequelize.sync(); //async model

defineAssociations(); //define relation

const app = express(); // add express

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
app.use('/api', route);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send("Something went wrong.");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});