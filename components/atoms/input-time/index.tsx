import React from 'react';

import {StyledCol} from '../../../styles/container';
import {styledText, StyledText14} from '../../../styles/text';

// @ts-ignore
function InputTime({mode, time, setTime}) {
  const sans = styledText();

  return (
    <StyledCol style={{width: '50%'}}>
      <StyledText14
        style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
        {mode}
      </StyledText14>
      <></>
    </StyledCol>
  );
}

export default InputTime;
