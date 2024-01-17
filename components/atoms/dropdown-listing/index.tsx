import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {styledText, StyledText14} from '../../../styles/text';
import {StyledCol} from '../../../styles/container';

import DropDownPicker from 'react-native-dropdown-picker';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function DropdownListing({index, routes, setRoutes}) {
  const sans = styledText();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesSnapshot = await firestore().collection('Routes').get();

        // Extract data from the snapshot and format it for the items state
        const routesData = routesSnapshot.docs
          .map(doc => {
            const {id, ...data} = doc.data();
            const labelValue = Object.entries(data).map(([label]) => ({
              label,
              value: label,
            }));
            return labelValue;
          })
          .flat(); // Flatten the array of arrays into a single array

        setItems(routesData);
      } catch (error) {
        console.error('Error fetching Routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  console.log(routes);
  console.log(value);
  return (
    <StyledCol>
      <StyledText14
        style={[
          sans.regular,
          {color: '#1FBF83', alignSelf: 'flex-start', marginBottom: 5},
        ]}>
        Route {index + 1}
      </StyledText14>
      <DropDownPicker
        dropDownDirection="TOP"
        zIndex={3000}
        zIndexInverse={3000}
        style={{
          width: Dimensions.get('window').width * 0.75,
          borderColor: '#042F40',
          borderWidth: 2,
          marginBottom: 10,
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
      />
    </StyledCol>
  );
}

export default DropdownListing;
