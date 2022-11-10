import React from 'react';
import { Text, ScrollView, Box, VStack } from 'native-base';

const UIKit = () => {
  return (
    <Box safeArea>
      <ScrollView h="100%">
        <VStack space={'1'} p={'2'}>
          <Text variant={'logo'}>ultras</Text>
          <Text variant={'subTitle'}>Wacth Football</Text>
          <Text variant={'title'}>Select Team</Text>
          <Text variant={'message'}>Almost Done</Text>
          <Text variant={'smallText'}>
            You can always edit this info in profile section.
          </Text>
          <Text variant={'messageInvert'}>Ok, let me enter it</Text>
          <Text variant={'sectionTitle'}>Fan Clubs</Text>
          <Text variant={'smallTitle'}>First Armenian Front / FAF ultras</Text>
          <Text variant={'smallDescription'}>714 ultras</Text>
          <Text variant={'cardTime'}>Jul 11, Sat - 20:00</Text>
          <Text variant={'cardTitle'}>Watching Euro 2020 Final Together</Text>
          <Text variant={'cardStats'}>23 going, 10 maybe</Text>
          <Text variant={'cardPlace'}>Paulaner Beerhouse</Text>
          <Text variant={'cardInfo'}>
            Public Event by G. Brzęczyszczykiewicz, ForzaAzzurri
          </Text>
          <Text variant={'catch'}>234</Text>
          <Text variant={'matchLeagueInvert'}>Italy. Serie A</Text>
          <Text variant={'matchDateInvert'}>06 JUN</Text>
          <Text variant={'matchTimeInvert'}>23:45</Text>
          <Text variant={'matchTeamInvert'}>Bayer 04 Leverkusen</Text>
          <Text variant={'standard'}>
            Rome is one of the host cities, including for Italy’s three group stage
            matches and a quarter-final game on July 3rd.
          </Text>
          <Text variant={'info'}>4.5k ultras · Moscow {'\n'}Juventus FC</Text>
          <Text variant={'matchTeam'}>Juventus FC</Text>
          <Text variant={'matchLeague'}>Bundesliga</Text>
          <Text variant={'matchDate'}>25.03.22</Text>
          <Text variant={'matchTime'}>20:00</Text>
          <Text variant={'matchVenue'}>Stadion An der Alten Försterei</Text>
          <Text variant={'searchTitle'}>Chelsea FC</Text>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default UIKit;
