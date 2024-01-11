import React from 'react';

import {StyledSafeAreaView} from '../../../styles/container';
import HomeHeader from '../../atoms/home-header';

// @ts-ignore
function HomeProfile() {
  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader title={'Profile'} />
      <></>
    </StyledSafeAreaView>
  );
}

export default HomeProfile;
