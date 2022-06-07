import React from 'react';
import Container from 'views/components/base/Container';
import { IPostProps } from './types';
// import PostContainer from './containers/PostContainer';
const PostContainer = React.lazy(() => import('./containers/PostContainer'));

const Post: React.FC<IPostProps> = ({ route }) => {
  const { id } = route.params;

  return (
    <Container withSuspense>
      <PostContainer id={id} />
    </Container>
  );
};

export default Post;
