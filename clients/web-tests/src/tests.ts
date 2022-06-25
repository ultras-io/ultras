import { runTest as testUtilEnums } from './lib-tests/util-enums';
import { runTest as testUtilTimezone } from './lib-tests/util-timezone';
import { runTest as testSdkCountry } from './lib-tests/sdk-country';
import { runTest as testSdkCity } from './lib-tests/sdk-city';
import { runTest as testSdkVenue } from './lib-tests/sdk-venue';
import { runTest as testSdkTeam } from './lib-tests/sdk-team';
import { runTest as testSdkFavoriteTeam } from './lib-tests/sdk-favoriteTeam';
import { runTest as testSdkLeague } from './lib-tests/sdk-league';
import { runTest as testSdkMatch } from './lib-tests/sdk-match';
import { runTest as testSdkFanClub } from './lib-tests/sdk-fanClub';
import { runTest as testSdkFanClubMembership } from './lib-tests/sdk-fanClub-membership';
import { runTest as testSdkAwsS3 } from './lib-tests/sdk-awsS3';
import { runTest as testSdkEvent } from './lib-tests/sdk-event';
import { runTest as testSdkRoom } from './lib-tests/sdk-room';

const tests = {
  testUtilEnums,
  testUtilTimezone,
  testSdkCountry,
  testSdkCity,
  testSdkVenue,
  testSdkTeam,
  testSdkFavoriteTeam,
  testSdkLeague,
  testSdkMatch,
  testSdkFanClub,
  testSdkFanClubMembership,
  testSdkAwsS3,
  testSdkEvent,
  testSdkRoom,
};

export default tests;
