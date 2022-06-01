import React from 'react';
import { Text, Button, ScrollView, Box, VStack } from 'native-base';

const Section = ({ title, children }: any) => {
  return (
    <>
      <Text variant={'header'} fontSize="3xl" m={4}>
        {title}
      </Text>
      {children}
    </>
  );
};

const UIKit = () => {
  return (
    <Box safeArea>
      <ScrollView h="100%">
        <Section title={'Empty'}>
          <VStack space="2">
            <Button marginX={'10'} variant={'empty'}>
              Empty
            </Button>
            <Button marginX={'10'} variant={'empty'} isLoading>
              Link
            </Button>
            <Button marginX={'10'} variant={'empty'} disabled>
              Disabled
            </Button>
          </VStack>
        </Section>

        <Section title={'Primary'}>
          <VStack space="2">
            <Button marginX={'10'} variant={'primary'}>
              Let me in!
            </Button>
            <Button marginX={'10'} variant={'primary'} isLoading>
              Let me in!
            </Button>
            <Button marginX={'10'} variant={'primary'} disabled>
              Disabled
            </Button>
          </VStack>
        </Section>

        <Section title={'Secondary'}>
          <VStack space="2">
            <Button marginX={'10'} variant={'secondary'}>
              Response
            </Button>
            <Button marginX={'10'} variant={'secondary'} isLoading>
              Response
            </Button>
            <Button marginX={'10'} variant={'secondary'} disabled>
              Disabled
            </Button>
          </VStack>
        </Section>

        <Section title={'Action'}>
          <VStack space="2">
            <Button marginX={'10'} variant={'action'}>
              Response
            </Button>
            <Button marginX={'10'} variant={'action'} isLoading>
              Response
            </Button>
            <Button marginX={'10'} variant={'action'} disabled>
              Disabled
            </Button>
          </VStack>
        </Section>

        <Section title={'Action Invert'}>
          <VStack space="2">
            <Button marginX={'10'} variant={'actionInvert'}>
              Response
            </Button>
            <Button marginX={'10'} variant={'actionInvert'} isLoading>
              Response
            </Button>
            <Button marginX={'10'} variant={'actionInvert'} disabled>
              Disabled
            </Button>
          </VStack>
        </Section>
      </ScrollView>
    </Box>
  );
};

export default UIKit;
