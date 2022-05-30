import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Text, Badge } from 'native-base';

import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';
import WithBadge from 'views/components/base/WithBadge';
import { IconNamesEnum as Icons } from 'assets/icons';

const Section = ({ title, children }: any) => {
  return (
    <>
      <Text variant={'header'}>{title}</Text>
      {children}
    </>
  );
};

const UIKit = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Section title={'Badge'}>
          <Badge variant={'notification'}>1</Badge>
          <Badge variant={'updates'}>300</Badge>

          <WithBadge variant={'notification'} number={2}>
            <Button
              onPress={() => {}}
              appearance={ButtonAppearance.Minimal}
              size={ButtonSize.ExtraBig}
              icon={Icons.Notifications}
            />
          </WithBadge>
        </Section>
        <Text variant={'primary'}>primary 123</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UIKit;
