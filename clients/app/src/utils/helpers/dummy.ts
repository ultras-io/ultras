//this file should be removed

import { MatchStateEnum as MatcheTimeState } from 'views/components/compositions/MatchTime';

import { SearchItem } from 'views/screens/SearchListModal';

const profileAvatars = [
  'https://pbs.twimg.com/profile_images/891997529096814592/ye6kbXzx_x96.jpg',
  'https://pbs.twimg.com/profile_images/1346021630619779074/WsRa2NM7_x96.jpg',
  'https://pbs.twimg.com/profile_images/1305953647088603138/JyNI76Ud_x96.jpg',
  'https://pbs.twimg.com/profile_images/849140658979954688/g5H5KiOZ_x96.jpg',
  'https://pbs.twimg.com/profile_images/1126646255550177280/yw-PP4aD_x96.jpg',
  undefined,
  undefined,
];

const sclubsAvatars = [
  'https://1000logos.net/wp-content/uploads/2020/09/Leeds-United-1998.jpg',
  'https://ih1.redbubble.net/image.1761512726.1340/st,small,507x507-pad,600x600,f8f8f8.jpg',
  'https://lirp.cdn-website.com/ff6266e0/dms3rep/multi/opt/logo2016ombra-1920w.png',
  'https://pbs.twimg.com/profile_images/1381694571571257349/SXBWBRWo_400x400.jpg',
  'https://www.logolynx.com/images/logolynx/83/838e2ca12d1899915a9f0811a4702184.jpeg',
  'https://ih1.redbubble.net/image.1855680265.4559/st,small,507x507-pad,600x600,f8f8f8.jpg',
];

const names = [
  'Soltan Alsultan',
  'Nacho Azuara',
  'Aram Magician',
  'Fabien Rosales de Santacata',
  'Baris',
];

const usernames = [
  '__baris',
  'carlosborrego_',
  'juanito712ch',
  'rugra11',
  'miequipotiene13copasdeeuropasamerlouch',
];

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
const nationalTeams = [
  'England',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Armenia',
  'Georgia',
  'Afganstan',
  'India',
  'Brazil',
  'Argentina',
  'USA',
  'Australia',
  'Russia',
  'Pakistan',
  'Iran',
  'Croatia',
  'Northern Ireland',
  'Ireland',
  'Island',
  'Luxembourg',
  'South Korea',
  'Japan',
  'China',
  'Portugal',
  'Sweden',
  'Norway',
  'Czech Republic',
  'Algeria',
  'Angola',
  'Austria',
  'Belarus',
  'Bangladesh',
  'Costa Rica',
  'Congo (Congo-Brazzaville)',
  'Democratic Republic of the Congo',
  'Ecuador',
  'Egypt',
  'Finland',
  'Greece',
  'Indonesia',
  'Jamaica',
  'Kazakhstan',
  'Lebanan',
  'Liechtenstein',
  'Montenegro',
];

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
export const generateTeamName = (): string => {
  return teams[parseInt(Math.random() * (78 - 1) + 1)];
};

const generateLeagueName = (): string => {
  return leagues[parseInt(Math.random() * (7 - 1) + 1)];
};
export const generateCountry = () => {
  return countries[parseInt(Math.random() * (5 - 1) + 1)];
};
const generateNationalTeam = () => {
  return nationalTeams[parseInt(Math.random() * (46 - 1) + 1)];
};
export const generateTeamURL = (): string => {
  return (
    'https://media.api-sports.io/football/teams/' +
    Math.round(Math.random() * (3000 - 1) + 1) +
    '.png'
  );
};
export const generateFlagURL = (): string => {
  return (
    'https://media.api-sports.io/football/teams/' +
    Math.round(Math.random() * (32 - 1) + 1) +
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

const generateCode = () => {
  return '+' + (Math.round(Math.random() * (800 - 1) + 1) + 120);
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
    matchState: MatcheTimeState.ExtraTime,
    startTime: randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11)),
    venue: 'aa',
  };
};
const generateMatch2 = () => {
  return {
    ...generateMatch1(),
    matchState: MatcheTimeState.Live,
    minute: Math.round(Math.random() * (97 - 1) + 1),
    score: generateScore(),
    venue: 'generatedtersClubName()',
  };
};
const generateMatch3 = () => {
  return {
    ...generateMatch1(),
    matchState: MatcheTimeState.Finished,
    score: generateScore(),
    venue: 'generatedrtersClubName()',
  };
};

export const generateMatch = () => {
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

export const generateClubsList = (count: number) => {
  const teamsData = [];
  for (let i = 0; i < count; i++) {
    teamsData.push({
      id: uuidv4(),
      name: generateTeamName(),
      logo: generateTeamURL(),
      city: generateTeamName(),
      country: generateNationalTeam(),
      supportersClubsCount: parseInt(Math.random() * (4466 - 1) + 176),
    });
  }
  return teamsData;
};

export const generateTeamsList = (count: number): Array<SearchItem> => {
  const teamsData = [];
  for (let i = 0; i < count; i++) {
    teamsData.push({
      id: uuidv4(),
      name: generateNationalTeam(),
      logo: generateFlagURL(),
      code: generateCode(),
    });
  }
  return teamsData;
};

export const generateEvent = () => {
  return {
    id: uuidv4(),
    imageUri:
      Math.random() < 0.1
        ? 'https://i2-prod.football.london/incoming/article19846274.ece/ALTERNATES/s1200/0_GettyImages-1302327332.jpg'
        : undefined,
    date: randomDate(new Date(2021, 7, 10), new Date(2022, 11, 11)),
    title: generateTeamName() + ' Celebrate all things in ' + generateNationalTeam(),
    creator: 'armando.broja',
    supportersClub: 'generatefrfrupportersClubName()',
    location: 'Paulaner ' + generateCountry(),
    commentsCount: parseInt(Math.random() * (4466 - 1) + 16),
    goingCount: parseInt(Math.random() * (2466 - 1) + 1),
    catchesCount: parseInt(Math.random() * (477466 - 1) + 146),
    isGoing: Math.random() > 0.5,
    isCaught: Math.random() > 0.5,
  };
};

export const generateEvents = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateEvent());
  }
  return data;
};

export const generatePost = () => {
  return {
    id: uuidv4(),
    imageUri:
      Math.random() < 0.2
        ? 'https://i2-prod.football.london/incoming/article19846274.ece/ALTERNATES/s1200/0_GettyImages-1302327332.jpg'
        : undefined,
    date: randomDate(new Date(2021, 7, 10), new Date(2021, 11, 11)),
    title: generateTeamName() + ' Celebrate all things in ' + generateNationalTeam(),
    content:
      'The header hides and reveals based on the direction of the scroll and once the scrolling is stopped, the header conveniently snaps to the closest state i.e either half-hidden or fully revealed. This effect can be seen in apps like WhatsApp, Youtube, Telegram, etc. We’d be using React Native’s Animated API to build this so let’s get started!\n\nI made a starter template that would save us some time by focusing on the topic of animations in this article. So I recommend you to clone the repository and follow along :)',
    creator: 'armando.broja',
    supportersClub: 'generatefortersClubName()',
    commentsCount: parseInt(Math.random() * (4466 - 1) + 16),
    catchesCount: parseInt(Math.random() * (477466 - 1) + 146),
    isCaught: Math.random() > 0.5,
  };
};

export const generateProfile = () => {
  return {
    id: uuidv4(),
    avatarUri: profileAvatars[parseInt(Math.random() * (7 - 1))],
    name: names[parseInt(Math.random() * (5 - 1))],
    username: usernames[parseInt(Math.random() * (5 - 1))],
    teams: generateClubsList(parseInt(Math.random() * 6) + 1),
    supportersClubs: [],
  };
};

export const generateProfiles = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateProfile());
  }
  return data;
};
