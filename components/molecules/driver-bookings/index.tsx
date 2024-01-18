import React, {useState} from 'react';
import {Dimensions, FlatList} from 'react-native';

import {StyledSafeAreaView} from '../../../styles/container';

import HomeHeader from '../../atoms/home-header';
import ButtonCreate from '../../atoms/button-create';
import DetailsCardListing from '../../atoms/details-card-listing';

import {alertMissingDetails} from '../../../utils/alerts.ts';

// @ts-ignore
function DriverBookings({navigation, profile}) {
  const [create, setCreate] = useState(false);

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

  const handleApprove = () => {
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
      console.log('approved');
    }
  };

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
