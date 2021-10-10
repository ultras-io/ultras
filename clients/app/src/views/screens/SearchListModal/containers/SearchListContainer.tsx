import React from 'react';
import I18n from 'i18n/i18n';

import SearchListComponent from '../components/SearchListComponent';
import {ISearchListContainerProps, keyEnum} from '../types';

const DATA = [
  {
    id: '1',
    title: 'Pizza',
  },
  {
    id: '2',
    title: 'Burger',
  },
  {
    id: '3',
    title: 'Risotto',
  },
  {
    id: '4',
    title: 'Coke',
  },
  {
    id: '5',
    title: 'Beer',
  },
  {
    id: '6',
    title: 'Water',
  },
  {
    id: '7',
    title: 'Cheese Cake',
  },
  {
    id: '8',
    title: 'Ice Cream',
  },
  {
    id: '9',
    title: 'Fried Shrimps',
  },
  {
    id: '10',
    title: 'French Fries',
  },
  {
    id: '11',
    title: 'Onion Rings',
  },
  {
    id: '21',
    title: 'Pizza',
  },
  {
    id: '22',
    title: 'Burger',
  },
  {
    id: '23',
    title: 'Risotto',
  },
  {
    id: '24',
    title: 'Coke',
  },
  {
    id: '25',
    title: 'Beer',
  },
  {
    id: '26',
    title: 'Water',
  },
  {
    id: '27',
    title: 'Cheese Cake',
  },
  {
    id: '28',
    title: 'Ice Cream',
  },
  {
    id: '29',
    title: 'Fried Shrimps',
  },
  {
    id: '20',
    title: 'French Fries',
  },
  {
    id: '31',
    title: 'Onion Rings',
  },
];

const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataKey,
  onClose,
}) => {
  let name = '';
  if (dataKey === keyEnum.Code) {
    name = I18n.t('country');
  } else if (dataKey === keyEnum.FootballClub) {
    name = I18n.t('fc');
  } else if (dataKey === keyEnum.NtionalTeam) {
    name = I18n.t('natioanlTeam');
  }

  // get related data

  return <SearchListComponent onClose={onClose} name={name} data={DATA} />;
};

export default React.memo<ISearchListContainerProps>(SearchListContainer);
