import React, {useState} from 'react';
import {Dimensions, ScrollView, FlatList} from 'react-native';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import ButtonCreate from '../../atoms/button-create';
import DetailsCardListing from '../../atoms/details-card-listing';

// @ts-ignore
function DriverBookings({navigation, profile}) {
  const [create, setCreate] = useState(false);

  const handleCreate = () => {
    setCreate(prevState => !prevState);
  };

  const handleApprove = () => {};

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#f3f3f3',
      }}>
      <HomeHeader navigation={navigation} title={'Bookings'} main={true} />
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
            <DetailsCardListing
              profile={profile}
              onCancel={handleCreate}
              onApprove={handleApprove}
            />
          ) : (
            <ButtonCreate onClick={handleCreate} />
          )
        }
        style={{
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}
      />
    </StyledSafeAreaView>
  );
}

export default DriverBookings;
