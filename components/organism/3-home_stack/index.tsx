import React, {useEffect, useState} from 'react';

import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';

import HomeMain from '../../molecules/home-main';
import HomeBookings from '../../molecules/home-bookings';
import HomeProfile from '../../molecules/home-profile';

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

// @ts-ignore
function HomeStack() {
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
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeJourneyLogo width={27.5} height={27.5} />
            ) : (
              <HomeJourneyAlt width={27.5} height={27.5} />
            ),
        }}>
        {props => <HomeBookings {...props} />}
      </Tabs.Screen>
      <Tabs.Screen
        name={'Home'}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeMainLogo width={20} height={20} />
            ) : (
              <HomeMainAlt width={20} height={20} />
            ),
        }}>
        {props => <HomeMain {...props} position={position} />}
      </Tabs.Screen>

      <Tabs.Screen
        name={'Profile'}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeProfileLogo width={20} height={20} />
            ) : (
              <HomeProfileAlt width={20} height={20} />
            ),
        }}>
        {props => <HomeProfile {...props} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default HomeStack;
