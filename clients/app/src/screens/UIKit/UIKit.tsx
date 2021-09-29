import React from 'react';
import {ScrollView, Text, Alert} from 'react-native';

import Button, {
  Size as ButtonSize,
  Color as ButtonColor,
  Appearance as ButtonAppearance,
  IconPosition as ButtonIconPosition,
} from 'components/base/Button';

import {IconNames} from '../../assets/icons';

import {IUIKitProps} from './types';
import styles from './styles';

const UIKit: React.FC<IUIKitProps> = () => {
  const log = () => {
    Alert.alert('Pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>UI Kit</Text>
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
