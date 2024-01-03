import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {
  StyledCol,
  StyledRow,
  StyledSafeAreaView,
} from '../../../styles/container';
import {
  styledText,
  StyledText14,
  StyledText16,
  StyledText30,
} from '../../../styles/text';
import {FormButton, FormButtonHalf} from '../../../styles/button';

// @ts-ignore
import HomeLogo from '../../../assets/icons/home-dark.svg';

import AuthEmail from '../../atoms/auth-email';
import AuthPassword from '../../atoms/auth-pass';
import AuthPhone from '../../atoms/auth-phone';

import * as Progress from 'react-native-progress';

// @ts-ignore
function AuthSignin({navigation}) {
  const sans = styledText();

  const handleChangeMode = () => {
    navigation.navigate('SignUp');
  };

  const [withEmail, setWithEmail] = useState(true);

  const handleWithEmail = () => {
    setWithEmail(prevState => !prevState);
  };

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      // navigation.navigate('HomeStack');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#f3f3f3',
        marginTop: 100,
        marginBottom: 50,
      }}>
      <StyledCol>
        <HomeLogo width={75} height={75} />
        <StyledText30 style={[sans.bold, {color: '#042F40'}]}>
          Sabe
        </StyledText30>
        <StyledText14 style={[sans.regular, {color: '#042F40', marginTop: 20}]}>
          Sign up with
        </StyledText14>
        <StyledRow style={{marginTop: 5, marginBottom: 10}}>
          <FormButtonHalf
            style={{
              backgroundColor: withEmail ? '#042F40' : '#f3f3f3',
            }}
            disabled={withEmail}
            onPress={handleWithEmail}>
            <StyledText16
              style={[
                sans.regular,
                {color: withEmail ? '#f3f3f3' : '#042F40'},
              ]}>
              Email
            </StyledText16>
          </FormButtonHalf>
          <FormButtonHalf
            style={{
              backgroundColor: !withEmail ? '#042F40' : '#f3f3f3',
            }}
            disabled={!withEmail}
            onPress={handleWithEmail}>
            <StyledText16
              style={[
                sans.regular,
                {color: !withEmail ? '#f3f3f3' : '#042F40'},
              ]}>
              Phone
            </StyledText16>
          </FormButtonHalf>
        </StyledRow>
      </StyledCol>
      <StyledCol style={{width: '90%'}}>
        {withEmail ? (
          <AuthEmail
            email={email}
            setEmail={setEmail}
            validity={isValidEmail}
            setValidity={setIsValidEmail}
          />
        ) : (
          <AuthPhone
            phone={phone}
            setPhone={setPhone}
            validity={isValidPhone}
            setValidity={setIsValidPhone}
          />
        )}
        <AuthPassword
          password={password}
          setPassword={setPassword}
          setValidity={setIsValidPassword}
        />
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        <FormButton
          onPress={handleButtonClick}
          disabled={!isValidEmail || !isValidPhone || !isValidPassword}>
          {!isLoading ? (
            <StyledText16 style={[sans.regular, {color: '#f3f3f3'}]}>
              Sign In
            </StyledText16>
          ) : (
            <Progress.Circle
              size={20}
              indeterminate={true}
              borderWidth={3}
              borderColor={'#f3f3f3'}
            />
          )}
        </FormButton>
        <StyledRow style={{marginTop: 5}}>
          <StyledText14 style={[sans.regular, {color: '#042F40'}]}>
            Don't have an account yet?{' '}
          </StyledText14>
          <TouchableOpacity onPress={handleChangeMode}>
            <StyledText14 style={[sans.bold, {color: '#042F40'}]}>
              Sign Up
            </StyledText14>
          </TouchableOpacity>
        </StyledRow>
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default AuthSignin;
