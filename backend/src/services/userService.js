import userRepository from "../repositories/userRepository.js";

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const createUser = async (data) => {
  return await userRepository.createUser(data);
};
