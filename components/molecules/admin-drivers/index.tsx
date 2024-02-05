import React, {useEffect, useState} from 'react';
import {Dimensions, RefreshControl, ScrollView} from 'react-native';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import DetailsCardDriver from '../../atoms/details-card-driver';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function AdminDrivers({navigation, userUID}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const [drivers, setDrivers] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // @ts-ignore
      fetchDrivers().then(data => setDrivers(data));
      setRefreshing(false);
    }, 2000);
  }, []);

  // @ts-ignore
  const handleApprove = async driverId => {
    try {
      // Update the isVerified property in Firestore
      await firestore()
        .collection('Users')
        .doc(driverId)
        .update({isVerified: true});

      // Update the state to reflect the changes
      const updatedCommuters = await fetchDrivers();
      // @ts-ignore
      setDrivers(updatedCommuters);
    } catch (error) {
      console.error('Error updating isVerified: ', error);
    }
  };

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
      return driversDetails;
    } catch (error) {
      console.error('Error fetching commuters: ', error);
    }
  };

  useEffect(() => {
    // @ts-ignore
    fetchDrivers().then(data => setDrivers(data));
  }, [userUID]);

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
          height: Dimensions.get('window').height * 0.89,
          backgroundColor: '#e7e7e7',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        {drivers.map((driver, index) => (
          <DetailsCardDriver
            key={index}
            // @ts-ignore
            id={driver.id}
            // @ts-ignore
            data={driver.data}
            onApprove={handleApprove}
          />
        ))}
        <StyledCol style={{width: '100%', height: 100}} />
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default AdminDrivers;
