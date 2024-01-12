import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText14, StyledText16} from '../../../styles/text';

// @ts-ignore
function BookingCardUpper() {
  const sans = styledText();

  const maskEmail = email => {
    const atIndex = email.indexOf('@');
    const maskedPart = email.slice(1, atIndex).replace(/./g, '*');
    return email[0] + maskedPart + '@gmail.com';
  };

  const maskPhoneNumber = phoneNumber => {
    const visibleDigits = phoneNumber.slice(0, 2);
    const maskedPart = phoneNumber.slice(2).replace(/./g, '*');
    return visibleDigits + maskedPart;
  };

  const maskPlate = plateNumber => {
    const visiblePart = plateNumber.replace(/[^-]/g, '*');
    return visiblePart;
  };

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
            {maskEmail('juandc12@gmail.com')}
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
            {maskPhoneNumber('09556736262')}
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
            {maskPlate('XEX - 123')}
          </StyledText16>
        </StyledCol>
      </StyledCol>
    </StyledRow>
  );
}

export default BookingCardUpper;
