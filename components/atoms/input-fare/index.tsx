import React from 'react';
import {TextInput} from 'react-native';

import {styledText, StyledText14, StyledText26} from '../../../styles/text';
import {StyledCol, StyledRow} from '../../../styles/container';

// @ts-ignore
function InputFare({fare, setFare}) {
  const sans = styledText();

  return (
    <StyledCol style={{width: '50%'}}>
      <StyledText14
        style={[
          sans.regular,
          {color: '#1FBF83', alignSelf: 'flex-start', marginLeft: 5},
        ]}>
        Fare
      </StyledText14>
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
