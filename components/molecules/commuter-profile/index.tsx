import React, {useState} from 'react';
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
// @ts-ignore
import Edit from '../../../assets/icons/edit.svg';

import HomeHeader from '../../atoms/home-header';
import ButtonSettings from '../../atoms/button-settings';

// @ts-ignore
function CommuterProfile({navigation, profile}) {
  const sans = styledText();

  const [isHovered, setIsHovered] = useState(false);

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
        }}
        scrollEnabled={false}>
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
              onPressIn={() => setIsHovered(true)}
              onPressOut={() => setIsHovered(false)}>
              {isHovered && <Edit width={25} height={25} />}
            </StyledTouchableCol>
            <StyledText18
              style={[sans.bold, {color: '#042F40', marginTop: 10}]}>
              {profile.name}
            </StyledText18>
            <StyledText14 style={[sans.bold, {color: '#042F40', marginTop: 5}]}>
              {profile.contact} | {profile.email}
            </StyledText14>
            <StyledRow style={{marginTop: 10}}>
              <Rating width={30} height={30} />
              <StyledText18
                style={[
                  sans.bold,
                  {color: '#042F40', marginLeft: 5, marginTop: 1.5},
                ]}>
                {profile.rating.toFixed(2)}
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
