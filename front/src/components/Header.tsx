// Header.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutAsync} from '../store/slices/authSlice';
import Logo from './Logo';
import {Colors} from '../constants/colors';
import {AntDesign} from '../assets/icons';
import {Sizes} from '../constants/sizes';
import {navigate} from '../navigators/utils';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutAsync() as any);
    navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerLogo}>
        <Logo width={50} height={50} />
        <Text style={styles.headerText}>Velib</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
        <AntDesign name="logout" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoutButton: {
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.primary,
    fontFamily: 'Montserrat-SemiBold',
    marginRight: Sizes.fixPadding,
  },
  headerLogo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: Sizes.h2,
    marginLeft: Sizes.fixPadding,
    color: Colors.primary,
  },
});

export default Header;
