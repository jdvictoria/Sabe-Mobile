import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import MainMapCommuter from '../../atoms/main-map-commuter';
import MainRideCommuter from '../../atoms/main-ride-commuter';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function CommuterMain({
  navigation,
  isLoggedIn,
  userUID,
  driverUID,
  redirect,
  setRedirect,
  setProfile,
  setRiderProfile,
  position,
}: any) {
  const [driverData, setDriverData] = useState([]);
  const [routeData, setRouteData] = useState(null);

  const [hasRequest, setHasRequest] = useState(false);
  const [hasRide, setHasRide] = useState(false);
  const [hasDrop, setHasDrop] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);

  const [endStep, setEndStep] = useState(1);
  const [rating, setRating] = useState(0);

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (redirect) {
      // @ts-ignore
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
      navigation.navigate('BookingsDetail');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDropoff = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(driverUID);
      const commuterRef = firestore().collection('Users').doc(userUID);

      await driverRef.update({
        bookingDropoff: true,
        dropoffUID: userUID,
      });

      await commuterRef.update({
        bookingDropoff: true,
      });

      await updateProfile();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleEnd = async () => {
    try {
      const driverRef = firestore().collection('Users').doc(driverUID);
      const driverSnapshot = await firestore()
        .collection('Users')
        .doc(driverUID)
        .get();
      const commuterRef = firestore().collection('Users').doc(userUID);

      // @ts-ignore
      const currentTotalRides = driverSnapshot.data().totalRides || 0;
      const newTotalRides = currentTotalRides + 1;
      // @ts-ignore
      const currentDriverRating = driverSnapshot.data().rating || 0;
      const newDriverRating = (currentDriverRating + rating) / newTotalRides;

      await driverRef.update({
        rating: newDriverRating,
        totalRides: newTotalRides,
      });

      await commuterRef.update({
        dropoffApproved: false,
        bookingOngoing: false,
      });

      await updateProfile();

      setHasRequest(false);
      setHasRide(false);
      setRating(0);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const getRequest = async () => {
    try {
      const driverRef = firestore().collection('Users').doc(driverUID);
      const driverSnapshot = await driverRef.get();
      const docRef = firestore().collection('Users').doc(userUID);
      const docSnapshot = await docRef.get();

      if (driverSnapshot.exists) {
        const data = driverSnapshot.data();

        // @ts-ignore
        setDriverData(data);
      }

      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        // @ts-ignore
        if (data.bookingRequest) {
          setHasRequest(true);
          // @ts-ignore
          clearInterval(intervalId);
        } else {
          setHasRequest(false);
        }

        // @ts-ignore
        if (data.bookingOngoing) {
          // @ts-ignore
          setRouteData(data.route);
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
        // Do something when the document does not exist
      }
    } catch (error) {
      console.error('Error checking listing:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const id = setInterval(() => {
        getRequest();
      }, 1000);
      // @ts-ignore
      setIntervalId(id);
      return () => clearInterval(id);
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
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        <MainMapCommuter
          position={position}
          hasRide={hasRide}
          routeData={routeData}
        />
        <MainRideCommuter
          driverData={driverData}
          routeData={routeData}
          hasRide={hasRide}
          hasRequest={hasRequest}
          hasDrop={hasDrop}
          hasApproved={hasApproved}
          handleCancel={handleCancel}
          handleDropoff={handleDropoff}
          handleEnd={handleEnd}
          rating={rating}
          setRating={setRating}
          endStep={endStep}
          setEndStep={setEndStep}
        />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default CommuterMain;
