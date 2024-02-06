import React from 'react';
import {Image} from 'react-native';

import {
  StyledCol,
  StyledRow,
  StyledTouchableCol,
} from '../../../styles/container';
import {styledText, StyledText14} from '../../../styles/text';

import ListingOne from '../listing-one';
import ListingTwo from '../listing-two';

// @ts-ignore
import Write from '../../../assets/icons/message-write.svg';

function BookingCardPassengers({profiles}: any) {
  const sans = styledText();

  // @ts-ignore
  return profiles.map((profile, index) => (
    <StyledCol key={index} style={{width: '100%'}}>
      <StyledCol>
        {profile.profPic && (
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#042f40',
            }}
            source={{uri: profile.profPic}}
          />
        )}
        <StyledTouchableCol style={{position: 'absolute', right: -30}}>
          <Write width={25} height={25} />
        </StyledTouchableCol>
      </StyledCol>
      <StyledCol style={{marginLeft: 25}}>
        <ListingOne label={'Email'} data={profile.email} />
        <ListingTwo
          labelOne={'Commuter'}
          dataOne={profile.name}
          labelTwo={'Contact'}
          dataTwo={profile.contact}
        />
        <ListingTwo
          labelOne={'Total Rides'}
          dataOne={profile.totalRides}
          labelTwo={'Rating'}
          dataTwo={profile.rating}
        />
      </StyledCol>
    </StyledCol>
  ));
}

export default BookingCardPassengers;
