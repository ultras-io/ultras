import { PostTypeEnum } from '@ultras/utils';

import { UserViewModel } from './user';
import { FanClubViewModel } from './fanClub';
import { MatchViewModel } from './match';

export type PostViewModel = ViewModel<{
  type: PostTypeEnum;
  author: UserViewModel;
  match?: Nullable<MatchViewModel>;
  fanClub?: Nullable<FanClubViewModel>;
  title: string;
  content: string;
  image: Nullable<string>;
  catchesCount: number;
  commentsCount: number;
  joined?: boolean;
}>;

export type PostsViewModel = Array<PostViewModel>;
