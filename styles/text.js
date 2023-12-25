import styled from 'styled-components';
import {StyleSheet} from 'react-native';

export const StyledText60 = styled.Text`
  align-self: center;
  text-align: center;

  font-size: 60px;
`;

export const StyledText40 = styled.Text`
  align-self: center;
  text-align: center;

  font-size: 40px;
`;

export const StyledText30 = styled.Text`
  align-self: center;
  text-align: center;

  font-size: 30px;
`;

export const StyledText17 = styled.Text`
  align-self: flex-start;
  text-align: center;

  font-size: 17px;
`;

export const StyledText16 = styled.Text`
  align-self: center;
  text-align: center;

  font-size: 16px;
`;

export const StyledText12 = styled.Text`
  align-self: center;
  text-align: center;

  font-size: 12px;
`;

export const styledText = () => {
  return StyleSheet.create({
    bold: {
      fontFamily: 'ProductSans-Bold',
    },
    bolditalic: {
      fontFamily: 'ProductSans-BoldItalic',
    },
    italic: {
      fontFamily: 'ProductSans-Italic',
    },
    regular: {
      fontFamily: 'ProductSans-Regular',
    },
  });
};
