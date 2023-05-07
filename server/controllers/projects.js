import Project from "../models/project/project.js";
import User from "../models/user/user.js";
import mongoose from "mongoose";
import logger from "../logging.js";

export const getProjects = async (req,res) => {
    try {
        const projects = await Project.find();
        logger.info('all projects returned successfully');
        res.status(200).json(projects);
    }
    catch (error) {
      logger.error(error);  
      res.status(404).json( { message: error } );
    }
};

export const addProject = async (req,res) => {
    try {
        const project = req.body;

        project.domain = [...new Set(project.domain)];
        
        const newProject = new Project({ ...project, creator: req.userId });
        newProject.creator = req.userId;
        
        await newProject.save();
        logger.info(`Project added: ${JSON.stringify(newProject)}`);
        res.status(201).json(newProject);
    }
    catch (error) {
      logger.error(error);  
      res.status(409).json({ message: error });
    }
};

export const deleteProject = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.error(`got invalid project id for deletion: ${id}`);
      return res.status(404).send("No project with that id!");
    }
    await Project.findByIdAndDelete(id);
    logger.info(`deleted project ${id}`);
    res.json({ message: "Project deleted successfully." });
};

export const updateProject = async (req, res) => {
    const { id: _id } = req.params;
    const project = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      logger.error(`got invalid project id to update: ${_id}`);
      return res.status(404).send("No project with that id!");
    }
  
    const updatedProject = await Project.findByIdAndUpdate(_id, project, {
      new: true,
    });
    logger.info(`Project ${_id} updated: ${JSON.stringify(updatedProject)}`);
    res.json(updatedProject);
  };

  export const getProjectsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
  
    try {
      const title = new RegExp(searchQuery, "i");
      const projects = await Project.find({ $or: [{ title }, { domain: title }] });
      logger.info(`search project result: ${JSON.stringify(projects)}`);
      res.status(200).json({ data: projects });
    } catch (error) {
      logger.error(error);
      res.status(404).json({ message: error });
    }
  };

  export const applyToProject = async (req, res) => {
    const { id } = req.params;
  
    if (!req.userId) {
      logger.error('no authentication to apply to project');
      return res.json({ message: "Unauthenticated" });
    }
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.error(`invalid project apply. no project with id ${id}`);
      return res.status(404).send("No project with that id!");
    }
  
    const project = await Project.findById(id);

    const user = await User.findById(req.userId);
  
    const index = project.candidatesInterested.findIndex((email) => email === String(user.email));
    const alreadyMember = project.members.findIndex((email) => email === String(user.email));

    if (alreadyMember !== -1) {
      logger.error(`Apply to project failed. \
                  User ${req.userId} already a member in project ${id}.`);
      return res.json({ "message": "Already a member" });
    }
    
    if (index === -1) {
      project.candidatesInterested.push(user.email);
    } else {
      project.candidatesInterested = project.candidatesInterested.filter((email) => email !== String(user.email));
    }
  
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      project,
      { new: true }
    );
    logger.info(`Apply / revert apply by user ${req.userId} successful to project ${id}`);
    res.json(updatedProject);
  };

  export const selectCandidate = async (req, res) => {
    const { candidateEmail, projectId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      logger.error(`invalid project to select candidate. no project with id ${projectId}`);
      return res.status(404).send("No project with that id!");
    }
    
    const project = await Project.findById(projectId);
    
    const index = project.candidatesInterested
                  .findIndex((email) => email === String(candidateEmail));
    
    if (index !== -1) {
      project.candidatesInterested = project.candidatesInterested
                                    .filter((email) => email !== String(candidateEmail));
      const isPresentAlready = project.members
                              .findIndex((email) => email === candidateEmail);
      
      if (isPresentAlready === -1) {
        project.members.push(candidateEmail);
      }
    }
    
    const updatedProject = await Project.findByIdAndUpdate(projectId, project, { new: true });
    logger.info(`Selected candidate ${candidateEmail} to project ${projectId}`);
    res.json(updatedProject);
  };

  export const removeMember = async (req, res) => {
    const { candidateEmail, projectId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      logger.error(`invalid project to remove member. no project with id ${projectId}`);
      return res.status(404).send("No project with that id!");
    }
    
    const project = await Project.findById(projectId);
    
    const index = project.members
                  .findIndex((email) => email === String(candidateEmail));
    
    if (index !== -1) {
      project.members = project.members
                                .filter((email) => email !== String(candidateEmail));
    }
    
    const updatedProject = await Project.findByIdAndUpdate(projectId, project, { new: true });
    logger.info(`Successfully removed member ${candidateEmail} from project ${projectId}`);
    res.json(updatedProject);
  };