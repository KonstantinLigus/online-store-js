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
    userExistError =
      nameFromDB === name &&
      new Error(`Name: ${nameFromDB} have already exist`);
    userExistError =
      emailFromDB === email &&
      new Error(`Email: ${emailFromDB} have already exist`);
    userExistError.name = "UserExistError";
    throw userExistError;
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const _id = new mongoose.mongo.ObjectId();

  user.verificationToken = crypto.randomUUID();
  user.password = hashedPassword;
  user._id = _id;
  const createdUser = await userControllers.createUser(user);
  createAndSetUserTokenToCookie({ _id, path: "api/auth" });
  return createdUser;
}

export default getTryCatchWrapper(signUp);
