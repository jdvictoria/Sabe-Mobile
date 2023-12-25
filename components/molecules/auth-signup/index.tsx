import React from 'react';

import {
  StyledCol,
  StyledRow,
  StyledSafeAreaView,
} from '../../../styles/container';
import {
  styledText,
  StyledText12,
  StyledText16,
  StyledText30,
} from '../../../styles/text';
import {FormButton} from '../../../styles/button';

// @ts-ignore
import HomeLogo from '../../../assets/icons/home-dark.svg';
import {TouchableOpacity} from 'react-native';

// @ts-ignore
function AuthSignin({navigation}) {
  const sans = styledText();

  const handleChangeMode = () => {
    navigation.navigate('SignIn');
  };

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#f3f3f3',
        marginTop: 50,
        marginBottom: 50,
      }}>
      <StyledCol>
        <HomeLogo width={75} height={75} />
        <StyledText30 style={[sans.bold, {color: '#042F40'}]}>
          Sabe
        </StyledText30>
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        <FormButton>
          <StyledText16 style={[sans.regular, {color: '#f3f3f3'}]}>
            Sign Up
          </StyledText16>
        </FormButton>
        <StyledRow style={{marginTop: 5}}>
          <StyledText12 style={[sans.regular, {color: '#042F40'}]}>
            Already have an account?{' '}
          </StyledText12>
          <TouchableOpacity onPress={handleChangeMode}>
            <StyledText12 style={[sans.bold, {color: '#042F40'}]}>
              Sign In
            </StyledText12>
          </TouchableOpacity>
        </StyledRow>
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default AuthSignin;
