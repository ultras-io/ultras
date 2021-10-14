//this file should be removed

import {MatchStateEnum as MatcheTimeState} from 'views/components/compositions/MatchTime';

const teams = [
  'Watford',
  'Liverpool',
  'Aston Villa',
  'Wolves',
  'Leicester',
  'Manchester Utd',
  'Manchester City',
  'Burnley',
  'Norwich',
  'Brighton',
  'Southampton',
  'Leeds',
  'Brentford',
  'Chelsea',
  'Everton',
  'West Ham',
  'Newcastle',
  'Tottenham',
  'Arsenal',
  'Crystal Palace',
  'Paris SG',
  'Angers',
  'Clermont',
  'Lille',
  'Lyon',
  'Monaco',
  'Troyes',
  'Nice',
  'Bordeaux',
  'Nantes',
  'Union Berlin',
  'Wolfsburg',
  'Borussia Monchengladbach',
  'Stuttgart',
  'Bayer Leverkusen',
  'Bayern Munich',
  'Spezia',
  'Salernitana',
  'Lazio',
  'Inter',
  'AC Milan',
  'Verona',
  'Cagliari',
  'Sampdoria',
  'Empoli',
  'Atalanta',
  'Genoa',
  'Sassuolo',
  'Udinese',
  'Bologna',
  'Napoli',
  'Torino',
  'Juventus',
  'AS Roma',
  'Venezia',
  'Fiorentina',
  'Levante',
  'Getafe',
  'Real Sociedad',
  'Mallorca',
  'Rayo Vallecano',
  'Elche',
  'Celta Vigo',
  'Sevilla',
  'Postp',
  'Granada CF',
  'Atl. Madrid',
  'Postp',
  'Real Madrid',
  'Ath Bilbao',
  'Villarreal',
  'Osasuna',
  'Barcelona',
  'Valencia',
  'Alaves',
  'Betis',
  'Espanyol',
  'Cadiz CF',
];

const leagues = [
  'Premier League',
  'Champions League',
  'Europa League',
  'Ligue 1',
  'Bundesliga',
  'Serie A',
  'LaLiga',
];

const countries = ['England', 'France', 'Germany', 'Italy', 'Spain', undefined];

const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};
const generateTeamName = (): string => {
  return teams[parseInt(Math.random() * (78 - 1) + 1)];
};
const generateLeagueName = (): string => {
  return leagues[parseInt(Math.random() * (7 - 1) + 1)];
};
const generateCountry = () => {
  return countries[parseInt(Math.random() * (5 - 1) + 1)];
};
const generateTeamURL = (): string => {
  return (
    'https://media.api-sports.io/football/teams/' +
    Math.round(Math.random() * (3000 - 1) + 1) +
    '.png'
  );
};
const generateLeagueURL = (): string => {
  return (
    'https://media.api-sports.io/football/leagues/' +
    Math.round(Math.random() * (55 - 1) + 1) +
    '.png'
  );
};
const generateScore = () => {
  return {
    team1Score: Math.round(Math.random() * (4 - 1) + 1),
    team2Score: Math.round(Math.random() * (4 - 1) + 1),
  };
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const generateMatch1 = () => {
  return {
    id: uuidv4(),
    team1Name: generateTeamName(),
    team2Name: generateTeamName(),
    team1URI: generateTeamURL(),
    team2URI: generateTeamURL(),
    country: generateCountry(),
    league: generateLeagueName(),
    leagueImageURI: generateLeagueURL(),
    startTime: randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11)),
  };
};
const generateMatch2 = () => {
  return {
    ...generateMatch1(),
    matchState: MatcheTimeState.Live,
    minute: Math.round(Math.random() * (97 - 1) + 1),
    score: generateScore(),
  };
};
const generateMatch3 = () => {
  return {
    ...generateMatch1(),
    matchState: MatcheTimeState.Finished,
    score: generateScore(),
  };
};

const generateMatch = () => {
  const x = Math.round(Math.random() * (3 - 1) + 1);
  if (x === 1) return generateMatch1();
  else if (x === 2) return generateMatch2();
  return generateMatch3();
};

export const generateMatches = (count: number) => {
  const matchesData = [];
  for (let i = 0; i < count; i++) {
    matchesData.push(generateMatch());
  }
  return matchesData;
};