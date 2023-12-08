import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface CustomImageBackgroundProps extends ImageBackgroundProps {
  customStyle?: ViewStyle;
}

const CustomImageBackground: React.FC<CustomImageBackgroundProps> = ({
  customStyle,
  ...props
}) => {
  return (
    <ImageBackground
      {...props}
      style={[styles.imageBackground, customStyle, props.style]}>
      {props.children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomImageBackground;
