import express from "express";
import auth from "../middleware/auth.js";

import {
    getProjects,
    addProject,
    deleteProject,
    updateProject,
    getProjectsBySearch,
    applyToProject,
    selectCandidate,
} from '../controllers/projects.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', auth, addProject);
router.delete('/:id', auth, deleteProject);
router.patch('/selectCandidate', auth, selectCandidate);
router.patch('/:id', auth, updateProject);
router.get('/search', auth, getProjectsBySearch);
router.patch('/:id/apply', auth, applyToProject);

export default router;