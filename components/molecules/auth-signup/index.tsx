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

import AuthName from '../../atoms/auth-name';
import AuthEmail from '../../atoms/auth-email';
import AuthPassword from '../../atoms/auth-pass';
import AuthPhone from '../../atoms/auth-phone';
import AuthOrcr from '../../atoms/auth-orcr';
import AuthLicense from '../../atoms/auth-license';

import * as Progress from 'react-native-progress';

// @ts-ignore
function AuthSignin({navigation}) {
  const sans = styledText();

  const [asUser, setAsUser] = useState(true);
  const [step, setStep] = useState(1);

  const handleStep = () => {
    setStep(step + 1);
  };

  const handleChangeMode = () => {
    navigation.navigate('SignIn');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUser = () => {
    if (!asUser) {
      setStep(1);
    }
    setAsUser(prevState => !prevState);
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

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
        marginTop: 50,
        marginBottom: 25,
      }}>
      <StyledCol>
        <HomeLogo width={75} height={75} />
        <StyledText30 style={[sans.bold, {color: '#042F40'}]}>
          Sabe
        </StyledText30>
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        <StyledText14 style={[sans.regular, {color: '#042F40'}]}>
          Sign up as
        </StyledText14>
        <StyledRow style={{marginTop: 5, marginBottom: 10}}>
          <FormButtonHalf
            style={{
              backgroundColor: asUser ? '#042F40' : '#f3f3f3',
            }}
            disabled={asUser}
            onPress={handleChangeUser}>
            <StyledText16
              style={[sans.regular, {color: asUser ? '#f3f3f3' : '#042F40'}]}>
              User
            </StyledText16>
          </FormButtonHalf>
          <FormButtonHalf
            style={{
              backgroundColor: !asUser ? '#042F40' : '#f3f3f3',
            }}
            disabled={!asUser}
            onPress={handleChangeUser}>
            <StyledText16
              style={[sans.regular, {color: !asUser ? '#f3f3f3' : '#042F40'}]}>
              Driver
            </StyledText16>
          </FormButtonHalf>
        </StyledRow>
        {(asUser || !asUser) && step === 1 && (
          <StyledCol style={{width: '90%'}}>
            <AuthName name={name} setName={setName} />
            <AuthEmail
              email={email}
              setEmail={setEmail}
              validity={isValidEmail}
              setValidity={setIsValidEmail}
              asUser={asUser}
            />
            <AuthPhone
              phone={phone}
              setPhone={setPhone}
              validity={isValidPhone}
              setValidity={setIsValidPhone}
            />
            <AuthPassword
              password={password}
              setPassword={setPassword}
              setValidity={setIsValidPassword}
            />
          </StyledCol>
        )}
        {!asUser && step === 2 && (
          <StyledCol style={{width: '90%'}}>
            <AuthLicense />
            <AuthOrcr />
          </StyledCol>
        )}
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        {asUser ? (
          <FormButton
            onPress={handleButtonClick}
            disabled={
              name === '' || !isValidEmail || !isValidPhone || !isValidPassword
            }>
            {!isLoading ? (
              <StyledText16 style={[sans.regular, {color: '#f3f3f3'}]}>
                Sign Up
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
        ) : (
          <>
            {step === 1 ? (
              <FormButton
                onPress={handleStep}
                disabled={
                  name === '' ||
                  !isValidEmail ||
                  !isValidPhone ||
                  !isValidPassword
                }>
                <StyledText16 style={[sans.regular, {color: '#f3f3f3'}]}>
                  Next
                </StyledText16>
              </FormButton>
            ) : (
              <FormButton>
                {!isLoading ? (
                  <StyledText16 style={[sans.regular, {color: '#f3f3f3'}]}>
                    Sign Up
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
            )}
          </>
        )}
        <StyledRow style={{marginTop: 5}}>
          <StyledText14 style={[sans.regular, {color: '#042F40'}]}>
            Already have an account?{' '}
          </StyledText14>
          <TouchableOpacity onPress={handleChangeMode}>
            <StyledText14 style={[sans.bold, {color: '#042F40'}]}>
              Sign In
            </StyledText14>
          </TouchableOpacity>
        </StyledRow>
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default AuthSignin;
