import React from 'react';
import {View, FlatList} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Input from 'views/components/base/Input';
import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

import {ISearchListModalProps, keyEnum} from './types';
import styles from './styles';

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

const SearchListModal: React.FC<ISearchListModalProps> = ({route}) => {
  const {goBack} = useNavigationWithParams();
  const {key} = route.params;

  let name = '';
  if (key === keyEnum.Code) {
    name = 'Country';
  } else if (key === keyEnum.FootballClub) {
    name = 'Football Club';
  } else if (key === keyEnum.NtionalTeam) {
    name = 'Natioanl Team';
  }

  // get related data
  // show in group list
  // implemet search

  const renderRow = ({item}) => (
    <View style={styles.row}>
      <UltrasText style={styles.text}>{item.title}</UltrasText>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Input name={name} />
        </View>
        <View style={styles.cancelButton}>
          <Button
            appearance={ButtonAppearance.Minimal}
            size={ButtonSize.Small}
            title={'Cancel'}
            onPress={goBack}
          />
        </View>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRow}
      />
    </View>
  );
};

export default React.memo<ISearchListModalProps>(SearchListModal);
