import React from 'react';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';

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
      <></>
    </StyledSafeAreaView>
  );
}

export default BookingsDetail;
