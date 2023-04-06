import express from "express";
import auth from "../middleware/auth.js";

import {
    getProjects,
    addProject,
    deleteProject,
} from '../controllers/projects.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', auth, addProject);
router.delete('/:id', auth, deleteProject)

export default router;