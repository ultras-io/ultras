import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import PostContainer from './containers/PostContainer';

import {IPostProps} from './types';

const Post: React.FC<IPostProps> = ({route}) => {
  const {id} = route.params;

  return (
    <WithSafeArea>
      <PostContainer id={id} />
    </WithSafeArea>
  );
};

export default Post;
