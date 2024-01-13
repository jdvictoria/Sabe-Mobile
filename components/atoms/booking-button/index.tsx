import React from 'react';

import {styledText, StyledText20} from '../../../styles/text';
import {StyledTouchableRow} from '../../../styles/container';

function BookingButton() {
  const sans = styledText();

  return (
    <StyledTouchableRow
      style={{
        width: '85%',
        height: 50,
        marginTop: 2.5,
        marginBottom: 10,
        backgroundColor: '#1FBF83',
        borderRadius: 10,
      }}>
      <StyledText20 style={[sans.regular, {color: '#fff'}]}>
        Book Now
      </StyledText20>
    </StyledTouchableRow>
  );
}

export default BookingButton;
