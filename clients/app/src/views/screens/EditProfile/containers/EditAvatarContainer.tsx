import React from 'react';
import { Box, Center, Text } from 'native-base';
import { IEditAvatarContainerProps } from './types';
import EditAvatarComponent from '../components/EditAvatarComponent';

const EditAvatarContainer: React.FC<IEditAvatarContainerProps> = ({ data }) => {
  return (
    <Box padding={2}>
      <EditAvatarComponent avatar={data.avatar} />

      <Center marginTop={5}>
        <Text variant={'sectionTitle'}>{data.username}</Text>
      </Center>
    </Box>
  );
};

export default EditAvatarContainer;
