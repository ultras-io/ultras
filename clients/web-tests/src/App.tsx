import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { CountrySdk, CitySdk, VenueSdk, TeamSdk } from '@ultras/core-api-sdk';
import { TeamTypes, MatchStatuses } from '@ultras/utils';

const sdkCountry = new CountrySdk('dev');
const sdkCity = new CitySdk('dev');
const sdkVenue = new VenueSdk('dev');
const sdkTeam = new TeamSdk('dev');

function App() {
  useEffect(() => {
    // sdkCountry
    //   .getCountries()
    //   ?.then((countries: any) => {
    //     console.log('response of sdkCountry.getCountries():', countries);
    //   })
    //   ?.catch((err: any) => {
    //     console.error('result of sdkCountry.getCountries():', err);
    //   });

    // sdkCity
    //   .getCities({ countryId: 6 })
    //   ?.then((cities: any) => {
    //     console.log('response of sdkCity.getCities({ countryId: 6 }):', cities);
    //   })
    //   ?.catch((err: any) => {
    //     console.error('result of sdkCity.getCities({ countryId: 6 }):', err);
    //   });

    // sdkVenue
    //   .getVenues({ countryId: 328, name: 'arena' })
    //   ?.then((venues: any) => {
    //     console.log(
    //       "response of sdkVenue.getVenues({ countryId: 328, name: 'arena' }):",
    //       venues,
    //     );
    //   })
    //   ?.catch((err: any) => {
    //     console.error(
    //       "result of sdkVenue.getVenues({ countryId: 328, name: 'arena' }):",
    //       err,
    //     );
    //   });

    // sdkTeam
    //   .getTeams({ cityId: 61 })
    //   ?.then((teams: any) => {
    //     console.log('response of sdkTeam.getTeams({ cityId: 61 }):', teams);
    //   })
    //   ?.catch((err: any) => {
    //     console.error('result of sdkTeam.getTeams({ cityId: 61 }):', err);
    //   });

    console.log("enums:", {
      TeamTypes,
      teamNational: TeamTypes.national,
      MatchStatuses,
      matchHalfTime: MatchStatuses.halfTime,
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
