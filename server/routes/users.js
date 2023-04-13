import express from "express";
import auth from "../middleware/auth.js"

import {
    signin,
    signup,
    updateUser,
} from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/update', auth, updateUser);

export default router;