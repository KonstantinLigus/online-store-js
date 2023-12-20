export async function signUp(newUser) {
  userSignUpZodSchema.parse(newUser);
  const { password, email } = newUser;
  const { user: userFromDB } = await userControllers.getUserByField({ email });
  if (userFromDB) throw new UserExistError(email);
  newUser.password = await getHashedPassword(password);
  const verificationToken = getRandomUUID();
  newUser.verificationToken = verificationToken;
  const message = createVerifyEmailMessage({
    email,
    verificationToken,
  });
  await sendEmail(message);
  const { user: createdUser, status } = await userControllers.createUser(user);
  const token = createUserToken(createdUser._id);
  setUserTokenToCookie(token);
  delete createdUser._id;
  delete createdUser.password;
  delete createdUser.verificationToken;
  return { createdUser, status };
}
