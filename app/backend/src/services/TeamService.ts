import TeamModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/Teams.interface';
import { ITeamModel } from '../Interfaces/TeamModel.interface';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
