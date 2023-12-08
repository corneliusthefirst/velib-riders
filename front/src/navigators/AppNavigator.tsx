import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './utils';
import {SCREENS} from './screens';
import {lazy, Suspense} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../constants/colors';
import CustomImageBackground from '../components/CustomImageBackground';
import backgroundImage from '../assets/images/app-background.png';

const Login = lazy(() => import('../screens/Login'));
const Signup = lazy(() => import('../screens/Signup'));
const Home = lazy(() => import('../screens/Home'));

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Suspense
      fallback={
        <CustomImageBackground source={{uri: backgroundImage}}>
          <View style={[styles.suspenseFallback]}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        </CustomImageBackground>
      }>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREENS.LOGIN}>
        <Stack.Screen name={SCREENS.HOME} component={Home} />
        <Stack.Screen name={SCREENS.LOGIN} component={Login} />
        <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
      </Stack.Navigator>
    </Suspense>
  );
};

// configuration for deep linking
const linking = {
  prefixes: [],
  config: {
    screens: {
      [SCREENS.LOGIN]: 'login',
      [SCREENS.SIGNUP]: 'signup',
      [SCREENS.HOME]: 'home',
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

const styles = StyleSheet.create({
  suspenseFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
