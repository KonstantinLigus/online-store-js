import bcrypt from "bcrypt";

export async function isPasswordsTheSame({ pswd, hashedPswd }) {
  const isPswdMatch = await bcrypt.compare(pswd, hashedPswd);
  return isPswdMatch;
}
