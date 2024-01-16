import React from 'react';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';

// @ts-ignore
function DriverBookings({navigation}) {
  return (
    <StyledSafeAreaView
      style={{
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader navigation={navigation} title={'Bookings'} main={true} />
      <></>
    </StyledSafeAreaView>
  );
}

export default DriverBookings;
