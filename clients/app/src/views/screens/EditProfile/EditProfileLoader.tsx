import React from 'react';
import { Box, Center, Skeleton } from 'native-base';

const EditProfileLoader: React.FC = () => {
  return (
    <Box paddingY={2} paddingX={3}>
      <Center>
        <Skeleton size={136} rounded="full" marginBottom={3} />
        <Skeleton height={3} width={20} marginBottom={5} />
        <Skeleton height={5} width={40} />
      </Center>

      <Center marginTop={5}>
        <Skeleton marginBottom={0.5} height={50} roundedTop={'2xl'} />
        <Skeleton marginBottom={0.5} height={50} />
        <Skeleton marginBottom={0.5} height={50} roundedBottom={'2xl'} />
      </Center>

      <Center marginTop={6}>
        <Skeleton.Text lines={3} />
      </Center>

      <Center marginTop={20}>
        <Skeleton height={12} width="full" rounded="2xl" />
      </Center>
    </Box>
  );
};

export default EditProfileLoader;
