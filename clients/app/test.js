const countrySdk = requrie('@ultras/core-api-sdk');

const countrySdk = new CountrySdk('development');

countrySdk
  .getCountries()
  .then(countries => {
    console.log(countries);
  })
  .catch(err => {
    console.error(err);
  });
