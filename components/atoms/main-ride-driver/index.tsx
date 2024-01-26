import React, {useState} from 'react';

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
import ButtonPositive from '../button-positive';

// @ts-ignore
function MainRideDriver({
  userUID,
  hasListing,
  requesteeData,
  setRequesteeData,
  dropeeData,
  setDropeeData,
  hasRequest,
  setHasRequest,
  hasRide,
  setHasRide,
  hasDrop,
  setHasDrop,
}: any) {
  const sans = styledText();

  const [dropStep, setDropStep] = useState(1);

  const handleReject = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterRef = firestore()
        .collection('Users')
        .doc(driverSnapshot.data().bookerUID);

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

  const handleAccept = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterRef = firestore()
        .collection('Users')
        .doc(driverSnapshot.data().bookerUID);

      // @ts-ignore
      const currentPassengerCount = driverSnapshot.data().passengerCount || 0;
      const newPassengerCount = currentPassengerCount + 1;

      await driverRef.update({
        bookerUID: '',
        bookerProfile: {},
        bookingRequest: false,
        bookingOngoing: true,
        passengerCount: newPassengerCount,
        // @ts-ignore
        bookingPassengers: firestore.FieldValue.arrayUnion(
          driverSnapshot.data().bookerUID,
        ),
      });

      await commuterRef.update({
        bookingRequest: false,
        bookingOngoing: true,
      });

      setHasRequest(false);
      setHasRide(true);
      setRequesteeData([]);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleViewDrop = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterRef = firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropOffUID);
      const commuterSnapshot = await firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropOffUID)
        .get();

      setDropeeData(commuterSnapshot.data());
      setDropStep(2);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleCancelDrop = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterRef = firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropOffUID);

      await driverRef.update({
        bookingDropoff: false,
        dropOffUID: '',
      });

      await commuterRef.update({
        bookingDropoff: false,
      });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleAcceptDrop = async () => {
    try {
      // setHasDrop(false);
      // setDropeeData([]);
    } catch (error) {
      console.error('Error updating document:', error);
    }
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
        {hasRide && (
          <StyledCol>
            {!hasDrop ? (
              <>
                <StyledText18
                  style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                  Ride Ongoing
                </StyledText18>
              </>
            ) : (
              <>
                <StyledRow>
                  <StyledText18
                    style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                    Dropoff Request
                  </StyledText18>
                  <AnimatedEllipsis
                    style={{
                      color: '#042F40',
                      fontSize: 26,
                      letterSpacing: -2.5,
                    }}
                  />
                </StyledRow>
                {dropStep === 1 ? (
                  <StyledRow style={{marginTop: 10}}>
                    <ButtonPositive
                      onClick={handleViewDrop}
                      text={'View Request'}
                    />
                  </StyledRow>
                ) : (
                  <>
                    <ListingOne label={'Email'} data={dropeeData.email} />
                    <ListingTwo
                      labelOne={'Name'}
                      dataOne={dropeeData.name}
                      labelTwo={'Contact'}
                      dataTwo={dropeeData.contact}
                    />
                    <ListingTwo
                      labelOne={'Type'}
                      dataOne={dropeeData.type}
                      labelTwo={'Rating'}
                      dataTwo={dropeeData.rating}
                    />
                    <StyledRow style={{marginTop: 10}}>
                      <ButtonReject onClick={handleCancelDrop} />
                      <ButtonAccept onClick={handleAcceptDrop} />
                    </StyledRow>
                  </>
                )}
              </>
            )}
          </StyledCol>
        )}
        {hasRequest && (
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
            <ListingOne label={'Email'} data={requesteeData.email} />
            <ListingTwo
              labelOne={'Name'}
              dataOne={requesteeData.name}
              labelTwo={'Contact'}
              dataTwo={requesteeData.contact}
            />
            <ListingTwo
              labelOne={'Type'}
              dataOne={requesteeData.type}
              labelTwo={'Rating'}
              dataTwo={requesteeData.rating}
            />
            <StyledRow style={{marginTop: 10}}>
              <ButtonReject onClick={handleReject} />
              <ButtonAccept onClick={handleAccept} />
            </StyledRow>
          </StyledCol>
        )}
        {!hasRide && (!hasRequest || requesteeData.length === 0) && (
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
        )}
      </StyledCol>
    </StyledCol>
  );
}

export default MainRideDriver;
