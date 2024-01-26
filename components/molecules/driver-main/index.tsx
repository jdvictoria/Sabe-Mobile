import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import MainMap from '../../atoms/main-map';
import MainRideDriver from '../../atoms/main-ride-driver';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function DriverMain({navigation, userUID, hasListing, position}) {
  const [requesteeData, setRequesteeData] = useState([]);
  const [dropeeData, setDropeeData] = useState([]);

  const [hasRequest, setHasRequest] = useState(false);
  const [hasRide, setHasRide] = useState(false);
  const [hasDrop, setHasDrop] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);

  const [rating, setRating] = useState(null);

  const [intervalId, setIntervalId] = useState(null);

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

        if (data.bookingRequest) {
          setRequesteeData(data.bookerProfile);
          setHasRequest(true);
          clearInterval(intervalId);
        } else {
          setRequesteeData([]);
          setHasRequest(false);
        }

        if (data.bookingOngoing) {
          setHasRide(true);
          clearInterval(intervalId);
        } else {
          setHasRide(false);
        }

        if (data.bookingDropoff) {
          setHasDrop(true);
          clearInterval(intervalId);
        } else {
          setHasDrop(false);
        }

        if (data.dropoffApproved) {
          setHasApproved(true);
          clearInterval(intervalId);
        } else {
          setHasApproved(false);
        }
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error checking listing:', error);
    }
  };

  useEffect(() => {
    if (rating === null) {
      const id = setInterval(() => {
        getRequest();
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [hasListing, hasRide, hasDrop, hasApproved, rating]);

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
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        <MainMap position={position} />
        <MainRideDriver
          userUID={userUID}
          hasListing={hasListing}
          requesteeData={requesteeData}
          setRequesteeData={setRequesteeData}
          setDropeeData={setDropeeData}
          dropeeData={dropeeData}
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
