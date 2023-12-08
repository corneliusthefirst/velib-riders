import React, {RefObject, forwardRef, useState} from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import {MaterialCommunityIcons} from '../assets/icons';
import {Colors} from '../constants/colors';
import {Sizes} from '../constants/sizes';
import {CustomTextInputProps} from '../utils/types';
import {Input} from 'native-base';

const InpComp = (
  {secureTextEntry, onChange, style, ...props}: CustomTextInputProps,
  ref: React.Ref<TextInput>,
) => {
  const [passwordVisible, setPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      <Input
        ref={ref as RefObject<TextInput>}
        placeholderTextColor={Colors.darkGray}
        selectionColor={Colors.primary}
        secureTextEntry={secureTextEntry && !passwordVisible}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={onChange}
        w={{
          base: '100%',
          md: '100%',
        }}
        backgroundColor={Colors.darkBlue}
        rightElement={
          secureTextEntry ? (
            <Pressable
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}
              style={({pressed}) => [
                styles.passwordVisibilityIcon,
                {opacity: pressed ? 0.6 : 1},
              ]}>
              <MaterialCommunityIcons
                color={Colors.white}
                size={Sizes.h4}
                name={passwordVisible ? 'eye' : 'eye-off'}
              />
            </Pressable>
          ) : undefined
        }
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    borderRadius: Sizes.fixBorderRadius * 0.5,
  },
  passwordVisibilityIcon: {
    padding: 10,
  },
});

const CustomTextInput = forwardRef(InpComp);
export default CustomTextInput;
