import TeamsModel from '../database/models/Teams';

export default class Teams {
  getAll = async () => {
    const req = await TeamsModel.findAll();
    return req;
  };

  getOne = async (id: string) => {
    const req = await TeamsModel.findOne(({ where: { id } }));
    return req;
  };
}
