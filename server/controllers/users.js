import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user/user.js";
import logger from "../logging.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        logger.error(`No user exists with email ${email}`);
        return res.status(404).json({ message: "User doesn't exist." });
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        logger.error(`Incorrect password for ${existingUser._id}`);
        return res.status(400).json({ message: "Wrong password / email." });
      }
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      logger.info(`Successfully logged in ${existingUser._id}`);
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  };
  
  export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        logger.error(`User already exists with email ${email}`);
        return res.status(400).json({ message: "User already exists" });
      }
      if (password !== confirmPassword) {
        logger.error(`Signup passwords do not match: ${password} and ${confirmPassword}`);
        return res.status(400).json({ message: "Passwords do not match." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h", }
        );
  
      logger.info(`User created ${result._id}`);
      res.status(200).json({ result, token });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  };

  export const updateUser = async (req, res) => {
    const userId = req.userId;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, 
      { new: true });
    logger.info(`User ${userId} updates done: ${JSON.stringify(updates)}`);
    res.json(updatedUser);
  };