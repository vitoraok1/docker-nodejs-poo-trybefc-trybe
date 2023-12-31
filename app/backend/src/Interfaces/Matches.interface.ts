interface IHomeTeam {
  teamName: string;
}

interface IAwayTeam {
  teamName: string;
}

export default interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: IHomeTeam;
  awayTeam?: IAwayTeam;
}
