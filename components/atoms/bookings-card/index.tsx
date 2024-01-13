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
function BookingsCard({navigation, rider}) {
  const sans = styledText();

  return (
    <StyledCol
      style={{
        justifyContent: 'space-between',
        width: '85%',
        height: 150,
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
              {rider.rider}
            </StyledText14>
            <StyledText12
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              {rider.carMake + ' ' + rider.carSeries}
            </StyledText12>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledText24 style={[sans.bold, {color: '#042F40'}]}>
            PHP {rider.fare}
          </StyledText24>
        </StyledRow>
      </StyledRow>
      <StyledRow
        style={{
          width: '87.5%',
          justifyContent: 'space-between',
        }}>
        <StyledCol>
          <StyledText12
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            {rider.timeStart}
          </StyledText12>
          <StyledText14
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {rider.route[0]}
          </StyledText14>
        </StyledCol>
        <StyledCol>
          <StyledText12
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-end'}]}>
            {rider.timeEnd}
          </StyledText12>
          <StyledText14
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-end'}]}>
            {rider.route[rider.route.length - 1]}
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
            {rider.rating}
          </StyledText14>
        </StyledRow>
        <StyledRow style={{paddingTop: 2}}>
          <CapacityLogo width={20} height={20} />
          <StyledText14
            style={[
              sans.regular,
              {color: '#9D9D9D', paddingLeft: 2.5, paddingTop: 2},
            ]}>
            {rider.passengerCount} / {rider.passengerLimit}
          </StyledText14>
        </StyledRow>
        <StyledTouchableRow
          style={{paddingTop: 2.5}}
          onPress={() => navigation.navigate('BookingsDetail')}>
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
