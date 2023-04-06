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

export const addProject = async (req,res) => {
    try {
        const project = req.body;
        const newProject = new Project({ ...project, creator: req.userId });
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(409).json({ message: error });
    }
};