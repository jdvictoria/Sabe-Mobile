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

function BookingsCard() {
  const sans = styledText();

  return (
    <StyledCol
      style={{
        justifyContent: 'space-between',
        width: '87.5%',
        height: 150,
        marginTop: 25,
        marginBottom: 5,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 20,
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
              Juan Dela Cruz
            </StyledText14>
            <StyledText12
              style={[
                sans.regular,
                {color: '#36A690', alignSelf: 'flex-start'},
              ]}>
              Toyota Corolla
            </StyledText12>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledText24 style={[sans.bold, {color: '#042F40'}]}>
            PHP 150
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
            style={[sans.regular, {color: '#36A690', alignSelf: 'flex-start'}]}>
            Start Location
          </StyledText12>
          <StyledText14
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            DHVSU Campus
          </StyledText14>
        </StyledCol>
        <StyledCol>
          <StyledText12
            style={[sans.regular, {color: '#36A690', alignSelf: 'flex-end'}]}>
            End Location
          </StyledText12>
          <StyledText14
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-end'}]}>
            SM Telabastagan
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
              {color: '#C7C7C7', paddingLeft: 2.5, paddingTop: 2},
            ]}>
            4.4
          </StyledText14>
        </StyledRow>
        <StyledRow style={{paddingTop: 2}}>
          <CapacityLogo width={20} height={20} />
          <StyledText14
            style={[
              sans.regular,
              {color: '#C7C7C7', paddingLeft: 2.5, paddingTop: 2},
            ]}>
            4 / 4
          </StyledText14>
        </StyledRow>
        <StyledTouchableRow style={{paddingTop: 2.5}}>
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
