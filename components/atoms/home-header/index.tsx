import React from 'react';

import {StyledCol, StyledRow} from '../../../styles/container';
import {styledText, StyledText24} from '../../../styles/text';

// @ts-ignore
function HomeHeader({title}) {
  const sans = styledText();

  return (
    <StyledCol
      style={{
        justifyContent: 'flex-end',
        width: '100%',
        height: 50,
        backgroundColor: '#042F40',
      }}>
      <StyledRow>
        <StyledText24 style={[sans.bold, {color: '#fff', paddingBottom: 15}]}>
          {title}
        </StyledText24>
      </StyledRow>
    </StyledCol>
  );
}

export default HomeHeader;
