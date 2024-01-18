import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from '../../molecules/loading';
import Fallback from '../../molecules/fallback';
import BookingsDetail from '../../molecules/bookings-detail';

import AuthStack from '../2-auth_stack';
import HomeStack from '../3-home_stack';
import AdminStack from '../4-admin_stack';

function MainStack() {
  const Stack = createStackNavigator();

  const [userUID, setUserUID] = useState('');

  const [profile, setProfile] = useState([]);
  const [riderProfile, setRiderProfile] = useState([]);

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
          {() => <AuthStack setProfile={setProfile} setUserUID={setUserUID} />}
        </Stack.Screen>
        <Stack.Screen name="HomeStack">
          {props =>
            // @ts-ignore
            profile.isVerified && profile.isVerified !== undefined ? (
              <HomeStack
                {...props}
                userUID={userUID}
                profile={profile}
                setRiderProfile={setRiderProfile}
              />
            ) : (
              <Fallback {...props} />
            )
          }
        </Stack.Screen>
        <Stack.Screen name="AdminStack">
          {props => <AdminStack {...props} userUID={userUID} />}
        </Stack.Screen>
        <Stack.Screen name="BookingsDetail">
          {props => (
            <BookingsDetail
              {...props}
              userUID={userUID}
              profile={profile}
              riderProfile={riderProfile}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
