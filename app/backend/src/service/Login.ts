// import Users from '../database/models/Users';

// interface LoginInterface {
//   email: string,
//   password: string,
// }

// export default class Login {
//   findByEmailAndPassword = async (body: LoginInterface) => {
//     const { email, password } = body;
//     const query = await Users.findOne({
//       attributes: ['id', 'displayName', 'email', 'password', 'image'],
//       where: { email, password },
//     });
//     return query;
//   };
// }
