import React from 'react';

import {
  StyledCol,
  StyledSafeAreaView,
  StyledPlaceholder,
} from '../../../styles/container';
import HomeHeader from '../../atoms/home-header';
import BookingsCard from '../../atoms/bookings-card';
import {Dimensions, ScrollView} from 'react-native';

// @ts-ignore
function HomeBookings({navigation}) {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader navigation={navigation} title={'Bookings'} main={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        style={{
          width: '100%',
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        <BookingsCard navigation={navigation} />
        <StyledPlaceholder />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default HomeBookings;
