import React from 'react';

import PostComponent from '../components/PostComponent';
import {generatePost} from 'utils/helpers/dummy';

import {IPostContainerProps} from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostContainer: React.FC<IPostContainerProps> = ({id}) => {
  // get Post's data by id

  const data = generatePost();

  return <PostComponent data={data} />;
};

export default PostContainer;
