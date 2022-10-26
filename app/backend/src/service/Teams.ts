import TeamsModel from '../database/models/Teams';

export default class Teams {
  teamsModel: TeamsModel;

  constructor() {
    this.teamsModel = new TeamsModel();
  }

  getAll = async () => {
    const req = await TeamsModel.findAll();
    return req;
  };
}
