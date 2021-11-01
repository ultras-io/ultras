export type SearchItem = 'ultras' | 'events' | 'clubs' | 'teams';

export interface ISearchItemProps {
  searchItem: SearchItem;
  searchText: string;
}

export interface ISearchItemComponentProps {
  data: Array<any>; //@TODO
  searchItem: SearchItem;
  onEndReached?: () => void;
}
