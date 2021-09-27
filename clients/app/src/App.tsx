import React from 'react';

// import {Provider} from 'react-redux';
// import store from './store';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/root/rootNavigation';

const App = () => {
  return (
    // <Provider store={null}>

    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>

    // </Provider>
  );
};

export default App;
