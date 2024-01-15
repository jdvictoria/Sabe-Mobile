import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function AdminCommuters({navigation, userUID}) {
  const [commuters, setCommuters] = useState([]);

  useEffect(() => {
    const fetchCommuters = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Users')
          .where('type', '==', 'commuter')
          .where('isVerified', '==', false)
          .get();

        const docIds = querySnapshot.docs.map(doc => doc.id);
        setCommuters(docIds);
        console.log('Commuter Document IDs: ', docIds);
      } catch (error) {
        console.error('Error fetching commuters: ', error);
      }
    };

    fetchCommuters();

    return () => {
      fetchCommuters();
    };
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
        }}
      />
    </StyledSafeAreaView>
  );
}

export default AdminCommuters;
