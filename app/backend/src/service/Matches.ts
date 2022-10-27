import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

export default class Matches {
  getById = async (id: number) => {
    const query = await TeamsModel.findOne({
      where: { id },
    });
    return query;
  };

  returnObject = (gt: any, nameHomeTeam: any, nameAwayTeam: any, inProgress: boolean) => {
    const objReturn = {
      id: gt.dataValues.id,
      homeTeam: gt.dataValues.homeTeam,
      homeTeamGoals: gt.dataValues.homeTeamGoals,
      awayTeam: gt.dataValues.awayTeam,
      awayTeamGoals: gt.dataValues.awayTeamGoals,
      inProgress,
      teamHome: {
        teamName: nameHomeTeam?.teamName,
      },
      teamAway: {
        teamName: nameAwayTeam?.teamName,
      },
    };
    return objReturn;
  };

  returnList = async (list: any) => {
    const valor = Promise.all(
      list.map(async (gt: any) => {
        const nameHomeTeam = await this.getById(gt.dataValues.homeTeam);
        const nameAwayTeam = await this.getById(gt.dataValues.awayTeam);
        let inProgress = false;
        if (gt.dataValues.inProgress) {
          inProgress = true;
        } else inProgress = false;
        const objReturn = this.returnObject(gt, nameHomeTeam, nameAwayTeam, inProgress);
        return objReturn;
      }),
    );
    return valor;
  };

  getAll = async () => {
    const getAllMatches: any = await MatchesModel.findAll();
    const valor = this.returnList(getAllMatches);
    return valor;
  };

  getInProgress = async (inProgress: string) => {
    if (inProgress === 'true') {
      const query = await MatchesModel.findAll({ where: { inProgress: true } });
      const valor = this.returnList(query);
      return valor;
    }
    const query = await MatchesModel.findAll({ where: { inProgress: false } });
    const valor = this.returnList(query);
    return valor;
  };

  insertMatchInProgress = async (body: any) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const home = await this.getById(homeTeam);
    const away = await this.getById(awayTeam);
    if (!home || !away) {
      return null;
    }

    const query: any = await MatchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return query.dataValues;
  };

  finishMatch = async (id: string) => {
    const idQuery = Number(id);
    await MatchesModel.update({ inProgress: false }, {
      where: { id: idQuery },
    });
    return 'Finished';
  };

  updateMatch = async (id: string, params: any) => {
    const { homeTeamGoals, awayTeamGoals } = params;
    const idNumber = Number(id);
    await MatchesModel.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id: idNumber },
    });
    return 'Match Updated!';
  };
}
