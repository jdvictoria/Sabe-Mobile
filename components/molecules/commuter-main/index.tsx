import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import MainMap from '../../atoms/main-map';
import MainRideCommuter from '../../atoms/main-ride-commuter';
import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function CommuterMain({
  navigation,
  userUID,
  driverUID,
  redirect,
  setRedirect,
  profile,
  setProfile,
  setRiderProfile,
  position,
}: any) {
  const [hasRide, setHasRide] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (redirect) {
      // Scroll to the bottom when redirect is true
      scrollViewRef.current.scrollToEnd({animated: true});
      // Reset the redirect state to false after scrolling
      setRedirect(false);
    }
  }, [redirect]);

  const scrollViewRef = React.createRef();

  const updateProfile = async () => {
    const userDocument = await firestore()
      .collection('Users')
      .doc(userUID)
      .get();
    if (userDocument.exists) {
      const userData = userDocument.data();
      setProfile(userData);
    } else {
      console.log('Document does not exist');
    }
    const riderDocument = await firestore()
      .collection('Bookings')
      .doc(driverUID)
      .get();
    if (riderDocument.exists) {
      const riderData = riderDocument.data();
      setRiderProfile(riderData);
    } else {
      console.log('Document does not exist');
    }
    navigation.navigate('BookingsDetail');
  };

  const handleCancel = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(driverUID);
      const commuterRef = firestore().collection('Users').doc(userUID);

      await driverRef.update({
        bookerUID: '',
        bookerProfile: {},
        bookingRequest: false,
      });

      await commuterRef.update({
        bookingRequest: false,
      });

      await updateProfile();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const getRequest = async () => {
    try {
      const docRef = firestore().collection('Users').doc(userUID);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        if (data.bookingRequest) {
          setHasRequest(true);
          clearInterval(intervalId);
        } else {
          setHasRequest(false);
        }

        if (data.bookingOngoing) {
          setHasRide(true);
          clearInterval(intervalId);
        } else {
          setHasRide(false);
        }
      } else {
        console.log('Document does not exist');
        // Do something when the document does not exist
      }
    } catch (error) {
      console.error('Error checking listing:', error);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      getRequest();
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [hasRequest, hasRide]);

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
        <MainRideCommuter
          hasRequest={hasRequest}
          hasRide={hasRide}
          profile={profile}
          handleCancel={handleCancel}
        />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default CommuterMain;
