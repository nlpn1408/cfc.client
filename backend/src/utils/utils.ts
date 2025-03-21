import * as bCrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bCrypt.hash(password, saltRounds);
};
