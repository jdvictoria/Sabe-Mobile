import React, {useEffect} from 'react';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';
import {styledText, StyledText60} from '../../../styles/text';

// @ts-ignore
import HomeLogo from '../../../assets/icons/home.svg';

// @ts-ignore
function Loading({navigation}) {
  const sans = styledText();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeStack');
    }, 2000);

    // Clear the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledSafeAreaView style={{backgroundColor: '#03314B'}}>
      <StyledCol>
        <HomeLogo width={75} height={75} />
      </StyledCol>
      <StyledCol style={{paddingBottom: 50}}>
        <StyledText60 style={[sans.bold, {color: '#f3f3f3'}]}>
          Sabe
        </StyledText60>
      </StyledCol>
    </StyledSafeAreaView>
  );
}

export default Loading;
