import React from 'react';
import {TextInput} from 'react-native';

import {styledText, StyledText14, StyledText30} from '../../../styles/text';
import {StyledCol, StyledRow} from '../../../styles/container';

// @ts-ignore
function InputPax({pax, setPax}) {
  const sans = styledText();

  return (
    <StyledCol style={{width: '40%'}}>
      <StyledText14
        style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
        Passenger/s
      </StyledText14>
      <StyledRow style={{alignSelf: 'flex-start'}}>
        <TextInput
          style={[sans.bold, {fontSize: 30, color: '#042F40'}]}
          keyboardType={'numeric'}
          placeholder={'0'}
          placeholderTextColor={'#042F40'}
          value={pax}
          onChangeText={text => setPax(text)}
        />
        <StyledText30
          style={[sans.bold, {color: '#042F40', alignSelf: 'flex-start'}]}>
          {' '}
          PAX
        </StyledText30>
      </StyledRow>
    </StyledCol>
  );
}

export default InputPax;
