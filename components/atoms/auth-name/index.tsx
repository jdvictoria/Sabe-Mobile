import React from 'react';

import {StyledCol} from '../../../styles/container';
import {styledText, StyledText16} from '../../../styles/text';
import {FormTextInput} from '../../../styles/input';

// @ts-ignore
function AuthFirstName({name, setName}) {
  const sans = styledText();

  const handleNameChange = (text: string) => {
    setName(text);
  };

  return (
    <>
      <StyledCol style={{width: '100%'}}>
        <StyledText16
          style={[sans.bold, {alignSelf: 'flex-start', textAlign: 'left'}]}>
          Name
        </StyledText16>
      </StyledCol>
      <StyledCol
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}>
        <FormTextInput
          value={name}
          onChangeText={handleNameChange}
          placeholder="Juan Dela Cruz"
          placeholderTextColor="#042F40"
        />
      </StyledCol>
    </>
  );
}

export default AuthFirstName;
