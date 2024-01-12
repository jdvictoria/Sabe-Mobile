import React from 'react';

import {
  StyledCol,
  StyledRow,
  StyledTouchableRow,
} from '../../../styles/container';
import {
  styledText,
  StyledText16,
  StyledText18,
  StyledText20,
} from '../../../styles/text';

// @ts-ignore
import InfoLogo from '../../../assets/icons/info.svg';
import BookingCardLower from '../booking-card-lower';
import BookingCardUpper from '../booking-card-upper';

// @ts-ignore
function BookingCard({Routes}) {
  const sans = styledText();

  return (
    <>
      <StyledCol style={{marginTop: 15}}>
        <StyledText20 style={[sans.regular, {color: '#042F40'}]}>
          {Routes[0]} to {Routes[Routes.length - 1]}
        </StyledText20>
        <StyledText16 style={[sans.regular, {color: '#1FBF83'}]}>
          4 Passengers • {Routes.length} Stops
        </StyledText16>
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        <StyledRow
          style={{
            justifyContent: 'space-between',
            width: '85%',
          }}>
          <StyledText18 style={[sans.regular, {color: '#042F40'}]}>
            Journey Details
          </StyledText18>
          <StyledTouchableRow>
            <InfoLogo width={18} height={18} />
            <StyledText18
              style={[sans.regular, {color: '#9D9D9D', paddingLeft: 2.5}]}>
              Info
            </StyledText18>
          </StyledTouchableRow>
        </StyledRow>
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
          <BookingCardUpper />
          <BookingCardLower Routes={Routes} />
        </StyledCol>
      </StyledCol>
    </>
  );
}

export default BookingCard;
