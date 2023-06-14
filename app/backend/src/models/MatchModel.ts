import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import IMatches from '../Interfaces/Matches.interface';

export default class MatchModel {
  private model = Matches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return dbData;
  }

  async getAllMatchesSorted(progress: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: progress },
      include: [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
    });
    return dbData;
  }

  async finishMatch(id: number) {
    const matchUpdated = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return matchUpdated;
  }
}
