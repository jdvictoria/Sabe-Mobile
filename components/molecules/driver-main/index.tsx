import React from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import MainMap from '../../atoms/main-map';
import MainRideDriver from '../../atoms/main-ride-driver';

// @ts-ignore
function DriverMain({navigation, hasListing, position}) {
  const checkRequest = () => {};

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Journey'}
        main={true}
        fromProfile={false}
      />
      <ScrollView
        // ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        <MainMap position={position} />
        <MainRideDriver hasListing={hasListing} />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default DriverMain;
