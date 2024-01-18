import React from 'react';
import {Dimensions} from 'react-native';

import {styledText, StyledText14, StyledText26} from '../../../styles/text';
import {
  StyledCol,
  StyledRow,
  StyledTouchableCol,
} from '../../../styles/container';
import {alertDeleteListing} from '../../../utils/alerts.ts';

// @ts-ignore
import Trash from '../../../assets/icons/trash.svg';
import BookingCardLower from '../booking-card-lower';
import ListingTwo from '../listing-two';
import ListingOne from '../listing-one';

// @ts-ignore
function DetailsCardListing({booking}) {
  const sans = styledText();

  return (
    <>
      <StyledRow
        style={{
          justifyContent: 'space-between',
          width: Dimensions.get('window').width * 0.85,
          height: 40,
          marginTop: 15,
        }}>
        <StyledCol style={{width: 25, height: 25}} />
        <StyledText26 style={[sans.bold, {color: '#1FBF83'}]}>
          Active Listing
        </StyledText26>
        <StyledTouchableCol
          style={{height: '100%'}}
          onPress={alertDeleteListing}>
          <Trash width={20} height={20} />
        </StyledTouchableCol>
      </StyledRow>
      <StyledCol
        style={{
          justifyContent: 'flex-start',
          width: Dimensions.get('window').width * 0.85,
          minHeight: 375,
          height: 'auto',
          marginTop: 10,
          padding: 15,
          marginBottom: 105,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <ListingTwo
          labelOne={'Email'}
          dataOne={booking.email}
          labelTwo={'Fare'}
          dataTwo={booking.fare}
        />

        <ListingOne label={'Journey Date'} data={booking.date} />

        <ListingTwo
          labelOne={'Journey Start Time'}
          dataOne={booking.timeStart}
          labelTwo={'Est. Journey End Time'}
          dataTwo={booking.timeEnd}
        />

        <ListingTwo
          labelOne={'Name'}
          dataOne={booking.name}
          labelTwo={'Phone'}
          dataTwo={booking.contact}
        />

        <ListingTwo
          labelOne={'Car Make'}
          dataOne={booking.carMake}
          labelTwo={'Car Series'}
          dataTwo={booking.carSeries}
        />

        <ListingTwo
          labelOne={'Car Color'}
          dataOne={booking.carColor}
          labelTwo={'Plate Number'}
          dataTwo={booking.carPlate}
        />

        <StyledCol
          style={{
            justifyContent: 'flex-start',
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Route
          </StyledText14>
          <BookingCardLower routes={booking.route} />
        </StyledCol>
      </StyledCol>
    </>
  );
}

export default DetailsCardListing;
