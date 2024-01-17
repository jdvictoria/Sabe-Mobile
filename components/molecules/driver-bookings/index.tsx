import React, {useState} from 'react';
import {Dimensions} from 'react-native';

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
      <StyledCol
        style={{
          justifyContent: 'flex-start',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: Dimensions.get('window').height * 0.9,
          backgroundColor: '#e7e7e7',
        }}>
        {!create ? (
          <ButtonCreate onClick={handleCreate} />
        ) : (
          <DetailsCardListing
            profile={profile}
            onCancel={handleCreate}
            onApprove={handleApprove}
          />
        )}
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default DriverBookings;
