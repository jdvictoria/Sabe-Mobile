import React, {useState} from 'react';
import {Dimensions, Image, ScrollView} from 'react-native';

import {
  StyledCol,
  StyledRow,
  StyledSafeAreaView,
  StyledTouchableCol,
} from '../../../styles/container';
import {styledText, StyledText14, StyledText18} from '../../../styles/text';

import {launchImageLibrary} from 'react-native-image-picker';

// @ts-ignore
import Rating from '../../../assets/icons/rating.svg';
// @ts-ignore
import Edit from '../../../assets/icons/edit.svg';
// @ts-ignore
import Person from '../../../assets/icons/person.svg';

import HomeHeader from '../../atoms/home-header';
import ButtonSettings from '../../atoms/button-settings';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// @ts-ignore
function CommuterProfile({navigation, userUID, profile, refetchProfile}) {
  const sans = styledText();

  const [isHovered, setIsHovered] = useState(false);

  const uploadPicture = async imageUri => {
    try {
      // Upload image to Firebase Storage
      const fileName =
        profile.name + '-' + imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`commuters/${fileName}`);
      const task = storageRef.putFile(imageUri);
      const downloadURL = await task.then(() => storageRef.getDownloadURL());

      const userRef = firestore().collection('Users').doc(userUID);

      await userRef.update({
        profPic: downloadURL,
      });
    } catch (error) {
      console.log('Upload Failed');
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        uploadPicture(imageUri);
      }
    });
  };

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
              onPressOut={() => setIsHovered(false)}
              onPress={openImagePicker}>
              {profile.profPic ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: 5,
                    marginBottom: 5,
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: '#042f40',
                  }}
                  source={{uri: profile.profPic}}
                />
              ) : (
                <Person width={50} height={50} />
              )}
              {isHovered && (
                <Edit width={25} height={25} style={{position: 'absolute'}} />
              )}
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
