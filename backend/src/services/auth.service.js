import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";

const SECRET_KEY = process.env.SECRET_KEY

export const register = async (data) => {
  try {
    const { name, lastname, phone, dni, email, password, role } = data;

    // Verificar si el usuario ya existe
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      throw { status: 400, message: "El usuario ya está registrado" };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await userRepository.createUser({
      name,
      lastname,
      phone,
      dni,
      email,
      password: hashedPassword,
      role,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw { status: 401, message: "Credenciales inválidas" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { status: 401, message: "Credenciales inválidas" };

    // Generar token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    throw error;
  }
};
