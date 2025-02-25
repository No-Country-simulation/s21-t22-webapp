import * as authService from "../services/auth.service.js";
import userValidator from "../validation/user.validator.js";

export const registerUser = async (req, res) => {
  try {
    // Validar datos
    const { error, value } = userValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Llamar al servicio
    const newUser = await authService.register(value);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const { token } = await authService.login({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
  }
};
