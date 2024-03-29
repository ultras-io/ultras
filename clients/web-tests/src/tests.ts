// libs
import { runTest as testUtilEnums } from './lib-tests/util-enums';
import { runTest as testUtilValidation } from './lib-tests/util-validation';
import { runTest as testUtilTimezone } from './lib-tests/util-timezone';

// SDKs
import { runTest as testSdkCountry } from './lib-tests/sdk-country';
import { runTest as testSdkCity } from './lib-tests/sdk-city';
import { runTest as testSdkVenue } from './lib-tests/sdk-venue';
import { runTest as testSdkTeam } from './lib-tests/sdk-team';
import { runTest as testSdkFavoriteTeam } from './lib-tests/sdk-favoriteTeam';
import { runTest as testSdkLeague } from './lib-tests/sdk-league';
import { runTest as testSdkMatch } from './lib-tests/sdk-match';
import { runTest as testSdkFanClub } from './lib-tests/sdk-fanClub';
import { runTest as testSdkFanClubMembership } from './lib-tests/sdk-fanClub-membership';
import { runTest as testSdkAwsS3Upload } from './lib-tests/sdk-awsS3-upload';
import { runTest as testSdkAwsS3GetUrl } from './lib-tests/sdk-awsS3-getUrl';
import { runTest as testSdkEvent } from './lib-tests/sdk-event';
import { runTest as testSdkRoom } from './lib-tests/sdk-room';
import { runTest as testSdkUser } from './lib-tests/sdk-user';
import { runTest as testSdkCatch } from './lib-tests/sdk-catches';
import { runTest as testSdkComment } from './lib-tests/sdk-comments';

const tests = {
  // libs
  testUtilEnums,
  testUtilValidation,
  testUtilTimezone,

  // SDKs
  testSdkCountry,
  testSdkCity,
  testSdkVenue,
  testSdkTeam,
  testSdkFavoriteTeam,
  testSdkLeague,
  testSdkMatch,
  testSdkFanClub,
  testSdkFanClubMembership,
  testSdkAwsS3Upload,
  testSdkAwsS3GetUrl,
  testSdkEvent,
  testSdkRoom,
  testSdkUser,
  testSdkCatch,
  testSdkComment,
};

export default tests;
