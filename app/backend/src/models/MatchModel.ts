import IUpdateMatch from '../Interfaces/UpdateMatchs.interface';
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

  async updateMatch(id: number, body: IUpdateMatch) {
    const matchUpdated = await this.model.update({ ...body }, { where: { id } });
    return matchUpdated;
  }

  async registerNewMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
