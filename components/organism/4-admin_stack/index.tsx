import React from 'react';

import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';

import AdminDrivers from '../../molecules/admin-drivers';
import AdminCommuters from '../../molecules/admin-commuters';
import AdminProfile from '../../molecules/admin-profile';

// @ts-ignore
import AdminDriver from '../../../assets/icons/admin-driver.svg';
// @ts-ignore
import AdminDriverAlt from '../../../assets/icons/admin-driver-alt.svg';
// @ts-ignore
import AdminStudent from '../../../assets/icons/admin-student.svg';
// @ts-ignore
import AdminStudentAlt from '../../../assets/icons/admin-student-alt.svg';
// @ts-ignore
import HomeProfile from '../../../assets/icons/home-profile.svg';
// @ts-ignore
import HomeProfileAlt from '../../../assets/icons/home-profile-alt.svg';

// @ts-ignore
function AdminStack({navigation, userUID}) {
  const Tabs = AnimatedTabBarNavigator();

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
      initialRouteName={'AdminProfile'}>
      <Tabs.Screen
        name={'Bookings'}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <AdminDriver width={27.5} height={27.5} />
            ) : (
              <AdminDriverAlt width={27.5} height={27.5} />
            ),
        }}>
        {props => <AdminDrivers {...props} />}
      </Tabs.Screen>

      <Tabs.Screen
        name={'AdminProfile'}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeProfile width={20} height={20} />
            ) : (
              <HomeProfileAlt width={20} height={20} />
            ),
        }}>
        {props => <AdminProfile {...props} />}
      </Tabs.Screen>

      <Tabs.Screen
        name={'AdminCommuters'}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <AdminStudent width={20} height={20} />
            ) : (
              <AdminStudentAlt width={20} height={20} />
            ),
        }}>
        {props => <AdminCommuters {...props} userUID={userUID} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default AdminStack;
