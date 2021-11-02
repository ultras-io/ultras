export type SearchItem = 'all' | 'ultras' | 'events' | 'clubs' | 'teams';

export interface ISearchItemProps {
  searchItem: SearchItem;
  searchText: string;
}

export interface ISearchItemComponentProps {
  data: Array<any>; //@TODO
  searchItem: SearchItem;
  onEndReached?: () => void;
}
