import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText18} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';

// @ts-ignore
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import ButtonAccept from '../button-accept';
import ButtonReject from '../button-reject';
import ListingTwo from '../listing-two';
import ListingOne from '../listing-one';

// @ts-ignore
function MainRideDriver({requesteeProfile, hasRequest, hasListing}) {
  const sans = styledText();

  const handleReject = () => {
    console.log(requesteeProfile.bookerUID);
  };

  const handleAccept = () => {
    console.log(requesteeProfile.bookerUID);
  };

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
        {!hasRequest ? (
          <StyledRow>
            <StyledText18 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
              {hasListing
                ? 'Waiting for commuter request'
                : 'You have no active listing'}
            </StyledText18>
            {hasListing && (
              <AnimatedEllipsis
                style={{
                  color: '#042F40',
                  fontSize: 26,
                  letterSpacing: -2.5,
                }}
              />
            )}
          </StyledRow>
        ) : (
          <StyledCol>
            <StyledRow>
              <StyledText18
                style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
                Commuter requesting
              </StyledText18>
              <AnimatedEllipsis
                style={{
                  color: '#042F40',
                  fontSize: 26,
                  letterSpacing: -2.5,
                }}
              />
            </StyledRow>
            <ListingOne label={'Email'} data={requesteeProfile.email} />
            <ListingTwo
              labelOne={'Name'}
              dataOne={requesteeProfile.name}
              labelTwo={'Contact'}
              dataTwo={requesteeProfile.contact}
            />
            <ListingTwo
              labelOne={'Type'}
              dataOne={requesteeProfile.type}
              labelTwo={'Rating'}
              dataTwo={requesteeProfile.rating}
            />
            <StyledRow style={{marginTop: 10}}>
              <ButtonReject onClick={handleReject} />
              <ButtonAccept onClick={handleAccept} />
            </StyledRow>
          </StyledCol>
        )}
      </StyledCol>
    </StyledCol>
  );
}

export default MainRideDriver;
