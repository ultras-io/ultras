# `core-api-sdk`

> TODO: description

## Usage
It needs to specify Mode while creating the instance.

`dev` - will connect to the localhost:10001

`staging` - will connect to the staging server <apistaging.ultras.io>

`production` - Will connect to the production server <api.ultras.io>. Not specified yet
```
import { CountrySdk } from '@ultras/core-api-sdk';

const sdk = new CountrySdk('dev');

sdk.getCountries()
    ?.then(countries => {
      console.log(countries);
    })
    ?.catch(err => {
      console.error(err);
    });
```
