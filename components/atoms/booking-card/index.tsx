import React from 'react';

import {StyledCol} from '../../../styles/container';
import {
  styledText,
  StyledText16,
  StyledText20,
  StyledText26,
} from '../../../styles/text';

import BookingCardLower from '../booking-card-lower';
import BookingCardUpper from '../booking-card-upper';

// @ts-ignore
function BookingCard({pickedRider}) {
  const sans = styledText();

  return (
    <>
      <StyledCol style={{width: '100%', marginTop: 10}}>
        <StyledText26 style={[sans.bold, {color: '#042F40'}]}>
          PHP {pickedRider.fare}
        </StyledText26>
        <StyledText20 style={[sans.bold, {color: '#042F40'}]}>
          {pickedRider.date}
        </StyledText20>
      </StyledCol>
      <StyledCol style={{width: '100%', marginTop: 10}}>
        <StyledText20 style={[sans.regular, {color: '#042F40'}]}>
          {pickedRider.route[0]} to{' '}
          {pickedRider.route[pickedRider.route.length - 1]}
        </StyledText20>
        <StyledText16
          style={[sans.regular, {color: '#1FBF83', marginTop: 2.5}]}>
          {pickedRider.passengerCount} / {pickedRider.passengerLimit} Passengers
          • {pickedRider.route.length} Stops
        </StyledText16>
        <StyledCol
          style={{
            width: '85%',
            height: 'auto',
            minHeight: 400,
            marginTop: 5,
            borderWidth: 1.5,
            borderColor: '#9d9d9d',
            borderRadius: 10,
          }}>
          <BookingCardUpper pickedRider={pickedRider} />
          <BookingCardLower routes={pickedRider.route} />
        </StyledCol>
      </StyledCol>
    </>
  );
}

export default BookingCard;
