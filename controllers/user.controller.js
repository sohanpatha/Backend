const userService = require("../services/user.service");
console.log(userService);

// GET USERS WITH PAGINATION, FILTER, SEARCH
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const role = req.query.role || null;
    const search = req.query.search || null;

    const users = await userService.getUsers(
      limit,
      offset,
      role,
      search
    );

    res.json({
      page,
      limit,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers
};


const getUserById = (req, res) => {
  res.json({ id: req.params.id });
};

const updateUser = (req, res) => {
  res.json({ message: "User updated" });
};

const deleteUser = (req, res) => {
  res.json({ message: "User deleted" });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
