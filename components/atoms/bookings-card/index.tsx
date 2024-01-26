import React from 'react';

import {
  StyledCol,
  StyledRow,
  StyledTouchableRow,
} from '../../../styles/container';
import {
  styledText,
  StyledText12,
  StyledText14,
  StyledText18,
  StyledText24,
} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';
// @ts-ignore
import RatingLogo from '../../../assets/icons/rating.svg';
// @ts-ignore
import ArrowRight from '../../../assets/icons/arrow-right.svg';
// @ts-ignore
import CapacityLogo from '../../../assets/icons/capacity.svg';

// @ts-ignore
function BookingsCard({
  navigation,
  profile,
  riderId,
  riderData,
  setDriverUID,
  setRiderProfile,
}) {
  const sans = styledText();

  const pickRider = () => {
    if (!profile.bookingRequest) {
      setDriverUID(riderId);
      setRiderProfile(riderData);
    }
    navigation.navigate('BookingsDetail');
  };

  return (
    <StyledCol
      style={{
        justifyContent: 'space-between',
        width: '85%',
        height: 175,
        marginTop: 25,
        marginBottom: 5,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledRow
        style={{
          width: '87.5%',
          justifyContent: 'space-between',
        }}>
        <StyledRow>
          <SabeLogo width={25} height={25} />
          <StyledCol
            style={{
              paddingLeft: 10,
            }}>
            <StyledText14
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {riderData.name}
            </StyledText14>
            <StyledText12
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              {riderData.carMake + ' ' + riderData.carSeries} (
              {riderData.carColor})
            </StyledText12>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledText24 style={[sans.bold, {color: '#042F40'}]}>
            PHP {riderData.fare}
          </StyledText24>
        </StyledRow>
      </StyledRow>

      <StyledRow
        style={{justifyContent: 'flex-start', width: '87.5%', marginTop: 10}}>
        <StyledText18 style={[sans.bold, {color: '#042F40'}]}>
          {riderData.date}
        </StyledText18>
      </StyledRow>

      <StyledRow
        style={{
          width: '87.5%',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <StyledCol>
          <StyledText12
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            {riderData.timeStart}
          </StyledText12>
          <StyledText14
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {riderData.route[0]}
          </StyledText14>
        </StyledCol>
        <StyledCol>
          <StyledText12
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-end'}]}>
            {riderData.timeEnd}
          </StyledText12>
          <StyledText14
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-end'}]}>
            {riderData.route[riderData.route.length - 1]}
          </StyledText14>
        </StyledCol>
      </StyledRow>
      <StyledRow
        style={{
          justifyContent: 'space-between',
          width: '87.5%',
          paddingTop: 5,
          borderTopWidth: 1,
          borderColor: '#c7c7c7',
        }}>
        <StyledRow>
          <RatingLogo width={25} height={25} />
          <StyledText14
            style={[
              sans.regular,
              {color: '#9D9D9D', paddingLeft: 2.5, paddingTop: 2},
            ]}>
            {riderData.rating}
          </StyledText14>
          <StyledText14
            style={[
              sans.regular,
              {color: '#9D9D9D', paddingLeft: 2.5, paddingTop: 2},
            ]}>
            ( {riderData.totalRides} )
          </StyledText14>
        </StyledRow>
        <StyledRow style={{paddingTop: 2}}>
          <CapacityLogo width={20} height={20} />
          <StyledText14
            style={[
              sans.regular,
              {color: '#9D9D9D', paddingLeft: 2.5, paddingTop: 2},
            ]}>
            {riderData.passengerCount} / {riderData.passengerLimit}
          </StyledText14>
        </StyledRow>
        <StyledTouchableRow style={{paddingTop: 2.5}} onPress={pickRider}>
          <StyledText14 style={[sans.bold, {color: '#042F40', paddingTop: 2}]}>
            VIEW DETAILS
          </StyledText14>
          <ArrowRight width={25} height={25} />
        </StyledTouchableRow>
      </StyledRow>
    </StyledCol>
  );
}

export default BookingsCard;
