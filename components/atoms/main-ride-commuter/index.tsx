import React, {useEffect, useState} from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

import ButtonCancel from '../button-cancel';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function MainRideCommuter({
  navigation,
  userUID,
  driverUID,
  profile,
  setProfile,
  riderProfile,
  setRiderProfile,
}: any) {
  const sans = styledText();

  const [pendingRequest, setPendingRequest] = useState(false);

  const updateProfile = async () => {
    const userDocument = await firestore()
      .collection('Users')
      .doc(userUID)
      .get();
    if (userDocument.exists) {
      console.log(userDocument.bookingRequest);
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

  return (
    <StyledCol
      style={{
        justifyContent: profile.bookingRequest ? 'space-between' : 'center',
        width: '85%',
        height: 'auto',
        minHeight: profile.bookingRequest ? 200 : 150,
        marginTop: 25,
        marginBottom: 110,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledCol style={{marginTop: profile.bookingRequest ? 15 : 0}}>
        <SabeLogo width={50} height={50} />
        <StyledRow>
          <StyledText18 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
            {profile.bookingRequest
              ? 'Waiting for driver to accept'
              : 'You have no ongoing ride'}
          </StyledText18>
          {profile.bookingRequest && (
            <AnimatedEllipsis
              style={{
                color: '#042F40',
                fontSize: 26,
                letterSpacing: -2.5,
              }}
            />
          )}
        </StyledRow>
      </StyledCol>
      {profile.bookingRequest && <ButtonCancel onClick={handleCancel} />}
    </StyledCol>
  );
}

export default MainRideCommuter;
