import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './utils';
import {SCREENS} from './screens';
import {Login} from '../screens/Login';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.LOGIN}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

const linking = {
  prefixes: [],
  config: {
    screens: {
      [SCREENS.LOGIN]: 'login',
    },
  },
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
