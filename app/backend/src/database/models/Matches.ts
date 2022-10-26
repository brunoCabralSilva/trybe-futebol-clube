import { INTEGER, Model } from 'sequelize';
import db from './index';
import Teams from './Teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matches.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: INTEGER,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'home_Team' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'away_Team' });

export default Matches;
