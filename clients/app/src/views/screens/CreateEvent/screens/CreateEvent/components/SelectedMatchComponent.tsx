import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Divider, HStack, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import buildMatchesStore from 'stores/matches';
import { InputSection } from 'views/components/base/InputSection';
import { RemoveButton } from 'views/components/base/RemoveButton';
import MatchInfo from 'views/components/compositions/MatchInfo';
import { ISelectedMatchProps } from '../types';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { createEventScreens } from 'views/navigation/screens';

const store = buildMatchesStore();

const SelectedMatchComponent: React.FC<ISelectedMatchProps> = ({
  matchId,
  onRemoveMatchPress,
}) => {
  const navigation = useNavigationWithParams();

  const { colors } = useTheme();
  const { single: storeSingle } = store.useSelector('single');

  React.useEffect(() => {
    storeSingle.getSingle(matchId);
  }, [matchId, storeSingle]);

  if (!matchId) {
    return null;
  }

  return (
    <InputSection>
      {storeSingle.status === 'success' ? (
        <>
          <HStack alignItems="center" space="2" paddingY="2" paddingX="4">
            <RemoveButton onPress={onRemoveMatchPress} />
            <Text variant="messageInvert">{I18n.t('events-add-relatedMatch')}</Text>

            <Text
              variant="matchDate"
              marginLeft="auto"
              onPress={() => {
                navigation.pushTo(createEventScreens.selectMatch.name);
              }}
            >
              {I18n.t('events-add-changeMatch')}
            </Text>
          </HStack>

          <Divider
            bgColor={colors.backgroundDividerTransparent}
            thickness={1}
            marginLeft="4"
          />

          <MatchInfo data={storeSingle.data!} />
        </>
      ) : (
        <>
          {storeSingle.status === 'loading' ? (
            <Box paddingY="10" paddingX="4">
              <ActivityIndicator />
            </Box>
          ) : (
            <Box padding="4" alignItems="center">
              <Text fontSize="4xl" color={colors.iconNotification}>
                {I18n.t('events-add-matchLoadFail')}
              </Text>
            </Box>
          )}
        </>
      )}
    </InputSection>
  );
};

export default SelectedMatchComponent;
