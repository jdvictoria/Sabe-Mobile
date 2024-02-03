import React from 'react';

import MapView from 'react-native-maps';

import {StyledCol} from '../../../styles/container';
import {Dimensions} from 'react-native';

// @ts-ignore
function MainMapDriver({position}) {
  return (
    <StyledCol
      style={{
        width: '100%',
        height: Dimensions.get('window').height * 0.74,
      }}>
      <MapView
        userInterfaceStyle={'dark'}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      />
    </StyledCol>
  );
}

export default MainMapDriver;
