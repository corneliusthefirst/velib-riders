import React, {useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {loginValidationSchema} from '../utils/schema.validations';
import {navigate} from '../navigators/utils';
import {Colors} from '../constants/colors';
import {Sizes} from '../constants/sizes';
import {Form} from '../components/Form';
import Logo from '../components/Logo';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {Box, Spinner} from 'native-base';
import {loginAsync} from '../store/slices/authSlice';
import backgroundImage from '../assets/images/app-background.png';
import CustomImageBackground from '../components/CustomImageBackground';
import {ErrorComponent} from '../components/ErrorComponent';
import CustomTextInput from '../components/CustomTextInput';
import {FormRef} from '../utils/types';

const Login = () => {
  const {width} = useWindowDimensions();
  const isMobile = width < 600;
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const initialValues = {
    email: '',
    password: '',
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('Home');
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: typeof initialValues) => {
    await dispatch(loginAsync(values) as any);
    navigate('Home');
  };

  const formRef = React.useRef<FormRef>(null);
  const inputRefs = {
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
  };

  const handleLoginPress = () => {
    formRef?.current && formRef.current?.submit();
  };

  const goToSignup = () => {
    navigate('Signup');
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
          <Text style={styles.welcomMessage}>Welcome back.</Text>
          <Form
            key={'login'}
            validationSchema={loginValidationSchema}
            initialValue={initialValues}
            ref={formRef}
            onSubmit={onSubmit}
            ErrorComponent={ErrorComponent}>
            <CustomTextInput
              ref={inputRefs.email}
              style={styles.input}
              name="email"
              inputAccessoryViewID="email"
              placeholder="Email"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                inputRefs.password?.current?.focus();
              }}
            />

            <CustomTextInput
              ref={inputRefs.password}
              style={styles.input}
              name="password"
              inputAccessoryViewID="password"
              placeholder="Password"
              blurOnSubmit={false}
              secureTextEntry
            />
          </Form>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLoginPress}>
            <Box
              style={styles.loginBtnBox}
              bg={{
                linearGradient: Colors.linearGradientButton,
              }}>
              {isLoading ? (
                <Spinner
                  accessibilityLabel="Login Loading"
                  colorScheme={Colors.white}
                />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </Box>
          </TouchableOpacity>

          <View style={styles.notAMemberRow}>
            <Text style={styles.notAMemberText}>Not a member?</Text>
            <TouchableOpacity onPress={goToSignup}>
              <Text style={styles.signUpText}>Signup</Text>
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
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixBorderRadius * 2,
  },
  notAMemberRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Sizes.fixPadding,
    width: '100%',
  },
  notAMemberText: {
    color: Colors.darkGray,
    fontFamily: 'Montserrat-Regular',
    fontSize: Sizes.h6,
  },
  signUpText: {
    color: Colors.primary,
    marginLeft: Sizes.fixPadding * 0.5,
    fontFamily: 'Montserrat-SemiBold',
  },
  loginText: {
    color: Colors.white,
    fontFamily: 'Montserrat-SemiBold',
  },
  loginBtn: {
    display: 'flex',
    width: '100%',
  },
  loginBtnBox: {
    display: 'flex',
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixBorderRadius * 0.5,
  },
  welcomMessage: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.primary,
    fontSize: Sizes.h1,
    marginBottom: Sizes.fixPadding * 4,
  },
  input: {
    marginBottom: Sizes.fixPadding,
  },
});

export default Login;
