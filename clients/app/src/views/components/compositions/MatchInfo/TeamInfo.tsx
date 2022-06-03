import React from 'react';
import { Circle, Image, Pressable, Text, VStack } from 'native-base';
import { useTheme } from 'themes';
import { ITeamInfoProps } from '../MatchCard/types';

const TeamInfo: React.FC<ITeamInfoProps> = ({ onPress, logo, name }) => {
  const { colors } = useTheme();

  return (
    <VStack pt={'1'} alignItems={'center'} flex={4}>
      <Pressable onPress={onPress}>
        <Circle size={'av-lg'} bg={colors.backgroundLogo}>
          <Image source={{ uri: logo }} size={'av-sm'} alt={name} />
        </Circle>
      </Pressable>
      <Text
        variant={'primary'}
        fontWeight={'600'}
        fontSize={'2xl'}
        lineHeight={'sm'}
        numberOfLines={2}
        letterSpacing={'-0.24'}
        mt={'2.5'}
        textAlign={'center'}
      >
        {name}
      </Text>
    </VStack>
  );
};

export default React.memo<ITeamInfoProps>(TeamInfo);
