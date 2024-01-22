import React from 'react';
import {Dimensions} from 'react-native';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import BookingCard from '../../atoms/booking-card';
import ButtonBooking from '../../atoms/button-booking';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function BookingsDetail({
  navigation,
  setRedirect,
  userUID,
  profile,
  setProfile,
  driverUID,
  riderProfile,
  setRiderProfile,
}: any) {
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

    setRedirect(true);
    navigation.navigate('Home');
  };

  const sendRequest = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(driverUID);
      const commuterRef = firestore().collection('Users').doc(userUID);

      await driverRef.update({
        bookerUID: userUID,
        bookerProfile: profile,
        bookingRequest: true,
      });

      await commuterRef.update({
        bookingRequest: true,
      });

      await updateProfile();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Booking Detail'}
        main={false}
        fromProfile={false}
      />
      <StyledCol
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        <BookingCard riderProfile={riderProfile} />
        <ButtonBooking
          onClick={sendRequest}
          conditionOne={riderProfile.bookingRequest}
          conditionTwo={
            riderProfile.passengerCount === riderProfile.passengerLimit
          }
        />
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default BookingsDetail;
