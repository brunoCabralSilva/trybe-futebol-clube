import Authentication from '../utils/Authentication';
import UserModel from '../database/models/Users';
const bcrypt = require('bcryptjs');

interface LoginInterface {
  email: string,
  password: string,
}

export default class Login {
  public findUser = async (body: LoginInterface) => {
    const { email, password } = body;
    const user = await UserModel.findOne({ where: { email } });
    if(user) {
      const value = await bcrypt.compareSync(password, user.password);
      if (value) {
        const Auth = new Authentication();
        const token = Auth.generateTolkien(user);
        return token;
      } return null;
    } return null;
  };
}
