import React from 'react';
import {Dimensions} from 'react-native';

import {StyledRow, StyledSafeAreaView} from '../../../styles/container';
import {styledText, StyledText24} from '../../../styles/text';

// @ts-ignore
function HomeHeader({title}) {
  const sans = styledText();

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-end',
        width: '100%',
        height: Dimensions.get('window').height * 0.1,
        backgroundColor: '#042F40',
      }}>
      <StyledRow>
        <StyledText24 style={[sans.bold, {color: '#fff', paddingBottom: 10}]}>
          {title}
        </StyledText24>
      </StyledRow>
    </StyledSafeAreaView>
  );
}

export default HomeHeader;
