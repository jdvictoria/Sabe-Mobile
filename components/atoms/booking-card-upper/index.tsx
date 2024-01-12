import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText14, StyledText16} from '../../../styles/text';

// @ts-ignore
function BookingCardUpper() {
  const sans = styledText();

  return (
    <StyledRow
      style={{
        justifyContent: 'space-evenly',
        width: '100%',
        height: 'auto',
        minHeight: 150,
        borderBottomWidth: 1.5,
        borderColor: '#9d9d9d',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}>
      <StyledCol
        style={{justifyContent: 'space-around', width: '55%', height: 125}}>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Driver
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            Juan Dela Cruz
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Email
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            juandc12@gmail.com
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Phone
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            09556736262
          </StyledText16>
        </StyledCol>
      </StyledCol>
      <StyledCol
        style={{justifyContent: 'space-around', width: '35%', height: 125}}>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Make / Series
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            Toyota Corolla
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Color
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            Red
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Plate
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            XXX-XXXX
          </StyledText16>
        </StyledCol>
      </StyledCol>
    </StyledRow>
  );
}

export default BookingCardUpper;
