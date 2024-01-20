import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

function MainRideDriver() {
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
      <StyledCol style={{marginTop: 0}}>
        <SabeLogo width={50} height={50} />
        <StyledRow>
          <StyledText18
            style={[sans.regular, {color: '#042F40', marginTop: 5}]}>
            Waiting for passenger request
          </StyledText18>
          <AnimatedEllipsis
            style={{
              color: '#042F40',
              fontSize: 26,
              letterSpacing: -2.5,
            }}
          />
        </StyledRow>
      </StyledCol>
    </StyledCol>
  );
}

export default MainRideDriver;
