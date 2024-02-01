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

import GetLocation from 'react-native-get-location';

import CommuterMain from '../../molecules/commuter-main';
import CommuterBookings from '../../molecules/commuter-bookings';
import DriverMain from '../../molecules/driver-main';
import DriverBookings from '../../molecules/driver-bookings';
import UserProfile from '../../molecules/user-profile';

// @ts-ignore
function HomeStack({
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
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        // console.log(location);
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
  }, []);

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  // Driver Hooks
  const [hasListing, setHasListing] = useState(false);
  const [booking, setBooking] = useState([]);

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
              hasListing={hasListing}
              setHasListing={setHasListing}
              booking={booking}
              setBooking={setBooking}
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
              userUID={userUID}
              hasListing={hasListing}
              position={position}
            />
          ) : (
            <CommuterMain
              {...props}
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
