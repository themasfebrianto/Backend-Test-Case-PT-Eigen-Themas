import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import route from "./routes/route.js";

dotenv.config();

const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch((err) => {
        console.error("Unable to connect to PostgreSQL:", err);
    });

app.use(cors());
app.use(express.json());
app.use(route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});