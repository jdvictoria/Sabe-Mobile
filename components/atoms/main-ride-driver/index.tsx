import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import ButtonAccept from '../button-accept';
import ButtonReject from '../button-reject';
import ListingTwo from '../listing-two';
import ListingOne from '../listing-one';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function MainRideDriver({
  userUID,
  requesteeData,
  setRequesteeData,
  hasRequest,
  setHasRequest,
  hasListing,
}) {
  const sans = styledText();

  const handleReject = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const commuterRef = firestore()
        .collection('Users')
        .doc(requesteeData.bookerUID);

      await driverRef.update({
        bookerUID: '',
        bookerProfile: {},
        bookingRequest: false,
      });

      await commuterRef.update({
        bookingRequest: false,
      });

      setHasRequest(false);
      setRequesteeData([]);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleAccept = () => {
    console.log(requesteeData.bookerUID);
  };

  return (
    <StyledCol
      style={{
        justifyContent: 'center',
        width: '85%',
        height: 'auto',
        minHeight: 150,
        marginTop: 25,
        marginBottom: 110,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledCol style={{marginTop: 0}}>
        <SabeLogo width={50} height={50} />
        {!hasRequest || requesteeData.length === 0 ? (
          <StyledRow>
            <StyledText18 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
              {hasListing
                ? 'Waiting for commuter request'
                : 'You have no active listing'}
            </StyledText18>
            {hasListing && (
              <AnimatedEllipsis
                style={{
                  color: '#042F40',
                  fontSize: 26,
                  letterSpacing: -2.5,
                }}
              />
            )}
          </StyledRow>
        ) : (
          <StyledCol>
            <StyledRow>
              <StyledText18
                style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                Commuter requesting
              </StyledText18>
              <AnimatedEllipsis
                style={{
                  color: '#042F40',
                  fontSize: 26,
                  letterSpacing: -2.5,
                }}
              />
            </StyledRow>
            <ListingOne
              label={'Email'}
              data={requesteeData.bookerProfile.email}
            />
            <ListingTwo
              labelOne={'Name'}
              dataOne={requesteeData.bookerProfile.name}
              labelTwo={'Contact'}
              dataTwo={requesteeData.bookerProfile.contact}
            />
            <ListingTwo
              labelOne={'Type'}
              dataOne={requesteeData.bookerProfile.type}
              labelTwo={'Rating'}
              dataTwo={requesteeData.bookerProfile.rating}
            />
            <StyledRow style={{marginTop: 10}}>
              <ButtonReject onClick={handleReject} />
              <ButtonAccept onClick={handleAccept} />
            </StyledRow>
          </StyledCol>
        )}
      </StyledCol>
    </StyledCol>
  );
}

export default MainRideDriver;
