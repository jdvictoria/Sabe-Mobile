import React, {useRef, useEffect} from 'react';

import {StyledCol} from '../../../styles/container';
import {Dimensions} from 'react-native';

import MapView from 'react-native-maps';

// @ts-ignore
function MainMapDriver({position}) {
  const mapRef = useRef(null);

  const handleRef = ref => {
    mapRef.current = ref;

    if (!mapRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      if (!mapRef.current) {
        return;
      }

      mapRef.current.animateToRegion(
        {
          latitude: position.latitude,
          longitude: position.longitude * -1,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1,
      );
    });
  };

  useEffect(() => {
    // Do any additional setup or logic after the component mounts
    // You can use mapRef.current here
  }, []);

  return (
    <StyledCol
      style={{
        width: '100%',
        height: Dimensions.get('window').height * 0.74,
      }}>
      <MapView
        ref={handleRef}
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
