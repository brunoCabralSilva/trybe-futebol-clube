import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

// const value = {
//   name: "Santos",
//   totalPoints: 9,
//   totalGames: 3,
//   totalVictories: 3,
//   totalDraws: 0,
//   totalLosses: 0,
//   goalsFavor: 9,
//   goalsOwn: 3,
//   goalsBalance: 6,
//   efficiency: "100.00",
// };

export default class LeaderBoard {
  matchesModel: MatchesModel;
  teamsModel: TeamsModel;

  constructor() {
    this.matchesModel = new MatchesModel();
    this.teamsModel = new TeamsModel();
  }

  leaderBoardHome = async () => {
    // const matchs = await MatchesModel.findAll({ where: { inProgress: false } });
    const teams = await TeamsModel.findAll();
    return teams;
  };
}
