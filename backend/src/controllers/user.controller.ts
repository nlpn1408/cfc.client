import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { hashPassword } from "../utils/utils";

const prisma = new PrismaClient({
  log: ['error']
});

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  // Get user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
};

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
}).min(1);

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  // Get current user data
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (user.id !== req.user.id && req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Access forbidden" });
    return;
  }

  // Prepare update data
  const data: any = {};
  if (req.body.name) {
    data.name = req.body.name;
  }
  if (req.body.email) {
    // Check if email is different and already exists
    if (req.body.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (existingUser) {
        res.status(409).json({ message: "Email already exists" });
        return;
      }
    }
    data.email = req.body.email;
  }
  if (req.body.password) {
    const hashedPassword = await hashPassword(req.body.password);
    data.password = hashedPassword;
  }

  // Update user
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    const { password, ...userWithoutPass } = updatedUser;
    res.json(userWithoutPass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  // Delete user
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if ((error as any).code === "P2025") {
      // Prisma error code for record not found
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(users);
};
