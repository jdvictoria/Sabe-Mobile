import React from 'react';

import {
  StyledCol,
  StyledRow,
  StyledSafeAreaView,
  StyledTouchableRow,
} from '../../../styles/container';
import {styledText, StyledText24} from '../../../styles/text';

// @ts-ignore
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import {Dimensions} from 'react-native';

// @ts-ignore
function HomeHeader({navigation, title, main}) {
  const sans = styledText();

  const handleBack = () => {
    if (title === 'Booking Detail') {
      navigation.navigate('Bookings');
    }
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
          justifyContent: main ? 'center' : 'space-between',
          paddingBottom: 11,
        }}>
        {!main && (
          <StyledTouchableRow onPress={handleBack}>
            <ArrowLeft width={30} height={30} />
          </StyledTouchableRow>
        )}
        <StyledText24 style={[sans.bold, {color: '#fff'}]}>
          {title}
        </StyledText24>
        {!main && <StyledRow style={{width: 30, height: 30}} />}
      </StyledRow>
    </StyledSafeAreaView>
  );
}

export default HomeHeader;
