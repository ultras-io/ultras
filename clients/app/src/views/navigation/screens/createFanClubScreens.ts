import type { ICreateFanClubScreen } from '../types';
import CreateFanClub from 'views/screens/CreateFanClub/screens/CreateFanClub';
import SelectCity from 'views/screens/CreateFanClub/screens/SelectCity';
import SearchListModal from 'views/screens/SearchListModal';

const screens: ICreateFanClubScreen = {
  createFanClub: {
    name: 'CreateFanClubForm',
    component: CreateFanClub,
  },
  selectCity: {
    name: 'SelectCity',
    component: SelectCity,
  },
  selectTeam: {
    name: 'SearchList',
    component: SearchListModal,
  },
};

export default screens;
