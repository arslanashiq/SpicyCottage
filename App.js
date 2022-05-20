import React from 'react';
import {StatusBar} from 'react-native';
import Route from './src/navigation/Route';
import {NavigationContainer} from '@react-navigation/native';
import { COLORX } from './src/constants/AppConstants';
import Maps from './src/screens/Maps';

const App = () => {
  
  return (
      <NavigationContainer>
        <StatusBar backgroundColor="orange" hidden={false} />
        <Route />
      </NavigationContainer>
      // <Maps/>

    );
};

export default App;
