import React, {useEffect, useState} from 'react';
import {Dimensions, RefreshControl, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';

import firestore from '@react-native-firebase/firestore';
import DetailsCardCommuter from '../../atoms/details-card-commuter';

// @ts-ignore
function AdminCommuters({navigation, userUID}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const [commuters, setCommuters] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchCommuters().then(data => setCommuters(data));
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleApprove = async commuterId => {
    try {
      // Update the isVerified property in Firestore
      await firestore()
        .collection('Users')
        .doc(commuterId)
        .update({isVerified: true});

      // Update the state to reflect the changes
      const updatedCommuters = await fetchCommuters();
      setCommuters(updatedCommuters);
    } catch (error) {
      console.error('Error updating isVerified: ', error);
    }
  };

  const fetchCommuters = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('type', '==', 'commuter')
        .where('isVerified', '==', false)
        .get();

      const docIds = querySnapshot.docs.map(doc => doc.id);

      const commutersDetails = await Promise.all(
        docIds.map(async commuterId => {
          const commuterDoc = await firestore()
            .collection('Users')
            .doc(commuterId)
            .get();
          return {id: commuterId, data: commuterDoc.data()};
        }),
      );

      return commutersDetails;
    } catch (error) {
      console.error('Error fetching commuters: ', error);
      return [];
    }
  };

  useEffect(() => {
    fetchCommuters().then(data => setCommuters(data));
  }, [userUID]);

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader navigation={navigation} title={'Commuters'} main={true} />
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
        {commuters.map((commuter, index) => (
          <DetailsCardCommuter
            key={index}
            id={commuter.id}
            data={commuter.data}
            onApprove={handleApprove}
          />
        ))}
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default AdminCommuters;
