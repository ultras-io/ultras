import React from 'react';
import { View, Pressable } from 'react-native';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import Divider, { TypeEnum as DividerType } from 'views/components/base/Divider';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';

import { IFanClubInfoProps } from './types';
import styles from './styles';

const FanClubInfo: React.FC<IFanClubInfoProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={data.avatar} size={AvatarSize.ExtraBig} />
        </View>
        <View style={styles.info}>
          <UltrasText color="tertiary" style={styles.name}>
            {data.name}
          </UltrasText>
          <View style={styles.line}>
            <Pressable
              onPress={() =>
                pushTo(commonScreens.profileList.name, { title: I18n.t('ultras') })
              }
            >
              <UltrasText color="secondaryText" style={styles.text}>
                {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
              </UltrasText>
            </Pressable>
            <View style={styles.divider}>
              <Divider />
            </View>
            <UltrasText color="secondaryText" style={styles.text}>
              {data.city.name}
            </UltrasText>
          </View>
          <Button
            title={data.team.name}
            onPress={() => pushTo(commonScreens.team.name, { data: data.team })}
            boxSize={ButtonBoxSize.Contain}
            appearance={ButtonAppearance.Minimal}
            color="secondaryText"
            icon={Icons.Team}
            iconPosition={ButtonIconPosition.Left}
          />
          <View style={styles.joinButton}>
            <Button
              title={I18n.t('fanClubJoin')}
              onPress={() => {}}
              color="textInvert"
              bgColor="bgColorInvert"
              icon={Icons.ArrowRightSquare}
              iconPosition={ButtonIconPosition.Left}
            />
          </View>
        </View>
      </View>
      <View style={styles.dividerH}>
        <Divider type={DividerType.Horizontal} bgColor={'quaternaryText'} />
      </View>
    </>
  );
};

export default React.memo<IFanClubInfoProps>(FanClubInfo);
