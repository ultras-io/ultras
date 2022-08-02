import React from 'react';
import { Circle, Image, Pressable, Text, VStack } from 'native-base';
import { useTheme } from 'themes';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { ITeamInfoProps } from '../MatchCard/types';

const TeamInfo: React.FC<ITeamInfoProps> = ({ onPress, logo, name }) => {
  const { colors } = useTheme();

  return (
    <VStack pt={'1'} alignItems={'center'} flex={4}>
      <Pressable onPress={preventMultiCalls(() => onPress())}>
        <Circle size={'av-lg'} bg={colors.backgroundLogo}>
          <Image source={{ uri: logo }} size={'av-sm'} alt={name} />
        </Circle>
      </Pressable>
      <Text
        variant={'matchTeam'}
        textAlign={'center'}
        lineHeight={'sm'}
        numberOfLines={2}
        mt={'2.5'}
      >
        {name}
      </Text>
    </VStack>
  );
};

export default React.memo<ITeamInfoProps>(TeamInfo);
