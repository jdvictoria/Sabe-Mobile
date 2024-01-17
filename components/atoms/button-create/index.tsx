import React from 'react';

import {styledText, StyledText20} from '../../../styles/text';
import {StyledTouchableRow} from '../../../styles/container';

// @ts-ignore
import PlusIcon from '../../../assets/icons/plus-alt.svg';

// @ts-ignore
function ButtonCreate({onClick}) {
  const sans = styledText();

  return (
    <StyledTouchableRow
      style={{
        width: '85%',
        height: 50,
        marginTop: 25,
        backgroundColor: '#1FBF83',
        borderRadius: 10,
      }}
      onPress={onClick}>
      <StyledText20 style={[sans.bold, {color: '#fff'}]}>
        Create Listing
      </StyledText20>
      <PlusIcon width={25} height={25} />
    </StyledTouchableRow>
  );
}

export default ButtonCreate;
