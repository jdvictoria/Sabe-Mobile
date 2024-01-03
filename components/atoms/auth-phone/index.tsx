import React, {useState} from 'react';

import {StyledCol} from '../../../styles/container';
import {styledText, StyledText12, StyledText16} from '../../../styles/text';
import {FormTextInput} from '../../../styles/input';

// @ts-ignore
function AuthFirstName({phone, setPhone}) {
  const sans = styledText();

  const phoneRegex = /^09\d{2}-\d{3}-\d{4}$/; // Adjust the regex according to your specific requirements

  const [isValidPhone, setIsValidPhone] = useState(true);

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    setIsValidPhone(phoneRegex.test(text));
  };

  return (
    <>
      <StyledCol style={{width: '100%'}}>
        <StyledText16
          style={[sans.bold, {alignSelf: 'flex-start', textAlign: 'left'}]}>
          Phone
        </StyledText16>
        {!isValidPhone && (
          <StyledText12
            style={[
              sans.regular,
              {position: 'absolute', right: 0, color: '#FF5656'},
            ]}>
            Must be 11 digits
          </StyledText12>
        )}
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
          keyboardType="numeric"
          value={phone}
          onChangeText={handlePhoneChange}
          placeholder="09XX-XXX-XXXX"
          placeholderTextColor="#042F40"
        />
      </StyledCol>
    </>
  );
}

export default AuthFirstName;
