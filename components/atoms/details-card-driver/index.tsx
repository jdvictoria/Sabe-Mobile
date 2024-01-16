import React, {useState} from 'react';

import {
  StyledCol,
  StyledRow,
  StyledTouchableRow,
} from '../../../styles/container';
import {styledText, StyledText14, StyledText16} from '../../../styles/text';

// @ts-ignore
import SabeLogo from '../../../assets/icons/home-dark.svg';
// @ts-ignore
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import Check from '../../../assets/icons/check.svg';

// @ts-ignore
function DetailsCardDriver({id, data, onApprove}) {
  const sans = styledText();

  const [showORCR, setShowORCR] = useState(false);
  const [showLicense, setShowLicense] = useState(false);

  const handleShowID = () => {
    setShowORCR(prevState => !prevState);
    setShowLicense(prevState => !prevState);
  };

  const handleApprove = () => {
    onApprove(id);
  };

  return (
    <>
      <></>
      <StyledCol
        style={{
          justifyContent: 'space-between',
          width: '85%',
          height: 275,
          marginTop: 25,
          marginBottom: 5,
          paddingTop: 12.5,
          paddingBottom: 12.5,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <StyledRow
          style={{
            width: '87.5%',
            justifyContent: 'space-between',
          }}>
          <SabeLogo width={25} height={25} />
          <StyledTouchableRow onPress={handleShowID}>
            <StyledText14 style={[sans.bold, {color: '#042F40'}]}>
              View ID/s
            </StyledText14>
            <ArrowRight width={25} height={25} />
          </StyledTouchableRow>
        </StyledRow>

        <StyledCol style={{width: '90%'}}>
          <StyledText14
            style={[
              sans.regular,
              {
                color: '#1FBF83',
                alignSelf: 'flex-start',
              },
            ]}>
            Email
          </StyledText14>
          <StyledText16
            style={[
              sans.bold,
              {
                color: '#042F40',
                alignSelf: 'flex-start',
              },
            ]}>
            {data.email}
          </StyledText16>
        </StyledCol>

        <StyledRow style={{width: '90%'}}>
          <StyledCol style={{width: '60%'}}>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Name
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.name}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '40%'}}>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Phone
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.phone}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledRow style={{width: '90%'}}>
          <StyledCol style={{width: '60%'}}>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Car Make
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.carMake}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '40%'}}>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Car Series
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.carSeries}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledRow style={{width: '90%'}}>
          <StyledCol style={{width: '60%'}}>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Car Color
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.carColor}
            </StyledText16>
          </StyledCol>
          <StyledCol style={{width: '40%'}}>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Plate Number
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.carPlate}
            </StyledText16>
          </StyledCol>
        </StyledRow>

        <StyledRow
          style={{
            width: '90%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <StyledCol>
            <StyledText14
              style={[
                sans.regular,
                {
                  color: '#1FBF83',
                  alignSelf: 'flex-start',
                },
              ]}>
              Type
            </StyledText14>
            <StyledText16
              style={[
                sans.bold,
                {
                  color: '#042F40',
                  alignSelf: 'flex-start',
                },
              ]}>
              {data.type.toUpperCase()}
            </StyledText16>
          </StyledCol>
          <StyledRow>
            <StyledTouchableRow style={{marginLeft: 5}} onPress={handleApprove}>
              <Check width={25} height={25} />
            </StyledTouchableRow>
          </StyledRow>
        </StyledRow>
      </StyledCol>
    </>
  );
}

export default DetailsCardDriver;
