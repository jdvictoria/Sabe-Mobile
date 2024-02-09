import React from 'react';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';

function DriverMessages({navigation}: any) {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Messages'}
        main={true}
        fromProfile={false}
      />
      <></>
    </StyledSafeAreaView>
  );
}

export default DriverMessages;
