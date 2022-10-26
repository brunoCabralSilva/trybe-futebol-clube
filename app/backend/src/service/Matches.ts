import MatchesModel from '../database/models/Matches';

export default class Matches {
  getAll = async () => {
    const getAllMatches = await MatchesModel.findAll();
    return getAllMatches;
  };
}
