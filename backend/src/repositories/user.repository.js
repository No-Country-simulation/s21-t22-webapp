import User from "../models/user.model.js";

const getAllUsers = async () => {
  return await User.find();
};

const createUser = async (data) => {
  return await User.create(data);
};

export default { getAllUsers, createUser };
