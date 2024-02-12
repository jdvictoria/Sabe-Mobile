import React from 'react';
import {TextInput} from 'react-native';

import {styledText, StyledText14, StyledText26} from '../../../styles/text';
import {StyledCol, StyledRow} from '../../../styles/container';

function InputFare({fare, setFare}: any) {
  const sans = styledText();

  return (
    <StyledCol style={{width: '50%'}}>
      <StyledRow style={{alignSelf: 'flex-start'}}>
        <StyledText14
          style={[
            sans.regular,
            {color: '#1FBF83', alignSelf: 'flex-start', marginLeft: 2.5},
          ]}>
          Fare
        </StyledText14>
        <StyledText14
          style={[
            sans.regular,
            {color: '#e70000', alignSelf: 'flex-start', marginLeft: 5},
          ]}>
          *
        </StyledText14>
      </StyledRow>
      <StyledRow style={{alignSelf: 'flex-start'}}>
        <StyledText26 style={[sans.bold, {color: '#042F40'}]}>
          PHP{' '}
        </StyledText26>
        <TextInput
          style={[sans.bold, {fontSize: 26, color: '#042F40'}]}
          keyboardType={'numeric'}
          placeholder={'0'}
          placeholderTextColor={'#042F40'}
          value={fare}
          onChangeText={text => setFare(text)}
        />
      </StyledRow>
    </StyledCol>
  );
}

export default InputFare;
