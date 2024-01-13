import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText14, StyledText16} from '../../../styles/text';

// @ts-ignore
function BookingCardUpper({pickedRider}) {
  const sans = styledText();

  const maskEmail = (email: string) => {
    const atIndex = email.indexOf('@');
    const maskedPart = email.slice(1, atIndex).replace(/./g, '*');
    return email[0] + maskedPart + '@gmail.com';
  };

  const maskPhoneNumber = (phoneNumber: string) => {
    const visibleDigits = phoneNumber.slice(0, 2);
    const maskedPart = phoneNumber.slice(2).replace(/./g, '*');
    return visibleDigits + maskedPart;
  };

  const maskPlate = (plateNumber: string) => {
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
        style={{justifyContent: 'space-around', width: '40%', height: 125}}>
        <StyledCol style={{width: '100%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Price
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            PHP {pickedRider.fare}
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
            {pickedRider.rider}
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
            {maskPhoneNumber(pickedRider.contact)}
          </StyledText16>
        </StyledCol>
      </StyledCol>
      <StyledCol
        style={{justifyContent: 'space-around', width: '40%', height: 125}}>
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
            {pickedRider.carMake} {pickedRider.carSeries}
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
            {pickedRider.carColor}
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
            {maskPlate(pickedRider.carPlate)}
          </StyledText16>
        </StyledCol>
      </StyledCol>
    </StyledRow>
  );
}

export default BookingCardUpper;
