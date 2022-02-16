import React, { useEffect } from 'react';

import { runTest as testUtilEnums } from './lib-tests/util-enums';
import { runTest as testUtilTimezone } from './lib-tests/util-timezone';
import { runTest as testSdkCountry } from './lib-tests/sdk-country';
import { runTest as testSdkCity } from './lib-tests/sdk-city';
import { runTest as testSdkVenue } from './lib-tests/sdk-venue';
import { runTest as testSdkTeam } from './lib-tests/sdk-team';
import { runTest as testSdkLeague } from './lib-tests/sdk-league';
import { runTest as testSdkMatch } from './lib-tests/sdk-match';
import { runTest as testSdkFanClub } from './lib-tests/sdk-fanClub';

function App() {
  useEffect(() => {
    testUtilEnums();
    testUtilTimezone();
    testSdkCountry();
    testSdkCity();
    testSdkVenue();
    testSdkTeam();
    testSdkLeague();
    testSdkMatch();
    testSdkFanClub();
  }, []);

  return <div className="App">Open console to see test results.</div>;
}

export default App;
