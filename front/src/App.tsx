import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AppNavigator} from './navigators/AppNavigator';
import './assets/fonts/fonts.css';
import {NativeBaseProvider} from 'native-base';
import {customTheme, themeConfig} from './constants/theme';
import {queryClient, QueryClientProvider} from './utils/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={customTheme} config={themeConfig}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppNavigator />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
