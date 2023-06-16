type IMatches = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

const teams = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const renewTeams = () => {
  teams.totalPoints = 0;
  teams.totalGames = 0;
  teams.totalVictories = 0;
  teams.totalDraws = 0;
  teams.totalLosses = 0;
  teams.goalsFavor = 0;
  teams.goalsOwn = 0;
};

const homeVictory = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const awayVictory = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const homeDraw = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const awayDraw = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const homeDefeat = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 0;
  teams.totalLosses += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const awayDefeat = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 0;
  teams.totalLosses += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const pointsHome = ((matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) homeVictory(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) homeDraw(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) homeDefeat(homeTeamGoals, awayTeamGoals);
  });
});

const pointsAway = ((matches:IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) awayVictory(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) awayDraw(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) awayDefeat(homeTeamGoals, awayTeamGoals);
  });
});

const teamsHome = (name:string, matches:IMatches[]) => {
  if (name !== teams.name) {
    renewTeams();
  }

  teams.name = name;
  pointsHome(matches);
  teams.totalGames += 1;

  return teams;
};

const teamsAway = (name:string, matches:IMatches[]) => {
  if (name !== teams.name) {
    renewTeams();
  }
  teams.name = name;
  pointsAway(matches);
  teams.totalGames += 1;

  return teams;
};

export {
  teamsHome,
  teamsAway,
};
