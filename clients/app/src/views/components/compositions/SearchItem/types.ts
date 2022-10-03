import { TeamViewModel, FanClubViewModel } from '@ultras/core-api-sdk';
export type SearchItem = 'teams' | 'fanClubs';

export interface ISearchItemProps {
  searchItem: SearchItem;
  searchText: string;
}

export interface ISearchItemComponentProps {
  loading: boolean;
  data: Array<TeamViewModel> | Array<FanClubViewModel>;
  searchItem: SearchItem;
  onEndReached?: () => void;
}
