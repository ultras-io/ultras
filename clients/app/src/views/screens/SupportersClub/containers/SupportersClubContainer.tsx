import React from 'react';

import SupportersClubComponent from '../components/SupportersClubComponent';

import {
  generateTeamName,
  generateSupportersClubName,
  generateCountry,
} from 'utils/helpers/dummy';

import { ISupportersClubContainerProps } from '../types';

const SupportersClubContainer: React.FC<ISupportersClubContainerProps> = ({ id }) => {
  // get club's data by id
  const data = {
    avatarUri:
      'https://ih1.redbubble.net/image.1855680265.4559/st,small,507x507-pad,600x600,f8f8f8.jpg',
    name: generateSupportersClubName(),
    ultrasCount: parseInt(Math.random() * 1000000 + 25),
    city: generateCountry(),
    team: {
      name: generateTeamName(),
      id: id + 'JHGFHJ45678765LKJHGFGHJ',
    },
    myStatus: 'join',
    feed: [
      {
        id: 'GHJK4543GHJ34543',
        type: 'post',
      },
      {
        id: 'TYUIUH6789876GHJKJHG678987',
        type: 'event',
      },
      {
        id: '234JHGHJKJHGH4543MNBGHJ',
        type: 'event',
      },
      {
        id: 'AIUYHJKN567876OIUHGHJ343',
        type: 'post',
      },
      {
        id: 'KJHGFGHJ567876578GHJHGHJHG',
        type: 'event',
      },
    ],
  };

  return <SupportersClubComponent data={data} />;
};

export default SupportersClubContainer;
