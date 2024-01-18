import React from 'react';
import {Dimensions} from 'react-native';

import {
  styledText,
  StyledText14,
  StyledText16,
  StyledText26,
} from '../../../styles/text';
import {
  StyledCol,
  StyledRow,
  StyledTouchableCol,
} from '../../../styles/container';
import {alertDeleteListing} from '../../../utils/alerts.ts';

// @ts-ignore
import Trash from '../../../assets/icons/trash.svg';
import BookingCardLower from '../booking-card-lower';

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
        <StyledRow
          style={{
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledCol style={{width: '75%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Email
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.email}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '25%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Fare
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              PHP {booking.fare}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledCol
          style={{
            justifyContent: 'flex-start',
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Journey Date
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {booking.date}
          </StyledText16>
        </StyledCol>

        <StyledRow
          style={{
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Journey Start Time
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.timeStart}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Est. Journey End Time
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.timeEnd}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledRow
          style={{
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Name
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.name}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Phone
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.contact}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledRow
          style={{
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Car Make
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.carMake}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Car Series
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.carSeries}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledRow
          style={{
            width: Dimensions.get('window').width * 0.75,
            marginTop: 10,
          }}>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Car Color
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.carColor}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '50%'}}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start'},
              ]}>
              Plate Number
            </StyledText14>
            <StyledText16
              style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
              {booking.carPlate}
            </StyledText16>
          </StyledCol>
        </StyledRow>

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
