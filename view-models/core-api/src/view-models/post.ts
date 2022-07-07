import { PostTypeEnum } from '@ultras/utils';

import { UserViewModel } from './user';
import { FanClubViewModel } from './fanClub';
import { MatchViewModel } from './match';

export type PostViewModel = ViewModel<{
  type: PostTypeEnum;
  author: UserViewModel;
  match?: Nullable<MatchViewModel>;
  fanClub?: Nullable<FanClubViewModel>;
  image: string;
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
}>;

export type PostsViewModel = Array<PostViewModel>;
