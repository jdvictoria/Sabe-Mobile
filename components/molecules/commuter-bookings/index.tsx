import React, {useEffect, useState} from 'react';
import {Dimensions, RefreshControl, ScrollView} from 'react-native';

import {StyledSafeAreaView, StyledPlaceholder} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import BookingsCard from '../../atoms/bookings-card';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function CommuterBookings({
  navigation,
  userUID,
  profile,
  setDriverUID,
  setRiderProfile,
}: any) {
  const [refreshing, setRefreshing] = React.useState(false);

  const [riders, setRiders] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getBookings().then(data => setRiders(data));
      setRefreshing(false);
    }, 2000);
  }, []);

  const getBookings = async () => {
    try {
      const usersCollection = await firestore().collection('Bookings').get();
      const allUsers = usersCollection.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));

      return allUsers;
    } catch (error) {
      console.error('Error fetching users: ', error);
      return []; // Handle the error as needed
    }
  };

  useEffect(() => {
    getBookings().then(data => setRiders(data));
  }, [userUID]);

  return (
    <StyledSafeAreaView
      style={{
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Bookings'}
        main={true}
        fromProfile={false}
      />
      <ScrollView
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        {riders.map((rider, index) => (
          <BookingsCard
            key={index}
            navigation={navigation}
            profile={profile}
            riderId={rider.id}
            riderData={rider.data}
            setDriverUID={setDriverUID}
            setRiderProfile={setRiderProfile}
          />
        ))}
        <StyledPlaceholder />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default CommuterBookings;
