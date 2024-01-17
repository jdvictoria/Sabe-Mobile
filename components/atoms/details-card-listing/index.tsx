import React, {useState} from 'react';
import {TextInput} from 'react-native';

import {
  StyledCol,
  StyledRow,
  StyledTouchableRow,
} from '../../../styles/container';
import {
  styledText,
  StyledText14,
  StyledText16,
  StyledText30,
} from '../../../styles/text';

// @ts-ignore
import Check from '../../../assets/icons/check.svg';
// @ts-ignore
import Cancel from '../../../assets/icons/cross.svg';

// @ts-ignore
function DetailsCardListing({profile, onCancel, onApprove}) {
  const sans = styledText();

  const [fare, setFare] = useState(0);

  return (
    <StyledCol
      style={{
        justifyContent: 'space-between',
        width: '85%',
        height: 325,
        marginTop: 25,
        marginBottom: 5,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledCol style={{width: '90%'}}>
        <StyledText14
          style={[
            sans.regular,
            {
              color: '#1FBF83',
              alignSelf: 'flex-start',
            },
          ]}>
          Fare
        </StyledText14>
        <StyledRow style={{justifyContent: 'flex-start', width: '104%'}}>
          <StyledText30
            style={[
              sans.bold,
              {
                color: '#042F40',
              },
            ]}>
            PHP{' '}
          </StyledText30>
          <TextInput
            style={[sans.bold, {fontSize: 30, color: '#042F40'}]}
            keyboardType={'numeric'}
            placeholder={'0'}
            placeholderTextColor={'#042F40'}
            value={fare}
            onChangeText={text => setFare(text)}
          />
        </StyledRow>
      </StyledCol>

      <StyledCol style={{width: '90%'}}>
        <StyledText14
          style={[
            sans.regular,
            {
              color: '#1FBF83',
              alignSelf: 'flex-start',
            },
          ]}>
          Email
        </StyledText14>
        <StyledText16
          style={[
            sans.bold,
            {
              color: '#042F40',
              alignSelf: 'flex-start',
            },
          ]}>
          {profile.email}
        </StyledText16>
      </StyledCol>

      <StyledRow style={{width: '90%'}}>
        <StyledCol style={{width: '60%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Name
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            {profile.name}
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '40%'}}>
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
            {profile.phone}
          </StyledText16>
        </StyledCol>
      </StyledRow>

      <StyledRow style={{width: '90%'}}>
        <StyledCol style={{width: '60%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Car Make
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            {profile.carMake}
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '40%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Car Series
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            {profile.carSeries}
          </StyledText16>
        </StyledCol>
      </StyledRow>

      <StyledRow style={{width: '90%'}}>
        <StyledCol style={{width: '60%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Car Color
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            {profile.carColor}
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '40%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Plate Number
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            {profile.carPlate}
          </StyledText16>
        </StyledCol>
      </StyledRow>

      <StyledCol style={{width: '90%'}}>
        <StyledText14
          style={[
            sans.regular,
            {
              color: '#1FBF83',
              alignSelf: 'flex-start',
            },
          ]}>
          Routes
        </StyledText14>
      </StyledCol>

      <StyledRow style={{justifyContent: 'flex-end', width: '90%'}}>
        <StyledTouchableRow style={{marginRight: 5}} onPress={onCancel}>
          <Cancel width={25} height={25} />
        </StyledTouchableRow>
        <StyledTouchableRow style={{marginLeft: 5}} onPress={onApprove}>
          <Check width={25} height={25} />
        </StyledTouchableRow>
      </StyledRow>
    </StyledCol>
  );
}

export default DetailsCardListing;
