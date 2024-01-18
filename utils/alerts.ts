import {Alert} from 'react-native';

export const alertEmailVerification = () =>
  Alert.alert('Unverified Email', 'Check your email to verify your account.', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export const alertInvalidEmail = () =>
  Alert.alert('Invalid Email', 'Please provide a valid email.', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export const alertSignInError = () =>
  Alert.alert('Sign In Error', 'Invalid Email / Password', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export const alertPasswordReset = () =>
  Alert.alert(
    'Password Reset Link',
    'Check your email and reset your password.',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  );

export const alertMissingDetails = () =>
  Alert.alert(
    'Insufficient Details',
    'Fill up all inputs with the red asterisk.',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  );

export const alertDeleteListing = () =>
  Alert.alert('Delete Listing', 'Do you want to delete your listing?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Delete', onPress: () => console.log('OK Pressed')},
  ]);
