import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthSignUp from '../../molecules/auth-signup';
import AuthSignIn from '../../molecules/auth-signin';

// @ts-ignore
function AuthStack({setProfile, setUserUID}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp">
        {props => <AuthSignUp {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SignIn">
        {props => (
          <AuthSignIn
            {...props}
            setProfile={setProfile}
            setUserUID={setUserUID}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthStack;
