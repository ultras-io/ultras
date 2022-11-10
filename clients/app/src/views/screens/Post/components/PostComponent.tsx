import React from 'react';

// import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import { commonScreens } from 'navigation/screens';

import PostInfo from 'views/components/compositions/PostInfo';

import { IPostComponentProps } from '../types';

const PostComponent: React.FC<IPostComponentProps> = ({ data }) => {
  // const {setOptions, pushTo} = useNavigationWithParams();

  return (
    <PostInfo
      imageUri={data.imageUri}
      date={data.date}
      title={data.title}
      content={data.content}
      catchesCount={data.catchesCount}
      commentsCount={data.commentsCount}
      creator={data.creator}
      supportersClub={data.supportersClub}
      isCaught={data.isCaught}
    />
  );
};

export default PostComponent;
