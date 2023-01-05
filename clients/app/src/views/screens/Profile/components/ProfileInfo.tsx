import { AwsS3ThumbnailEnum } from '@ultras/utils';
import React from 'react';
import { HStack, VStack, Avatar, Text } from 'native-base';
import { useTheme } from 'themes';
import { getProfilePicture } from 'utils/helpers/image';

import { IProfileInfoProps } from '../types';

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const avatarURI = React.useMemo(() => {
    return getProfilePicture(AwsS3ThumbnailEnum.size64x64, data.avatar);
  }, [data.avatar]);

  const { colors } = useTheme();

  return (
    <HStack p={'5'} alignItems={'center'}>
      <Avatar
        size="av-lg"
        mr={5}
        bg={colors.iconPrimaryInvert}
        source={{ uri: avatarURI }}
      />
      <VStack>
        <Text variant={'profileTitle'}>{data.username}</Text>
        {data.fullname && <Text variant={'info'}>{data.fullname}</Text>}
      </VStack>
    </HStack>
  );
};

export default React.memo<IProfileInfoProps>(ProfileInfo);
