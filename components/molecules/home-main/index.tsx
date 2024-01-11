import React from 'react';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';

// @ts-ignore
function HomeMain() {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader title={'Journey'} />
      <></>
    </StyledSafeAreaView>
  );
}

export default HomeMain;
