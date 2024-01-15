import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from '../../molecules/loading';
import Fallback from '../../molecules/fallback';
import AuthStack from '../2-auth_stack';
import HomeStack from '../3-home_stack';
import BookingsDetail from '../../molecules/bookings-detail';
import AdminStack from '../4-admin_stack';

function MainStack() {
  const Stack = createStackNavigator();

  const [profile, setProfile] = useState([]);
  const [userUID, setUserUID] = useState('');

  // Commuter
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
            <AuthStack setProfile={setProfile} setUserUID={setUserUID} />
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeStack">
          {props =>
            profile.isVerified && profile.isVerified !== undefined ? (
              <HomeStack
                {...props}
                userUID={userUID}
                setPickedRider={setPickedRider}
              />
            ) : (
              <Fallback {...props} />
            )
          }
        </Stack.Screen>
        <Stack.Screen name="AdminStack">
          {props => <AdminStack {...props} />}
        </Stack.Screen>
        <Stack.Screen name="BookingsDetail">
          {props => <BookingsDetail {...props} pickedRider={pickedRider} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
