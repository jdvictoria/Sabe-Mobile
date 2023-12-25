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

// @ts-ignore
function AuthSignin({navigation}) {
  const sans = styledText();

  const [asUser, setAsUser] = useState(true);

  const handleChangeUser = () => {
    setAsUser(prevState => !prevState);
  };

  const handleChangeMode = () => {
    navigation.navigate('SignIn');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'space-between',
        backgroundColor: '#f3f3f3',
        marginTop: 25,
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
        <StyledRow style={{marginTop: 5}}>
          <FormButtonHalf
            style={{
              backgroundColor: asUser ? '#042F40' : '#f3f3f3',
            }}
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
            onPress={handleChangeUser}>
            <StyledText16
              style={[sans.regular, {color: !asUser ? '#f3f3f3' : '#042F40'}]}>
              Driver
            </StyledText16>
          </FormButtonHalf>
        </StyledRow>
        <StyledCol style={{width: '90%', marginTop: 10}}>
          <AuthName name={name} setName={setName} />
          <AuthEmail email={email} setEmail={setEmail} />
          <AuthPhone phone={phone} setPhone={setPhone} />
          <AuthPassword password={password} setPassword={setPassword} />
        </StyledCol>
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        <FormButton>
          <StyledText16 style={[sans.regular, {color: '#f3f3f3'}]}>
            Sign Up
          </StyledText16>
        </FormButton>
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
