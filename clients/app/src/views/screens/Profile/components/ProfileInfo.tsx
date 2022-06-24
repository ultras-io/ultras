import React from 'react';
import { HStack, VStack, Avatar, Text } from 'native-base';
import { useTheme } from 'themes';

import { IProfileInfoProps } from '../types';

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <HStack p={'5'} alignItems={'center'}>
      <Avatar
        size="av-lg"
        mr={5}
        bg={colors.iconPrimaryInvert}
        source={{ uri: data.avatar! }}
      />
      <VStack>
        <Text variant={'profileTitle'}>{data.username}</Text>
        {data.fullname && <Text variant={'info'}>{data.fullname}</Text>}
      </VStack>
    </HStack>
  );
};

export default React.memo<IProfileInfoProps>(ProfileInfo);
