import { UserModel } from '../DAO/models/users.model.js';

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find({});
      return res.status(201).json({
        status: 'success',
        msg: 'Users list',
        payload: users,
      });
    } catch (error) {
      throw new Error();
    }
  }

  async getUserId(req, res) {
    try {
      const uid = req.params.uid;
      const user = await UserModel.findById(uid);
      return res.status(201).json({
        status: 'success',
        msg: 'User',
        payload: user,
      });
    } catch (error) {
      throw new Error();
    }
  }
}

export const userController = new UsersController();