import React from 'react';

import {StyledCol} from '../../../styles/container';
import {styledText, StyledText20} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

function MainRide() {
  const sans = styledText();

  return (
    <StyledCol
      style={{
        justifyContent: 'center',
        width: '85%',
        height: 'auto',
        minHeight: 150,
        marginTop: 25,
        marginBottom: 110,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledCol style={{height: 150, justifyContent: 'center'}}>
        <SabeLogo width={50} height={50} />
        <StyledText20 style={[sans.regular, {color: '#042F40', marginTop: 10}]}>
          You have no active booking.
        </StyledText20>
      </StyledCol>
    </StyledCol>
  );
}

export default MainRide;
