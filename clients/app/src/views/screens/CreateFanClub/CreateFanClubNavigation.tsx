import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFanClub from './screens/CreateFanClub';
import SelectTeam from './screens/SelectTeam';
import SelectCity from './screens/SelectCity';
import { IScreenType, ICreateFanClubNavigationProps } from './types';

const Stack = createNativeStackNavigator();

const screens: Array<IScreenType> = [
  {
    name: 'CreateFanClub',
    component: CreateFanClub,
  },
  {
    name: 'SelectTeam',
    component: SelectTeam,
  },
  {
    name: 'SelectCity',
    component: SelectCity,
  },
];

const CreateFanClubNavigation: React.FC<ICreateFanClubNavigationProps> = ({ route }) => {
  const teamId = route?.params?.teamId || null;
  const tabName = route?.params?.tabName || null;

  return (
    <Stack.Navigator
      initialRouteName={`${tabName}:CreateFanClub`}
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(item => (
        <Stack.Screen
          key={`${tabName}:${item.name}`}
          name={`${tabName}:${item.name}`}
          component={item.component}
          initialParams={{ tabName, teamId }}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default React.memo<ICreateFanClubNavigationProps>(CreateFanClubNavigation);
