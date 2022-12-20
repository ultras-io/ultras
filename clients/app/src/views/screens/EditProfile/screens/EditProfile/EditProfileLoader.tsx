import React from 'react';
import { Box, Center, Skeleton } from 'native-base';

const EditProfileLoader: React.FC = () => {
  return (
    <Box paddingY={3} paddingX={4}>
      <Center>
        <Skeleton size={136} rounded="full" marginBottom={4} />
        <Skeleton height={3} rounded="lg" width={20} marginBottom={6} />
        <Skeleton height={5} rounded="lg" width={40} />
      </Center>

      <Center marginTop={5}>
        <Skeleton marginBottom={0.5} height={75} roundedTop={'2xl'} />
        <Skeleton marginBottom={0.5} height={75} />
        <Skeleton marginBottom={0.5} height={75} roundedBottom={'2xl'} />
      </Center>

      <Center marginTop={3}>
        <Skeleton.Text lines={3} space={1} />
      </Center>
    </Box>
  );
};

export default EditProfileLoader;
