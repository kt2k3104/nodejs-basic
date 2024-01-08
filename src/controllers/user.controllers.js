import db from "../models/index.model";

const userController = {
  postUser: async (req, res, next) => {
    try {
      const { name, age, address, email } = req.body;

      const user = await db.User.create({
        name,
        age,
        address,
        email,
      });

      res.status(201).json({
        message: "create user success.",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  putEditUser: async (req, res, next) => {
    try {
      const { name, age, address, email } = req.body;
      const id = req.params.id;

      const user = await db.User.findByPk(id);

      const userUpdated = await user.update({
        name,
        email,
        address,
        age,
      });

      res.json({ message: "update success", userUpdated });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const id = req.params.id;

      const UserDeleted = await db.User.destroy({
        where: {
          id: id,
        },
      });

      res.json({ message: "delete success", UserDeleted });
    } catch (error) {
      next(error);
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const users = await db.User.findAll();

      res.json({
        users,
      });
    } catch (error) {
      next(error);
    }
  },

  getAddUser: async (req, res, next) => {
    res.render("addUser");
  },
};

export default userController;
