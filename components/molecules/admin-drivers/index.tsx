import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function AdminDrivers({navigation, userUID}) {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Users')
          .where('type', '==', 'driver')
          .where('isVerified', '==', false)
          .get();

        const docIds = querySnapshot.docs.map(doc => doc.id);
        // console.log('Drivers Document IDs: ', docIds);

        const driversDetails = await Promise.all(
          docIds.map(async driverId => {
            const driverDoc = await firestore()
              .collection('Users')
              .doc(driverId)
              .get();
            return {id: driverId, data: driverDoc.data()};
          }),
        );

        // @ts-ignore
        setDrivers(driversDetails);
      } catch (error) {
        console.error('Error fetching commuters: ', error);
      }
    };

    fetchDrivers();

    return () => {
      fetchDrivers();
    };
  }, [userUID]);

  // console.log(drivers);

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader navigation={navigation} title={'Drivers'} main={true} />
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
        <></>
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default AdminDrivers;
