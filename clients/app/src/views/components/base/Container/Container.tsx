import React from 'react';
import { Box } from 'native-base';
import Bg from 'views/components/base/Bg';
import Loader from 'views/screens/Loader';
import { IContainerProps } from './types';

const Container: React.FC<IContainerProps> = ({
  children,
  withSuspense = false,
  withBg = false,
  bgSize = 'md',
}) => {
  const content = withSuspense ? (
    <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
  ) : (
    <>children</>
  );

  return withBg ? (
    <Box h={'full'} overflow={'hidden'}>
      <Bg size={bgSize} />
      {content}
    </Box>
  ) : (
    content
  );
};

export default React.memo<IContainerProps>(Container);
