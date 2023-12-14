import bcrypt from "bcrypt";

export async function comparePassword({ pswd, hashedPswd }) {
  const isPswdMatch = await bcrypt.compare(pswd, hashedPswd);
  return isPswdMatch;
}
