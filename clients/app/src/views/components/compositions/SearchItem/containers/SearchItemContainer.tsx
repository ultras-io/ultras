import React from 'react';

import SearchItemComponent from '../components/SearchItemComponent';

import { generateClubsList, generateEvents, generateProfiles } from 'utils/helpers/dummy';

import { ISearchItemProps } from '../types';

const clubsData = [
  {
    id: '4673736HJDGYWGD63637HJHU',
    name: 'Moscow Blues',
    uri: 'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/225592217_413834063322765_322468461727596377_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=pfY2QJDEFjwAX8_xxIP&edm=ABfd0MgBAAAA&ccb=7-4&oh=4e389f6db98b3cd2fbe3243653f624f4&oe=61835BD4&_nc_sid=7bff83',
    ultrasCount: 3487,
  },
  {
    id: '74488HHUIHD3u8383JHJ',
    name: 'VAK410',
    uri: 'https://ih1.redbubble.net/image.1761512726.1340/st,small,507x507-pad,600x600,f8f8f8.jpg',
    ultrasCount: 1034827,
  },
  {
    id: '6567JGGK5737HJJ3636338GGK',
    name: 'Curva Nord Milano',
    uri: 'https://lirp.cdn-website.com/ff6266e0/dms3rep/multi/opt/logo2016ombra-1920w.png',
    ultrasCount: 34827,
  },
  {
    id: '5673387JGHYU6474746BHJGVCYF',
    name: 'Boixos Nois',
    uri: 'data:image/jpeg;base64,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',
    ultrasCount: 82347,
  },
  {
    id: '46467HHUGU647464883HUJHJNJ',
    name: 'ULTRAS SUR',
    uri: 'https://pbs.twimg.com/profile_images/1381694571571257349/SXBWBRWo_400x400.jpg',
    ultrasCount: 134827,
  },
  {
    id: '43737JHJIIHUH353847637JGFGHJ',
    name: 'Chelsea Headhunters',
    uri: 'https://www.logolynx.com/images/logolynx/83/838e2ca12d1899915a9f0811a4702184.jpeg',
    ultrasCount: 334827,
  },
  {
    id: '6567JNG6478GGK5737HJJ3636338GGK',
    name: 'Millwall Bushwackers',
    uri: 'https://ih1.redbubble.net/image.1855680265.4559/st,small,507x507-pad,600x600,f8f8f8.jpg',
    ultrasCount: 24827,
  },
];

const SearchItemContainer: React.FC<ISearchItemProps> = ({ searchItem, searchText }) => {
  const [data, setData] = React.useState<Array<any>>([]);

  function shuffle(array: Array<any>) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const getData = React.useCallback(() => {
    console.log(searchText);
    if (searchItem === 'all') {
      setData(
        shuffle([
          ...generateProfiles(6).map(x => {
            return { ...x, type: 'ultras' };
          }),
          ...clubsData.map(x => {
            return { ...x, type: 'clubs' };
          }),
          ...generateClubsList(5).map(x => {
            return { ...x, type: 'teams' };
          }),
          ...generateEvents(2).map(x => {
            return { ...x, type: 'events' };
          }),
        ])
      );
    } else if (searchItem === 'ultras') {
      setData(generateProfiles(20));
    } else if (searchItem === 'teams') {
      setData(generateClubsList(20));
    } else if (searchItem === 'clubs') {
      setData(clubsData);
    } else if (searchItem === 'events') {
      setData(generateEvents(5));
    }
  }, [searchItem, searchText]);

  React.useEffect(getData, [getData, searchText]);

  return <SearchItemComponent data={data} searchItem={searchItem} />;
};

export default SearchItemContainer;