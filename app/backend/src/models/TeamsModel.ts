import Teams from '../database/models/Teams';
import { ITeams } from '../Interfaces/Teams.interface';

export default class TeamsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }
}
