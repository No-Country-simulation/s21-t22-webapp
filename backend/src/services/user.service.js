import userRepository from "../repositories/user.repository.js";

export const getAllUsers = async () => {
  try {
    return await userRepository.getAllUsers();
  } catch (error) {
    throw new Error("Error al obtener usuarios");
  }
};

export const createUser = async (data) => {
  try {
    return await userRepository.createUser(data);
  } catch (error) {
    throw new Error("Error al crear usuario");
  }
};
