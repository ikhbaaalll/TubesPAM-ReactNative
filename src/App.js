// In App.js in a new project

import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ColorPrimary, ColorSecondary} from './utils/constanta';
import Route from './Route';

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={ColorPrimary} />
      <Route />
    </NavigationContainer>
  );
}

export default App;
