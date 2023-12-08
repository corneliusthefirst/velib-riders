import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/colors';
import {Sizes} from '../constants/sizes';

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({error}) => {
  return (
    <View style={[styles.errorView]}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: Sizes.fixPadding,
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: Sizes.h6,
    fontFamily: 'Montserrat-Regular',
  },
});

export {ErrorComponent};
