import React from 'react';

import {StyledCol} from '../../../styles/container';

import ListingOne from '../listing-one';
import ListingTwo from '../listing-two';

import {Image} from 'react-native';

function BookingCardRider({profile}: any) {
  return (
    <StyledCol>
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
      </StyledCol>
      <StyledCol style={{marginLeft: 40}}>
        <ListingOne label={'Email'} data={profile.email} />
        <ListingTwo
          labelOne={'Rider'}
          dataOne={profile.name}
          labelTwo={'Contact'}
          dataTwo={profile.contact}
        />
        <ListingTwo
          labelOne={'Car Make'}
          dataOne={profile.carMake}
          labelTwo={'Car Series'}
          dataTwo={profile.carSeries}
        />
        <ListingTwo
          labelOne={'Car Color'}
          dataOne={profile.carColor}
          labelTwo={'Plate Number'}
          dataTwo={profile.carPlate}
        />
      </StyledCol>
    </StyledCol>
  );
}

export default BookingCardRider;
