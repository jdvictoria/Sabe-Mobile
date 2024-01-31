import React from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {
  StyledCol,
  StyledRow,
  StyledSafeAreaView,
  StyledTouchableCol,
} from '../../../styles/container';
import {styledText, StyledText14, StyledText18} from '../../../styles/text';

// @ts-ignore
import Rating from '../../../assets/icons/rating.svg';

import HomeHeader from '../../atoms/home-header';
import ButtonSettings from '../../atoms/button-settings';

// @ts-ignore
function CommuterProfile({navigation}) {
  const sans = styledText();

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Profile'}
        main={true}
        fromProfile={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: Dimensions.get('window').height * 0.89,
          backgroundColor: '#e7e7e7',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <StyledCol style={{width: '100%', marginTop: 25}}>
          <StyledCol>
            <StyledTouchableCol
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#fff',
                borderRadius: 50,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            />
            <StyledText18
              style={[sans.bold, {color: '#042F40', marginTop: 10}]}>
              Joshua Arlo Victoria
            </StyledText18>
            <StyledText14 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
              09556736262 | vjoshuaarlo12@gmail.com
            </StyledText14>
            <StyledRow style={{marginTop: 10}}>
              <Rating width={30} height={30} />
              <StyledText18
                style={[
                  sans.bold,
                  {color: '#042F40', marginLeft: 5, marginTop: 1.5},
                ]}>
                4.5
              </StyledText18>
            </StyledRow>
          </StyledCol>
          <StyledCol style={{width: '100%', marginTop: 10}}>
            <ButtonSettings setting={'Frequently Asked Questions'} />
            <ButtonSettings setting={'Share To Friends'} />
            <ButtonSettings setting={'Contact Support'} />
            <ButtonSettings setting={'About Us'} />
          </StyledCol>
        </StyledCol>
      </ScrollView>
    </StyledSafeAreaView>
  );
}

export default CommuterProfile;
