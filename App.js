import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Route from './src/navigation/Route';
import {NavigationContainer} from '@react-navigation/native';
import {COLORX} from './src/constants/AppConstants';
import {requestUserPermission,notificationListner} from './src/utils/NotificationService';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="orange" hidden={false} />
      <Route />
    </NavigationContainer>
    // <Maps/>
  );
};

export default App;
