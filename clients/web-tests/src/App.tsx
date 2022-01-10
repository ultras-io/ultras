import React, { useEffect } from 'react';

import { runTest as testEnums } from './lib-tests/enums';
import { runTest as testSdkCountry } from './lib-tests/sdk-country';
import { runTest as testSdkCity } from './lib-tests/sdk-city';
import { runTest as testSdkVenue } from './lib-tests/sdk-venue';
import { runTest as testSdkTeam } from './lib-tests/sdk-team';
import { runTest as testSdkLeague } from './lib-tests/sdk-league';

function App() {
  useEffect(() => {
    testEnums();
    testSdkCountry();
    testSdkCity();
    testSdkVenue();
    testSdkTeam();
    testSdkLeague();
  }, []);

  return <div className="App">Open console to see test results.</div>;
}

export default App;
