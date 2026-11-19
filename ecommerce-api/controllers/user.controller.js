import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already Exists!",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registerd Successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
    let token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login Successfully!",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
