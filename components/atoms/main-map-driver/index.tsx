import React, {useEffect, useRef, useState} from 'react';

import {StyledCol} from '../../../styles/container';
import {Dimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

// @ts-ignore
import Pin from '../../../assets/icons/pin.svg';

function MainMapDriver({position, hasRide, routeData}: any) {
  const mapRef = useRef(null);

  const handleRef = (ref: null) => {
    mapRef.current = ref;

    if (!mapRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      if (!mapRef.current) {
        return;
      }

      // @ts-ignore
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

  const [locationsData, setLocationsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (hasRide && routeData) {
        const locationsDict = {};

        // Loop through each route in routeData
        for (const route of routeData) {
          try {
            // Assuming "Routes" is the collection name and "tLujWHvJK6s8ywQ1lY8I" is the document ID
            const docRef = firestore()
              .collection('Routes')
              .doc('tLujWHvJK6s8ywQ1lY8I');
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
              const locationsArray = docSnapshot.data();

              // @ts-ignore
              if (locationsArray.hasOwnProperty(route)) {
                // @ts-ignore
                locationsDict[route] = {
                  // @ts-ignore
                  lat: locationsArray[route][0],
                  // @ts-ignore
                  long: locationsArray[route][1],
                };
              }
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        // @ts-ignore
        setLocationsData(locationsDict);
      } else {
        // If hasRide is false, set locationsDict to null
        setLocationsData(null);
      }
    };

    fetchData();
  }, [hasRide, routeData]);

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
        rotateEnabled={true}>
        {locationsData &&
          Object.entries(locationsData).map(
            // @ts-ignore
            ([locationName, {lat, long}], index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: lat,
                  longitude: long,
                }}
                title={locationName}
                tappable={false}>
                <Pin width={40} height={40} />
              </Marker>
            ),
          )}
      </MapView>
    </StyledCol>
  );
}

export default MainMapDriver;
