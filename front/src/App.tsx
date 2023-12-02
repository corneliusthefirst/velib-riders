import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {AppNavigator} from './navigators/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
