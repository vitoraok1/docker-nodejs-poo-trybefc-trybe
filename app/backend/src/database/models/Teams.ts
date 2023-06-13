import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Teams extends Model<InferAttributes<Teams>,
InferCreationAttributes<Teams>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: DataTypes.STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Teams;
