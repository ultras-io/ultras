import React from 'react';
import logo from './logo.svg';
import './App.css';

import { CountrySdk, CitySdk, VenueSdk } from '@ultras/core-api-sdk';

const sdkCountry = new CountrySdk('dev');
const sdkCity = new CitySdk('dev');
const sdkVenue = new VenueSdk('dev');

function App() {
  React.useEffect(() => {
    sdkCountry
      .getCountries()
      ?.then((countries: any) => {
        console.log('response of sdkCountry.getCountries():', countries);
      })
      ?.catch((err: any) => {
        console.error('result of sdkCountry.getCountries():', err);
      });

    sdkCity
      .getCities({ countryId: 6 })
      ?.then((cities: any) => {
        console.log('response of sdkCity.getCities({ countryId: 6 }):', cities);
      })
      ?.catch((err: any) => {
        console.error('result of sdkCity.getCities({ countryId: 6 }):', err);
      });

    sdkVenue
      .getVenues({ countryId: 328, name: 'arena' })
      ?.then((cities: any) => {
        console.log('response of sdkVenue.getVenues({ countryId: 328, name: \'arena\' }):', cities);
      })
      ?.catch((err: any) => {
        console.error('result of sdkVenue.getVenues({ countryId: 328, name: \'arena\' }):', err);
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
