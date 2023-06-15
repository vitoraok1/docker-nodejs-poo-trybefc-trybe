import MatchModel from '../models/MatchModel';
import IMatches from '../Interfaces/Matches.interface';
import IUpdateMatch from '../Interfaces/UpdateMatchs.interface';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchModel(),
  ) { }

  public async getAllMatches(progress: string | undefined): Promise<IMatches[]> {
    if (progress !== undefined) {
      const inProgress = progress === 'true';
      const inProgressMatches = await this.matchesModel.getAllMatchesSorted(inProgress);
      return inProgressMatches;
    }

    const allMatches = await this.matchesModel.findAll();
    return allMatches;
  }

  public async finishMatch(id: number) {
    const match = await this.matchesModel.finishMatch(id);
    return { message: 'Finished', data: match };
  }

  public async updateMatch(id: number, body:IUpdateMatch) {
    const updatedMatch = await this.matchesModel.updateMatch(id, body);
    return { message: 'Updated', data: updatedMatch };
  }

  public async registerNewMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const newMatch = await this.matchesModel
      .registerNewMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return { message: 'Created', data: newMatch };
  }
}
