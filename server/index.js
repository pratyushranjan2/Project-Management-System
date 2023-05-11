import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from "./logging.js";

import projectRoutes from './routes/projects.js';
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {        
    //res.sendFile('index.html', {root: __dirname});     
    logger.info('Transaction Home OK');
    res.status(200).send({message: "Welcome to Project Management System"}); 
});

app.use('/projects', projectRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;

// await database connection
await mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

export default app;