import React from 'react';
import {Image, StyleSheet} from 'react-native';
import velibLogo from '../assets/images/velib-logo.png';

interface LogoProps {
  style?: Record<string, unknown>;
  width?: number;
  height?: number;
}

export default function Logo({style, width, height}: LogoProps) {
  const styles = StyleSheet.create({
    image: style
      ? style
      : {
          width: width || 110,
          height: height || 110,
        },
  });
  return <Image source={{uri: velibLogo}} style={styles.image} />;
}
