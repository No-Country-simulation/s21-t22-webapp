import User from "../models/User.js";

export const getAllUsers = async () => {
  return await User.find();
};

export const createUser = async (data) => {
  return await User.create(data);
};
