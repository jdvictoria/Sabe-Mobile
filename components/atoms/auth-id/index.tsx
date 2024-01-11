import React, {useState} from 'react';

import {
  StyledCol,
  StyledRow,
  StyledTouchableCol,
} from '../../../styles/container';
import {styledText, StyledText16} from '../../../styles/text';

// @ts-ignore
import PlusLogo from '../../../assets/icons/plus.svg';
// @ts-ignore
import CameraLogo from '../../../assets/icons/camera.svg';
// @ts-ignore
import UploadLogo from '../../../assets/icons/upload.svg';

function AuthId() {
  const sans = styledText();

  const [clicked, setClicked] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleClick = () => {
    setClicked(prevState => !prevState);
  };

  const handleUpload = () => {
    setUploaded(prevState => !prevState);
  };

  return (
    <>
      <StyledCol style={{width: '100%'}}>
        <StyledText16
          style={[sans.bold, {alignSelf: 'flex-start', textAlign: 'left'}]}>
          School ID
        </StyledText16>
        {!uploaded ? (
          !clicked ? (
            <StyledTouchableCol
              style={{
                width: '100%',
                height: 290,
                marginTop: 5,
                marginBottom: 5,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#042f40',
              }}
              onPress={handleClick}>
              <PlusLogo width={50} height={50} />
            </StyledTouchableCol>
          ) : (
            <StyledRow
              style={{
                width: '100%',
                marginTop: 5,
                marginBottom: 5,
                height: 290,
              }}>
              <StyledTouchableCol
                style={{
                  width: '47.5%',
                  height: 145,
                  marginRight: 10,
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: '#042f40',
                }}
                onPress={handleUpload}>
                <CameraLogo width={25} height={25} />
                <StyledText16
                  style={[sans.regular, {color: '#042F40', marginTop: 5}]}>
                  Take Photo
                </StyledText16>
              </StyledTouchableCol>
              <StyledTouchableCol
                style={{
                  width: '47.5%',
                  height: 145,
                  marginLeft: 10,
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: '#042f40',
                }}
                onPress={handleUpload}>
                <UploadLogo width={25} height={25} />
                <StyledText16
                  style={[sans.regular, {color: '#042F40', marginTop: 5}]}>
                  Upload Photo
                </StyledText16>
              </StyledTouchableCol>
            </StyledRow>
          )
        ) : (
          <StyledCol
            style={{
              width: '100%',
              height: 130,
              marginTop: 5,
              marginBottom: 5,
              borderWidth: 2,
              borderRadius: 15,
              borderColor: '#042f40',
            }}
            onPress={handleClick}>
            <StyledText16
              style={[sans.regular, {color: '#042F40', marginTop: 5}]}>
              School ID Uploaded
            </StyledText16>
          </StyledCol>
        )}
      </StyledCol>
    </>
  );
}

export default AuthId;
