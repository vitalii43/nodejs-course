import express from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../models";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, role, password, name } = req.body;

    if (!(email && password && role && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    res.status(201).send("User successfully registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, email, role: user.role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        token,
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
