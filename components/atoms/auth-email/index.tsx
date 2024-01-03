import React, {useState} from 'react';

import {StyledCol} from '../../../styles/container';
import {styledText, StyledText12, StyledText16} from '../../../styles/text';
import {FormTextInput} from '../../../styles/input';

// @ts-ignore
function AuthEmail({email, setEmail, validity, setValidity}) {
  const sans = styledText();

  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@dhvsu\.edu\.ph$/;

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setValidity(emailRegex.test(text));
  };

  return (
    <>
      <StyledCol style={{width: '100%'}}>
        <StyledText16
          style={[sans.bold, {alignSelf: 'flex-start', textAlign: 'left'}]}>
          Email
        </StyledText16>
        {!validity && email.length >= 1 && (
          <StyledText12
            style={[
              {position: 'absolute', right: 0, color: '#FF5656'},
              sans.regular,
            ]}>
            Input a Valid Email
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
          value={email}
          onChangeText={handleEmailChange}
          placeholder="juandelacruz@gmail.com"
          placeholderTextColor="#042F40"
          autoCapitalize="none"
        />
      </StyledCol>
    </>
  );
}

export default AuthEmail;
