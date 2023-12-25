import React, {useEffect} from 'react';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';
import {styledText, StyledText60} from '../../../styles/text';

import * as Progress from 'react-native-progress';

// @ts-ignore
import HomeLogo from '../../../assets/icons/home.svg';

// @ts-ignore
function Loading({navigation}) {
  const sans = styledText();

  useEffect(() => {
    // Set a timeout to navigate to AuthStack after 2 seconds
    const timer = setTimeout(() => {
      // Navigate to the "AuthStack" screen after 2 seconds
      navigation.navigate('AuthStack');
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
      <Progress.Circle
        size={30}
        indeterminate={true}
        indeterminateAnimationDuration={1750}
        color={'#f3f3f3'}
        borderWidth={5}
      />
    </StyledSafeAreaView>
  );
}

export default Loading;
