import Project from "../models/project/project.js";
import mongoose from "mongoose";

export const getProjects = async (req,res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(404).json( { message: error } );
    }
};