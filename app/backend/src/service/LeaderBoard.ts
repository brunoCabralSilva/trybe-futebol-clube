import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

export default class LeaderBoard {
  matchesModel: MatchesModel;
  teamsModel: TeamsModel;

  constructor() {
    this.matchesModel = new MatchesModel();
    this.teamsModel = new TeamsModel();
  }

  calcStatisticsHome = (list: any) => {
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

  calcStatisticsAway = (list: any) => {
    const data = { totalPoints: 0, totalVictories: 0, totalDraws: 0 };
    const data2 = { totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
    const data3 = { goalsBalance: 0 };
    list.forEach((match: any) => {
      data2.goalsFavor += match.awayTeamGoals;
      data2.goalsOwn += match.homeTeamGoals;
      data3.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      if (match.awayTeamGoals > match.homeTeamGoals) {
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
        const statistics = this.calcStatisticsHome(matchs);
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

  leaderBoardAway = async () => {
    const teams: any = await TeamsModel.findAll();
    const listData = await Promise.all(
      teams.map(async (team: any, index: number) => {
        const matchs: any = await MatchesModel.findAll({
          where: { awayTeam: team.id, inProgress: false },
        });
        const statistics = this.calcStatisticsAway(matchs);
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

  generateObjFull = (team: any, list: any) => {
    const obj = {
      name: team.teamName,
      totalPoints: list[0].totalPoints + list[1].totalPoints,
      totalGames: list[0].totalGames + list[1].totalGames,
      totalVictories: list[0].totalVictories + list[1].totalVictories,
      totalDraws: list[0].totalDraws + list[1].totalDraws,
      totalLosses: list[0].totalLosses + list[1].totalLosses,
      goalsFavor: list[0].goalsFavor + list[1].goalsFavor,
      goalsOwn: list[0].goalsOwn + list[1].goalsOwn,
      goalsBalance: list[0].goalsBalance + list[1].goalsBalance,
    };
    return obj;
  };

  leaderBoard = async () => {
    const teams: any = await TeamsModel.findAll();
    const value1 = await this.leaderBoardAway();
    const value2 = await this.leaderBoardHome();
    const valor = [...value1, ...value2];
    const listData = await Promise.all(
      teams.map(async (team: any) => {
        const list = valor.filter((item) => team.teamName === item.name);
        const obj = this.generateObjFull(team, list);
        const efficiency = ((obj.totalPoints * 100) / (obj.totalGames * 3)).toFixed(2);
        const final = { ...obj, efficiency };
        return final;
      }),
    );
    const ordinateList = this.ordenate(listData);
    return ordinateList;
  };
}
