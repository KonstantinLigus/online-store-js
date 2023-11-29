import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import { userZodSchema } from "@/backend/libs/zod/user.zod.schema";
import userControllers from "@/backend/entities/users";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { createAndSetUserTokenToCookie } from "@/backend/helpers/createAndSetUserTokenToCookie";

async function signUp(req) {
  const user = await req.json();
  userZodSchema.parse(user);
  const { name, password, email } = user;
  const { user: userFromDB } = await userControllers.getUserByField({
    $or: [{ name }, { email }],
  });
  if (userFromDB) {
    const { name: nameFromDB, email: emailFromDB } = userFromDB;
    let userExistError = null;
    if (nameFromDB === name)
      userExistError = new Error(`Name: ${nameFromDB} have already exist`);
    if (emailFromDB === email)
      userExistError = new Error(`Email: ${emailFromDB} have already exist`);
    if (nameFromDB === name && emailFromDB === email)
      userExistError = new Error(
        `Name: ${nameFromDB} and email: ${emailFromDB} have already exist`,
      );
    userExistError.name = "UserExistError";
    throw userExistError;
  }
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);
  user.verificationToken = crypto.randomUUID();
  user._id = new mongoose.mongo.ObjectId();
  const createdUser = await userControllers.createUser(user);
  createAndSetUserTokenToCookie(user._id);
  return createdUser;
}

export default getTryCatchWrapper(signUp);
