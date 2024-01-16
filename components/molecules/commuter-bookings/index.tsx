import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView, StyledPlaceholder} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import BookingsCard from '../../atoms/bookings-card';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function CommuterBookings({navigation, setPickedRider}) {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersCollection = await firestore().collection('Bookings').get();
        const allUsers = usersCollection.docs.map(doc => doc.data());
        // @ts-ignore
        setRiders(allUsers);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    getUsers();
  }, []);

  return (
    <StyledSafeAreaView
      style={{
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader navigation={navigation} title={'Bookings'} main={true} />
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
        {riders.map((rider, index) => (
          <BookingsCard
            key={index}
            navigation={navigation}
            rider={rider}
            setPickedRider={setPickedRider}
          />
        ))}
        <StyledPlaceholder />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default CommuterBookings;
