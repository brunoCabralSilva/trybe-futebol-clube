import { INTEGER, Model, STRING } from 'sequelize';
import db from './index';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
