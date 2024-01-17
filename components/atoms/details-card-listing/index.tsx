import React, {useState} from 'react';
import {TextInput} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

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

  const [numDropdowns, setNumDropdowns] = useState(1);

  const removeDropdown = () => {
    setNumDropdowns(numDropdowns - 1);
  };

  const addDropdown = () => {
    setNumDropdowns(numDropdowns + 1);
  };

  const [fare, setFare] = useState('');

  const [routes, setRoutes] = useState([]);
  const [value, setValue] = useState('');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <StyledCol
      style={{
        justifyContent: 'flex-start',
        width: '85%',
        minHeight: 375,
        height: 'auto',
        marginTop: 25,
        marginBottom: 5,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <StyledCol style={{width: '90%'}}>
        <StyledRow style={{justifyContent: 'flex-end', width: '100%'}}>
          <StyledRow>
            <StyledTouchableRow style={{marginRight: 5}} onPress={onCancel}>
              <Cancel width={25} height={25} />
            </StyledTouchableRow>
            <StyledTouchableRow style={{marginLeft: 5}} onPress={onApprove}>
              <Check width={25} height={25} />
            </StyledTouchableRow>
          </StyledRow>
        </StyledRow>

        <StyledText14
          style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
          Fare
        </StyledText14>
        <StyledRow style={{justifyContent: 'flex-start', width: '104%'}}>
          <StyledText30 style={[sans.bold, {color: '#042F40'}]}>
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

      <StyledCol style={{width: '90%', marginTop: 10}}>
        <StyledText14
          style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
          Email
        </StyledText14>
        <StyledText16
          style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
          {profile.email}
        </StyledText16>
      </StyledCol>

      <StyledRow style={{width: '90%', marginTop: 10}}>
        <StyledCol style={{width: '60%'}}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Name
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {profile.name}
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '40%'}}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Phone
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {profile.phone}
          </StyledText16>
        </StyledCol>
      </StyledRow>

      <StyledRow style={{width: '90%', marginTop: 10}}>
        <StyledCol style={{width: '60%'}}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Car Make
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {profile.carMake}
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '40%'}}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Car Series
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {profile.carSeries}
          </StyledText16>
        </StyledCol>
      </StyledRow>

      <StyledRow style={{width: '90%', marginTop: 10}}>
        <StyledCol style={{width: '60%'}}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Car Color
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {profile.carColor}
          </StyledText16>
        </StyledCol>
        <StyledCol style={{width: '40%', marginTop: 10}}>
          <StyledText14
            style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
            Plate Number
          </StyledText14>
          <StyledText16
            style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
            {profile.carPlate}
          </StyledText16>
        </StyledCol>
      </StyledRow>

      <StyledCol style={{width: '90%', marginTop: 10}}>
        {[...Array(numDropdowns)].map((_, index) => (
          <StyledCol key={index}>
            <StyledText14
              style={[
                sans.regular,
                {color: '#1FBF83', alignSelf: 'flex-start', marginBottom: 5},
              ]}>
              Route {index + 1}
            </StyledText14>
            <DropDownPicker
              style={{borderColor: '#042F40', borderWidth: 2, marginBottom: 10}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setRoutes}
              setItems={setItems}
            />
          </StyledCol>
        ))}

        <StyledRow style={{justifyContent: 'space-evenly', width: '100%'}}>
          {numDropdowns >= 2 && (
            <StyledTouchableRow onPress={removeDropdown}>
              <StyledText14 style={[sans.bold, {color: '#E70000'}]}>
                Remove Route
              </StyledText14>
            </StyledTouchableRow>
          )}
          <StyledTouchableRow onPress={addDropdown}>
            <StyledText14 style={[sans.bold, {color: '#448511'}]}>
              Add Route
            </StyledText14>
          </StyledTouchableRow>
        </StyledRow>
      </StyledCol>
    </StyledCol>
  );
}

export default DetailsCardListing;
