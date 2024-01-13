import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from '../../molecules/loading';
import AuthStack from '../2-auth_stack';
import HomeStack from '../3-home_stack';
import BookingsDetail from '../../molecules/bookings-detail';

function MainStack() {
  const Stack = createStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUID, setUserUID] = useState('');

  const [pickedRider, setPickedRider] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Loading">
          {props => <Loading {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AuthStack">
          {props => (
            <AuthStack setIsLoggedIn={setIsLoggedIn} setUserUID={setUserUID} />
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeStack">
          {props => (
            <HomeStack
              {...props}
              isLoggedIn={isLoggedIn}
              userUID={userUID}
              setPickedRider={setPickedRider}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="BookingsDetail">
          {props => <BookingsDetail {...props} pickedRider={pickedRider} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
