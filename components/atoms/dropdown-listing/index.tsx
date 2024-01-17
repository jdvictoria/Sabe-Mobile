import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {styledText, StyledText14} from '../../../styles/text';
import {StyledCol} from '../../../styles/container';

import DropDownPicker from 'react-native-dropdown-picker';

import firestore from '@react-native-firebase/firestore';

// @ts-ignore
function DropdownListing({index, routes, setRoutes}) {
  const sans = styledText();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesSnapshot = await firestore().collection('Routes').get();

        // Extract data from the snapshot without including the 'id' field
        const routesData = routesSnapshot.docs.map(doc => {
          const {id, ...data} = doc.data();
          return {
            ...data,
          };
        });

        setRoutes(routesData);
      } catch (error) {
        console.error('Error fetching Routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  console.log(data);

  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleDropDownChange = index => {
    const updatedRoutes = [...routes];
    updatedRoutes[index] = value;
    setRoutes(updatedRoutes);
  };

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
        zIndex={3000}
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
        setValue={selectedValue => {
          setValue(selectedValue);
          handleDropDownChange(index);
        }}
        setItems={setItems}
      />
    </StyledCol>
  );
}

export default DropdownListing;
