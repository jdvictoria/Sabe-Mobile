import React from 'react';
import {Dimensions} from 'react-native';

import {
  StyledRow,
  StyledSafeAreaView,
  StyledTouchableRow,
} from '../../../styles/container';
import {styledText, StyledText24} from '../../../styles/text';

// @ts-ignore
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
// @ts-ignore
import Logout from '../../../assets/icons/logout.svg';

import auth from '@react-native-firebase/auth';

// @ts-ignore
function HomeHeader({navigation, title, main, fromProfile}) {
  const sans = styledText();

  const handleBack = () => {
    if (title === 'Booking Detail') {
      navigation.navigate('Bookings');
    }
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('AuthStack');
  };

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-end',
        width: '100%',
        height: Dimensions.get('window').height * 0.105,
        backgroundColor: '#042F40',
        zIndex: 2,
      }}>
      <StyledRow
        style={{
          width: '90%',
          justifyContent: fromProfile || !main ? 'space-between' : 'center',
          paddingBottom: 11,
        }}>
        {!main && (
          <StyledTouchableRow onPress={handleBack}>
            <ArrowLeft width={30} height={30} />
          </StyledTouchableRow>
        )}
        {fromProfile && <StyledRow style={{width: 30, height: 30}} />}
        <StyledText24 style={[sans.bold, {color: '#fff'}]}>
          {title}
        </StyledText24>
        {!main && <StyledRow style={{width: 30, height: 30}} />}
        {fromProfile && (
          <StyledTouchableRow onPress={handleLogout}>
            <Logout width={30} height={30} />
          </StyledTouchableRow>
        )}
      </StyledRow>
    </StyledSafeAreaView>
  );
}

export default HomeHeader;
