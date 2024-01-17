import React from 'react';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import ButtonCreate from '../../atoms/button-create';
import {Dimensions} from 'react-native';

// @ts-ignore
function DriverBookings({navigation}) {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader navigation={navigation} title={'Bookings'} main={true} />
      <StyledCol
        style={{
          justifyContent: 'flex-start',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        <ButtonCreate />
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default DriverBookings;
