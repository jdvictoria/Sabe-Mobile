import React from 'react';

import {StyledSafeAreaView} from '../../../styles/container';
import HomeHeader from '../../atoms/home-header';

// @ts-ignore
function HomeBookings() {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader title={'Bookings'} />
      <></>
    </StyledSafeAreaView>
  );
}

export default HomeBookings;
