import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';
import {
  alertMissingDetails,
  alertDeleteListing,
} from '../../../utils/alerts.ts';

import HomeHeader from '../../atoms/home-header';
import ButtonCreate from '../../atoms/button-create';
import DetailsCardInput from '../../atoms/details-card-input';
import DetailsCardListing from '../../atoms/details-card-listing';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function DriverBookings({
  navigation,
  userUID,
  profile,
  create,
  setCreate,
  hasListing,
  setHasListing,
  booking,
}: any) {
  useEffect(() => {}, [create]);

  const [isLoading, setIsLoading] = useState(false);

  const [fare, setFare] = useState('');
  const [pax, setPax] = useState('');
  const [timeStart, setTimeStart] = useState('--:-- --');
  const [timeEnd, setTimeEnd] = useState('--:-- --');
  const [dateJourney, setDateJourney] = useState('--------');
  const [routes, setRoutes] = useState([]);

  const handleCreate = () => {
    setCreate(prevState => !prevState);
  };

  const handleCancel = () => {
    setFare('');
    setPax('');
    setTimeStart('--:-- --');
    setTimeEnd('--:-- --');
    setDateJourney('--------');
    setRoutes([]);
    setCreate(prevState => !prevState);
  };

  const handleDelete = () => {
    const deleteListing = async () => {
      try {
        setIsLoading(true);
        await firestore().collection('Bookings').doc(userUID).delete();
        setHasListing(false);
        console.log('Document successfully deleted!');
        setIsLoading(false);
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    };
    alertDeleteListing(deleteListing);
  };

  const handleApprove = async () => {
    if (
      fare === '' ||
      pax === '' ||
      timeStart === '--:-- --' ||
      timeEnd === '--:-- --' ||
      dateJourney === '--------' ||
      routes.length <= 1
    ) {
      alertMissingDetails();
    } else {
      try {
        setIsLoading(true);
        await firestore()
          .collection('Bookings')
          .doc(userUID)
          .set({
            bookerUID: '',
            bookerProfile: {},
            bookingRequest: false,
            name: profile.name,
            carColor: profile.carColor,
            carMake: profile.carMake,
            carSeries: profile.carSeries,
            carPlate: profile.carPlate,
            contact: profile.contact,
            email: profile.email,
            fare: Number(fare),
            passengerCount: 0,
            passengerLimit: Number(pax),
            rating: profile.rating,
            totalRides: profile.totalRides,
            route: routes,
            timeStart: timeStart,
            timeEnd: timeEnd,
            date: dateJourney,
          });
        setIsLoading(false);
        handleCancel();
      } catch (error) {
        console.log(error);
      }
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
        title={'Bookings'}
        main={true}
        fromProfile={false}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        data={create ? [1] : [0]}
        keyExtractor={item => item.toString()}
        renderItem={({item}) =>
          item === 1 ? (
            <DetailsCardInput
              isLoading={isLoading}
              profile={profile}
              onCancel={handleCancel}
              onApprove={handleApprove}
              fare={fare}
              pax={pax}
              timeStart={timeStart}
              timeEnd={timeEnd}
              dateJourney={dateJourney}
              routes={routes}
              setFare={setFare}
              setPax={setPax}
              setTimeStart={setTimeStart}
              setTimeEnd={setTimeEnd}
              setDateJourney={setDateJourney}
              setRoutes={setRoutes}
            />
          ) : !hasListing ? (
            <ButtonCreate onClick={handleCreate} />
          ) : (
            <DetailsCardListing
              isLoading={isLoading}
              booking={booking}
              onClick={handleDelete}
            />
          )
        }
        style={{
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.89,
          backgroundColor: '#e7e7e7',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      />
    </StyledSafeAreaView>
  );
}

export default DriverBookings;
