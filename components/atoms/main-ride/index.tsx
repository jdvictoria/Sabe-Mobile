import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

import ButtonCancel from '../button-cancel';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function MainRide({navigation, userUID, profile, setProfile}) {
  const sans = styledText();

  const fetchProfile = async () => {
    const userDocument = await firestore()
      .collection('Users')
      .doc(userUID)
      .get();

    if (userDocument.exists) {
      const userData = userDocument.data();
      setProfile(userData);

      navigation.navigate('BookingsDetail');
    } else {
      console.log('Document does not exist');
    }
  };

  const handleCancel = async () => {
    try {
      const commuterRef = firestore().collection('Users').doc(userUID);

      await commuterRef.update({
        bookingRequest: false,
      });

      fetchProfile();
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
          <StyledText18
            style={[sans.regular, {color: '#042F40', marginTop: 5}]}>
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

export default MainRide;
