import axios from 'axios';

const config = (endpoint: string) => ({
  method: 'get',
  url: `https://v3.football.api-sports.io/${endpoint}`,
  headers: {
    'x-rapidapi-key': '067459ad4dc855544b09d484df439c3a',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});

export default async function syncTeams() {
  const {
    data: { response },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = await axios(config('countries'));
  const d: never[] = [];
  const count = 0;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (let i = 0; i < response.length; i++) {
    const item = response[i];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!item?.code) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.code = 'World';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.flag = '';
    }
    d.push(item);
  }

  console.log(count);
  return d;
}
