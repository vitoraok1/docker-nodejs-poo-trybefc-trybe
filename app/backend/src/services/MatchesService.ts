import MatchModel from '../models/MatchModel';
import IMatches from '../Interfaces/Matches.interface';

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
}
