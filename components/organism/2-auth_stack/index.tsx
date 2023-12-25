import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthSignUp from '../../molecules/auth-signup';
import AuthSignIn from '../../molecules/auth-signin';

// @ts-ignore
function AuthStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp">
        {props => <AuthSignUp {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SignIn">
        {props => <AuthSignIn {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthStack;
