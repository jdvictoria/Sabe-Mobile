import React, {useEffect, useState} from 'react';

import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';

// @ts-ignore
import HomeMainLogo from '../../../assets/icons/home-main.svg';
// @ts-ignore
import HomeMainAlt from '../../../assets/icons/home-main-alt.svg';
// @ts-ignore
import HomeJourneyLogo from '../../../assets/icons/home-journey.svg';
// @ts-ignore
import HomeJourneyAlt from '../../../assets/icons/home-journey-alt.svg';
// @ts-ignore
import HomeProfileLogo from '../../../assets/icons/home-profile.svg';
// @ts-ignore
import HomeProfileAlt from '../../../assets/icons/home-profile-alt.svg';

import CommuterMain from '../../molecules/commuter-main';
import CommuterBookings from '../../molecules/commuter-bookings';
import DriverMain from '../../molecules/driver-main';
import DriverBookings from '../../molecules/driver-bookings';
import UserProfile from '../../molecules/user-profile';

import GetLocation from 'react-native-get-location';
import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function HomeStack({
  isLoggedIn,
  setIsLoggedIn,
  userUID,
  driverUID,
  redirect,
  setRedirect,
  profile,
  setProfile,
  refetchProfile,
  setDriverUID,
  setRiderProfile,
}: any) {
  const Tabs = AnimatedTabBarNavigator();

  useEffect(() => {
    const updateLocation = () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000,
      })
        .then(location => {
          setPosition({
            latitude: location.latitude,
            longitude: location.longitude * -1,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    };

    updateLocation();

    const intervalId = setInterval(updateLocation, 1000); // Set your desired interval here (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  // Driver Hooks
  const [create, setCreate] = useState(false);

  const [hasListing, setHasListing] = useState(false);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    if (profile.type === 'driver') {
      const checkListing = async () => {
        try {
          const docRef = firestore().collection('Bookings').doc(userUID);
          const docSnapshot = await docRef.get();

          if (docSnapshot.exists) {
            // @ts-ignore
            setBooking(docSnapshot.data());
            setHasListing(true);
          } else {
            setHasListing(false);
          }
        } catch (error) {
          console.error('Error checking listing:', error);
        }
      };

      checkListing();
    }
  }, [create]);

  return (
    <Tabs.Navigator
      appearance={{
        floating: true,
        shadow: true,
        whenActiveShow: TabElementDisplayOptions.ICON_ONLY,
        whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
        dotSize: DotSize.SMALL,
        tabBarBackground: '#042F40',
        activeTabBackgrounds: '#f3f3f3',
      }}
      initialRouteName={'Home'}>
      <Tabs.Screen
        name={'Bookings'}
        options={{
          // @ts-ignore
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeJourneyLogo width={27.5} height={27.5} />
            ) : (
              <HomeJourneyAlt width={27.5} height={27.5} />
            ),
        }}>
        {props =>
          profile.type === 'driver' ? (
            <DriverBookings
              {...props}
              profile={profile}
              userUID={userUID}
              create={create}
              setCreate={setCreate}
              hasListing={hasListing}
              setHasListing={setHasListing}
              booking={booking}
            />
          ) : (
            <CommuterBookings
              {...props}
              userUID={userUID}
              profile={profile}
              setDriverUID={setDriverUID}
              setRiderProfile={setRiderProfile}
            />
          )
        }
      </Tabs.Screen>

      <Tabs.Screen
        name={'Home'}
        options={{
          // @ts-ignore
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeMainLogo width={20} height={20} />
            ) : (
              <HomeMainAlt width={20} height={20} />
            ),
        }}>
        {props =>
          profile.type === 'driver' ? (
            <DriverMain
              {...props}
              isLoggedIn={isLoggedIn}
              userUID={userUID}
              hasListing={hasListing}
              position={position}
            />
          ) : (
            <CommuterMain
              {...props}
              isLoggedIn={isLoggedIn}
              userUID={userUID}
              driverUID={driverUID}
              redirect={redirect}
              setRedirect={setRedirect}
              setProfile={setProfile}
              setRiderProfile={setRiderProfile}
              position={position}
            />
          )
        }
      </Tabs.Screen>

      <Tabs.Screen
        name={'Profile'}
        options={{
          // @ts-ignore
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeProfileLogo width={20} height={20} />
            ) : (
              <HomeProfileAlt width={20} height={20} />
            ),
        }}>
        {props => (
          <UserProfile
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            userUID={userUID}
            profile={profile}
            refetchProfile={refetchProfile}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default HomeStack;
