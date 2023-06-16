import Matches from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
import ITeam from '../Interfaces/Teams.interface';
import { teamsHome, teamsAway, teamsClassified } from '../utils/leaderBoardUtils';

export default class LeaderBoardService {
  static async leaderBoard() {
    const teams = await TeamModel.findAll();

    const homeTeams = await teams.map(async (team) => {
      const homeMatches = await Matches.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const homeStatistics = await homeMatches.map((match) => (
        teamsHome(team.teamName, [match])));

      const statisticsTeams = homeStatistics[homeMatches.length - 1];
      return { ...statisticsTeams };
    });

    const results = await Promise.all(homeTeams);
    const classifiedTeams = teamsClassified(results);
    return classifiedTeams;
  }

  static async leaderBoardAway() {
    const teams = await TeamModel.findAll() as ITeam[];

    const awayTeams = await teams.map(async (team) => {
      const awayGames = await Matches.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });

      const awayStatistics = await awayGames.map((match) =>
        teamsAway(team.teamName, [match]));

      const statisticsTeams = awayStatistics[awayGames.length - 1];
      return { ...statisticsTeams };
    });
    const results = await Promise.all(awayTeams);
    const classifiedTeams = teamsClassified(results);
    return classifiedTeams;
  }
}
