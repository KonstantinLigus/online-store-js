export function cleanUserFields(user) {
  delete user.password;
  delete user.verificationToken;
  delete user.__v;

  return user;
}
