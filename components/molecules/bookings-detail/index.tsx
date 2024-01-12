import React from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import BookingButton from '../../atoms/booking-button';
import BookingCard from '../../atoms/booking-card';

const Routes = [
  'DHVSU Campus',
  'Walter Mart',
  'GreenFields',
  'SM Telabastagan',
];

// @ts-ignore
function BookingsDetail({navigation}) {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Booking Detail'}
        main={false}
      />
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
        <BookingCard Routes={Routes} />
        <BookingButton />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default BookingsDetail;
