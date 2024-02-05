import React, {useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from '../../molecules/loading';
import BookingsDetail from '../../molecules/bookings-detail';
import FallbackUnverified from '../../molecules/fallback-unverified';
import FallbackInternet from '../../molecules/fallback-internet';

import AuthStack from '../2-auth_stack';
import HomeStack from '../3-home_stack';
import AdminStack from '../4-admin_stack';

import firestore from '@react-native-firebase/firestore';

function MainStack() {
  const netInfo = useNetInfo();

  const Stack = createStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Global
  const [userUID, setUserUID] = useState('');

  // UIDs
  const [driverUID, setDriverUID] = useState('');

  // Commuter Hooks
  const [profile, setProfile] = useState([]);
  const [riderProfile, setRiderProfile] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const refetchProfile = async () => {
    try {
      const userDocument = await firestore()
        .collection('Users')
        .doc(userUID)
        .get();

      if (userDocument.exists) {
        const userData = userDocument.data();
        // @ts-ignore
        setProfile(userData);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.log('Error Fetching Profile');
    }
  };

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
          {() => (
            <AuthStack
              setProfile={setProfile}
              setUserUID={setUserUID}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeStack">
          {props =>
            // @ts-ignore
            !netInfo.isConnected ? (
              <FallbackInternet />
            ) : profile.isVerified &&
              profile.isVerified !== undefined &&
              isLoggedIn ? (
              <HomeStack
                {...props}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userUID={userUID}
                driverUID={driverUID}
                redirect={redirect}
                setRedirect={setRedirect}
                profile={profile}
                setProfile={setProfile}
                refetchProfile={refetchProfile}
                setDriverUID={setDriverUID}
                riderProfile={riderProfile}
                setRiderProfile={setRiderProfile}
              />
            ) : (
              <FallbackUnverified {...props} />
            )
          }
        </Stack.Screen>
        <Stack.Screen name="AdminStack">
          {props =>
            // @ts-ignore
            !netInfo.isConnected ? (
              <FallbackInternet />
            ) : (
              <AdminStack
                {...props}
                userUID={userUID}
                profile={profile}
                refetchProfile={refetchProfile}
              />
            )
          }
        </Stack.Screen>
        <Stack.Screen name="BookingsDetail">
          {props => (
            <BookingsDetail
              {...props}
              setRedirect={setRedirect}
              userUID={userUID}
              profile={profile}
              setProfile={setProfile}
              driverUID={driverUID}
              riderProfile={riderProfile}
              setRiderProfile={setRiderProfile}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
