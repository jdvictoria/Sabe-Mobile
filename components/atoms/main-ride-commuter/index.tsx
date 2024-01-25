import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

import ButtonNegative from '../button-negative';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';

// @ts-ignore
function MainRideCommuter({hasRequest, hasRide, handleCancel, handleEnd}: any) {
  const sans = styledText();

  return (
    <StyledCol
      style={{
        justifyContent: hasRequest ? 'space-between' : 'center',
        width: '85%',
        height: 'auto',
        minHeight: hasRequest ? 200 : 150,
        marginTop: 25,
        marginBottom: 110,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledCol style={{marginTop: hasRequest ? 15 : 0}}>
        <SabeLogo width={50} height={50} />
        {!hasRequest && !hasRide && (
          <StyledRow>
            <StyledText18 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
              You have no ongoing ride
            </StyledText18>
          </StyledRow>
        )}
        {!hasRequest && hasRide && (
          <StyledCol>
            <StyledText18 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
              RIDE ONGOING
            </StyledText18>
            <StyledRow style={{marginTop: 20}}>
              <ButtonNegative onClick={handleEnd} text={'End Ride'} />
            </StyledRow>
          </StyledCol>
        )}
        {!hasRide && hasRequest && (
          <StyledCol>
            <StyledRow>
              <StyledText18
                style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                Waiting for driver to accept
              </StyledText18>
              <AnimatedEllipsis
                style={{
                  color: '#042F40',
                  fontSize: 26,
                  letterSpacing: -2.5,
                }}
              />
            </StyledRow>
            <StyledRow style={{marginTop: 20}}>
              <ButtonNegative onClick={handleCancel} text={'Cancel'} />
            </StyledRow>
          </StyledCol>
        )}
      </StyledCol>
    </StyledCol>
  );
}

export default MainRideCommuter;
