import React from 'react';

import {
  StyledCol,
  StyledRow,
  StyledTouchableRow,
} from '../../../styles/container';
import {styledText, StyledText24} from '../../../styles/text';

// @ts-ignore
import ArrowLeft from '../../../assets/icons/arrow-left.svg';

// @ts-ignore
function HomeHeader({navigation, title, main}) {
  const sans = styledText();

  const handleBack = () => {
    if (title === 'Booking Detail') {
      navigation.navigate('Bookings');
    }
  };

  return (
    <StyledCol
      style={{
        justifyContent: 'flex-end',
        width: '100%',
        height: 50,
        backgroundColor: '#042F40',
      }}>
      <StyledRow
        style={{
          width: '90%',
          justifyContent: main ? 'center' : 'space-between',
          paddingBottom: 15,
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
    </StyledCol>
  );
}

export default HomeHeader;
