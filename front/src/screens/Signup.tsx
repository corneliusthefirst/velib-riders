import React, {useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {navigate} from '../navigators/utils';
import {Colors} from '../constants/colors';
import {Sizes} from '../constants/sizes';
import Logo from '../components/Logo';
import {signupValidationSchema} from '../utils/schema.validations';
import {useDispatch, useSelector} from 'react-redux';
import {signupAsync} from '../store/slices/authSlice';
import {RootState} from '../store';
import {Box, Spinner} from 'native-base';
import backgroundImage from '../assets/images/app-background.png';
import CustomImageBackground from '../components/CustomImageBackground';
import {Form} from '../components/Form';
import {ErrorComponent} from '../components/ErrorComponent';
import CustomTextInput from '../components/CustomTextInput';
import {FormRef} from '../utils/types';

const Signup = () => {
  const {width} = useWindowDimensions();
  const isMobile = width < 600;
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        form: {
          width: isMobile ? '100%' : 400,
          marginHorizontal: isMobile ? 0 : Sizes.fixPadding * 2,
        },
      }),
    [isMobile],
  );

  const onSubmit = async (values: typeof initialValues) => {
    const {email, password} = values;
    await dispatch(signupAsync({email, password}) as any);
    // go to login
    navigate('Login');
  };

  const formRef = React.useRef<FormRef>(null);
  const inputRefs = {
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
    confirmPassword: useRef<TextInput>(null),
  };

  const handleSignupPress = () => {
    formRef?.current && formRef.current?.submit();
  };

  const goToLogin = () => {
    navigate('Login');
  };

  return (
    <CustomImageBackground source={{uri: backgroundImage}}>
      <View style={styles.container}>
        <Box
          style={[styles.form, dynamicStyles.form]}
          bg={{
            linearGradient: Colors.linearGradientBlack,
          }}>
          <Logo />
          <Text style={styles.welcomMessage}>Welcome To Velib</Text>
          <Form
            key={'signup'}
            validationSchema={signupValidationSchema}
            initialValue={initialValues}
            ref={formRef}
            onSubmit={onSubmit}
            ErrorComponent={ErrorComponent}>
            <CustomTextInput
              ref={inputRefs.email}
              name="email"
              style={styles.input}
              placeholder="Email"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                inputRefs.password?.current?.focus();
              }}
            />

            <CustomTextInput
              ref={inputRefs.password}
              name="password"
              style={styles.input}
              placeholder="Password"
              blurOnSubmit={false}
              secureTextEntry
              onSubmitEditing={() => {
                inputRefs.confirmPassword?.current?.focus();
              }}
            />

            <CustomTextInput
              ref={inputRefs.confirmPassword}
              style={styles.input}
              name="confirmPassword"
              placeholder="Confirm Password"
              blurOnSubmit={false}
              secureTextEntry
            />
          </Form>

          <TouchableOpacity
            onPress={handleSignupPress}
            style={styles.signupBtn}>
            <Box
              style={styles.signupBtnBox}
              bg={{
                linearGradient: Colors.linearGradientButton,
              }}
              justifyContent={'center'}
              alignItems={'center'}>
              {isLoading ? (
                <Spinner
                  accessibilityLabel="Signup Loading"
                  colorScheme={Colors.white}
                />
              ) : (
                <Text style={styles.signupText}>Signup</Text>
              )}
            </Box>
          </TouchableOpacity>

          {/* already signup login*/}
          <View style={styles.alreadyAUserRow}>
            <Text style={styles.alreadyAUser}>Already a user?</Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </Box>
      </View>
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.fixPadding * 2,
  },
  form: {
    display: 'flex',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixBorderRadius * 2,
  },
  signupText: {
    color: Colors.white,
    fontFamily: 'Montserrat-SemiBold',
  },
  signupBtn: {
    display: 'flex',
    width: '100%',
  },
  signupBtnBox: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixBorderRadius * 0.5,
    paddingVertical: Sizes.fixPadding,
  },
  welcomMessage: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.primary,
    fontSize: Sizes.h1,
    marginBottom: Sizes.fixPadding * 4,
  },
  alreadyAUserRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Sizes.fixPadding,
    width: '100%',
  },
  loginText: {
    color: Colors.primary,
    marginLeft: Sizes.fixPadding * 0.5,
    fontFamily: 'Montserrat-SemiBold',
  },
  input: {
    marginBottom: Sizes.fixPadding * 2,
  },
  alreadyAUser: {
    color: Colors.darkGray,
    fontFamily: 'Montserrat-Regular',
    fontSize: Sizes.h6,
  },
});

export default Signup;
