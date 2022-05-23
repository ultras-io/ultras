import { TeamViewModel, FanClubViewModel } from '@ultras/core-api-sdk';
export type SearchItem = 'teams' | 'fanClubs';

export interface ISearchItemProps {
  searchItem: SearchItem;
  searchText: string;
}

export interface ISearchItemComponentProps {
  data: Array<TeamViewModel | FanClubViewModel>;
  searchItem: SearchItem;
  onEndReached?: () => void;
}
