import React, {useState} from 'react';

import {
  StyledCol,
  StyledRow,
  StyledSafeAreaView,
  StyledTouchableRow,
} from '../../../styles/container';
import {
  styledText,
  StyledText14,
  StyledText16,
  StyledText30,
} from '../../../styles/text';
import {FormButton, FormButtonHalf} from '../../../styles/button';

import {
  alertEmailVerification,
  alertInvalidEmail,
  alertSignInError,
  alertPasswordReset,
} from '../../../utils/alerts.ts';

// @ts-ignore
import HomeLogo from '../../../assets/icons/home-dark.svg';

import AuthEmail from '../../atoms/auth-email';
import AuthPassword from '../../atoms/auth-pass';
import AuthPhone from '../../atoms/auth-phone';

import * as Progress from 'react-native-progress';

import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function AuthSignin({navigation, setProfile, setUserUID, setIsLoggedIn}: any) {
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

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    await firebase.auth().currentUser?.reload();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        if (firebase.auth().currentUser?.emailVerified) {
          const userDocument = await firestore()
            .collection('Users')
            .doc(firebase.auth().currentUser?.uid)
            .get();
          if (userDocument.exists) {
            const userData = userDocument.data();
            setUserUID(firebase.auth().currentUser?.uid);
            setIsLoggedIn(true);
            setProfile(userData);

            // @ts-ignore
            if (userData.type === 'admin') {
              navigation.navigate('AdminStack');
            } else {
              navigation.navigate('HomeStack');
            }
          } else {
            console.log('Document does not exist');
          }
        } else {
          await firebase.auth().currentUser?.sendEmailVerification();
          alertEmailVerification();
        }
      })
      .catch(error => {
        alertSignInError();
      });

    setEmail('');
    setPassword('');
    setPhone('');
    setIsLoading(false);
  };

  const handleForgotPass = async () => {
    await firebase.auth().currentUser?.reload();
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(async () => {
        alertPasswordReset();
      })
      .catch(error => {
        alertInvalidEmail();
      });
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
            signIn={true}
            email={email}
            setEmail={setEmail}
            validity={isValidEmail}
            setValidity={setIsValidEmail}
            asUser={false}
          />
        ) : (
          <AuthPhone
            signIn={true}
            phone={phone}
            setPhone={setPhone}
            validity={isValidPhone}
            setValidity={setIsValidPhone}
          />
        )}
        <AuthPassword
          signIn={true}
          password={password}
          setPassword={setPassword}
          setValidity={setIsValidPassword}
          handleForgotPass={handleForgotPass}
        />
      </StyledCol>
      <StyledCol style={{width: '100%'}}>
        <FormButton
          onPress={handleSignIn}
          disabled={(!isValidEmail || !isValidPhone) && !isValidPassword}>
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
          <StyledTouchableRow onPress={handleChangeMode}>
            <StyledText14 style={[sans.bold, {color: '#042F40'}]}>
              Sign Up
            </StyledText14>
          </StyledTouchableRow>
        </StyledRow>
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default AuthSignin;
