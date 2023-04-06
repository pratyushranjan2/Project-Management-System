import express from "express";
import auth from "../middleware/auth.js";

import {
    getProjects,
    addProject,
} from '../controllers/projects.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', auth, addProject);

export default router;