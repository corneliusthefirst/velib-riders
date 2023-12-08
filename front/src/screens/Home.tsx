import React, {useEffect} from 'react';
import {View} from 'react-native';
import {isLoggedIn} from '../utils/global';
import {navigate} from '../navigators/utils';
import {useDispatch} from 'react-redux';
import {logOut, setLocation} from '../store/slices/authSlice';
import Header from '../components/Header';
import StationList from '../components/StationList';
import backgroundImage from '../assets/images/bike.png';
import CustomImageBackground from '../components/CustomImageBackground';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      // Handle init logic here
      if (!isLoggedIn()) {
        navigate('Login');
        dispatch(logOut());
      }
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          );
        },
        error => {
          console.error('Error getting geolocation:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, [dispatch]);

  return (
    <CustomImageBackground source={{uri: backgroundImage}}>
      <View>
        <Header />
        <StationList />
      </View>
    </CustomImageBackground>
  );
};

export default Home;
