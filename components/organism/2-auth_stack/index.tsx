import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthSignin from '../../molecules/auth-signin';
import AuthSignup from '../../molecules/auth-signup';

// @ts-ignore
function AuthStack({navigation}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn">
        {props => <AuthSignin {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {props => <AuthSignup {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthStack;
