import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import MainMapDriver from '../../atoms/main-map-driver';
import MainRideDriver from '../../atoms/main-ride-driver';

import GetLocation from 'react-native-get-location';

import firestore from '@react-native-firebase/firestore';

import notifee from '@notifee/react-native';

// @ts-ignore
function DriverMain({navigation, isLoggedIn, userUID, hasListing}) {
  useEffect(() => {
    const updateLocation = () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000,
      })
        .then(location => {
          setPosition({
            latitude: location.latitude,
            longitude: location.longitude * -1,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    };

    updateLocation();

    const intervalId = setInterval(updateLocation, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [requesteeData, setRequesteeData] = useState([]);
  const [dropeeData, setDropeeData] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [passengersData, setPassengersData] = useState(null);

  const [hasRequest, setHasRequest] = useState(false);
  const [hasRide, setHasRide] = useState(false);
  const [hasDrop, setHasDrop] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);

  const [rating, setRating] = useState(null);

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setRequesteeData([]);
      setDropeeData([]);
      setRouteData(null);
      setPassengersData(null);

      setHasRequest(false);
      setHasRide(false);
      setHasDrop(false);
      setHasApproved(false);

      setRating(null);

      setIntervalId(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (hasRequest) {
      navigation.navigate('Home');
      // @ts-ignore
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [hasRequest]);

  const scrollViewRef = React.createRef();

  const getRequest = async () => {
    try {
      const docRef = firestore().collection('Bookings').doc(userUID);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        // @ts-ignore
        if (data.bookingRequest) {
          // @ts-ignore
          setRequesteeData(data.bookerProfile);
          setHasRequest(true);
          // @ts-ignore
          clearInterval(intervalId);
        } else {
          setRequesteeData([]);
          setHasRequest(false);
        }

        // @ts-ignore
        if (data.bookingOngoing) {
          // @ts-ignore
          setRouteData(data.route);
          // @ts-ignore
          setPassengersData(data.bookingPassengers);
          setHasRide(true);
          // @ts-ignore
          clearInterval(intervalId);
        } else {
          setHasRide(false);
        }

        // @ts-ignore
        if (data.bookingDropoff) {
          setHasDrop(true);
          // @ts-ignore
          clearInterval(intervalId);
        } else {
          setHasDrop(false);
        }

        // @ts-ignore
        if (data.dropoffApproved) {
          setHasApproved(true);
          // @ts-ignore
          clearInterval(intervalId);
        } else {
          setHasApproved(false);
        }
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      // console.error('Error checking listing:', error);
    }
  };

  useEffect(() => {
    if (rating === null) {
      const id = setInterval(() => {
        getRequest();
      }, 1000);

      // @ts-ignore
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [hasListing, hasRide, hasDrop, hasApproved, rating]);

  useEffect(() => {
    const requestNotification = async () => {
      await notifee.displayNotification({
        title: 'Commuter Booking Request',
        // @ts-ignore
        body: 'A commuter is asking for your ride.',
      });

      console.log('user requesting');
    };

    const rideNotification = async () => {
      await notifee.displayNotification({
        title: 'Commuter Booking Accepted',
        body: 'You now have an ongoing ride.',
      });
    };

    const dropNotification = async () => {
      await notifee.displayNotification({
        title: 'Commuter Drop Request',
        body: 'A commuter is asking for a dropoff.',
      });
    };

    if (hasRequest) {
      requestNotification();
    } else if (hasRide && !hasDrop) {
      rideNotification();
    } else if (hasDrop && hasRide) {
      dropNotification();
    }
  }, [hasRequest, hasRide, hasDrop]);

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
        // @ts-ignore
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: Dimensions.get('window').height * 0.89,
          backgroundColor: '#e7e7e7',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
        <MainMapDriver
          position={position}
          hasRide={hasRide}
          routeData={routeData}
        />
        <MainRideDriver
          routeData={routeData}
          userUID={userUID}
          hasListing={hasListing}
          requesteeData={requesteeData}
          setRequesteeData={setRequesteeData}
          dropeeData={dropeeData}
          setDropeeData={setDropeeData}
          passengersData={passengersData}
          hasRequest={hasRequest}
          setHasRequest={setHasRequest}
          hasRide={hasRide}
          setHasRide={setHasRide}
          hasDrop={hasDrop}
          setHasDrop={setHasDrop}
          hasApproved={hasApproved}
          setHasApproved={setHasApproved}
          rating={rating}
          setRating={setRating}
        />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default DriverMain;
