import React from 'react';
import {ScrollView, Text, Alert, View} from 'react-native';

import Button, {
  Size as ButtonSize,
  Color as ButtonColor,
  Appearance as ButtonAppearance,
  IconPosition as ButtonIconPosition,
} from 'components/base/Button';

import Avatar, {Size as AvatarSize} from 'components/base/Avatar';
import {
  WithBadge,
  Size as BadgeSize,
  Color as BadgeColor,
} from 'components/base/Badge';

import {IconNames} from '../../assets/icons';

import Divider, {Type as DividerType} from 'components/base/Divider';

import {IUIKitProps} from './types';
import styles from './styles';

const avatarUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/209318028_231713268577743_6245281435767734030_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=CuBw9LjriNAAX_0cPDD&tn=sKVAP798p6JBPzPQ&edm=ABfd0MgBAAAA&ccb=7-4&oh=5b4b8b1067c81b0c520646486b6b7e14&oe=615C0585&_nc_sid=7bff83';

const romanoUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/12825782_1686181148337278_445906028_a.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=Q9nDcP7Z4YIAX9gwwyh&edm=ABfd0MgBAAAA&ccb=7-4&oh=0ff24f917679ad4938224419cb9eb7fa&oe=615C57F1&_nc_sid=7bff83';

const rlUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/241823380_830172197641351_4125620187399622783_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=4pv9H9K5NFsAX9XKPs0&edm=ABfd0MgBAAAA&ccb=7-4&oh=c2de87fdbf6ca2f34e4acb2f41f16294&oe=615B54E6&_nc_sid=7bff83';

const UIKit: React.FC<IUIKitProps> = () => {
  const log = () => {
    Alert.alert('Pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>UI Kit</Text>

      <Text style={styles.subTitle}>Divider</Text>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text>Some Text</Text>
        </View>
        <View style={styles.rowItem}>
          <Divider />
        </View>
        <View style={styles.rowItem}>
          <Text>Another One</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Divider type={DividerType.Horizontal} />
        <Text>28.08.21</Text>
        <Text>20:30</Text>
        <Divider type={DividerType.Horizontal} />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text>Lorem Ipsum</Text>
        </View>
        <View style={styles.rowItem}>
          <Divider type={DividerType.Vertical} />
        </View>
        <View style={styles.rowItem}>
          <Text>Dolor Sit</Text>
        </View>
      </View>

      <Text style={styles.subTitle}>Avatar & Badge</Text>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <WithBadge number={24} size={BadgeSize.Big} color={BadgeColor.Danger}>
            <Avatar uri={avatarUri} size={AvatarSize.Big} />
          </WithBadge>
        </View>
        <View style={styles.rowItem}>
          <WithBadge
            number={43768}
            size={BadgeSize.Big}
            color={BadgeColor.Primary}>
            <Avatar uri={romanoUri} size={AvatarSize.Big} />
          </WithBadge>
        </View>
        <View style={styles.rowItem}>
          <WithBadge number={54} size={BadgeSize.Small}>
            <Avatar uri={rlUri} />
          </WithBadge>
        </View>
        <View style={styles.rowItem}>
          <Avatar uri={rlUri} size={AvatarSize.Small} />
        </View>
      </View>

      <Text style={styles.subTitle}>Button</Text>
      <Text style={styles.section}>Sizes</Text>
      <>
        <Button title="Join Us" onPress={log} size={ButtonSize.Small} />
        <Button title="Join Us" onPress={log} size={ButtonSize.Default} />
        <Button
          title="Push Join Us Here Extra Long"
          onPress={log}
          size={ButtonSize.Big}
        />
      </>
      <Text style={styles.section}>Colors</Text>
      <>
        <Button title="Join Us" onPress={log} color={ButtonColor.Primary} />
        <Button title="Join Us" onPress={log} color={ButtonColor.Danger} />
        <Button title="Huhu" onPress={log} color={ButtonColor.Secondary} />
        <Button title="Huhu" onPress={log} color={ButtonColor.Default} />
      </>
      <Text style={styles.section}>Appearance</Text>
      <>
        <Button
          title="Join Us"
          onPress={log}
          appearance={ButtonAppearance.Minimal}
        />
        <Button
          title="Join Us"
          onPress={log}
          appearance={ButtonAppearance.Default}
        />
        <Button
          title="Push Join Us Here Extra Long"
          onPress={log}
          appearance={ButtonAppearance.Outline}
        />
      </>
      <Text style={styles.section}>Icon</Text>
      <>
        <Button onPress={log} icon={IconNames.Hearth} size={ButtonSize.Small} />
        <Button
          onPress={log}
          icon={IconNames.Hearth}
          color={ButtonColor.Danger}
        />
        <Button
          onPress={log}
          icon={IconNames.Hearth}
          size={ButtonSize.Big}
          color={ButtonColor.Primary}
        />
        <Button
          title="Going"
          onPress={log}
          size={ButtonSize.Small}
          icon={IconNames.Hearth}
          iconPosition={ButtonIconPosition.Left}
          color={ButtonColor.Secondary}
        />
        <Button
          title="Love"
          onPress={log}
          icon={IconNames.Hearth}
          color={ButtonColor.Primary}
        />
        <Button
          title="Love"
          onPress={log}
          icon={IconNames.Hearth}
          iconPosition={ButtonIconPosition.Left}
          size={ButtonSize.Big}
        />
      </>
      <Text style={styles.section}>Loading, Disabled</Text>
      <>
        <Button title="Go" onPress={log} isLoading />
        <Button title="Home" onPress={log} isLoading size={ButtonSize.Small} />
        <Button
          title="Love"
          onPress={log}
          isDisabled
          icon={IconNames.Hearth}
          iconPosition={ButtonIconPosition.Left}
          size={ButtonSize.Big}
        />
      </>
    </ScrollView>
  );
};

export default UIKit;
