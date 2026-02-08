const authService = require("../services/auth.service");

const register = async (req, res) => {
  const { email, password, role } = req.body;

  // VALIDATION
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const user = await authService.registerUser({ email, password, role });
  res.status(201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const token = await authService.loginUser(email, password);

  if (!token) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({ token });
};

module.exports = { register, login };
