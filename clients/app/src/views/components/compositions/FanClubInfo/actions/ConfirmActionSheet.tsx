import React from 'react';
import { Actionsheet, Center, Text } from 'native-base';
import { useTheme } from 'themes';

interface IButton {
  text: string;
  onPress(): void;
}

interface IConfirmActionSheetProps {
  title: string;
  isOpen: boolean;
  buttons: Array<IButton>;
  onCancel(): void;
}

const ConfirmActionSheet: React.FC<IConfirmActionSheetProps> = ({
  title,
  isOpen,
  buttons,
  onCancel,
}) => {
  const { colors } = useTheme();

  return (
    <Actionsheet isOpen={isOpen} onClose={onCancel}>
      <Actionsheet.Content>
        <Center
          borderBottomWidth={'0.5'}
          borderColor={colors.backgroundCard}
          paddingTop={3}
          paddingBottom={10}
          width="full"
        >
          <Text variant={'matchTime'}>{title}</Text>
        </Center>

        {buttons.map((button: IButton, index: number) => (
          <Actionsheet.Item
            key={`action-button-${index}-${button.text}`}
            alignItems="center"
            onPress={button.onPress}
          >
            {button.text}
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ConfirmActionSheet;
