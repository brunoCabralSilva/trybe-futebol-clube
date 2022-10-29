import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

export default class LeaderBoard {
  matchesModel: MatchesModel;
  teamsModel: TeamsModel;

  constructor() {
    this.matchesModel = new MatchesModel();
    this.teamsModel = new TeamsModel();
  }

  calculateStatistics = (list: any) => {
    const data = { totalPoints: 0, totalVictories: 0, totalDraws: 0 };
    const data2 = { totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
    const data3 = { goalsBalance: 0 };
    list.forEach((match: any) => {
      data2.goalsFavor += match.homeTeamGoals;
      data2.goalsOwn += match.awayTeamGoals;
      data3.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        data.totalPoints += 3;
        data.totalVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        data.totalPoints += 1;
        data.totalDraws += 1;
      } else {
        data2.totalLosses += 1;
      }
    });
    return { ...data, ...data2, ...data3 };
  };

  generateObject = (parameters: any) => {
    const object = {
      name: parameters.teams[parameters.index].teamName,
      totalPoints: parameters.statistics.totalPoints,
      totalGames: parameters.matchs.length,
      totalVictories: parameters.statistics.totalVictories,
      totalDraws: parameters.statistics.totalDraws,
      totalLosses: parameters.statistics.totalLosses,
      goalsFavor: parameters.statistics.goalsFavor,
      goalsOwn: parameters.statistics.goalsOwn,
      goalsBalance: parameters.statistics.goalsBalance,
      efficiency: parameters.efficiency,
    };
    return object;
  };

  ordenate = (listData: any) => {
    const list = listData.sort((a: any, b: any) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      return 1;
    });
    return list;
  };

  leaderBoardHome = async () => {
    const teams: any = await TeamsModel.findAll();
    const listData = await Promise.all(
      teams.map(async (team: any, index: number) => {
        const matchs: any = await MatchesModel.findAll({
          where: { homeTeam: team.id, inProgress: false },
        });
        const statistics = this.calculateStatistics(matchs);
        const calcEfficiency = ((statistics.totalPoints * 100) / (matchs.length * 3)).toFixed(2);
        const efficiency = `${calcEfficiency}`;
        const parameters = { index, matchs, teams, statistics, efficiency };
        const generate = this.generateObject(parameters);
        return generate;
      }),
    );
    const ordinateList = this.ordenate(listData);
    return ordinateList;
  };
}
