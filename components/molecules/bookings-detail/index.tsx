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
  riderProfile,
}: any) {
  const sendRequest = async () => {
    try {
      const driverRef = firestore()
        .collection('Bookings')
        .doc(riderProfile.name);
      const commuterRef = firestore().collection('Users').doc(userUID);

      await driverRef.update({
        bookerUID: userUID,
        bookerProfile: profile,
        bookingRequest: true,
      });

      await commuterRef.update({
        bookingRequest: true,
      });
      setRedirect(true);
      navigation.navigate('Home');
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
        <ButtonBooking onClick={sendRequest} />
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default BookingsDetail;
