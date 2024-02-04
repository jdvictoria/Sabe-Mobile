import React, {useState} from 'react';
import {Image} from 'react-native';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import ButtonAccept from '../button-accept';
import ButtonReject from '../button-reject';
import ButtonPositive from '../button-positive';
import ListingTwo from '../listing-two';
import ListingOne from '../listing-one';

import firestore from '@react-native-firebase/firestore';
import StarRating from 'react-native-star-rating-widget';
import BookingCardLower from '../booking-card-lower';

function MainRideDriver({
  routeData,
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
  hasApproved,
  setHasApproved,
  rating,
  setRating,
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
      const currentRoute = driverSnapshot.data().route;
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
        route: currentRoute,
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
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterSnapshot = await firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropoffUID)
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
        .doc(driverSnapshot.data().dropoffUID);

      await driverRef.update({
        bookingDropoff: false,
        dropoffUID: '',
      });

      await commuterRef.update({
        bookingDropoff: false,
      });

      setDropStep(1);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleAcceptDrop = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterRef = firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropoffUID);

      await driverRef.update({
        bookingDropoff: false,
        dropoffApproved: true,
      });

      await commuterRef.update({
        bookingDropoff: false,
        dropoffApproved: true,
        route: [],
      });

      setHasDrop(false);
      setHasApproved(true);
      setRating(0);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleEnd = async () => {
    try {
      const driverRef = firestore().collection('Bookings').doc(userUID);
      const driverSnapshot = await firestore()
        .collection('Bookings')
        .doc(userUID)
        .get();
      const commuterRef = firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropoffUID);
      const commuterSnapshot = await firestore()
        .collection('Users')
        .doc(driverSnapshot.data().dropoffUID)
        .get();

      // @ts-ignore
      const currentPassengerCount = driverSnapshot.data().passengerCount || 0;
      const newPassengerCount = currentPassengerCount - 1;

      await driverRef.update({
        passengerCount: newPassengerCount,
        bookingOngoing: newPassengerCount !== 0,
        dropoffUID: '',
        dropoffApproved: false,
      });

      // @ts-ignore
      const currentCommuterTotalRides = commuterSnapshot.data().totalRides || 0;
      const newCommuterTotalRides = currentCommuterTotalRides + 1;
      // @ts-ignore
      const currentCommuterRating = commuterSnapshot.data().rating || 0;
      const newCommuterRating =
        (currentCommuterRating + rating) / newCommuterTotalRides;

      await commuterRef.update({
        rating: newCommuterRating,
        totalRides: newCommuterTotalRides,
      });

      setHasDrop(false);
      setHasApproved(false);
      setRating(null);
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
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}>
      <StyledCol style={{marginTop: 0}}>
        {hasRide && (
          <StyledCol>
            {!hasDrop && !hasApproved && (
              <>
                <SabeLogo width={75} height={75} />
                <StyledText18
                  style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                  Ride Ongoing
                </StyledText18>
                <StyledCol style={{width: '100%', marginRight: 50}}>
                  <BookingCardLower routes={routeData} />
                </StyledCol>
              </>
            )}
            {hasDrop && (
              <>
                {dropeeData.profPic ? (
                  <Image
                    style={{
                      width: 75,
                      height: 75,
                      marginTop: 10,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: '#042f40',
                    }}
                    source={{uri: dropeeData.profPic}}
                  />
                ) : (
                  <SabeLogo width={75} height={75} />
                )}
                <StyledRow>
                  <StyledText18
                    style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                    Requesting Dropoff
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
                      dataTwo={
                        dropeeData.rating
                          ? dropeeData.rating.toFixed(2)
                          : dropeeData.rating
                      }
                    />
                    <StyledRow style={{marginTop: 10}}>
                      <ButtonReject onClick={handleCancelDrop} />
                      <ButtonAccept onClick={handleAcceptDrop} />
                    </StyledRow>
                  </>
                )}
              </>
            )}
            {hasApproved && (
              <>
                <StyledText18
                  style={[
                    sans.bold,
                    {color: '#042F40', marginTop: 5, marginBottom: 10},
                  ]}>
                  Rate your passenger!
                </StyledText18>
                <StarRating
                  onRatingEnd={handleEnd}
                  enableSwiping={true}
                  enableHalfStar={false}
                  rating={rating}
                  onChange={setRating}
                  color={'#FFB800'}
                />
              </>
            )}
          </StyledCol>
        )}
        {hasRequest && (
          <StyledCol>
            {requesteeData.profPic ? (
              <Image
                style={{
                  width: 75,
                  height: 75,
                  marginTop: 10,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: '#042f40',
                }}
                source={{uri: requesteeData.profPic}}
              />
            ) : (
              <SabeLogo width={75} height={75} />
            )}
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
              dataTwo={
                requesteeData.rating
                  ? requesteeData.rating.toFixed(2)
                  : requesteeData.rating
              }
            />
            <StyledRow style={{marginTop: 10}}>
              <ButtonReject onClick={handleReject} />
              <ButtonAccept onClick={handleAccept} />
            </StyledRow>
          </StyledCol>
        )}
        {!hasRide && (!hasRequest || requesteeData.length === 0) && (
          <StyledCol>
            <SabeLogo width={75} height={75} />
            <StyledRow>
              <StyledText18
                style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
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
          </StyledCol>
        )}
      </StyledCol>
    </StyledCol>
  );
}

export default MainRideDriver;
