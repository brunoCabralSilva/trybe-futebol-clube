import bcrypt = require('bcryptjs');
import Authentication from '../utils/Authentication';
import UserModel from '../database/models/Users';
import { LoginInterface } from '../interfaces/login';

export default class Login {
  public findUser = async (body: LoginInterface) => {
    const { email, password } = body;
    const user = await UserModel.findOne({ where: { email } });
    console.log(user);
    if (user) {
      const value = bcrypt.compareSync(password, user.password);
      if (value) {
        const Auth = new Authentication();
        const token = Auth.generateTolkien(user);
        return token;
      } return null;
    } return null;
  };
}
