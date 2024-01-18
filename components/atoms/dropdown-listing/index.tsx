import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {styledText, StyledText14} from '../../../styles/text';
import {StyledCol, StyledRow} from '../../../styles/container';

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

        const routesData = routesSnapshot.docs
          .map(doc => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {id, ...data} = doc.data();
            const labelValue = Object.entries(data).map(([label]) => ({
              label,
              value: label,
              disabled: routes.includes(label),
            }));
            return labelValue;
          })
          .flat();

        // @ts-ignore
        setItems(routesData);
      } catch (error) {
        console.error('Error fetching Routes:', error);
      }
    };

    fetchRoutes();
  }, [routes]);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value !== '') {
      const newArray = [...routes];
      if (newArray[index] !== undefined) {
        newArray[index] = value;
      } else {
        newArray.push(value);
      }
      setRoutes(newArray);
    }
  }, [value, index]);

  return (
    <StyledCol>
      <StyledRow style={{alignSelf: 'flex-start', marginBottom: 5}}>
        <StyledText14
          style={[sans.regular, {color: '#1FBF83', alignSelf: 'flex-start'}]}>
          Route {index + 1}
        </StyledText14>
        <StyledText14
          style={[
            sans.regular,
            {color: '#e70000', alignSelf: 'flex-start', marginLeft: 5},
          ]}>
          *
        </StyledText14>
      </StyledRow>
      <DropDownPicker
        searchable={true}
        itemSeparator={true}
        listMode={'SCROLLVIEW'}
        dropDownDirection="TOP"
        zIndex={3000}
        zIndexInverse={3000}
        style={{
          width: Dimensions.get('window').width * 0.75,
          borderColor: '#042F40',
          borderWidth: 2,
          marginBottom: 10,
        }}
        disabledItemLabelStyle={{
          opacity: 0.5,
          textDecorationStyle: 'dashed',
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
